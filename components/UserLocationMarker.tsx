import * as MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import React, { memo } from 'react';
import { View } from 'react-native';
import { UserLocationIcon } from '../assets/icons';
import { Position } from '../types/position';

interface Props {
  /** Calculated position on the track (preferred over raw location) */
  readonly calculatedPosition: Position | null;
  /** Raw GPS location (fallback when calculatedPosition is unavailable) */
  readonly location: Location.LocationObject | null;
}

/**
 * Displays the user's current location on the map.
 * Prefers calculatedPosition (snapped to track) over raw GPS location.
 */
export const UserLocationMarker = memo(({ calculatedPosition, location }: Props) => {
  // Determine which coordinates to use - prefer calculated position over raw GPS
  const coordinate = calculatedPosition
    ? [calculatedPosition.lng, calculatedPosition.lat]
    : location
      ? [location.coords.longitude, location.coords.latitude]
      : null;

  if (!coordinate) {
    return null;
  }

  return (
    <MapLibreGL.PointAnnotation id="user-location" coordinate={coordinate as [number, number]}>
      <View>
        <UserLocationIcon />
      </View>
    </MapLibreGL.PointAnnotation>
  );
});
