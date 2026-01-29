import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { POIType } from '../types/init';
import { Color } from '../values';

interface ExternalProps {
  readonly pointOfInterestType: POIType;
  readonly useSmallMarker?: boolean;
}

type Props = ExternalProps;

interface MarkerConfig {
  icon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  color: string;
  iconSizeSmall?: number;
  iconSizeLarge?: number;

  library?: 'MaterialIcons' | 'MaterialCommunityIcons';
}

const markerConfigs: Record<POIType, MarkerConfig> = {
  [POIType.LevelCrossing]: {
    icon: 'alpha-x',
    color: Color.error,
    iconSizeSmall: 20,
    iconSizeLarge: 24,
  },
  [POIType.LesserLevelCrossing]: {
    icon: 'warning-amber',
    color: Color.warning,
    library: 'MaterialIcons',
  },
  [POIType.Picnic]: { icon: 'silverware-fork-knife', color: Color.success },
  [POIType.TrackEnd]: { icon: 'sign-direction', color: Color.track },
  [POIType.TurningPoint]: { icon: 'rotate-left', color: Color.primary },
  [POIType.Generic]: { icon: 'information-variant', color: Color.primary },
};

export const PointOfInterestMarker = memo(({ pointOfInterestType, useSmallMarker }: Props) => {
  const config = markerConfigs[pointOfInterestType] ?? markerConfigs[POIType.Generic];
  const size = useSmallMarker ? 20 : 24;
  const iconSize = useSmallMarker ? (config.iconSizeSmall ?? 12) : (config.iconSizeLarge ?? 16);

  return (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: config.color }]}>
      {config.library === 'MaterialIcons' ? (
        <MaterialIcons
          name={config.icon as keyof typeof MaterialIcons.glyphMap}
          size={iconSize}
          color={Color.white}
        />
      ) : (
        <MaterialCommunityIcons
          name={config.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={iconSize}
          color={Color.white}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  circle: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
