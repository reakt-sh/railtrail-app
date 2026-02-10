import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DraisineIcon, MalenteLogoIcon } from '../assets/icons';
import { useTranslation } from '../hooks/useTranslation';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

type InfoStackParamList = {
  InfoMenu: undefined;
  DraisineInfo: undefined;
  TripHistory: undefined;
  GoodToKnow: undefined;
  Contacts: undefined;
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
  {
    titleKey: 'infoTitleDraisineInfo',
    customIcon: <DraisineIcon width={24} height={24} color={Color.primary} />,
    screen: 'DraisineInfo',
  },
  { titleKey: 'infoTitleTripHistory', icon: 'history', screen: 'TripHistory' },
  { titleKey: 'infoTitleGoodToKnow', icon: 'lightbulb-outline', screen: 'GoodToKnow' },
  { titleKey: 'infoTitleContacts', icon: 'phone', screen: 'Contacts' },
  { titleKey: 'infoTitleImprint', icon: 'file-document-outline', screen: 'Imprint' },
  { titleKey: 'infoTitlePrivacyPolicy', icon: 'shield-lock-outline', screen: 'PrivacyPolicy' },
];

export const InfoMenuScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<InfoStackParamList>>();
  const i18n = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <MalenteLogoIcon width={180} height={156} />
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.screen}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
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
    paddingVertical: 32,
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
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    ...textStyles.bodyMedium,
    flex: 1,
  },
});
