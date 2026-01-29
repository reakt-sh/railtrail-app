import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { PicnicIcon, TrackEndIcon, TurningPointIcon } from '../assets/icons';
import { POIType } from '../types/init';
import { Color } from '../values';

interface ExternalProps {
  readonly pointOfInterestType: POIType;
  readonly useSmallMarker?: boolean;
}

type Props = ExternalProps;

export const PointOfInterestMarker = memo(({ pointOfInterestType, useSmallMarker }: Props) => {
  switch (pointOfInterestType) {
    case POIType.LevelCrossing:
      return (
        <MaterialCommunityIcons
          name="alpha-x-circle"
          size={useSmallMarker ? 18 : 32}
          color={Color.error}
        />
      );
    case POIType.LesserLevelCrossing:
      return (
        <MaterialCommunityIcons
          name="sign-caution"
          size={useSmallMarker ? 18 : 32}
          color={Color.warning}
        />
      );
    case POIType.Picnic:
      return <PicnicIcon width={useSmallMarker ? 16 : 28} height={useSmallMarker ? 16 : 28} />;
    case POIType.TrackEnd:
      return <TrackEndIcon width={useSmallMarker ? 16 : 28} height={useSmallMarker ? 16 : 28} />;
    case POIType.TurningPoint:
      return (
        <TurningPointIcon width={useSmallMarker ? 16 : 28} height={useSmallMarker ? 16 : 28} />
      );
    case POIType.Generic:
    // Generic markers
    default:
      return (
        <MaterialCommunityIcons
          name="information"
          size={useSmallMarker ? 18 : 32}
          color={Color.white}
        />
      );
  }
});
