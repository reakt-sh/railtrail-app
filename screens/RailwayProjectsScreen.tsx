import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../constants';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks/useTranslation';

export const RailwayProjectsScreen = () => {
  const i18n = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('infoTitleRailwayProjects')}</Text>
          <Text style={styles.text}>{i18n.t('railwayProjectsContent')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundLight,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    ...textStyles.headerTextMedium,
    marginBottom: 8,
  },
  text: {
    ...textStyles.bodyMedium,
    marginBottom: 4,
  },
});
