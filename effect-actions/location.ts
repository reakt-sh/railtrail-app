import * as Location from 'expo-location';
import {
  MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
  MIN_LOCATION_UPDATE_TIME_INTERVAL,
} from '../constants';
import { delay } from '../util/calculators';

export const getCurrentLocation = async () => {
  return await Location.getCurrentPositionAsync({});
};

export const setForegroundLocationListener = async (
  callback: (location: Location.LocationObject) => void,
  setSubscription: React.Dispatch<React.SetStateAction<Location.LocationSubscription | null>>
) => {
  await delay(500); // Wait for the map to set initial region
  const subscription = await Location.watchPositionAsync(
    {
      timeInterval: MIN_LOCATION_UPDATE_TIME_INTERVAL,
      distanceInterval: MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
      accuracy: Location.LocationAccuracy.BestForNavigation,
    },
    callback
  );
  setSubscription(subscription);
};

export const stopForegroundLocationListener = (
  subscriptionHandler: Location.LocationSubscription | null
) => {
  if (subscriptionHandler) subscriptionHandler.remove();
};
