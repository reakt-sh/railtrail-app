import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../constants';
import { POIType } from '../types/init';

interface ExternalProps {
  readonly pointOfInterestType: POIType;
  readonly zoomLevel: number;
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
  [POIType.TrackEnd]: { icon: 'sign-direction', color: Color.track },
  [POIType.TurningPoint]: { icon: 'arrow-u-left-bottom', color: Color.primary },
  [POIType.Generic]: { icon: 'sign-direction', color: Color.white, iconColor: Color.success },
  [POIType.Halt]: { icon: 'table-picnic', color: Color.white, iconColor: Color.black },
  [POIType.TouristInfo]: {
    icon: 'information-variant',
    color: Color.white,
    iconColor: Color.primary,
  },
  [POIType.Bridge]: { icon: 'bridge', color: Color.skyBlue },
  [POIType.RoadCrossing]: { icon: 'road', color: Color.warning },
};

export const PointOfInterestMarker = memo(({ pointOfInterestType, zoomLevel }: Props) => {
  const config = markerConfigs[pointOfInterestType] ?? markerConfigs[POIType.Generic];
  const useSmallMarker = zoomLevel < 15;

  const iconSize = useSmallMarker ? (config.iconSizeSmall ?? 0) : (config.iconSizeLarge ?? 16);
  const iconColor = config.iconColor ?? Color.white;

  const size = useMemo(() => {
    if (zoomLevel < 10) {
      return 6;
    }
    if (zoomLevel > 15) {
      return 24;
    }

    return 12;
  }, [zoomLevel]);

  return (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: config.color }]}>
      {iconSize > 0 &&
        (config.library === 'MaterialIcons' ? (
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
        ))}
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
