import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  DraisineIcon,
  TrainBackgroundHeadingIcon,
  TrainBackgroundNeutralIcon,
} from '../assets/icons';
import { Color } from '../constants/color';
import { Font } from '../constants/fonts';
import { Vehicle } from '../types/vehicle';

/** Size configurations for marker elements */
const MARKER_SIZE = {
  small: {
    background: 32,
    foregroundWidth: 16,
    foregroundHeight: 16,
    labelTop: 40,
    labelFontSize: 8,
  },
  large: {
    background: 40, // uses default icon size
    foregroundWidth: 20,
    foregroundHeight: 20,
    labelTop: 50,
    labelFontSize: 12,
  },
} as const;

interface Props {
  readonly vehicle: Vehicle;
  /** Current map heading for counter-rotating the direction indicator */
  readonly mapHeading: number;
  /** Current map zoom level (quantized to whole numbers) */
  readonly zoomLevel: number;
  /** Visible map bounds [[ne_lng, ne_lat], [sw_lng, sw_lat]] for hiding off-screen markers */
  readonly visibleBounds: [[number, number], [number, number]] | null;
}

/**
 * Displays a vehicle (draisine) on the map with:
 * - Direction indicator (background, rotates with vehicle heading)
 * - Train icon (foreground, always upright)
 * - Optional label below the icon
 */
export const VehicleMarker = memo(({ vehicle, mapHeading, zoomLevel, visibleBounds }: Props) => {
  const isInBounds = useMemo(() => {
    if (!visibleBounds) return true;
    const [[neLng, neLat], [swLng, swLat]] = visibleBounds;
    const padLat = (neLat - swLat) * 0.3;
    const padLng = (neLng - swLng) * 0.3;
    return (
      vehicle.pos.lat >= swLat - padLat && vehicle.pos.lat <= neLat + padLat &&
      vehicle.pos.lng >= swLng - padLng && vehicle.pos.lng <= neLng + padLng
    );
  }, [vehicle.pos.lat, vehicle.pos.lng, visibleBounds]);

  const useSmallMarker = zoomLevel < 15;
  const size = useSmallMarker ? MARKER_SIZE.small : MARKER_SIZE.large;
  const hasHeading = vehicle.heading != null;
  const rotation = hasHeading ? vehicle.heading! - mapHeading : 0;

  return (
    <MapLibreGL.PointAnnotation
      key={`vehicle-${vehicle.id}`}
      id={`vehicle-${vehicle.id}`}
      coordinate={[vehicle.pos.lng, vehicle.pos.lat]}
    >
      {isInBounds ? (
        <View
          collapsable={false}
          style={[
            styles.container,
            {
              minWidth: size.background,
              height: vehicle.label ? size.labelTop + size.labelFontSize + 8 : size.background,
            },
          ]}
        >
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
            <View style={[styles.labelContainer, { top: size.labelTop }]}>
              <Text style={useSmallMarker ? styles.labelSmall : styles.labelLarge} numberOfLines={1}>
                {vehicle.label}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View collapsable={false} style={styles.hidden} />
      )}
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
    zIndex: 100,
  },
  backgroundLayer: {
    position: 'absolute',
  },
  foregroundLayer: {
    position: 'absolute',
  },
  labelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  labelSmall: {
    fontFamily: Font.regular,
    fontSize: 8,
    color: Color.text,
  },
  labelLarge: {
    fontFamily: Font.regular,
    fontSize: 12,
    color: Color.text,
  },
  hidden: {
    width: 1,
    height: 1,
    opacity: 0,
  },
});
