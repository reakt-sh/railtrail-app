import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../constants';
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
        tabBarIcon: ({ color }) => {
          const icon = route.name === localizedStrings.t('navigationMap') ? '🗺️' : 'ℹ️';
          return <Text style={{ fontSize: 20 }}>{icon}</Text>;
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
