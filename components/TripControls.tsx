import { MaterialCommunityIcons } from '@expo/vector-icons';
import { I18n } from 'i18n-js';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../constants/color';
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
  readonly isFollowingVehicle: boolean;
  readonly onLocationButtonClick: () => void;
  readonly onStartTrip: () => void;
  readonly onStopTrip: () => void;
  readonly onCenterOnVehicle: () => void;
  readonly onOpenDrawer?: () => void;
  readonly warnings: WarningsState;
  readonly speed: number;
  readonly localizedStrings: I18n;
}

type Props = ExternalProps;

export const TripControls = memo(
  ({
    isActive,
    isFollowingUser,
    isFollowingVehicle,
    onLocationButtonClick,
    onStartTrip,
    onStopTrip,
    onCenterOnVehicle,
    onOpenDrawer,
    warnings,
    speed,
    localizedStrings,
  }: Props) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={styles.container} pointerEvents="box-none">
        {/* Hamburger button - only visible during active trip */}
        {isActive && onOpenDrawer && (
          <Pressable
            style={[styles.hamburgerButton, { top: insets.top + 16 }]}
            onPress={onOpenDrawer}
            accessibilityRole="button"
            accessibilityLabel={localizedStrings.t('a11yOpenDrawer')}
          >
            <MaterialCommunityIcons name="menu" size={28} color={Color.white} />
          </Pressable>
        )}

        {isActive && (
          <Warnings
            localizedStrings={localizedStrings}
            nextLevelCrossingDistance={warnings.nextLevelCrossing}
            nextVehicleDistance={warnings.nextVehicle}
            nextVehicleHeadingTowardsUserDistance={warnings.nextVehicleHeadingTowards}
            speed={speed}
          />
        )}
        <LocationButton
          onPress={onLocationButtonClick}
          isActive={isFollowingUser}
          accessibilityLabelActive={localizedStrings.t('a11yLocationTrackingActive')}
          accessibilityLabelInactive={localizedStrings.t('a11yShowMyLocation')}
        />
        {isActive && (
          <FAB
            onPress={onCenterOnVehicle}
            accessibilityLabel={localizedStrings.t('a11yCenterOnVehicle')}
          >
            <MaterialCommunityIcons
              name="navigation-variant"
              size={26}
              color={isFollowingVehicle ? Color.primary : Color.black}
            />
          </FAB>
        )}
        {isActive ? (
          <FAB onPress={onStopTrip} accessibilityLabel={localizedStrings.t('a11yStopTrip')}>
            <MaterialCommunityIcons name="stop-circle" size={30} color={Color.warning} />
          </FAB>
        ) : (
          <FAB onPress={onStartTrip} accessibilityLabel={localizedStrings.t('a11yStartTrip')}>
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
  hamburgerButton: {
    position: 'absolute',
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
