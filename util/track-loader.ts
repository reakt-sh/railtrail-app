import { POIType, PointOfInterest } from '../types/init';
import { Position } from '../types/position';
import trackData from '../assets/tracks/malente-luetjenburg.json';

// Type definitions for the JSON structure
interface TrackMarker {
  id: string;
  name: string;
  type: string;
  position: {
    type: string;
    coordinates: [number, number]; // [lng, lat]
  };
  description?: string;
  extra?: {
    isTurningPoint?: boolean;
  };
}

interface TrackJSON {
  id: string;
  version: string;
  name: string;
  map: {
    startConfiguration: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  tracks: Array<{
    id: string;
    name: string;
    data: {
      type: string;
      coordinates: [number, number][]; // [lng, lat][]
    };
    markers: {
      types: Array<{
        id: string;
        name: string;
        description?: string;
      }>;
      data: TrackMarker[];
    };
  }>;
}

// Map marker types from JSON to POIType enum
const markerTypeToPOIType: Record<string, POIType> = {
  crossing: POIType.LevelCrossing,
  'minor-crossing': POIType.LesserLevelCrossing,
  halt: POIType.Generic,
  generic: POIType.Generic,
  'end-of-the-line': POIType.TrackEnd,
};

// Calculate distance between two coordinates using Haversine formula
const haversineDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calculate total track length and cumulative distances
const calculateTrackMetrics = (
  coordinates: [number, number][]
): { totalLength: number; cumulativeDistances: number[] } => {
  const cumulativeDistances: number[] = [0];
  let totalLength = 0;

  for (let i = 1; i < coordinates.length; i++) {
    const [lng1, lat1] = coordinates[i - 1];
    const [lng2, lat2] = coordinates[i];
    const segmentLength = haversineDistance(lat1, lng1, lat2, lng2);
    totalLength += segmentLength;
    cumulativeDistances.push(totalLength);
  }

  return { totalLength, cumulativeDistances };
};

// Find the percentage position of a point on the track
const findPercentagePosition = (
  markerLng: number,
  markerLat: number,
  coordinates: [number, number][],
  cumulativeDistances: number[],
  totalLength: number
): number => {
  let minDistance = Infinity;
  let closestSegmentIndex = 0;
  let closestPointOnSegment: { lng: number; lat: number; t: number } | null = null;

  // Find the closest point on the track
  for (let i = 0; i < coordinates.length - 1; i++) {
    const [lng1, lat1] = coordinates[i];
    const [lng2, lat2] = coordinates[i + 1];

    // Project marker onto segment
    const dx = lng2 - lng1;
    const dy = lat2 - lat1;
    const segmentLengthSq = dx * dx + dy * dy;

    let t = 0;
    if (segmentLengthSq > 0) {
      t = Math.max(0, Math.min(1, ((markerLng - lng1) * dx + (markerLat - lat1) * dy) / segmentLengthSq));
    }

    const projectedLng = lng1 + t * dx;
    const projectedLat = lat1 + t * dy;
    const distance = haversineDistance(markerLat, markerLng, projectedLat, projectedLng);

    if (distance < minDistance) {
      minDistance = distance;
      closestSegmentIndex = i;
      closestPointOnSegment = { lng: projectedLng, lat: projectedLat, t };
    }
  }

  if (!closestPointOnSegment) return 0;

  // Calculate the distance along the track to this point
  const [lng1, lat1] = coordinates[closestSegmentIndex];
  const distanceToProjectedPoint = haversineDistance(
    lat1,
    lng1,
    closestPointOnSegment.lat,
    closestPointOnSegment.lng
  );

  const distanceAlongTrack = cumulativeDistances[closestSegmentIndex] + distanceToProjectedPoint;
  return (distanceAlongTrack / totalLength) * 100;
};

// Convert markers to PointOfInterest format
const convertMarkersToPOI = (
  markers: TrackMarker[],
  coordinates: [number, number][],
  cumulativeDistances: number[],
  totalLength: number
): PointOfInterest[] => {
  return markers
    .filter((marker) => {
      // Filter out markers that are outside the track area (Kiel markers)
      const [lng] = marker.position.coordinates;
      return lng > 10.5 && lng < 10.7; // Only Malente-Lütjenburg area
    })
    .map((marker) => {
      const [lng, lat] = marker.position.coordinates;
      const poiType = markerTypeToPOIType[marker.type] ?? POIType.Generic;

      const percentagePosition = findPercentagePosition(
        lng,
        lat,
        coordinates,
        cumulativeDistances,
        totalLength
      );

      return {
        typeId: poiType,
        name: marker.name,
        pos: { lat, lng } as Position,
        percentagePosition,
      };
    })
    .sort((a, b) => a.percentagePosition - b.percentagePosition);
};

// Create GeoJSON FeatureCollection from track coordinates
const createTrackGeoJSON = (coordinates: [number, number][]): GeoJSON.FeatureCollection => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates,
      },
      properties: {},
    },
  ],
});

// Load and process track data
export const loadTrack = () => {
  const data = trackData as TrackJSON;
  const mainTrack = data.tracks[0];
  const coordinates = mainTrack.data.coordinates;

  const { totalLength, cumulativeDistances } = calculateTrackMetrics(coordinates);

  const pointsOfInterest = convertMarkersToPOI(
    mainTrack.markers.data,
    coordinates,
    cumulativeDistances,
    totalLength
  );

  const trackPath = createTrackGeoJSON(coordinates);

  return {
    id: 1, // Numeric ID for compatibility
    name: data.name,
    path: trackPath,
    length: Math.round(totalLength), // in meters
    pointsOfInterest,
    mapConfig: data.map.startConfiguration,
  };
};

// Export the loaded track data
export const malenteLuetjenburgTrack = loadTrack();
