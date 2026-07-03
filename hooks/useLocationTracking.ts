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
      try {
        const subscription = await setForegroundLocationListener(onLocationUpdate);
        subscriptionRef.current = subscription;
      } catch (e) {
        // Schlägt fehl, wenn der Nutzer den "Standort aktivieren?"-Dialog ablehnt
        if (__DEV__) console.log('[Tracking] Foreground-Start fehlgeschlagen:', e);
      }
    },
    [stopForegroundTracking]
  );

  const showLocationServicesDisabledWarning = useCallback(() => {
    Alert.alert(
      localizedStrings.t('homeDialogLocationServicesDisabledTitle'),
      localizedStrings.t('homeDialogLocationServicesDisabledMessage'),
      [{ text: localizedStrings.t('alertOk') }]
    );
  }, [localizedStrings]);

  const startBackgroundTracking = useCallback(
    async (onLocationUpdate: (loc: Location.LocationObject) => void) => {
      stopForegroundTracking();
      try {
        await setBackgroundLocationListener(onLocationUpdate, {
          foregroundServiceTitle: localizedStrings.t('backgroundServiceNotificationTitle'),
          foregroundServiceBody: localizedStrings.t('backgroundServiceNotificationBody'),
        });
      } catch (e) {
        // Schlägt u. a. fehl, wenn der Nutzer den "Standort aktivieren?"-Dialog ablehnt.
        // Der Trip läuft dann ohne GPS-Daten weiter — Nutzer über die Einschränkung informieren.
        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          showLocationServicesDisabledWarning();
        } else if (__DEV__) {
          console.log('[Tracking] Background-Start fehlgeschlagen:', e);
        }
      }
    },
    [stopForegroundTracking, localizedStrings, showLocationServicesDisabledWarning]
  );

  const stopTracking = useCallback(() => {
    stopForegroundTracking();
    stopBackgroundLocationListener();
  }, [stopForegroundTracking]);

  const showBackgroundDeniedWarning = useCallback(() => {
    Alert.alert(
      localizedStrings.t('homeDialogBackgroundPermissionDeniedTitle'),
      localizedStrings.t('homeDialogBackgroundPermissionDeniedMessage'),
      [{ text: localizedStrings.t('alertOk') }]
    );
  }, [localizedStrings]);

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
                // Foreground-Tracking weiter nutzen falls Permission abgelehnt;
                // User über Einschränkung der Aufzeichnung informieren.
                showBackgroundDeniedWarning();
              },
            },
            {
              text: localizedStrings.t('alertOk'),
              onPress: () => {
                requestBackgroundPermission().then((result) => {
                  if (result) {
                    dispatch(AppAction.setPermissions({ background: true }));
                    startBackgroundTracking(onLocationUpdate);
                  } else {
                    // Permission durch System-Dialog abgelehnt
                    showBackgroundDeniedWarning();
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
    [permissions.background, localizedStrings, dispatch, startBackgroundTracking, showBackgroundDeniedWarning]
  );

  return {
    startForegroundTracking,
    stopTracking,
    startBackgroundTracking,
    requestBackgroundAndSwitch,
  };
};
