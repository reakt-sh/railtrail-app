import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { POIType } from '../types/init';
import { Color, textStyles } from '../values';

const poiTypeLabels: Record<POIType, string> = {
  [POIType.Generic]: 'Info',
  [POIType.LevelCrossing]: 'Bahnübergang',
  [POIType.LesserLevelCrossing]: 'Querung',
  [POIType.Picnic]: 'Rastplatz',
  [POIType.TrackEnd]: 'Streckenende',
  [POIType.TurningPoint]: 'Wendepunkt',
};

interface POITooltipProps {
  name?: string;
  typeId: POIType;
}

export const POITooltip = ({ name, typeId }: POITooltipProps) => {
  return (
    <View style={[styles.tooltip]}>
      {name && <Text style={styles.tooltipTitle}>{name}</Text>}
      <Text style={styles.tooltipType}>{poiTypeLabels[typeId]}</Text>
    </View>
  );
};

export const getPOITitle = (name: string | undefined, typeId: POIType): string => {
  return name || poiTypeLabels[typeId];
};

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: Color.white,
    padding: 8,
    borderRadius: 6,
    minWidth: 160,
    textAlign: 'center',
  },
  tooltipTitle: {
    ...textStyles.titleSmall,
    alignSelf: 'center',
  },
  tooltipType: {
    ...textStyles.hint,
    alignSelf: 'center',
  },
});
