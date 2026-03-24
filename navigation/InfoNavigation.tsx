import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomHeader } from '../components/CustomHeader';
import { useTranslation } from '../hooks';
import {
  ContactsScreen,
  DraisineInfoScreen,
  GoodToKnowScreen,
  ImprintScreen,
  InfoMenuScreen,
  PrivacyPolicyScreen,
  RailwayHistoryScreen,
  RailwayProjectsScreen,
  TripHistoryScreen,
} from '../screens';

export type InfoStackParamList = {
  InfoMenu: undefined;
  DraisineInfo: undefined;
  TripHistory: undefined;
  GoodToKnow: undefined;
  Contacts: undefined;
  RailwayProjects: undefined;
  RailwayHistory: undefined;
  Imprint: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<InfoStackParamList>();

export const InfoNavigation = () => {
  const localizedStrings = useTranslation();

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
        options={{ title: localizedStrings.t('infoTitleDraisineInfo') }}
      />
      <Stack.Screen
        name="TripHistory"
        component={TripHistoryScreen}
        options={{ title: localizedStrings.t('infoTitleTripHistory') }}
      />
      <Stack.Screen
        name="GoodToKnow"
        component={GoodToKnowScreen}
        options={{ title: localizedStrings.t('infoTitleGoodToKnow') }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: localizedStrings.t('infoTitleContacts') }}
      />
      <Stack.Screen
        name="RailwayProjects"
        component={RailwayProjectsScreen}
        options={{ title: localizedStrings.t('infoTitleProjects') }}
      />
      <Stack.Screen
        name="RailwayHistory"
        component={RailwayHistoryScreen}
        options={{ title: localizedStrings.t('infoTitleRailwayHistory') }}
      />
      <Stack.Screen
        name="Imprint"
        component={ImprintScreen}
        options={{ title: localizedStrings.t('infoTitleImprint') }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: localizedStrings.t('infoTitlePrivacyPolicy') }}
      />
    </Stack.Navigator>
  );
};
