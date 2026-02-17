import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';
import { Vehicle } from '../types/vehicle';

interface ExternalProps {
  readonly isVisible: boolean;
  readonly setIsVisible: (visible: boolean) => void;
  readonly vehicles: Vehicle[];
  readonly onVehicleSelected: (vehicle: Vehicle) => void;
  readonly onManualEntryPress: () => void;
}

type Props = ExternalProps;

export const QRScannerBottomSheet = memo(
  ({ isVisible, setIsVisible, vehicles, onVehicleSelected, onManualEntryPress }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['70%'], []);
    const localizedStrings = useTranslation();

    const [permission, requestPermission] = useCameraPermissions();
    const [isTorchOn, setIsTorchOn] = useState(false);
    const [hasScanned, setHasScanned] = useState(false);

    useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.expand();
        setHasScanned(false);
      } else {
        bottomSheetRef.current?.close();
        setIsTorchOn(false);
      }
    }, [isVisible]);

    const handleBarCodeScanned = useCallback(
      ({ data }: { data: string }) => {
        if (hasScanned) return;

        // QR code contains just the vehicle number (e.g., "42")
        const scannedLabel = data.trim();
        const matchedVehicle = vehicles.find(
          (v) => v.label === scannedLabel || v.label === `${scannedLabel}` || `${v.id}` === scannedLabel
        );

        if (matchedVehicle) {
          setHasScanned(true);
          setIsVisible(false);
          onVehicleSelected(matchedVehicle);
        }
      },
      [vehicles, onVehicleSelected, setIsVisible, hasScanned]
    );

    const handleManualEntry = useCallback(() => {
      setIsVisible(false);
      onManualEntryPress();
    }, [setIsVisible, onManualEntryPress]);

    const handleRequestPermission = useCallback(async () => {
      await requestPermission();
    }, [requestPermission]);

    const renderCameraContent = () => {
      if (!permission) {
        return (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>{localizedStrings.t('qrScannerLoadingCamera')}</Text>
          </View>
        );
      }

      if (!permission.granted) {
        return (
          <View style={styles.permissionContainer}>
            <MaterialCommunityIcons name="camera-off" size={48} color={Color.darkGray} />
            <Text style={styles.permissionText}>{localizedStrings.t('qrScannerPermissionRequired')}</Text>
            <Pressable style={styles.permissionButton} onPress={handleRequestPermission}>
              <Text style={styles.permissionButtonText}>{localizedStrings.t('qrScannerGrantPermission')}</Text>
            </Pressable>
          </View>
        );
      }

      return (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            enableTorch={isTorchOn}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={hasScanned ? undefined : handleBarCodeScanned}
          />
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
          </View>
          <Pressable
            style={styles.torchButton}
            onPress={() => setIsTorchOn(!isTorchOn)}
            accessibilityLabel={isTorchOn ? 'Turn off flashlight' : 'Turn on flashlight'}
          >
            <MaterialCommunityIcons
              name={isTorchOn ? 'flashlight' : 'flashlight-off'}
              size={24}
              color={Color.white}
            />
          </Pressable>
        </View>
      );
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
          <Text style={styles.title}>{localizedStrings.t('qrScannerTitle')}</Text>
          <Text style={styles.subtitle}>{localizedStrings.t('qrScannerSubtitle')}</Text>

          {renderCameraContent()}

          <Pressable style={styles.manualEntryButton} onPress={handleManualEntry}>
            <MaterialCommunityIcons name="format-list-numbered" size={20} color={Color.primary} />
            <Text style={styles.manualEntryText}>{localizedStrings.t('qrScannerManualEntry')}</Text>
          </Pressable>
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
    marginBottom: 4,
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: Color.darkGray,
    marginBottom: 16,
    textAlign: 'center',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Color.black,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: Color.white,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  torchButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: Color.gray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    ...textStyles.bodyMedium,
    color: Color.darkGray,
    textAlign: 'center',
    marginTop: 16,
  },
  permissionButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Color.primary,
    borderRadius: 8,
  },
  permissionButtonText: {
    ...textStyles.bodyMedium,
    color: Color.white,
  },
  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  manualEntryText: {
    ...textStyles.bodyMedium,
    color: Color.primary,
    marginLeft: 8,
  },
});
