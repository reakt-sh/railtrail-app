import { CommonActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Button, Checkbox } from '../components';
import {
  getForegroundPermissionStatus,
  requestForegroundPermission,
} from '../effect-actions/permissions';
import { useTranslation } from '../hooks';
import { AppAction } from '../redux/app';
import { Color } from '../values/color';
import { textStyles } from '../values/text-styles';

export const LandingPageScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const localizedStrings = useTranslation();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.textContainer}>
        <Text
          style={[
            textStyles.headerTextHuge,
            textStyles.textAlignmentCenter,
            textStyles.textSpacing20,
          ]}
        >
          {localizedStrings.t('landingPageWelcome')}
        </Text>
        <Text style={[textStyles.textSpacing20, textStyles.textAlignmentCenter]}>
          {localizedStrings.t('landingPageDescription')}
        </Text>
        <Text style={textStyles.textAlignmentCenter}>
          {localizedStrings.t('landingPagePermissionExplanation')}
        </Text>
      </SafeAreaView>
      <Checkbox
        isChecked={isCheckboxChecked}
        setIsChecked={setIsCheckboxChecked}
        style={styles.buttonMargin}
      >
        <Text>{localizedStrings.t('landingPagePrivacyPolicy')}</Text>
      </Checkbox>
      <Button
        text={localizedStrings.t('landingPageButtonWithoutLocation')}
        onPress={() => {
          navigation.navigate('Track Selection');
        }}
        isSecondary
        disabled={!isCheckboxChecked}
        style={styles.buttonMargin}
      />
      <Button
        text={localizedStrings.t('landingPageButtonWithLocation')}
        onPress={() => {
          requestForegroundPermission().then((result) => {
            if (result) {
              dispatch(AppAction.setPermissions({ foreground: true }));

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Main' }],
                })
              );
            } else {
              navigation.navigate('Track Selection');
            }
          });
        }}
        disabled={!isCheckboxChecked}
        style={styles.buttonMargin}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundLight,
    padding: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonMargin: { marginBottom: 10 },
});
