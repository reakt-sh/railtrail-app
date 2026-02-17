import { MaterialCommunityIcons } from '@expo/vector-icons';
import { I18n } from 'i18n-js';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        {isActive ? (
          <>
            <LocationButton
              onPress={onLocationButtonClick}
              isActive={isFollowingUser}
              accessibilityLabelActive={localizedStrings.t('a11yLocationTrackingActive')}
              accessibilityLabelInactive={localizedStrings.t('a11yShowMyLocation')}
            />
            <FAB
              onPress={onCenterOnVehicle}
              accessibilityLabel={localizedStrings.t('a11yCenterOnVehicle')}
            >
              <MaterialCommunityIcons
                name={isFollowingVehicle ? 'navigation-variant' : 'navigation-variant-outline'}
                size={32}
                color={isFollowingVehicle ? Color.primary : Color.black}
              />
            </FAB>
            <FAB onPress={onStopTrip} accessibilityLabel={localizedStrings.t('a11yStopTrip')}>
              <MaterialCommunityIcons name="stop-circle" size={32} color={Color.warning} />
            </FAB>
          </>
        ) : (
          <View style={styles.startTripRow}>
            <Pressable
              style={styles.startTripButton}
              onPress={onStartTrip}
              accessibilityRole="button"
              accessibilityLabel={localizedStrings.t('a11yStartTrip')}
            >
              <MaterialCommunityIcons name="play" size={24} color={Color.primary} />
              <Text style={styles.startTripButtonText}>
                {localizedStrings.t('homeSnackbarStartTitle')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.locationFab}
              onPress={onLocationButtonClick}
              accessibilityRole="button"
              accessibilityLabel={
                isFollowingUser
                  ? localizedStrings.t('a11yLocationTrackingActive')
                  : localizedStrings.t('a11yShowMyLocation')
              }
            >
              <MaterialCommunityIcons
                name={isFollowingUser ? 'crosshairs-gps' : 'crosshairs'}
                size={32}
                color={isFollowingUser ? Color.primary : Color.black}
              />
            </Pressable>
          </View>
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
  startTripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
    gap: 8,
  },
  startTripButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  startTripButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.primary,
  },
  locationFab: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: Color.white,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
