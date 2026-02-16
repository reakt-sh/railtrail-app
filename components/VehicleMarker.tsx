import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  DraisineIcon,
  TrainBackgroundHeadingIcon,
  TrainBackgroundNeutralIcon,
} from '../assets/icons';
import { textStyles } from '../consts';
import { Color } from '../consts/color';
import { Vehicle } from '../types/vehicle';

/** Size configurations for marker elements */
const MARKER_SIZE = {
  small: {
    background: 32,
    foregroundWidth: 16,
    foregroundHeight: 16,
    labelTop: 12,
    labelFontSize: 8,
  },
  large: {
    background: 40, // uses default icon size
    foregroundWidth: 20,
    foregroundHeight: 20,
    labelTop: 18,
    labelFontSize: 12,
  },
} as const;

interface Props {
  readonly vehicle: Vehicle;
  /** Current map heading for counter-rotating the direction indicator */
  readonly mapHeading: number;
  /** Use smaller markers when zoomed out */
  readonly useSmallMarker: boolean;
}

/**
 * Displays a vehicle (draisine) on the map with:
 * - Direction indicator (background, rotates with vehicle heading)
 * - Train icon (foreground, always upright)
 * - Optional label below the icon
 */
export const VehicleMarker = memo(({ vehicle, mapHeading, useSmallMarker }: Props) => {
  const size = useSmallMarker ? MARKER_SIZE.small : MARKER_SIZE.large;
  const hasHeading = vehicle.heading != null;
  const rotation = hasHeading ? vehicle.heading! - mapHeading : 0;

  return (
    <MapLibreGL.PointAnnotation
      key={`vehicle-${vehicle.id}`}
      id={`vehicle-${vehicle.id}`}
      coordinate={[vehicle.pos.lng, vehicle.pos.lat]}
    >
      <View style={styles.container}>
        {/* Background: Direction indicator - rotates with vehicle heading */}
        <View style={[styles.backgroundLayer, { transform: [{ rotate: `${rotation}deg` }] }]}>
          <VehicleBackground hasHeading={hasHeading} size={size.background} />
        </View>

        {/* Foreground: Train icon - always upright */}
        <View style={styles.foregroundLayer}>
          <DraisineIcon width={size.foregroundWidth} height={size.foregroundHeight} />
        </View>

        {/* Label below the icon */}
        {vehicle.label && (
          <Text style={[styles.label, { top: size.labelTop, fontSize: size.labelFontSize }]}>
            {vehicle.label}
          </Text>
        )}
      </View>
    </MapLibreGL.PointAnnotation>
  );
});

/** Renders the appropriate background icon based on heading availability */
const VehicleBackground = memo(
  ({ hasHeading, size }: { hasHeading: boolean; size: number | undefined }) => {
    if (hasHeading) {
      return <TrainBackgroundHeadingIcon width={size} height={size} />;
    }
    return <TrainBackgroundNeutralIcon width={size} height={size} />;
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundLayer: {
    position: 'absolute',
  },
  foregroundLayer: {
    position: 'absolute',
  },
  label: {
    ...textStyles.hint,
    position: 'absolute',
    color: Color.text,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
