import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MalenteLogo from '../assets/icons/MalenteLogo';
import { ContactCard } from '../components/ContactCard';
import { Color, textStyles } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

export const ContactsScreen = () => {
  const i18n = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ContactCard
          title={i18n.t('contactTouristInfoMalente')}
          subtitle={i18n.t('contactTouristInfoSubtitle')}
          address="Bahnhofstraße 3, Malente"
          phone="+49 4523 9842730"
          email="info@tourismus-malente.de"
          logo={<MalenteLogo width={80} height={64} style={styles.malenteLogo} />}
        />

        <ContactCard
          title={i18n.t('contactTouristInfoLuetjenburg')}
          subtitle={i18n.t('contactTouristInfoSubtitle')}
          address="Markt 4, 24321 Lütjenburg"
          phone="+49 4381 - 419941"
          email="tourist-info@stadt-luetjenburg.de"
          logo={
            <Image
              source={require('../assets/logos/Stadtlogo_2022_Luetjenburg.png')}
              style={styles.luetjenburgLogo}
              resizeMode="contain"
            />
          }
        />

        <Text style={styles.serviceHint}>{i18n.t('contactTouristInfoHint')}</Text>
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
  luetjenburgLogo: {
    width: 180,
    height: 48,
  },
  malenteLogo: {
    marginBottom: -32,
  },
  serviceHint: {
    ...textStyles.titleSmall,
    padding: 8,
  },
});
