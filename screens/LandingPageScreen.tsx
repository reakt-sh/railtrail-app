import { CommonActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { MalenteLogoIcon } from '../assets/icons';
import { Button, Checkbox } from '../components';
import { privacySections } from '../consts';
import { Color } from '../consts/color';
import { textStyles } from '../consts/text-styles';
import {
  getForegroundPermissionStatus,
  requestForegroundPermission,
} from '../effect-actions/permissions';
import { useTranslation } from '../hooks';
import { AppAction } from '../redux/app';

export const LandingPageScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const localizedStrings = useTranslation();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);

  useEffect(() => {
    getForegroundPermissionStatus().then((isPermissionGrated) => {
      if (isPermissionGrated) {
        dispatch(AppAction.setPermissions({ foreground: true }));

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        );
      }
    });
  }, []);

  const continueWithLocation = () => {
    requestForegroundPermission().then((result) => {
      if (result) {
        dispatch(AppAction.setPermissions({ foreground: true }));
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.textContainer}>
        <View style={styles.logoContainer}>
          <MalenteLogoIcon width={120} height={104} />
        </View>
        <Text style={[textStyles.headerTextHuge, { textAlign: 'center', marginBottom: 24 }]}>
          {localizedStrings.t('landingPageWelcome')}
        </Text>
        <Text style={{ textAlign: 'center', marginBottom: 24 }}>
          {localizedStrings.t('landingPageDescription')}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          {localizedStrings.t('landingPagePermissionExplanation')}
        </Text>
      </SafeAreaView>
      <Checkbox
        isChecked={isCheckboxChecked}
        setIsChecked={setIsCheckboxChecked}
        style={styles.buttonMargin}
      >
        <Text>
          {localizedStrings.t('landingPagePrivacyPolicyPrefix')}
          <Text style={styles.link} onPress={() => setIsPrivacyModalVisible(true)}>
            {localizedStrings.t('landingPagePrivacyPolicyLink')}
          </Text>
          {localizedStrings.t('landingPagePrivacyPolicySuffix')}
        </Text>
      </Checkbox>
      <Button
        text={localizedStrings.t('landingPageButtonWithoutLocation')}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            })
          );
        }}
        isSecondary
        disabled={!isCheckboxChecked}
        style={styles.buttonMargin}
      />
      <Button
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
    backgroundColor: Color.backgroundLight,
    padding: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonMargin: { marginBottom: 8 },
  link: {
    color: Color.primary,
    textDecorationLine: 'underline',
  },
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
    color: Color.darkGray,
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
});
