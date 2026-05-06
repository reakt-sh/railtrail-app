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

  const infoText = description?.trim();

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipTitle: {
    ...textStyles.titleSmall,
    fontSize: 16,
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
    fontSize: 16,
    textAlign: 'left',
  },
});
