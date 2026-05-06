import * as Location from 'expo-location';
import { useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useTranslation } from './useTranslation';
import {
  setForegroundLocationListener,
  setBackgroundLocationListener,
  stopBackgroundLocationListener,
} from '../effect-actions/location';
import { requestBackgroundPermission } from '../effect-actions/permissions';
import { AppAction, AppActionType } from '../redux/app';
import { ReduxAppState } from '../redux/init';

export const useLocationTracking = () => {
  const dispatch = useDispatch<Dispatch<AppActionType>>();
  const permissions = useSelector((state: ReduxAppState) => state.app.permissions);
  const localizedStrings = useTranslation();

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const stopForegroundTracking = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
  }, []);

  const startForegroundTracking = useCallback(
    async (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      // Alte Subscription aufräumen falls vorhanden
      stopForegroundTracking();
      const subscription = await setForegroundLocationListener(onLocationUpdate);
      subscriptionRef.current = subscription;
    },
    [stopForegroundTracking]
  );

  const startBackgroundTracking = useCallback(
    (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      stopForegroundTracking();
      setBackgroundLocationListener(onLocationUpdate);
    },
    [stopForegroundTracking]
  );

  const stopTracking = useCallback(() => {
    stopForegroundTracking();
    stopBackgroundLocationListener();
  }, [stopForegroundTracking]);

  const requestBackgroundAndSwitch = useCallback(
    (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      if (!permissions.background) {
        Alert.alert(
          localizedStrings.t('homeDialogBackgroundPermissionTripTitle'),
          localizedStrings.t('homeDialogBackgroundPermissionMessage'),
          [
            {
              text: localizedStrings.t('alertLater'),
              onPress: () => {
                // Foreground-Tracking weiter nutzen falls Permission abgelehnt
              },
            },
            {
              text: localizedStrings.t('alertOk'),
              onPress: () => {
                requestBackgroundPermission().then((result) => {
                  if (result) {
                    dispatch(AppAction.setPermissions({ background: true }));
                    startBackgroundTracking(onLocationUpdate);
                  }
                });
              },
            },
          ]
        );
      } else {
        startBackgroundTracking(onLocationUpdate);
      }
    },
    [permissions.background, localizedStrings, dispatch, startBackgroundTracking]
  );

  return {
    startForegroundTracking,
    stopTracking,
    startBackgroundTracking,
    requestBackgroundAndSwitch,
  };
};
