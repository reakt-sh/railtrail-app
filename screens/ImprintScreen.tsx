import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

export const ImprintScreen = () => {
  const handlePhonePress = () => {
    Linking.openURL(`tel:${'+49 4522 509525'.replace(/\s/g, '')}`);
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:info@holsteinischeschweiz.de');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://www.holsteinischeschweiz.de');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Betreiber</Text>
          <Text style={styles.text}>Tourismuszentrale Holsteinische Schweiz</Text>
          <Text style={styles.text}>Bahnhofstraße 5</Text>
          <Text style={styles.text}>24306 Plön</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kontakt</Text>

          <Pressable onPress={handlePhonePress} style={styles.row}>
            <MaterialCommunityIcons name="phone-outline" size={20} color={Color.primary} />
            <Text style={textStyles.link}>+49 4522 509525</Text>
          </Pressable>

          <Pressable onPress={handleEmailPress} style={styles.row}>
            <MaterialCommunityIcons name="email-outline" size={20} color={Color.primary} />
            <Text style={textStyles.link}>info@holsteinischeschweiz.de</Text>
          </Pressable>

          <Pressable onPress={handleWebsitePress} style={styles.row}>
            <MaterialCommunityIcons name="web" size={20} color={Color.primary} />
            <Text style={textStyles.link}>www.holsteinischeschweiz.de</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App-Entwicklung</Text>
          <Text style={styles.text}>HLB GmbH</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Haftungsausschluss</Text>
          <Text style={styles.text}>
            Die Inhalte dieser App wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </Text>
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
    color: Color.primary,
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
