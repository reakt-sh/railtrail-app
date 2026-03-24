import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, textStyles } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { POIType } from '../types/init';
import { getPOITypeLabel } from '../util/poi';

interface POITooltipProps {
  name?: string;
  type: POIType;
  originalType?: POIType;
  description?: string;
}

export const POITooltip = ({ name, type, originalType, description }: POITooltipProps) => {
  const i18n = useTranslation();

  // Extract info text after the double newline (skip km line)
  const infoText = description?.split('\n\n').slice(1).join('\n\n')?.trim();

  return (
    <View collapsable={false} style={styles.tooltip}>
      {name && <Text style={styles.tooltipTitle}>{getPOITypeLabel(i18n, type, originalType)}</Text>}
      <Text style={styles.tooltipType}>{name}</Text>
      {(type === POIType.LevelCrossing || originalType === POIType.LevelCrossing) && (
        <Text style={styles.crossingHint}>{i18n.t('levelCrossingHint')}</Text>
      )}
      {infoText && (
        <ScrollView style={styles.descriptionScroll}>
          <Text style={styles.descriptionText}>{infoText}</Text>
        </ScrollView>
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
    maxWidth: 280,
    alignItems: 'center',
  },
  tooltipTitle: {
    ...textStyles.titleSmall,
    textAlign: 'center',
  },
  tooltipType: {
    ...textStyles.hint,
    textAlign: 'center',
  },
  crossingHint: {
    ...textStyles.hint,
    color: Color.warn,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 4,
  },
  descriptionScroll: {
    maxHeight: 200,
    marginTop: 8,
  },
  descriptionText: {
    ...textStyles.hint,
    textAlign: 'left',
  },
});
