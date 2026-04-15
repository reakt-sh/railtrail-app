import * as Location from 'expo-location';
import React, { memo, useMemo } from 'react';
import { HIDDEN_VEHICLE_IDS } from '../constants';
import { PointOfInterest } from '../types/init';
import { Position } from '../types/position';
import { Vehicle } from '../types/vehicle';
import { PassingPositionMarker } from './PassingPositionMarker';
import { POIMarker } from './POIMarker';
import { Track } from './Track';
import { UserLocationMarker } from './UserLocationMarker';
import { VehicleMarker } from './VehicleMarker';

interface Props {
  /** Raw GPS location from the device */
  readonly location: Location.LocationObject | null;
  /** Calculated position snapped to the track */
  readonly calculatedPosition: Position | null;
  /** Points of interest along the track (crossings, picnic areas, etc.) */
  readonly pointsOfInterest: PointOfInterest[];
  /** Other vehicles (draisines) on the track */
  readonly vehicles: Vehicle[];
  /** Designated passing position for meeting other vehicles */
  readonly passingPosition: Position | null;
  /** GeoJSON track geometry for rendering the rail line */
  readonly track: GeoJSON.FeatureCollection | null;
  /** Current map zoom level (quantized to whole numbers) */
  readonly zoomLevel: number;
  /** Current map heading for rotating vehicle direction indicators */
  readonly mapHeading: number;
  /** Visible map bounds [[ne_lng, ne_lat], [sw_lng, sw_lat]] for filtering off-screen markers */
  readonly visibleBounds: [[number, number], [number, number]] | null;
  /** Whether a trip is currently active */
  readonly isActive: boolean;
  /** ID of the user's current vehicle during an active trip */
  readonly currentVehicleId: number | null;
  /** Called when a POI marker is tapped */
  readonly onPOIPress: (index: number) => void;
}

/**
 * Container component for all map markers and overlays.
 * Renders user location, vehicles, POIs, passing position, and the track line.
 */
export const MapMarkers = memo(
  ({
    location,
    calculatedPosition,
    pointsOfInterest,
    vehicles,
    passingPosition,
    track,
    zoomLevel,
    mapHeading,
    visibleBounds,
    isActive,
    currentVehicleId,
    onPOIPress,
  }: Props) => {
    // During active trip: override own vehicle's position with user GPS for smooth tracking
    const processedVehicles = useMemo(() => {
      if (!isActive || currentVehicleId == null || !location) return vehicles;
      return vehicles.map((v) =>
        v.id === currentVehicleId
          ? {
              ...v,
              pos: { lat: location.coords.latitude, lng: location.coords.longitude },
              heading: location.coords.heading ?? v.heading,
            }
          : v
      );
    }, [vehicles, isActive, currentVehicleId, location]);

    // Filter out vehicles outside the track range (keep all on-track vehicles to avoid native crash)
    const visibleVehicles = useMemo(() => {
      return processedVehicles.filter(
        (v) =>
          v.percentagePosition >= 0 &&
          v.percentagePosition <= 100 &&
          !HIDDEN_VEHICLE_IDS.includes(v.id)
      );
    }, [processedVehicles]);

    // Hide UserLocationMarker during active trip (the vehicle marker IS the user)
    const showUserLocation = !isActive || currentVehicleId == null;

    return (
      <>
        {/* Track line overlay (rendered first = below markers) */}
        {track && <Track track={track} />}

        {/* User's current location - hidden during active trip */}
        {showUserLocation && (calculatedPosition || location) && (
          <UserLocationMarker calculatedPosition={calculatedPosition} location={location} />
        )}

        {/* POI icons */}
        {pointsOfInterest.map((poi, index) => (
          <POIMarker
            key={`poi-${index}`}
            poi={poi}
            index={index}
            zoomLevel={zoomLevel}
            onPress={onPOIPress}
          />
        ))}

        {/* Vehicles on the track (own vehicle uses GPS position during active trip) */}
        {visibleVehicles.map((vehicle) => (
          <VehicleMarker
            key={`vehicle-${vehicle.id}`}
            vehicle={vehicle}
            mapHeading={mapHeading}
            zoomLevel={zoomLevel}
            visibleBounds={visibleBounds}
          />
        ))}

        {/* Designated passing position */}
        {passingPosition && (
          <PassingPositionMarker position={passingPosition} zoomLevel={zoomLevel} />
        )}
      </>
    );
  }
);
