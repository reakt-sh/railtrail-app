import * as MapLibreGL from '@maplibre/maplibre-react-native';
import React, { memo } from 'react';
import { PointOfInterest } from '../types/init';
import { PointOfInterestMarker } from './PointOfInterestMarker';

interface Props {
  readonly poi: PointOfInterest;
  /** Unique index for generating the marker ID */
  readonly index: number;
  /** Current map zoom level (quantized to whole numbers) */
  readonly zoomLevel: number;
}

/**
 * Displays a Point of Interest on the map with an icon indicating the POI type.
 * Uses MarkerView instead of PointAnnotation to avoid Android bitmap snapshot
 * rendering issues (icon centering broken due to view flattening).
 */
export const POIMarker = memo(({ poi, index, zoomLevel }: Props) => {
  return (
    <MapLibreGL.MarkerView
      key={`poi-${index}`}
      id={`poi-${index}`}
      coordinate={[poi.pos.lng, poi.pos.lat]}
    >
      <PointOfInterestMarker pointOfInterestType={poi.typeId} zoomLevel={zoomLevel} />
    </MapLibreGL.MarkerView>
  );
});
