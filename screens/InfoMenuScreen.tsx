import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DraisineIcon } from '../assets/icons';
import AppLogo from '../assets/icons/AppLogo';
import MalenteLogo from '../assets/icons/MalenteLogo';
import { Color, Locale } from '../constants';
import { textStyles } from '../constants/text-styles';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

type InfoStackParamList = {
  InfoMenu: undefined;
  DraisineInfo: undefined;
  TripHistory: undefined;
  GoodToKnow: undefined;
  Contacts: undefined;
  HeinLuettenborg: undefined;
  RailwayHistory: undefined;
  Imprint: undefined;
  PrivacyPolicy: undefined;
};

interface MenuItem {
  titleKey: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  customIcon?: React.ReactNode;
  screen: keyof InfoStackParamList;
}

const menuItems: MenuItem[] = [
  { titleKey: 'infoTitleTripHistory', icon: 'history', screen: 'TripHistory' },
  {
    titleKey: 'infoTitleDraisineInfo',
    customIcon: <DraisineIcon width={24} height={24} color={Color.primary} />,
    screen: 'DraisineInfo',
  },
  { titleKey: 'infoTitleGoodToKnow', icon: 'lightbulb-outline', screen: 'GoodToKnow' },
  { titleKey: 'infoTitleContacts', icon: 'phone', screen: 'Contacts' },
  { titleKey: 'infoTitleHeinLuettenborg', icon: 'chart-line-variant', screen: 'HeinLuettenborg' },
  { titleKey: 'infoTitleRailwayHistory', icon: 'book-clock', screen: 'RailwayHistory' },
  { titleKey: 'infoTitleImprint', icon: 'file-document-outline', screen: 'Imprint' },
  { titleKey: 'infoTitlePrivacyPolicy', icon: 'shield-lock-outline', screen: 'PrivacyPolicy' },
];

export const InfoMenuScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<InfoStackParamList>>();
  const i18n = useTranslation();
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === Locale.de ? Locale.en : Locale.de);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <AppLogo width={'100%'} height={112} />
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <Pressable
              key={item.screen}
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
              onPress={() => navigation.navigate(item.screen)}
              accessibilityRole="button"
              accessibilityLabel={i18n.t(item.titleKey)}
            >
              {item.customIcon ? (
                <View style={styles.menuIcon}>{item.customIcon}</View>
              ) : (
                <MaterialCommunityIcons
                  name={item.icon!}
                  size={24}
                  color={Color.primary}
                  style={styles.menuIcon}
                />
              )}
              <Text style={styles.menuText}>{i18n.t(item.titleKey)}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Color.darkGray} />
            </Pressable>
          ))}
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
              styles.menuItemLast,
            ]}
            onPress={toggleLanguage}
            accessibilityRole="button"
            accessibilityLabel={`${i18n.t('languageLabel')}: ${i18n.t('languageValue')}`}
          >
            <MaterialCommunityIcons
              name="translate"
              size={24}
              color={Color.primary}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>{i18n.t('languageLabel')}</Text>
            <View style={styles.languageToggle}>
              <View
                style={[styles.languageOption, locale === Locale.de && styles.languageOptionActive]}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    locale === Locale.de && styles.languageOptionTextActive,
                  ]}
                >
                  DE
                </Text>
              </View>
              <View
                style={[styles.languageOption, locale === Locale.en && styles.languageOptionActive]}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    locale === Locale.en && styles.languageOptionTextActive,
                  ]}
                >
                  EN
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.supportSection}>
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/logos/Stadtlogo_2022_Luetjenburg.png')}
              style={styles.luetjenburgLogo}
              resizeMode="contain"
            />
            <MalenteLogo width={80} height={64} />
          </View>
          <Text style={textStyles.bodySmall}>{i18n.t('fundedBy')}</Text>
          <Image
            source={require('../assets/logos/support_logo.png')}
            style={styles.supportLogo}
            resizeMode="contain"
          />
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  menuContainer: {
    backgroundColor: Color.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  menuItemPressed: {
    backgroundColor: Color.gray,
  },
  menuItemLast: {
    marginTop: 16,
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    ...textStyles.bodyMedium,
    flex: 1,
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: Color.gray,
    borderRadius: 8,
    padding: 2,
  },
  languageOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  languageOptionActive: {
    backgroundColor: Color.primary,
  },
  languageOptionText: {
    ...textStyles.bodyMedium,
    color: Color.darkGray,
  },
  languageOptionTextActive: {
    color: Color.white,
  },
  supportSection: {
    marginTop: 32,
    paddingVertical: 16,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  luetjenburgLogo: {
    width: 180,
    height: 64,
  },
  supportLogo: {
    width: '90%',
    height: 152,
    alignSelf: 'center',
  },
});
