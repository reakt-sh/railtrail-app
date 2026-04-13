import * as Location from 'expo-location';
import {
  MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
  MIN_LOCATION_UPDATE_TIME_INTERVAL,
} from '../constants';

export const getCurrentLocation = async () => {
  return await Location.getCurrentPositionAsync({});
};

export const setForegroundLocationListener = async (
  callback: (location: Location.LocationObject) => void,
): Promise<Location.LocationSubscription> => {
  const subscription = await Location.watchPositionAsync(
    {
      timeInterval: MIN_LOCATION_UPDATE_TIME_INTERVAL,
      distanceInterval: MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
      accuracy: Location.LocationAccuracy.BestForNavigation,
    },
    callback
  );
  return subscription;
};
