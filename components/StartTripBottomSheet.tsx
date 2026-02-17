import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';

interface ExternalProps {
  readonly isVisible: boolean;
  readonly setIsVisible: (visible: boolean) => void;
  readonly onScanQR: () => void;
  readonly onManualEntry: () => void;
}

type Props = ExternalProps;

export const StartTripBottomSheet = memo(
  ({ isVisible, setIsVisible, onScanQR, onManualEntry }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%'], []);
    const i18n = useTranslation();

    useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.expand();
      } else {
        bottomSheetRef.current?.close();
      }
    }, [isVisible]);

    const handleScanQR = () => {
      setIsVisible(false);
      onScanQR();
    };

    const handleManualEntry = () => {
      setIsVisible(false);
      onManualEntry();
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
          <Text style={styles.title}>{i18n.t('homeSnackbarStartTitle')}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleScanQR}
              accessibilityRole="button"
              accessibilityLabel={i18n.t('tripControlsScanDraisine')}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={28} color={Color.primary} />
              <Text style={styles.optionButtonText}>{i18n.t('tripControlsScanDraisine')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleManualEntry}
              accessibilityRole="button"
              accessibilityLabel={i18n.t('tripControlsSelectDraisine')}
            >
              <MaterialCommunityIcons name="format-list-bulleted" size={28} color={Color.primary} />
              <Text style={styles.optionButtonText}>{i18n.t('tripControlsSelectDraisine')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    ...textStyles.headerTextHuge,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.gray,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 16,
  },
  optionButtonText: {
    ...textStyles.bodyMedium,
    fontSize: 16,
    color: Color.black,
  },
});
