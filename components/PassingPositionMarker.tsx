import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { PassingPositionIcon } from '../assets/icons';
import { Position } from '../types/position';

/** Icon size for small markers (zoomed out view) */
const SMALL_MARKER_SIZE = 32;

interface Props {
  readonly position: Position;
  /** Current map zoom level (quantized to whole numbers) */
  readonly zoomLevel: number;
}

/**
 * Displays the designated passing position on the map.
 * This is where vehicles should pass each other on single-track sections.
 */
export const PassingPositionMarker = memo(({ position, zoomLevel }: Props) => {
  const useSmallMarker = zoomLevel < 15;

  return (
    <MapLibreGL.PointAnnotation id="passing-position" coordinate={[position.lng, position.lat]}>
      <View>
        {useSmallMarker ? (
          <PassingPositionIcon width={SMALL_MARKER_SIZE} height={SMALL_MARKER_SIZE} />
        ) : (
          <PassingPositionIcon />
        )}
      </View>
    </MapLibreGL.PointAnnotation>
  );
});
