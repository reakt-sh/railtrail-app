import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContactCard } from '../components/ContactCard';
import { Color } from '../values';

export const ContactsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ContactCard
          title="Tourist Info Malente"
          subtitle="Buchung & Ausgabe der Draisinen"
          address="Bahnhofstraße 3, Malente"
          phone="+49 4523 9842730"
          email="info@tourismus-malente.de"
        />

        <ContactCard
          title="Tourist Info Plön"
          phone="+49 4522 50950"
          email="touristinfo@ploen.de"
        />

        <ContactCard
          title="Tourist Info Eutin"
          phone="+49 4521 70970"
          email="info@eutin-tourismus.de"
        />

        <ContactCard
          title="Tourismuszentrale Holsteinische Schweiz"
          subtitle="Betreiber der Draisinenbahn"
          address="Bahnhofstraße 5, 24306 Plön"
          phone="+49 4522 509525"
          email="info@holsteinischeschweiz.de"
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
});
