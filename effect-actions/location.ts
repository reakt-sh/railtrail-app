import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {
  BACKGROUND_LOCATION_TASK,
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

export const setBackgroundLocationListener = (
  callback: (location: Location.LocationObject) => void
) => {
  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }: any) => {
    if (error) {
      console.log(error.message);
      return;
    }
    callback(data.locations[0]);
  });

  Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    timeInterval: MIN_LOCATION_UPDATE_TIME_INTERVAL,
    distanceInterval: MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
    accuracy: Location.LocationAccuracy.BestForNavigation,
  });
};

export const stopBackgroundLocationListener = async () => {
  if (TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK)) {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
    TaskManager.unregisterAllTasksAsync();
  }
};
