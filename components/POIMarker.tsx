import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { PointOfInterest } from '../types/init';
import { getPOITitle } from '../util/poi';
import { POITooltip } from './POITooltip';
import { PointOfInterestMarker } from './PointOfInterestMarker';

interface Props {
  readonly poi: PointOfInterest;
  /** Unique index for generating the marker ID */
  readonly index: number;
  /** Use smaller markers when zoomed out */
  readonly useSmallMarker: boolean;
}

/**
 * Displays a Point of Interest on the map with:
 * - An icon indicating the POI type (crossing, picnic area, etc.)
 * - A tooltip/callout showing details when tapped
 */
export const POIMarker = memo(({ poi, index, useSmallMarker }: Props) => {
  const i18n = useTranslation();
  const title = getPOITitle(i18n, poi.name, poi.typeId, poi.originalType);

  return (
    <MapLibreGL.PointAnnotation
      key={`poi-${index}`}
      id={`poi-${index}`}
      coordinate={[poi.pos.lng, poi.pos.lat]}
      title={title}
    >
      <View>
        <PointOfInterestMarker
          pointOfInterestType={poi.typeId}
          useSmallMarker={useSmallMarker}
        />
      </View>
      <MapLibreGL.Callout title={title}>
        <POITooltip
          name={poi.name}
          type={poi.typeId}
          originalType={poi.originalType}
        />
      </MapLibreGL.Callout>
    </MapLibreGL.PointAnnotation>
  );
});
