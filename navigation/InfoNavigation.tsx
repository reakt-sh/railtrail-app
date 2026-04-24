import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AndroidSwipeBack } from '../components/AndroidSwipeBack';
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

const withSwipeBack = (Component: React.ComponentType<any>) => (props: any) => (
  <AndroidSwipeBack onSwipeBack={() => props.navigation.goBack()}>
    <Component {...props} />
  </AndroidSwipeBack>
);

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
        component={withSwipeBack(DraisineInfoScreen)}
        options={{ title: localizedStrings.t('infoTitleDraisineInfo') }}
      />
      <Stack.Screen
        name="TripHistory"
        component={withSwipeBack(TripHistoryScreen)}
        options={{ title: localizedStrings.t('infoTitleTripHistory') }}
      />
      <Stack.Screen
        name="GoodToKnow"
        component={withSwipeBack(GoodToKnowScreen)}
        options={{ title: localizedStrings.t('infoTitleGoodToKnow') }}
      />
      <Stack.Screen
        name="Contacts"
        component={withSwipeBack(ContactsScreen)}
        options={{ title: localizedStrings.t('infoTitleContacts') }}
      />
      <Stack.Screen
        name="RailwayProjects"
        component={withSwipeBack(RailwayProjectsScreen)}
        options={{ title: localizedStrings.t('infoTitleRailwayProjects') }}
      />
      <Stack.Screen
        name="RailwayHistory"
        component={withSwipeBack(RailwayHistoryScreen)}
        options={{ title: localizedStrings.t('infoTitleRailwayHistory') }}
      />
      <Stack.Screen
        name="Imprint"
        component={withSwipeBack(ImprintScreen)}
        options={{ title: localizedStrings.t('infoTitleImprint') }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={withSwipeBack(PrivacyPolicyScreen)}
        options={{ title: localizedStrings.t('infoTitlePrivacyPolicy') }}
      />
    </Stack.Navigator>
  );
};
