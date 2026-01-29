import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

interface SectionProps {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  items: string[];
}

const Section = ({ title, icon, items }: SectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <MaterialCommunityIcons name={icon} size={24} color={Color.primary} />
      <Text style={[textStyles.headerTextNormal, styles.sectionTitle]}>{title}</Text>
    </View>
    {items.map((item, index) => (
      <View key={index} style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={[textStyles.itemText, styles.bulletText]}>{item}</Text>
      </View>
    ))}
  </View>
);

export const GoodToKnowScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Section
          title="Öffnungszeiten"
          icon="clock-outline"
          items={[
            'Mai–September: Wochentags/Samstags 10:00 Uhr (3–6 Std) und 13:30 Uhr (3 Std); Sonntags 10:00 Uhr (3 Std)',
            'Oktober–April: Wochentags 10:00 und 13:30 Uhr; Wochenende auf Anfrage',
            '30 Minuten vor Start erscheinen für Papierkram und Übergabe',
          ]}
        />

        <Section
          title="Kapazität & Preise"
          icon="currency-eur"
          items={[
            'Bis zu 4 Personen pro Draisine (2 treten, 2 entspannen)',
            '3-Stunden-Tour: 50€ pro Draisine',
            'Familienpreis: 40€ (mit Kindern unter 16)',
            'ostseecard: 2€ Rabatt',
            'Gruppentouren bis 60 Personen möglich',
          ]}
        />

        <Section
          title="Wichtige Regeln"
          icon="alert-circle-outline"
          items={[
            'Draisinen haben einen langen Bremsweg – vorausschauend fahren!',
            'An allen Bahnübergängen anhalten; Straßenverkehr hat Vorfahrt',
            'Nicht in der Nähe von Privatgrundstücken anhalten',
            'Einbahnverkehr – Wenden erfolgt am Wendepunkt',
            'Mindestens ein Erwachsener pro Draisine erforderlich',
            'Tiere wegen Lärmpegel nicht empfohlen',
          ]}
        />

        <Section
          title="Empfehlungen"
          icon="lightbulb-outline"
          items={[
            'Lange, feste Kleidung und festes Schuhwerk tragen (Vegetation entlang der Strecke)',
            'Mietvertrag vorher herunterladen und ausfüllen spart Zeit',
            'Picknickpausen sind erlaubt',
            'Gutscheine erhältlich – 3 Jahre gültig',
          ]}
        />
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
    paddingBottom: 32,
  },
  section: {
    backgroundColor: Color.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
    color: Color.primary,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    color: Color.primary,
    marginRight: 8,
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    color: Color.textDark,
  },
});
