import { View } from 'react-native';
import { POIType } from '../types/init';
import {
  LevelCrossingIcon,
  LesserLevelCrossingIcon,
  PicnicIcon,
  TrackEndIcon,
  TurningPointIcon,
} from '../assets/icons';
import { memo } from 'react';

interface ExternalProps {
  readonly pointOfInterestType: POIType;
  readonly useSmallMarker?: boolean;
}

type Props = ExternalProps;

export const PointOfInterestMarker = memo(({ pointOfInterestType, useSmallMarker }: Props) => {
  switch (pointOfInterestType) {
    case POIType.LevelCrossing:
      return <LevelCrossingIcon width={useSmallMarker ? 36 : 58} height={useSmallMarker ? 36 : 58} />;
    case POIType.LesserLevelCrossing:
      return (
        <LesserLevelCrossingIcon width={useSmallMarker ? 32 : 46} height={useSmallMarker ? 28 : 40} />
      );
    case POIType.Picnic:
      return <PicnicIcon width={useSmallMarker ? 32 : 48} height={useSmallMarker ? 32 : 48} />;
    case POIType.TrackEnd:
      return <TrackEndIcon width={useSmallMarker ? 32 : 48} height={useSmallMarker ? 32 : 48} />;
    case POIType.TurningPoint:
      return <TurningPointIcon width={useSmallMarker ? 32 : 48} height={useSmallMarker ? 32 : 48} />;
    default:
      return <View />;
  }
});
