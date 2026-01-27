import { memo } from 'react';
import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { Color } from '../values/color';

interface ExternalProps {
  readonly track: GeoJSON.FeatureCollection;
}

type Props = ExternalProps;

export const Track = memo(({ track }: Props) => {
  return (
    <MapLibreGL.ShapeSource id="track-source" shape={track}>
      <MapLibreGL.LineLayer
        id="track-line"
        style={{
          lineColor: Color.track,
          lineWidth: 6,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </MapLibreGL.ShapeSource>
  );
});
