import { MaterialCommunityIcons } from '@expo/vector-icons';
import { I18n } from 'i18n-js';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '../values/color';
import { FAB } from './Fab';
import { LocationButton } from './LocationButton';
import { Warnings } from './Warnings';

interface WarningsState {
  nextVehicle: number | null;
  nextVehicleHeadingTowards: number | null;
  nextLevelCrossing: number | null;
}

interface ExternalProps {
  readonly isActive: boolean;
  readonly isFollowingUser: boolean;
  readonly onLocationButtonClick: () => void;
  readonly onStartTrip: () => void;
  readonly onStopTrip: () => void;
  readonly onCenterOnVehicle: () => void;
  readonly warnings: WarningsState;
  readonly speed: number;
  readonly localizedStrings: I18n;
}

type Props = ExternalProps;

export const TripControls = memo(
  ({
    isActive,
    isFollowingUser,
    onLocationButtonClick,
    onStartTrip,
    onStopTrip,
    onCenterOnVehicle,
    warnings,
    speed,
    localizedStrings,
  }: Props) => {
    return (
      <View style={styles.container} pointerEvents="box-none">
        {isActive && (
          <Warnings
            localizedStrings={localizedStrings}
            nextLevelCrossingDistance={warnings.nextLevelCrossing}
            nextVehicleDistance={warnings.nextVehicle}
            nextVehicleHeadingTowardsUserDistance={warnings.nextVehicleHeadingTowards}
            speed={speed}
          />
        )}
        <LocationButton onPress={onLocationButtonClick} isActive={isFollowingUser} />
        {isActive && (
          <FAB onPress={onCenterOnVehicle}>
            <MaterialCommunityIcons name="navigation-variant" size={26} color={Color.primary} />
          </FAB>
        )}
        {isActive ? (
          <FAB onPress={onStopTrip}>
            <MaterialCommunityIcons name="stop-circle" size={30} color={Color.warning} />
          </FAB>
        ) : (
          <FAB onPress={onStartTrip}>
            <MaterialCommunityIcons name="play-circle" size={30} color={Color.primary} />
          </FAB>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column-reverse',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
