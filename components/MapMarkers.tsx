import * as Location from 'expo-location';
import React, { memo } from 'react';
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
  /** Use smaller markers when zoomed out */
  readonly useSmallMarker: boolean;
  /** Current map heading for rotating vehicle direction indicators */
  readonly mapHeading: number;
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
    useSmallMarker,
    mapHeading,
  }: Props) => (
    <>
      {/* User's current location */}
      <UserLocationMarker
        calculatedPosition={calculatedPosition}
        location={location}
      />

      {/* Points of Interest along the track */}
      {pointsOfInterest.map((poi, index) => (
        <POIMarker
          key={`poi-${index}`}
          poi={poi}
          index={index}
          useSmallMarker={useSmallMarker}
        />
      ))}

      {/* Other vehicles on the track */}
      {vehicles.map((vehicle) => (
        <VehicleMarker
          key={`vehicle-${vehicle.id}`}
          vehicle={vehicle}
          mapHeading={mapHeading}
          useSmallMarker={useSmallMarker}
        />
      ))}

      {/* Designated passing position */}
      {passingPosition && (
        <PassingPositionMarker
          position={passingPosition}
          useSmallMarker={useSmallMarker}
        />
      )}

      {/* Track line overlay */}
      {track && <Track track={track} />}
    </>
  )
);
