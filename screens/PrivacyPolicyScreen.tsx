import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, privacySections } from '../constants';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks/useTranslation';

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

        {privacySections.map((item, index) => (
          <Section key={index} title={i18n.t(item.titleKey)} content={i18n.t(item.contentKey)} />
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
