import * as Location from 'expo-location';
import { useCallback, useState } from 'react';
import {
  setForegroundLocationListener,
  stopForegroundLocationListener,
} from '../effect-actions/location';

interface UseLocationTrackingReturn {
  locationSubscription: Location.LocationSubscription | null;
  startForegroundTracking: (onLocationUpdate: (loc: Location.LocationObject) => void) => void;
  stopTracking: () => void;
}

export const useLocationTracking = (): UseLocationTrackingReturn => {
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);

  const startForegroundTracking = useCallback(
    (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      setForegroundLocationListener(onLocationUpdate, setLocationSubscription);
    },
    []
  );

  const stopTracking = useCallback(() => {
    stopForegroundLocationListener(locationSubscription);
  }, [locationSubscription]);

  return {
    locationSubscription,
    startForegroundTracking,
    stopTracking,
  };
};
