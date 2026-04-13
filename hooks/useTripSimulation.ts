import * as Location from 'expo-location';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SIMULATION_VEHICLE_ID } from '../constants';
import { ReduxAppState, TripAction, TripActionType } from '../redux';
import { Vehicle } from '../types/vehicle';
import { calculateBearing, percentageToPosition } from '../util';
const SIMULATION_VEHICLE_LABEL = 'Demo';

export const useTripSimulation = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const percentageRef = useRef(0);
  const speedRef = useRef(11); // km/h

  const dispatch = useDispatch<Dispatch<TripActionType>>();
  const trackLength = useSelector((state: ReduxAppState) => state.app.track.length) ?? 8500;

  const registerDemoVehicle = useCallback(() => {
    const initialPos = percentageToPosition(0);
    const simulationVehicle: Vehicle = {
      id: SIMULATION_VEHICLE_ID,
      pos: initialPos,
      percentagePosition: 0,
      heading: 0,
      label: SIMULATION_VEHICLE_LABEL,
    };
    dispatch(TripAction.updateVehicleFromWebSocket({ vehicle: simulationVehicle, speed: 0 }));
  }, [dispatch]);

  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    percentageRef.current = 0;
    directionRef.current = 1;
    speedRef.current = 11;
  }, []);

  const startSimulation = useCallback(
    (callback: (loc: Location.LocationObject) => void) => {
      if (intervalRef.current) return;

      percentageRef.current = 0;
      directionRef.current = 1;
      speedRef.current = 11;

      intervalRef.current = setInterval(() => {
        // Drift speed by ±0.5, clamp to 7–15 km/h
        speedRef.current += (Math.random() - 0.5) * 1;
        speedRef.current = Math.max(7, Math.min(15, speedRef.current));

        const speedMs = (speedRef.current * 1000) / 3600;

        // Distance travelled in 1 second
        const distance = speedMs * 1;
        const percentageDelta = (distance / trackLength) * 100;

        // Save previous position for bearing calculation
        const prevPos = percentageToPosition(percentageRef.current);

        // Update percentage position
        percentageRef.current += percentageDelta * directionRef.current;

        // Reverse direction at track ends
        if (percentageRef.current >= 100) {
          percentageRef.current = 100;
          directionRef.current = -1;
        }
        if (percentageRef.current <= 0) {
          percentageRef.current = 0;
          directionRef.current = 1;
        }

        const pos = percentageToPosition(percentageRef.current);

        // Calculate heading from previous to current position
        const heading = calculateBearing(prevPos.lat, prevPos.lng, pos.lat, pos.lng);

        // Update demo vehicle in Redux (for marker on map)
        const updatedVehicle: Vehicle = {
          id: SIMULATION_VEHICLE_ID,
          pos,
          percentagePosition: percentageRef.current,
          heading,
          label: SIMULATION_VEHICLE_LABEL,
        };
        dispatch(
          TripAction.updateVehicleFromWebSocket({
            vehicle: updatedVehicle,
            speed: speedRef.current,
          })
        );

        // Build fake LocationObject and call the callback
        const fakeLocation: Location.LocationObject = {
          coords: {
            latitude: pos.lat,
            longitude: pos.lng,
            altitude: 30,
            accuracy: 5,
            altitudeAccuracy: 5,
            heading,
            speed: speedMs,
          },
          timestamp: Date.now(),
        };
        callback(fakeLocation);
      }, 1000);
    },
    [dispatch, trackLength]
  );

  return {
    registerDemoVehicle,
    startSimulation,
    stopSimulation,
  };
};
