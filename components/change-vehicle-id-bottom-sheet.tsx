import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { retrieveVehicleId } from '../effect-actions/api-actions';
import { useTranslation } from '../hooks/use-translation';
import { TripAction } from '../redux/trip';
import { Color } from '../values/color';
import { textStyles } from '../values/text-styles';
import { Button } from './button';

interface ExternalProps {
  readonly isVisible: boolean;
  readonly setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  readonly trackId: number | null;
}

type Props = ExternalProps;

export const ChangeVehicleIdBottomSheet = memo(({ isVisible, setIsVisible, trackId }: Props) => {
  const dispatch = useDispatch();
  const localizedStrings = useTranslation();

  const [text, onChangeText] = useState('');

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables - using static snap points for Reanimated 3 compatibility
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const onButtonPress = async () => {
    retrieveVehicleId(text, trackId!).then((response) => {
      if (response == null) {
        Alert.alert(
          localizedStrings.t('bottomSheetAlertVehicleIdNotFoundTitle'),
          localizedStrings.t('bottomSheetAlertVehicleIdNotFoundMessage'),
          [{ text: localizedStrings.t('alertOk'), onPress: () => {} }]
        );
      } else {
        setIsVisible(false);
        Keyboard.dismiss();
        dispatch(TripAction.setCurrentVehicle(response, text));
        onChangeText('');
      }
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      onClose={() => setIsVisible(false)}
    >
      <View style={styles.contentContainer}>
        <Text style={[textStyles.headerTextBig, textStyles.textSpacing10]}>
          {localizedStrings.t('bottomSheetVehicleId')}
        </Text>
        <Text>{localizedStrings.t('bottomSheetChangeVehicleId')}</Text>
        <BottomSheetTextInput
          placeholder={localizedStrings.t('bottomSheetVehicleId')}
          value={text}
          autoCapitalize="none"
          onChangeText={onChangeText}
          style={styles.textInput}
        />
        <Button
          text={localizedStrings.t('buttonContinue')}
          onPress={onButtonPress}
          style={styles.buttonMargin}
        />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.gray,
    textAlign: 'center',
  },
  buttonMargin: { marginBottom: 8 },
});
