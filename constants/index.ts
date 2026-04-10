export { BACKEND_TIMEOUT, feedbackUrl, positioningWsUrl } from './api';
export { Locale } from './locale';
export { Color } from './color';
export { Font } from './fonts';
export {
  MAX_GPS_ACCURACY,
  MIN_DISTANCE_JITTER_FILTER,
  MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
  MIN_LOCATION_UPDATE_TIME_INTERVAL,
  SPEED_SMOOTHING_ALPHA,
  STILLSTAND_THRESHOLD_KMH,
  GPS_SPEED_RESET_TIMEOUT_MS,
} from './location';
export { initialRegion, mapStyleUrl } from './map';
export { privacySections } from './privacy';
export const SIMULATION_VEHICLE_ID = -1;
export const LOCAL_VEHICLE_ID = -2;
export { StorageKeys } from './storage-keys';
export { textStyles } from './text-styles';
export { translations } from './translations';
export {
  LEVEL_CROSSING_WARNING_DISTANCE,
  VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE,
  VEHICLE_WARNING_DISTANCE,
  warningDistance,
} from './warnings';
