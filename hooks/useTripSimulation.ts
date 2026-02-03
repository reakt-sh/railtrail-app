import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { saveAndStopTrip } from '../effect-actions/trip-storage';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { SIMULATION_INTERVAL_MS, SIMULATION_POSITIONS } from '../util/simulation-data';
import { percentageToPosition } from '../util/track-loader';
import { Vehicle } from '../types/vehicle';

export const useTripSimulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const positionIndexRef = useRef(0);
  const startTimeRef = useRef<string | null>(null);

  const dispatch = useDispatch();
  const store = useStore<ReduxAppState>();
  const trackLength = useSelector((state: ReduxAppState) => state.app.track.length) ?? 8500;

  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const startTime = startTimeRef.current ?? new Date().toISOString();
    saveAndStopTrip(dispatch, store.getState, startTime);

    startTimeRef.current = null;
    positionIndexRef.current = 0;
    setIsSimulating(false);
  }, [dispatch, store]);

  const startSimulation = useCallback(() => {
    if (isSimulating) return;

    // Start the trip with a simulated vehicle
    const simulationVehicleId = 99;
    const simulationVehicleName = 'Simulation';
    startTimeRef.current = new Date().toISOString();

    dispatch(TripAction.setCurrentVehicle(simulationVehicleId, simulationVehicleName));
    dispatch(TripAction.start());

    // Create initial simulation vehicle in vehicles array
    const initialPoint = SIMULATION_POSITIONS[0];
    const initialPos = percentageToPosition(initialPoint.percentage);
    const simulationVehicle: Vehicle = {
      id: simulationVehicleId,
      pos: initialPos,
      percentagePosition: initialPoint.percentage,
      heading: 0,
      label: simulationVehicleName,
    };
    dispatch(TripAction.updateVehicleFromWebSocket({ vehicle: simulationVehicle, speed: initialPoint.speed }));
    dispatch(TripAction.setPosition({ calculated: initialPos }));

    setIsSimulating(true);
    positionIndexRef.current = 0;

    // Start the simulation interval
    intervalRef.current = setInterval(() => {
      const currentIndex = positionIndexRef.current;

      if (currentIndex >= SIMULATION_POSITIONS.length) {
        stopSimulation();
        return;
      }

      const point = SIMULATION_POSITIONS[currentIndex];

      // Calculate distance traveled since last point
      let distanceDelta = 0;
      if (currentIndex > 0) {
        const prevPoint = SIMULATION_POSITIONS[currentIndex - 1];
        const percentageDelta = point.percentage - prevPoint.percentage;
        distanceDelta = (percentageDelta / 100) * trackLength;
      }

      // Update motion (speed and distance)
      dispatch(TripAction.setMotion({ speed: point.speed }));
      if (distanceDelta > 0) {
        dispatch(TripAction.addDistance(distanceDelta));
      }

      // Update simulation vehicle position in vehicles array
      const pos = percentageToPosition(point.percentage);
      const updatedVehicle: Vehicle = {
        id: simulationVehicleId,
        pos,
        percentagePosition: point.percentage,
        heading: 0,
        label: simulationVehicleName,
      };
      dispatch(TripAction.updateVehicleFromWebSocket({ vehicle: updatedVehicle, speed: point.speed }));

      // Update position percentage and calculated position for camera following
      dispatch(TripAction.setPosition({ percentage: point.percentage, calculated: pos }));

      positionIndexRef.current++;
    }, SIMULATION_INTERVAL_MS);
  }, [isSimulating, dispatch, trackLength, stopSimulation]);

  return {
    isSimulating,
    startSimulation,
    stopSimulation,
  };
};
