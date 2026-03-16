import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent, Platform, StyleSheet, View } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { PointOfInterest } from '../types/init';
import { getPOITitle } from '../util/poi';
import { POITooltip } from './POITooltip';
import { PointOfInterestMarker } from './PointOfInterestMarker';

interface Props {
  readonly poi: PointOfInterest;
  /** Unique index for generating the marker ID */
  readonly index: number;
  /** Current map zoom level (quantized to whole numbers) */
  readonly zoomLevel: number;
  readonly showTooltip: boolean;
  readonly onPress: (index: number) => void;
}

/**
 * Displays a Point of Interest on the map with an icon indicating the POI type.
 * Uses MarkerView instead of PointAnnotation to avoid Android bitmap snapshot
 * rendering issues (icon centering broken due to view flattening).
 * Tooltip is absolutely positioned above the icon within a single MarkerView
 * to avoid native crash from mount/unmount race conditions with multiple MarkerViews.
 */
/** Minimum touch target size matching PointOfInterestMarker hit area */
const ICON_HIT_SIZE = 32;

export const POIMarker = memo(({ poi, index, zoomLevel, showTooltip, onPress }: Props) => {
  const i18n = useTranslation();
  const title = getPOITitle(i18n, poi.name, poi.typeId, poi.originalType);
  const coordinate = [poi.pos.lng, poi.pos.lat];
  const handlePress = useCallback(() => onPress(index), [onPress, index]);

  const [containerHeight, setContainerHeight] = useState(ICON_HIT_SIZE);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  }, []);

  // On Android the tooltip lives in normal flow, growing the container.
  // Shift the anchor so the icon center stays on the geo-coordinate.
  const anchor =
    Platform.OS === 'android'
      ? { x: 0.5, y: (containerHeight - ICON_HIT_SIZE / 2) / containerHeight }
      : undefined;

  return (
    <MapLibreGL.MarkerView id={`poi-${index}`} coordinate={coordinate} anchor={anchor}>
      <View
        collapsable={false}
        style={styles.container}
        onLayout={Platform.OS === 'android' ? handleLayout : undefined}
      >
        {showTooltip && (
          <View style={styles.tooltipAnchor}>
            <POITooltip name={poi.name} type={poi.typeId} originalType={poi.originalType} />
          </View>
        )}
        <PointOfInterestMarker
          pointOfInterestType={poi.typeId}
          zoomLevel={zoomLevel}
          onPress={handlePress}
          accessibilityLabel={title}
        />
      </View>
    </MapLibreGL.MarkerView>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  tooltipAnchor: Platform.select({
    ios: {
      position: 'absolute',
      bottom: '100%',
    },
    default: {},
  }),
});
