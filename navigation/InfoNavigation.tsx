import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  InfoMenuScreen,
  DraisineInfoScreen,
  TripHistoryScreen,
  GoodToKnowScreen,
  ContactsScreen,
  ImprintScreen,
  PrivacyPolicyScreen,
} from '../screens';
import { Color } from '../values';

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

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons name="arrow-left" size={24} color={Color.primary} />
    </Pressable>
  );
};

export const InfoNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="InfoMenu"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Color.backgroundLight,
        },
        headerTintColor: Color.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen
        name="InfoMenu"
        component={InfoMenuScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="Imprint"
        component={ImprintScreen}
        options={{ title: 'Impressum' }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Datenschutzerklärung' }}
      />
    </Stack.Navigator>
  );
};
