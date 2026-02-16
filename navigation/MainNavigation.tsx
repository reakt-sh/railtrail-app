import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../consts';
import { useTranslation } from '../hooks';
import { HomeScreen } from '../screens';
import { InfoNavigation } from './InfoNavigation';

export const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  const localizedStrings = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === localizedStrings.t('navigationMap')) {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === localizedStrings.t('navigationInfo')) {
            iconName = focused ? 'information' : 'information-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.darkGray,
        tabBarStyle: {
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name={localizedStrings.t('navigationMap')} component={HomeScreen} />
      <Tab.Screen name={localizedStrings.t('navigationInfo')} component={InfoNavigation} />
    </Tab.Navigator>
  );
};
