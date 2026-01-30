import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccordionItem } from '../components/AccordionItem';
import { Color } from '../values';

const faqItems = [
  {
    question: 'Wie sind die Abfahrtszeiten?',
    answer:
      'Mai–September: Wochentags und Samstags um 10:00 Uhr (3–6 Std) und 13:30 Uhr (3 Std). Sonntags um 10:00 Uhr (3 Std).\n\nOktober–April: Wochentags um 10:00 und 13:30 Uhr. Am Wochenende auf Anfrage.\n\nBitte erscheinen Sie 30 Minuten vor Abfahrt für Formalitäten und Übergabe.',
  },
  {
    question: 'Wie viele Personen können mitfahren?',
    answer:
      'Auf jeder Draisine können bis zu 4 Personen mitfahren – 2 Personen treten, 2 Personen können sich entspannen. Mindestens ein Erwachsener pro Draisine ist erforderlich.',
  },
  {
    question: 'Was kostet eine Draisine?',
    answer:
      '3-Stunden-Tour: 50€ pro Draisine\nFamilienpreis (mit Kindern unter 16): 40€\nostseecard-Inhaber erhalten 2€ Rabatt.\n\nGruppentouren mit bis zu 60 Personen sind möglich.',
  },
  {
    question: 'Wie funktioniert eine Draisine?',
    answer:
      'Die Draisine wird durch Treten angetrieben, ähnlich wie ein Fahrrad. Wichtig: Draisinen haben einen langen Bremsweg – fahren Sie vorausschauend!\n\nEs herrscht Einbahnverkehr, das Wenden erfolgt am Wendepunkt.',
  },
  {
    question: 'Was muss ich bei der Fahrt beachten?',
    answer:
      '• An allen Bahnübergängen anhalten – Straßenverkehr hat Vorfahrt\n• Nicht in der Nähe von Privatgrundstücken anhalten\n• Tiere sind wegen des Lärmpegels nicht empfohlen\n• Tragen Sie lange, feste Kleidung und festes Schuhwerk (Vegetation entlang der Strecke)',
  },
  {
    question: 'Gibt es Gutscheine für Draisinenfahrten?',
    answer:
      'Ja, Gutscheine sind erhältlich und 3 Jahre gültig. Fragen Sie bei der Tourist-Info Malente nach.',
  },
];

export const GoodToKnowScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {faqItems.map((item, index) => (
          <AccordionItem key={index} question={item.question} answer={item.answer} />
        ))}
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
