import { createDrawerNavigator } from '@react-navigation/drawer';
import { TripDrawerContent } from '../components/TripDrawerContent';
import { MainNavigation } from './MainNavigation';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <TripDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        swipeEnabled: false, // Disable swipe to prevent conflicts with map gestures
        drawerType: 'front',
        drawerStyle: {
          width: '85%',
        },
      }}
    >
      <Drawer.Screen name="MainTabs" component={MainNavigation} />
    </Drawer.Navigator>
  );
};
