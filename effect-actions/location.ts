import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {
  BACKGROUND_LOCATION_TASK,
  MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
  MIN_LOCATION_UPDATE_TIME_INTERVAL,
} from '../constants';

type LocationCallback = (location: Location.LocationObject) => void;

// Modul-Level-Ref: TaskManager.defineTask darf pro JS-Bundle nur einmal aufgerufen werden,
// der Callback muss aber pro Trip-Start austauschbar sein.
let activeBackgroundCallback: LocationCallback | null = null;

if (!TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK)) {
  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }: any) => {
    if (error) {
      console.log(error.message);
      return;
    }
    const location = data?.locations?.[0];
    if (location && activeBackgroundCallback) {
      activeBackgroundCallback(location);
    }
  });
}

export const getCurrentLocation = async () => {
  return await Location.getCurrentPositionAsync({});
};

export const setForegroundLocationListener = async (
  callback: LocationCallback,
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

export interface BackgroundLocationOptions {
  foregroundServiceTitle?: string;
  foregroundServiceBody?: string;
}

export const setBackgroundLocationListener = async (
  callback: LocationCallback,
  options: BackgroundLocationOptions = {},
) => {
  activeBackgroundCallback = callback;

  await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    timeInterval: MIN_LOCATION_UPDATE_TIME_INTERVAL,
    distanceInterval: MIN_LOCATION_UPDATE_DISTANCE_INTERVAL,
    accuracy: Location.LocationAccuracy.BestForNavigation,
    // iOS: System soll Updates während Bewegung nicht automatisch pausieren.
    pausesUpdatesAutomatically: false,
    activityType: Location.ActivityType.OtherNavigation,
    showsBackgroundLocationIndicator: true,
    // Android: Foreground Service hält den Prozess am Leben (Pflicht ab Android 10).
    foregroundService: {
      notificationTitle: options.foregroundServiceTitle ?? 'Trip in progress',
      notificationBody:
        options.foregroundServiceBody ?? 'Recording distance and speed in the background.',
      notificationColor: '#1976D2',
    },
  });
};

export const stopBackgroundLocationListener = async () => {
  activeBackgroundCallback = null;
  const isRunning = await Location.hasStartedLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  if (isRunning) {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  }
};
