import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomHeader } from '../components/CustomHeader';
import {
  ContactsScreen,
  DraisineInfoScreen,
  GoodToKnowScreen,
  ImprintScreen,
  InfoMenuScreen,
  PrivacyPolicyScreen,
  TripHistoryScreen,
} from '../screens';

export type InfoStackParamList = {
  InfoMenu: undefined;
  DraisineInfo: undefined;
  TripHistory: undefined;
  GoodToKnow: undefined;
  Contacts: undefined;
  Imprint: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<InfoStackParamList>();

export const InfoNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="InfoMenu"
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Stack.Screen name="InfoMenu" component={InfoMenuScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="DraisineInfo"
        component={DraisineInfoScreen}
        options={{ title: 'Erklärungen zur Draisine' }}
      />
      <Stack.Screen
        name="TripHistory"
        component={TripHistoryScreen}
        options={{ title: 'Vergangene Fahrten' }}
      />
      <Stack.Screen
        name="GoodToKnow"
        component={GoodToKnowScreen}
        options={{ title: 'Gut zu wissen' }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Nummern und Adressen' }}
      />
      <Stack.Screen name="Imprint" component={ImprintScreen} options={{ title: 'Impressum' }} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Datenschutzerklärung' }}
      />
    </Stack.Navigator>
  );
};
