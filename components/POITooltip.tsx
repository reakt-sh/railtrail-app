import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color, textStyles } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { POIType } from '../types/init';
import { getPOITypeLabel } from '../util/poi';

interface POITooltipProps {
  name?: string;
  type: POIType;
  originalType?: POIType;
}

export const POITooltip = ({ name, type, originalType }: POITooltipProps) => {
  const i18n = useTranslation();

  return (
    <View collapsable={false} style={styles.tooltip}>
      {name && <Text style={styles.tooltipTitle}>{getPOITypeLabel(i18n, type, originalType)}</Text>}
      <Text style={styles.tooltipType}>{name}</Text>
      {(type === POIType.LevelCrossing || originalType === POIType.LevelCrossing) && (
        <Text style={styles.crossingHint}>{i18n.t('levelCrossingHint')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    maxWidth: 200,
    width: 160,
    textAlign: 'center',
    marginBottom: 4,
  },
  tooltipTitle: {
    ...textStyles.titleSmall,
  },
  tooltipType: {
    ...textStyles.hint,
  },
  crossingHint: {
    ...textStyles.hint,
    color: Color.warn,
    alignSelf: 'center',
    marginTop: 4,
  },
});
