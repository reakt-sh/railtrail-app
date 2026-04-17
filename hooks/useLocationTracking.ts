import * as Location from 'expo-location';
import { useCallback, useRef } from 'react';
import { setForegroundLocationListener } from '../effect-actions/location';

export const useLocationTracking = () => {
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const startForegroundTracking = useCallback(
    async (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      // Alte Subscription aufräumen falls vorhanden
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      const subscription = await setForegroundLocationListener(onLocationUpdate);
      subscriptionRef.current = subscription;
    },
    []
  );

  const stopTracking = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
  }, []);

  return { startForegroundTracking, stopTracking };
};
