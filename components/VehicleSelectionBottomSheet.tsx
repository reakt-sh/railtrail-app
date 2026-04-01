import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { reloadVehicles } from '../effect-actions/api-actions';
import { useTranslation } from '../hooks';
import { SIMULATION_VEHICLE_ID } from '../hooks/useTripSimulation';
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
    const snapPoints = useMemo(() => ['50%', '65%', '85%'], []);
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
      let filtered = vehicles;
      // Optionally exclude the current vehicle (for vehicle change)
      if (excludeVehicleId != null) {
        filtered = filtered.filter((v) => v.id !== excludeVehicleId);
      }
      return [...filtered].sort((a, b) => {
        const labelA = a.label ?? `${a.id}`;
        const labelB = b.label ?? `${b.id}`;
        return labelA.localeCompare(labelB, undefined, { numeric: true });
      });
    }, [vehicles, excludeVehicleId]);

    // Check if there are real vehicles (excluding Demo) for the empty state
    const hasNoRealVehicles =
      availableVehicles.filter((v) => v.id !== SIMULATION_VEHICLE_ID).length === 0;

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
            {hasNoRealVehicles && (
              <View style={styles.reloadContainer}>
                <Text style={styles.reloadHint}>{i18n.t('bottomSheetNoVehicles')}</Text>
                <Pressable style={styles.reloadButton} onPress={reloadVehicles}>
                  <MaterialCommunityIcons name="refresh" size={20} color={Color.white} />
                  <Text style={styles.reloadButtonText}>{i18n.t('bottomSheetReload')}</Text>
                </Pressable>
              </View>
            )}
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
    ...textStyles.bodyMedium,
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
    paddingBottom: 100,
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
  reloadContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 8,
  },
  reloadHint: {
    ...textStyles.bodySmall,
    color: Color.darkGray,
    marginBottom: 12,
    textAlign: 'center',
  },
  reloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  reloadButtonText: {
    ...textStyles.bodyMedium,
    color: Color.white,
    fontWeight: '600',
  },
});
