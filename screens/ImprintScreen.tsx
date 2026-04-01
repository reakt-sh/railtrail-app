import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../constants';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks/useTranslation';

const contactEmail = 'kontakt@hl-bahnstreckenverwaltung.de';

export const ImprintScreen = () => {
  const i18n = useTranslation();

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contactEmail}`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('imprintOperator')}</Text>
          <Text style={styles.text}>HLB GmbH</Text>
          <Text style={styles.text}>Bahnhofstraße 3</Text>
          <Text style={styles.text}>23714 Malente</Text>

          <Pressable onPress={handleEmailPress} style={[styles.row, { marginTop: 8 }]}>
            <MaterialCommunityIcons name="email-outline" size={20} color={Color.primary} />
            <Text style={textStyles.link}>{contactEmail}</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('imprintDisclaimer')}</Text>
          <Text style={styles.text}>{i18n.t('imprintDisclaimerText')}</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
});
