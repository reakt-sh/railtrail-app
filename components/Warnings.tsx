import { I18n } from 'i18n-js';
import { useEffect, useRef } from 'react';
import { Snackbar, SnackbarState } from './Snackbar';
import {
  LEVEL_CROSSING_WARNING_DISTANCE,
  VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE,
  VEHICLE_WARNING_DISTANCE,
} from '../util/consts';

interface ExternalProps {
  readonly localizedStrings: I18n;
  readonly nextLevelCrossingDistance: number | null;
  readonly nextVehicleDistance: number | null;
  readonly nextVehicleHeadingTowardsUserDistance: number | null;
  readonly speed: number;
}

type Props = ExternalProps;

const MIN_SPEED_FOR_VEHICLE_WARNING = 10; // km/h

// Signifikante Entfernungsänderung für erneute Warnung (in Metern)
const SIGNIFICANT_DISTANCE_CHANGE = 50;

export const Warnings = ({
  localizedStrings,
  nextLevelCrossingDistance,
  nextVehicleDistance,
  nextVehicleHeadingTowardsUserDistance,
  speed,
}: Props) => {
  // Track letzte Warn-Entfernung pro Warnungstyp
  const lastVehicleWarningDistance = useRef<number | null>(null);
  const lastHeadingWarningDistance = useRef<number | null>(null);
  const lastCrossingWarningDistance = useRef<number | null>(null);

  // Reset wenn außerhalb des Warnbereichs
  useEffect(() => {
    if (nextVehicleDistance == null || nextVehicleDistance > VEHICLE_WARNING_DISTANCE) {
      lastVehicleWarningDistance.current = null;
    }
    if (
      nextVehicleHeadingTowardsUserDistance == null ||
      nextVehicleHeadingTowardsUserDistance > VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE
    ) {
      lastHeadingWarningDistance.current = null;
    }
    if (nextLevelCrossingDistance == null || nextLevelCrossingDistance > LEVEL_CROSSING_WARNING_DISTANCE) {
      lastCrossingWarningDistance.current = null;
    }
  }, [nextVehicleDistance, nextVehicleHeadingTowardsUserDistance, nextLevelCrossingDistance]);

  // Helper: Prüft ob Warnung gezeigt werden soll (Debounce)
  const shouldShowWarning = (
    currentDistance: number,
    lastWarningDistance: React.MutableRefObject<number | null>
  ): boolean => {
    if (lastWarningDistance.current === null) {
      // Erste Warnung für diesen Bereich
      lastWarningDistance.current = currentDistance;
      return true;
    }
    if (lastWarningDistance.current - currentDistance >= SIGNIFICANT_DISTANCE_CHANGE) {
      // Signifikant näher gekommen
      lastWarningDistance.current = currentDistance;
      return true;
    }
    return false;
  };
  const VehicleHeadingTowardsUserWarning = (
    <Snackbar
      title={localizedStrings.t('homeSnackbarWarningTitle')}
      message={localizedStrings.t('homeSnackbarWarningVehicleHeadingTowardsUserMessage', {
        distance: Math.round(nextVehicleHeadingTowardsUserDistance!),
      })}
      state={SnackbarState.WARNING}
    />
  );

  const VehicleWarning = (
    <Snackbar
      title={localizedStrings.t('homeSnackbarWarningTitle')}
      message={localizedStrings.t('homeSnackbarWarningVehicleMessage', {
        distance: Math.round(nextVehicleDistance!),
      })}
      state={SnackbarState.WARNING}
    />
  );

  const LevelCrossingWarning = (
    <Snackbar
      title={localizedStrings.t('homeSnackbarWarningTitle')}
      message={localizedStrings.t('homeSnackbarWarningCrossingMessage', {
        distance: Math.round(nextLevelCrossingDistance!),
      })}
      state={SnackbarState.WARNING}
    />
  );

  const isMoving = speed >= MIN_SPEED_FOR_VEHICLE_WARNING;

  if (nextLevelCrossingDistance != null && nextVehicleHeadingTowardsUserDistance != null) {
    if (
      isMoving &&
      nextVehicleHeadingTowardsUserDistance <= VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE &&
      nextVehicleHeadingTowardsUserDistance <= nextLevelCrossingDistance
    ) {
      if (shouldShowWarning(nextVehicleHeadingTowardsUserDistance, lastHeadingWarningDistance)) {
        return VehicleHeadingTowardsUserWarning;
      }
      return null;
    } else if (nextLevelCrossingDistance <= LEVEL_CROSSING_WARNING_DISTANCE) {
      if (shouldShowWarning(nextLevelCrossingDistance, lastCrossingWarningDistance)) {
        return LevelCrossingWarning;
      }
      return null;
    } else return null;
  } else if (
    isMoving &&
    nextVehicleHeadingTowardsUserDistance != null &&
    nextVehicleHeadingTowardsUserDistance <= VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE
  ) {
    if (shouldShowWarning(nextVehicleHeadingTowardsUserDistance, lastHeadingWarningDistance)) {
      return VehicleHeadingTowardsUserWarning;
    }
    return null;
  } else if (
    nextLevelCrossingDistance != null &&
    nextLevelCrossingDistance <= LEVEL_CROSSING_WARNING_DISTANCE
  ) {
    if (shouldShowWarning(nextLevelCrossingDistance, lastCrossingWarningDistance)) {
      return LevelCrossingWarning;
    }
    return null;
  } else if (isMoving && nextVehicleDistance != null && nextVehicleDistance <= VEHICLE_WARNING_DISTANCE) {
    if (shouldShowWarning(nextVehicleDistance, lastVehicleWarningDistance)) {
      return VehicleWarning;
    }
    return null;
  } else return null;
};
