import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { PassingPositionIcon } from '../assets/icons';
import { Position } from '../types/position';

/** Icon size for small markers (zoomed out view) */
const SMALL_MARKER_SIZE = 32;

interface Props {
  readonly position: Position;
  /** Use smaller marker when zoomed out */
  readonly useSmallMarker: boolean;
}

/**
 * Displays the designated passing position on the map.
 * This is where vehicles should pass each other on single-track sections.
 */
export const PassingPositionMarker = memo(({ position, useSmallMarker }: Props) => (
  <MapLibreGL.PointAnnotation
    id="passing-position"
    coordinate={[position.lng, position.lat]}
  >
    <View>
      {useSmallMarker ? (
        <PassingPositionIcon width={SMALL_MARKER_SIZE} height={SMALL_MARKER_SIZE} />
      ) : (
        <PassingPositionIcon />
      )}
    </View>
  </MapLibreGL.PointAnnotation>
));
