import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MalenteLogoIcon } from '../assets/icons';
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
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  screen: keyof InfoStackParamList;
}

const menuItems: MenuItem[] = [
  { title: 'Erklärungen zur Draisine', icon: 'train', screen: 'DraisineInfo' },
  { title: 'Vergangene Fahrten', icon: 'history', screen: 'TripHistory' },
  { title: 'Gut zu wissen', icon: 'lightbulb-outline', screen: 'GoodToKnow' },
  { title: 'Nummern und Adressen', icon: 'phone', screen: 'Contacts' },
  { title: 'Impressum', icon: 'file-document-outline', screen: 'Imprint' },
  { title: 'Datenschutzerklärung', icon: 'shield-lock-outline', screen: 'PrivacyPolicy' },
];

export const InfoMenuScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<InfoStackParamList>>();

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
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={Color.primary}
                style={styles.menuIcon}
              />
              <Text style={[textStyles.itemText, styles.menuText]}>{item.title}</Text>
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
    flex: 1,
  },
});
