import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { PointOfInterest } from '../types/init';
import { getPOITitle } from '../util/poi';
import { PointOfInterestMarker } from './PointOfInterestMarker';

interface Props {
  readonly poi: PointOfInterest;
  /** Unique index for generating the marker ID */
  readonly index: number;
  /** Current map zoom level (quantized to whole numbers) */
  readonly zoomLevel: number;
  readonly onPress: (index: number) => void;
}

export const POIMarker = memo(({ poi, index, zoomLevel, onPress }: Props) => {
  const i18n = useTranslation();
  const title = getPOITitle(i18n, poi.name, poi.typeId, poi.originalType);
  const coordinate = [poi.pos.lng, poi.pos.lat];
  const handlePress = useCallback(() => onPress(index), [onPress, index]);

  return (
    <MapLibreGL.MarkerView id={`poi-${index}`} coordinate={coordinate}>
      <PointOfInterestMarker
        pointOfInterestType={poi.typeId}
        zoomLevel={zoomLevel}
        onPress={handlePress}
        accessibilityLabel={title}
      />
    </MapLibreGL.MarkerView>
  );
});
