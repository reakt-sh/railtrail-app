import { StyleSheet, View, Text, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { textStyles } from '../values/text-styles';
import { Color } from '../values/color';
import { memo, useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { TripAction } from '../redux/trip';
import { useTranslation } from '../hooks';
import { ReduxAppState } from '../redux/init';
import { Vehicle } from '../types/vehicle';

interface ExternalProps {
  readonly isVisible: boolean;
  readonly setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = ExternalProps;

export const StartTripBottomSheet = memo(({ isVisible, setIsVisible }: Props) => {
  const dispatch = useDispatch();
  const localizedStrings = useTranslation();
  const vehicles = useSelector((state: ReduxAppState) => state.trip.vehicles);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables - using static snap points for Reanimated 3 compatibility
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
    dispatch(TripAction.start());
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
        <Text style={styles.subtitle}>
          {vehicles.length > 0
            ? localizedStrings.t('bottomSheetSelectVehicle')
            : localizedStrings.t('bottomSheetNoVehicles')}
        </Text>
        <ScrollView style={styles.vehicleList}>
          {vehicles.map((vehicle) => (
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
