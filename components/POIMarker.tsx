import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo, useCallback } from 'react';
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
 * Tooltip is rendered in a separate MarkerView to prevent anchor recalculation
 * from shifting the icon when the tooltip appears.
 */
export const POIMarker = memo(({ poi, index, zoomLevel, showTooltip, onPress }: Props) => {
  const i18n = useTranslation();
  const title = getPOITitle(i18n, poi.name, poi.typeId, poi.originalType);
  const coordinate = [poi.pos.lng, poi.pos.lat];
  const handlePress = useCallback(() => onPress(index), [onPress, index]);

  return (
    <>
      <MapLibreGL.MarkerView
        id={`poi-${index}`}
        coordinate={coordinate}
      >
        <PointOfInterestMarker
          pointOfInterestType={poi.typeId}
          zoomLevel={zoomLevel}
          onPress={handlePress}
          accessibilityLabel={title}
        />
      </MapLibreGL.MarkerView>

      {showTooltip && (
        <MapLibreGL.MarkerView
          id={`poi-tooltip-${index}`}
          coordinate={coordinate}
          anchor={{ x: 0.5, y: 1 }}
        >
          <POITooltip name={poi.name} type={poi.typeId} originalType={poi.originalType} />
        </MapLibreGL.MarkerView>
      )}
    </>
  );
});
