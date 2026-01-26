import BottomSheet from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from '../hooks/use-translation';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { Vehicle } from '../types/vehicle';
import { Color } from '../values/color';
import { textStyles } from '../values/text-styles';

interface ExternalProps {
  readonly isVisible: boolean;
  readonly setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  readonly trackId: number | null;
}

type Props = ExternalProps;

export const ChangeVehicleIdBottomSheet = memo(({ isVisible, setIsVisible }: Props) => {
  const dispatch = useDispatch();
  const localizedStrings = useTranslation();
  const vehicles = useSelector((state: ReduxAppState) => state.trip.vehicles);
  const currentVehicleId = useSelector((state: ReduxAppState) => state.trip.currentVehicle.id);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '60%'], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const onVehicleSelected = (vehicle: Vehicle) => {
    setIsVisible(false);
    Keyboard.dismiss();
    dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicle.label ?? `Draisine ${vehicle.id}`));
  };

  // Filter out current vehicle from selection
  const availableVehicles = vehicles.filter((v) => v.id !== currentVehicleId);

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
        <Text style={styles.subtitle}>{localizedStrings.t('bottomSheetChangeVehicleId')}</Text>
        <ScrollView style={styles.vehicleList}>
          {availableVehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={styles.vehicleItem}
              onPress={() => onVehicleSelected(vehicle)}
            >
              <Text style={styles.vehicleLabel}>
                {vehicle.label ?? `Draisine ${vehicle.id}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  subtitle: {
    color: Color.darkGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  vehicleList: {
    alignSelf: 'stretch',
    flex: 1,
  },
  vehicleItem: {
    padding: 15,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: Color.gray,
    alignItems: 'center',
  },
  vehicleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.textDark,
  },
});
