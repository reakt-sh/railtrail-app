import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingPageScreen } from '../screens';
import { MainNavigation } from './MainNavigation';

export const RootNavigation = () => {
  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('white');
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing Page"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Main" component={MainNavigation} />
        <Stack.Screen name="Landing Page" component={LandingPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
