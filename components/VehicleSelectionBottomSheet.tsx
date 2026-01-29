import BottomSheet from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Vehicle } from '../types/vehicle';
import { Color } from '../values/color';
import { textStyles } from '../values/text-styles';

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
  ({ isVisible, setIsVisible, title, subtitle, vehicles, onVehicleSelected, excludeVehicleId }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['40%', '60%'], []);

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

    const availableVehicles =
      excludeVehicleId != null ? vehicles.filter((v) => v.id !== excludeVehicleId) : vehicles;

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
          <Text style={[textStyles.headerTextBig, textStyles.textSpacing8]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <ScrollView style={styles.vehicleList}>
            {availableVehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={styles.vehicleItem}
                onPress={() => handleVehiclePress(vehicle)}
              >
                <Text style={styles.vehicleLabel}>{vehicle.label ?? `Draisine ${vehicle.id}`}</Text>
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
  subtitle: {
    color: Color.darkGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  vehicleList: {
    alignSelf: 'stretch',
    flex: 1,
  },
  vehicleItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: Color.gray,
    alignItems: 'center',
  },
  vehicleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.textDark,
  },
});
