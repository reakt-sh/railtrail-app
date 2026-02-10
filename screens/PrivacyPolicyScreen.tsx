import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../hooks/useTranslation';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

export const PrivacyPolicyScreen = () => {
  const i18n = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={styles.container}>
        <Text style={textStyles.headerTextHuge}>{i18n.t('privacyPolicyTitle')}</Text>
        <Text style={[textStyles.bodyMedium, styles.placeholder]}>
          {i18n.t('privacyPolicyPlaceholder')}
        </Text>
      </View>
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
    padding: 16,
  },
  placeholder: {
    marginTop: 16,
    color: Color.darkGray,
  },
});
