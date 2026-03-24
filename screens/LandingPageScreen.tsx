import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import AppLogo from '../assets/icons/AppLogo';
import { Checkbox } from '../components';
import { InversedButton } from '../components/InversedButton';
import { privacySections, StorageKeys } from '../constants';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import {
  getForegroundPermissionStatus,
  requestForegroundPermission,
} from '../effect-actions/permissions';
import { useTranslation } from '../hooks';
import { AppAction, AppActionType } from '../redux/app';

export const LandingPageScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<Dispatch<AppActionType>>();
  const localizedStrings = useTranslation();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);

  useEffect(() => {
    const checkInitialState = async () => {
      const [isPermissionGranted, privacyAccepted] = await Promise.all([
        getForegroundPermissionStatus(),
        AsyncStorage.getItem(StorageKeys.PRIVACY_ACCEPTED),
      ]);

      if (isPermissionGranted) {
        dispatch(AppAction.setPermissions({ foreground: true }));
      }

      // Skip landing page if both privacy accepted and permission granted
      if (privacyAccepted === 'true' && isPermissionGranted) {
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'Main' }],
        //   })
        // );
      }
    };

    checkInitialState();
  }, []);

  const continueWithLocation = async () => {
    // Save privacy policy acceptance
    await AsyncStorage.setItem(StorageKeys.PRIVACY_ACCEPTED, 'true');

    const result = await requestForegroundPermission();
    if (result) {
      dispatch(AppAction.setPermissions({ foreground: true }));
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <AppLogo width={'100%'} height={112} />
        <View style={styles.textWrapper}>
          <Text style={[textStyles.headerTextHuge, styles.text]}>
            {localizedStrings.t('landingPageWelcome')}
          </Text>
          <Text style={[textStyles.bodyMedium, styles.text]}>
            {localizedStrings.t('landingPageDescription')}
          </Text>
          <Text style={[textStyles.bodyMedium, styles.text]}>
            {localizedStrings.t('landingPagePermissionExplanation')}
          </Text>
        </View>
      </SafeAreaView>
      <Checkbox
        isChecked={isCheckboxChecked}
        setIsChecked={setIsCheckboxChecked}
        color={Color.white}
        style={styles.buttonMargin}
      >
        <Text style={[textStyles.bodyMedium, styles.white]}>
          {localizedStrings.t('landingPagePrivacyPolicyPrefix')}
          <Text
            style={[textStyles.link, styles.white]}
            onPress={() => setIsPrivacyModalVisible(true)}
          >
            {localizedStrings.t('landingPagePrivacyPolicyLink')}
          </Text>
          {localizedStrings.t('landingPagePrivacyPolicySuffix')}
        </Text>
      </Checkbox>

      <InversedButton
        text={localizedStrings.t('landingPageButtonWithLocation')}
        onPress={continueWithLocation}
        disabled={!isCheckboxChecked}
        style={styles.buttonMargin}
      />
      <Modal
        visible={isPrivacyModalVisible}
        animationType="slide"
        onRequestClose={() => setIsPrivacyModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{localizedStrings.t('privacyPolicyTitle')}</Text>
            <Pressable
              onPress={() => setIsPrivacyModalVisible(false)}
              style={styles.closeButton}
              hitSlop={8}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.modalContentContainer}
          >
            <Text style={styles.modalSubtitle}>{localizedStrings.t('privacyPolicySubtitle')}</Text>
            {privacySections.map((item, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{localizedStrings.t(item.titleKey)}</Text>
                <Text style={styles.sectionContent}>{localizedStrings.t(item.contentKey)}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,

    padding: 24,
  },
  safeArea: {
    flex: 1,
  },
  textWrapper: {
    marginTop: 32,
    marginBottom: 64,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Color.white,
    minHeight: 200,
  },
  text: { marginBottom: 24 },
  buttonMargin: { marginBottom: 24, marginTop: 16 },
  modalContainer: {
    flex: 1,
    marginTop: 64,
    backgroundColor: Color.backgroundLight,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.outline,
  },
  modalTitle: {
    ...textStyles.headerTextHuge,
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: Color.darkGray,
  },
  modalContent: {
    flex: 1,
  },
  modalContentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  modalSubtitle: {
    ...textStyles.bodyMedium,
    color: Color.white,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...textStyles.headerTextMedium,
    marginBottom: 8,
  },
  sectionContent: {
    ...textStyles.bodyMedium,
    lineHeight: 22,
  },
  white: { color: Color.white },
});
