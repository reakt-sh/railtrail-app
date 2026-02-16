import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { Vehicle } from '../types/vehicle';
import { percentageToPosition } from '../util/track-loader';

const SIMULATION_VEHICLE_ID = 99;
const SIMULATION_VEHICLE_LABEL = 'Demo';
export const SIMULATION_INTERVAL_MS = 60000;

export const useTripSimulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const directionRef = useRef<1 | -1>(1); // 1 = forward, -1 = backward
  const percentageRef = useRef(0);

  const dispatch = useDispatch();
  const trackLength = useSelector((state: ReduxAppState) => state.app.track.length) ?? 8500;

  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    percentageRef.current = 0;
    directionRef.current = 1;
    setIsSimulating(false);
  }, []);

  const startSimulation = useCallback(() => {
    if (isSimulating) return;

    // Create initial simulation vehicle in vehicles array
    const initialPos = percentageToPosition(0);
    const simulationVehicle: Vehicle = {
      id: SIMULATION_VEHICLE_ID,
      pos: initialPos,
      percentagePosition: 0,
      heading: 0,
      label: SIMULATION_VEHICLE_LABEL,
    };
    dispatch(TripAction.updateVehicleFromWebSocket({ vehicle: simulationVehicle, speed: 0 }));

    setIsSimulating(true);
    percentageRef.current = 0;
    directionRef.current = 1;

    // Start the simulation interval
    intervalRef.current = setInterval(() => {
      // Variable speed: 7-15 km/h
      const baseSpeed = 11;
      const variation = (Math.random() - 0.5) * 8; // ±4 km/h
      const speed = Math.max(7, Math.min(15, baseSpeed + variation));

      // Calculate distance traveled per second
      const distancePerSecond = (speed * 1000) / 3600; // m/s
      const percentageDelta = (distancePerSecond / trackLength) * 100;

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

      // Heading based on direction (0° = North when forward, 180° when backward)
      const heading = directionRef.current === 1 ? 0 : 180;

      // Calculate position from percentage
      const pos = percentageToPosition(percentageRef.current);

      // Update simulation vehicle in vehicles array
      const updatedVehicle: Vehicle = {
        id: SIMULATION_VEHICLE_ID,
        pos,
        percentagePosition: percentageRef.current,
        heading,
        label: SIMULATION_VEHICLE_LABEL,
      };
      dispatch(TripAction.updateVehicleFromWebSocket({ vehicle: updatedVehicle, speed }));
    }, SIMULATION_INTERVAL_MS);
  }, [isSimulating, dispatch, trackLength]);

  return {
    isSimulating,
    startSimulation,
    stopSimulation,
  };
};
