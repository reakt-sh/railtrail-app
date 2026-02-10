import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../hooks/useTranslation';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

const sectionKeys = [
  { titleKey: 'privacySection1Title', contentKey: 'privacySection1Content' },
  { titleKey: 'privacySection2Title', contentKey: 'privacySection2Content' },
  { titleKey: 'privacySection3Title', contentKey: 'privacySection3Content' },
  { titleKey: 'privacySection4Title', contentKey: 'privacySection4Content' },
  { titleKey: 'privacySection5Title', contentKey: 'privacySection5Content' },
  { titleKey: 'privacySection6Title', contentKey: 'privacySection6Content' },
  { titleKey: 'privacySection7Title', contentKey: 'privacySection7Content' },
  { titleKey: 'privacySection8Title', contentKey: 'privacySection8Content' },
  { titleKey: 'privacySection9Title', contentKey: 'privacySection9Content' },
  { titleKey: 'privacySection10Title', contentKey: 'privacySection10Content' },
  { titleKey: 'privacySection11Title', contentKey: 'privacySection11Content' },
  { titleKey: 'privacySection12Title', contentKey: 'privacySection12Content' },
];

type SectionProps = {
  title: string;
  content: string;
};

const Section = ({ title, content }: SectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

export const PrivacyPolicyScreen = () => {
  const i18n = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t('privacyPolicyTitle')}</Text>
        <Text style={styles.subtitle}>{i18n.t('privacyPolicySubtitle')}</Text>

        {sectionKeys.map((item, index) => (
          <Section
            key={index}
            title={i18n.t(item.titleKey)}
            content={i18n.t(item.contentKey)}
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
  title: {
    ...textStyles.headerTextHuge,
    marginBottom: 4,
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: Color.darkGray,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...textStyles.headerTextMedium,
    marginBottom: 8,
  },
  sectionContent: {
    ...textStyles.bodyMedium,
    lineHeight: 22,
  },
});
