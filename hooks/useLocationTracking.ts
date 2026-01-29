import * as Location from 'expo-location';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBackgroundLocationListener,
  setForegroundLocationListener,
  stopBackgroundLocationListener,
  stopForegroundLocationListener,
} from '../effect-actions/location';
import { requestBackgroundPermission } from '../effect-actions/permissions';
import { AppAction } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { useTranslation } from './useTranslation';

interface UseLocationTrackingReturn {
  locationSubscription: Location.LocationSubscription | null;
  startForegroundTracking: (onLocationUpdate: (loc: Location.LocationObject) => void) => void;
  startBackgroundTracking: (onLocationUpdate: (loc: Location.LocationObject) => void) => void;
  stopTracking: () => void;
  requestBackgroundAndSwitch: (onLocationUpdate: (loc: Location.LocationObject) => void) => void;
}

export const useLocationTracking = (): UseLocationTrackingReturn => {
  const dispatch = useDispatch();
  const localizedStrings = useTranslation();
  const permissions = useSelector((state: ReduxAppState) => state.app.permissions);

  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);

  const startForegroundTracking = useCallback(
    (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      setForegroundLocationListener(onLocationUpdate, setLocationSubscription);
    },
    []
  );

  const startBackgroundTracking = useCallback(
    (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      stopForegroundLocationListener(locationSubscription);
      setBackgroundLocationListener(onLocationUpdate);
    },
    [locationSubscription]
  );

  const stopTracking = useCallback(() => {
    if (permissions.background) {
      stopBackgroundLocationListener();
    }
    stopForegroundLocationListener(locationSubscription);
  }, [permissions.background, locationSubscription]);

  const requestBackgroundAndSwitch = useCallback(
    (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      if (!permissions.background) {
        Alert.alert(
          localizedStrings.t('homeDialogBackgroundPermissionTripTitle'),
          localizedStrings.t('homeDialogBackgroundPermissionMessage'),
          [
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
    locationSubscription,
    startForegroundTracking,
    startBackgroundTracking,
    stopTracking,
    requestBackgroundAndSwitch,
  };
};
