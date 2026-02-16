import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccordionItem } from '../components/AccordionItem';
import { Color } from '../consts';
import { useTranslation } from '../hooks/useTranslation';

const faqKeys = [
  { questionKey: 'faqDepartureTimes', answerKey: 'faqDepartureTimesAnswer' },
  { questionKey: 'faqPassengers', answerKey: 'faqPassengersAnswer' },
  { questionKey: 'faqPrice', answerKey: 'faqPriceAnswer' },
  { questionKey: 'faqHowItWorks', answerKey: 'faqHowItWorksAnswer' },
  { questionKey: 'faqRules', answerKey: 'faqRulesAnswer' },
  { questionKey: 'faqVouchers', answerKey: 'faqVouchersAnswer' },
];

export const GoodToKnowScreen = () => {
  const i18n = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {faqKeys.map((item, index) => (
          <AccordionItem
            key={index}
            question={i18n.t(item.questionKey)}
            answer={i18n.t(item.answerKey)}
          />
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
