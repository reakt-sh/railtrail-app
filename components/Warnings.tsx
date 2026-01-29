import { I18n } from 'i18n-js';
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

export const Warnings = ({
  localizedStrings,
  nextLevelCrossingDistance,
  nextVehicleDistance,
  nextVehicleHeadingTowardsUserDistance,
  speed,
}: Props) => {
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
      return VehicleHeadingTowardsUserWarning;
    } else if (nextLevelCrossingDistance <= LEVEL_CROSSING_WARNING_DISTANCE) {
      return LevelCrossingWarning;
    } else return null;
  } else if (
    isMoving &&
    nextVehicleHeadingTowardsUserDistance != null &&
    nextVehicleHeadingTowardsUserDistance <= VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE
  ) {
    return VehicleHeadingTowardsUserWarning;
  } else if (
    nextLevelCrossingDistance != null &&
    nextLevelCrossingDistance <= LEVEL_CROSSING_WARNING_DISTANCE
  ) {
    return LevelCrossingWarning;
  } else if (isMoving && nextVehicleDistance != null && nextVehicleDistance <= VEHICLE_WARNING_DISTANCE) {
    return VehicleWarning;
  } else return null;
};
