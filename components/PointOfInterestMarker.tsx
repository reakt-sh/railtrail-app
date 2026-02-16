import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../consts';
import { POIType } from '../types/init';

interface ExternalProps {
  readonly pointOfInterestType: POIType;
  readonly useSmallMarker?: boolean;
}

type Props = ExternalProps;

interface MarkerConfig {
  icon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof MaterialIcons.glyphMap;
  color: string;
  iconColor?: string;
  iconSizeSmall?: number;
  iconSizeLarge?: number;

  library?: 'MaterialIcons' | 'MaterialCommunityIcons';
}

const markerConfigs: Record<POIType, MarkerConfig> = {
  [POIType.LevelCrossing]: {
    icon: 'alpha-x',
    color: Color.error,
    iconSizeSmall: 0,
    iconSizeLarge: 24,
  },
  [POIType.LesserLevelCrossing]: {
    icon: 'warning-amber',
    color: Color.warning,
    library: 'MaterialIcons',
  },
  [POIType.Picnic]: { icon: 'silverware-fork-knife', color: Color.success },
  [POIType.TrackEnd]: { icon: 'sign-direction', color: Color.track },
  [POIType.TurningPoint]: { icon: 'arrow-u-left-bottom', color: Color.primary },
  [POIType.Generic]: { icon: 'information-variant', color: Color.white, iconColor: Color.primary },
  [POIType.Halt]: { icon: 'bus-stop', color: Color.primary },
  [POIType.EndOfTheLine]: { icon: 'sign-direction', color: Color.track },
};

export const PointOfInterestMarker = memo(({ pointOfInterestType, useSmallMarker }: Props) => {
  const config = markerConfigs[pointOfInterestType] ?? markerConfigs[POIType.Generic];
  const size = useSmallMarker ? 6 : 24;
  const iconSize = useSmallMarker ? (config.iconSizeSmall ?? 0) : (config.iconSizeLarge ?? 16);
  const iconColor = config.iconColor ?? Color.white;

  return (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: config.color }]}>
      {config.library === 'MaterialIcons' ? (
        <MaterialIcons
          name={config.icon as keyof typeof MaterialIcons.glyphMap}
          size={iconSize}
          color={iconColor}
        />
      ) : (
        <MaterialCommunityIcons
          name={config.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={iconSize}
          color={iconColor}
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
