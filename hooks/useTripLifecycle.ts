import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useStore } from 'react-redux';
import { Dispatch } from 'redux';
import { useTranslation } from './useTranslation';
import { SIMULATION_VEHICLE_ID } from '../constants';
import { AppActionType } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripAction, TripActionType } from '../redux/trip';
import { SavedTrip, VehicleSegment } from '../types/saved-trip';
import { Vehicle } from '../types/vehicle';
import { AppEvents, events } from '../util/events';

interface UseTripLifecycleParams {
  setIsFollowingUser: (v: boolean) => void;
  centerOnPosition: (lat: number, lng: number, heading: number, zoom?: number) => void;
  startForegroundTracking: (cb: (loc: Location.LocationObject) => void) => void;
  stopTracking: () => void;
  startSimulation: (cb: (loc: Location.LocationObject) => void) => void;
  stopSimulation: () => void;
  handleLocationUpdate: (loc: Location.LocationObject) => void;
  resetTracking: () => void;
  setPendingTripData: (data: SavedTrip | null) => void;
  showSummary: () => void;
}

interface UseTripLifecycleReturn {
  isVehicleSelectionVisible: boolean;
  setIsVehicleSelectionVisible: (v: boolean) => void;
  isChangeVehicleIdBottomSheetVisible: boolean;
  setIsChangeVehicleIdBottomSheetVisible: (v: boolean) => void;
  handleStartTrip: () => void;
  handleStopTrip: () => void;
  handleStartVehicleSelect: (vehicle: Vehicle) => void;
  handleChangeVehicle: (vehicle: Vehicle) => void;
}

export const useTripLifecycle = ({
  setIsFollowingUser,
  centerOnPosition,
  startForegroundTracking,
  stopTracking,
  startSimulation,
  stopSimulation,
  handleLocationUpdate,
  resetTracking,
  setPendingTripData,
  showSummary,
}: UseTripLifecycleParams): UseTripLifecycleReturn => {
  const dispatch = useDispatch<Dispatch<AppActionType | TripActionType>>();
  const store = useStore<ReduxAppState>();
  const localizedStrings = useTranslation();

  const tripStartTimeRef = useRef<string | null>(null);
  const isDemoRef = useRef(false);

  const [isVehicleSelectionVisible, setIsVehicleSelectionVisible] = useState(false);
  const [isChangeVehicleIdBottomSheetVisible, setIsChangeVehicleIdBottomSheetVisible] =
    useState(false);

  // Listen for vehicle change event from drawer
  useEffect(() => {
    const unsubscribe = events.on(AppEvents.SHOW_VEHICLE_CHANGE, () => {
      setIsChangeVehicleIdBottomSheetVisible(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleStopTrip = useCallback(() => {
    Alert.alert(
      localizedStrings.t('homeDialogEndTripTitle'),
      localizedStrings.t('homeDialogEndTripMessage'),
      [
        { text: localizedStrings.t('alertNo'), onPress: () => {} },
        {
          text: localizedStrings.t('alertYes'),
          onPress: () => {
            const state = store.getState();
            const {
              currentVehicle: vehicle,
              activeSegment,
              completedSegments,
              motion,
            } = state.trip;
            const startTime = tripStartTimeRef.current ?? new Date().toISOString();
            const endTime = new Date().toISOString();

            // Build segments array: completed segments + finalized active segment
            const segments: VehicleSegment[] = [...completedSegments];
            if (activeSegment) {
              segments.push({
                vehicleId: activeSegment.vehicleId,
                vehicleName: activeSegment.vehicleName,
                startTime: activeSegment.startTime,
                endTime,
                distanceTravelled: motion.distanceTravelled - activeSegment.startDistance,
              });
            }

            // Build complete SavedTrip object
            const savedTrip: SavedTrip = {
              id: `trip_${Date.now()}`,
              startTime,
              endTime,
              totalDistance: motion.distanceTravelled,
              segments,
              vehicleId: vehicle.id ?? undefined,
              vehicleName: vehicle.name ?? undefined,
            };

            // Stop the trip immediately
            dispatch(TripAction.stop());
            tripStartTimeRef.current = null;

            // If demo trip, stop simulation and restart real GPS
            if (isDemoRef.current) {
              stopSimulation();
              startForegroundTracking(handleLocationUpdate);
              isDemoRef.current = false;
            }

            // Show trip summary, then feedback
            setPendingTripData(savedTrip);
            showSummary();
          },
        },
      ]
    );
  }, [localizedStrings, store, dispatch, stopSimulation, startForegroundTracking, handleLocationUpdate, setPendingTripData, showSummary]);

  const handleStartTrip = useCallback(() => {
    setIsVehicleSelectionVisible(true);
  }, []);

  const handleStartVehicleSelect = useCallback(
    (vehicle: Vehicle) => {
      const vehicleName = vehicle.label ?? `Draisine ${vehicle.id}`;
      tripStartTimeRef.current = new Date().toISOString();
      resetTracking();
      dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicleName));
      dispatch(TripAction.startSegment(vehicle.id, vehicleName));
      dispatch(TripAction.start());
      setIsFollowingUser(true);

      if (vehicle.id === SIMULATION_VEHICLE_ID) {
        isDemoRef.current = true;
        stopTracking(); // Stop real GPS
        startSimulation(handleLocationUpdate); // Feed simulated positions
      } else {
        isDemoRef.current = false;
      }

      // Zoom to vehicle position
      centerOnPosition(vehicle.pos.lat, vehicle.pos.lng, vehicle.heading ?? 0, 17);
    },
    [dispatch, setIsFollowingUser, centerOnPosition, stopTracking, startSimulation, handleLocationUpdate, resetTracking]
  );

  const handleChangeVehicle = useCallback(
    (vehicle: Vehicle) => {
      const vehicleName = vehicle.label ?? `Draisine ${vehicle.id}`;
      dispatch(TripAction.endSegment());
      dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicleName));
      dispatch(TripAction.startSegment(vehicle.id, vehicleName));
    },
    [dispatch]
  );

  return {
    isVehicleSelectionVisible,
    setIsVehicleSelectionVisible,
    isChangeVehicleIdBottomSheetVisible,
    setIsChangeVehicleIdBottomSheetVisible,
    handleStartTrip,
    handleStopTrip,
    handleStartVehicleSelect,
    handleChangeVehicle,
  };
};
