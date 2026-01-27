import { POIType } from '../types/init';
import {
  GenericMarkerIcon,
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
      return <LevelCrossingIcon width={useSmallMarker ? 18 : 32} height={useSmallMarker ? 18 : 32} />;
    case POIType.LesserLevelCrossing:
      return (
        <LesserLevelCrossingIcon width={useSmallMarker ? 16 : 24} height={useSmallMarker ? 14 : 20} />
      );
    case POIType.Picnic:
      return <PicnicIcon width={useSmallMarker ? 16 : 28} height={useSmallMarker ? 16 : 28} />;
    case POIType.TrackEnd:
      return <TrackEndIcon width={useSmallMarker ? 16 : 28} height={useSmallMarker ? 16 : 28} />;
    case POIType.TurningPoint:
      return <TurningPointIcon width={useSmallMarker ? 16 : 28} height={useSmallMarker ? 16 : 28} />;
    case POIType.Generic:
    default:
      return <GenericMarkerIcon width={useSmallMarker ? 12 : 20} height={useSmallMarker ? 12 : 20} />;
  }
});
