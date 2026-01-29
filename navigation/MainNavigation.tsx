import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from '../hooks';
import { HomeScreen, InfoScreen } from '../screens';
import { Color } from '../values';

export const MainNavigation = () => {
  const Tab = createBottomTabNavigator();
  const localizedStrings = useTranslation();

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
      })}
    >
      <Tab.Screen name={localizedStrings.t('navigationMap')} component={HomeScreen} />
      <Tab.Screen name={localizedStrings.t('navigationInfo')} component={InfoScreen} />
    </Tab.Navigator>
  );
};
