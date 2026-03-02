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
  biggerIcon?: boolean;

  library?: 'MaterialIcons' | 'MaterialCommunityIcons';
}

const markerConfigs: Record<POIType, MarkerConfig> = {
  [POIType.LevelCrossing]: {
    icon: 'alpha-x',
    color: Color.error,
    biggerIcon: true,
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

  const iconColor = config.iconColor ?? Color.white;

  const { size, iconSize, extraIconSize } = useMemo(() => {
    if (zoomLevel < 10) {
      return { size: 6, iconSize: 0, extraIconSize: 0 };
    }
    if (zoomLevel > 15) {
      return { size: 24, iconSize: 16, extraIconSize: 8 };
    }

    return { size: 12, iconSize: 10, extraIconSize: 4 };
  }, [zoomLevel]);

  return (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: config.color }]}>
      {iconSize > 0 &&
        (config.library === 'MaterialIcons' ? (
          <MaterialIcons
            name={config.icon as keyof typeof MaterialIcons.glyphMap}
            size={iconSize + (config.biggerIcon ? extraIconSize : 0)}
            color={iconColor}
            style={styles.icon}
          />
        ) : (
          <MaterialCommunityIcons
            name={config.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={iconSize + (config.biggerIcon ? extraIconSize : 0)}
            color={iconColor}
            style={styles.icon}
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
    zIndex: 100,
  },
  icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
