import BottomSheet from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from '../consts/color';
import { textStyles } from '../consts/text-styles';
import { useTranslation } from '../hooks';
import { Vehicle } from '../types/vehicle';

interface ExternalProps {
  readonly isVisible: boolean;
  readonly setIsVisible: (visible: boolean) => void;
  readonly title: string;
  readonly subtitle: string;
  readonly vehicles: Vehicle[];
  readonly onVehicleSelected: (vehicle: Vehicle) => void;
  readonly excludeVehicleId?: number | null;
}

type Props = ExternalProps;

export const VehicleSelectionBottomSheet = memo(
  ({
    isVisible,
    setIsVisible,
    title,
    subtitle,
    vehicles,
    onVehicleSelected,
    excludeVehicleId,
  }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['40%', '60%'], []);
    const i18n = useTranslation();

    useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.expand();
      } else {
        bottomSheetRef.current?.close();
      }
    }, [isVisible]);

    const handleVehiclePress = (vehicle: Vehicle) => {
      setIsVisible(false);
      Keyboard.dismiss();
      onVehicleSelected(vehicle);
    };

    const availableVehicles = useMemo(() => {
      const filtered =
        excludeVehicleId != null ? vehicles.filter((v) => v.id !== excludeVehicleId) : vehicles;
      return [...filtered].sort((a, b) => {
        const labelA = a.label ?? `${a.id}`;
        const labelB = b.label ?? `${b.id}`;
        return labelA.localeCompare(labelB, undefined, { numeric: true });
      });
    }, [vehicles, excludeVehicleId]);

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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <ScrollView style={styles.vehicleList} contentContainerStyle={styles.vehicleGrid}>
            {availableVehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={styles.vehicleItem}
                onPress={() => handleVehiclePress(vehicle)}
                accessibilityRole="button"
                accessibilityLabel={i18n.t('a11ySelectVehicle', {
                  name: vehicle.label ?? `Draisine ${vehicle.id}`,
                })}
              >
                <Text style={styles.vehicleLabel}>{vehicle.label ?? `${vehicle.id}`}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  title: {
    ...textStyles.headerTextHuge,
    marginBottom: 8,
  },
  subtitle: {
    color: Color.darkGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  vehicleList: {
    alignSelf: 'stretch',
    flex: 1,
  },
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 8,
  },
  vehicleItem: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: Color.gray,
    minHeight: 48,
    justifyContent: 'center',
  },
  vehicleLabel: {
    ...textStyles.bodyMedium,
    textAlign: 'center',
  },
});
