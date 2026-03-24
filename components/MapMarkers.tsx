import * as MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { PointOfInterest } from '../types/init';
import { Position } from '../types/position';
import { Vehicle } from '../types/vehicle';
import { PassingPositionMarker } from './PassingPositionMarker';
import { POIMarker } from './POIMarker';
import { POITooltip } from './POITooltip';
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
  /** Whether a trip is currently active */
  readonly isActive: boolean;
  /** ID of the user's current vehicle during an active trip */
  readonly currentVehicleId: number | null;
  /** Index of the currently active POI tooltip, or null */
  readonly activeTooltip: number | null;
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
    isActive,
    currentVehicleId,
    activeTooltip,
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

    // Hide UserLocationMarker during active trip (the vehicle marker IS the user)
    const showUserLocation = !isActive || currentVehicleId == null;

    return (
      <>
        {/* Track line overlay (rendered first = below markers) */}
        {track && <Track track={track} />}

        {/* User's current location - hidden during active trip */}
        {showUserLocation && (calculatedPosition || location) && (
          <UserLocationMarker
            calculatedPosition={calculatedPosition}
            location={location}
          />
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

        {/* Active tooltip — rendered after all POI markers so it stacks on top.
            Separate MarkerView avoids the z-ordering problem: MarkerView ignores zIndex,
            and React reconciliation prevents reordering within the same key set. */}
        {activeTooltip != null && (
          <MapLibreGL.MarkerView
            key="poi-tooltip"
            coordinate={[
              pointsOfInterest[activeTooltip].pos.lng,
              pointsOfInterest[activeTooltip].pos.lat,
            ]}
            anchor={{ x: 0.5, y: 1 }}
          >
            <View collapsable={false} style={{ alignItems: 'center', marginBottom: 4 }}>
              <POITooltip
                name={pointsOfInterest[activeTooltip].name}
                type={pointsOfInterest[activeTooltip].typeId}
                originalType={pointsOfInterest[activeTooltip].originalType}
                description={pointsOfInterest[activeTooltip].description}
              />
            </View>
          </MapLibreGL.MarkerView>
        )}

        {/* Vehicles on the track (own vehicle uses GPS position during active trip) */}
        {processedVehicles.map((vehicle) => (
          <VehicleMarker
            key={`vehicle-${vehicle.id}`}
            vehicle={vehicle}
            mapHeading={mapHeading}
            zoomLevel={zoomLevel}
          />
        ))}

        {/* Designated passing position */}
        {passingPosition && (
          <PassingPositionMarker
            position={passingPosition}
            zoomLevel={zoomLevel}
          />
        )}
      </>
    );
  }
);
