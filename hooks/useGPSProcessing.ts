import * as Location from 'expo-location';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Dispatch } from 'redux';
import { updateDistances } from '../effect-actions/trip-actions';
import { AppAction, AppActionType } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripAction, TripActionType } from '../redux/trip';
import { MAX_GPS_ACCURACY } from '../constants';
import { percentToDistance } from '../util/calculators';
import { processSpeed } from '../util/speed';
import { positionToPercentage, percentageToPosition } from '../util/track-loader';

const DIRECTION_CHANGE_THRESHOLD_METERS = 30;

interface UseGPSProcessingReturn {
  handleLocationUpdate: (loc: Location.LocationObject) => void;
  resetTracking: () => void;
}

export const useGPSProcessing = (): UseGPSProcessingReturn => {
  const dispatch = useDispatch<Dispatch<AppActionType | TripActionType>>();
  const store = useStore<ReduxAppState>();

  const lastLocationRef = useRef<Location.LocationObject | null>(null);
  const smoothedSpeedRef = useRef<number>(0);
  const oppositeDistanceRef = useRef(0);
  const isPercentagePositionIncreasingRef = useRef<boolean | undefined>(undefined);
  const vehiclesRef = useRef(useSelector((state: ReduxAppState) => state.trip.vehicles));
  const lastSyncedPercentageRef = useRef<number | null>(null);

  // Keep vehiclesRef in sync
  const vehicles = useSelector((state: ReduxAppState) => state.trip.vehicles);
  vehiclesRef.current = vehicles;

  const { isActive, currentVehicle, position } = useSelector(
    (state: ReduxAppState) => state.trip
  );
  const { track } = useSelector((state: ReduxAppState) => state.app);

  // Location update handler — GPS is primary data source during active trips
  const handleLocationUpdate = useCallback(
    async (loc: Location.LocationObject) => {
      // GPS accuracy gate: discard fixes with poor accuracy
      if (loc.coords.accuracy != null && loc.coords.accuracy > MAX_GPS_ACCURACY) return;

      dispatch(AppAction.setLocation(loc));

      const state = store.getState();
      const { isActive: tripActive } = state.trip;
      if (tripActive) {
        // 1. Project GPS position onto track
        const percentage = positionToPercentage(loc.coords.latitude, loc.coords.longitude);
        const calculated = percentageToPosition(percentage);
        dispatch(TripAction.setPosition({ percentage, calculated }));

        // 2. Speed from GPS (m/s → km/h) with EMA smoothing
        smoothedSpeedRef.current = processSpeed(
          loc.coords.speed ?? 0,
          smoothedSpeedRef.current
        );

        // 3. Distance: handled by updateDistances() via position.percentage changes

        dispatch(TripAction.setMotion({ speed: smoothedSpeedRef.current }));
        lastLocationRef.current = loc;
      }
    },
    [dispatch, store]
  );

  // Sync percentagePosition and calculated position from own vehicle in vehicles array
  useEffect(() => {
    // During active trip, position comes from GPS — skip WebSocket sync
    if (!isActive && currentVehicle.id != null && vehicles.length > 0) {
      const myVehicle = vehicles.find((v) => v.id === currentVehicle.id);
      if (myVehicle && myVehicle.percentagePosition !== lastSyncedPercentageRef.current) {
        lastSyncedPercentageRef.current = myVehicle.percentagePosition;
        dispatch(
          TripAction.setPosition({
            percentage: myVehicle.percentagePosition,
            calculated: myVehicle.pos,
          })
        );
      }
    }
  }, [vehicles, currentVehicle.id, isActive]);

  // Calculate distances and direction
  useEffect(() => {
    if (position.percentage != null) {
      if (position.lastPercentage != null && position.lastPercentage !== position.percentage) {
        const movingForward = position.percentage > position.lastPercentage;
        const delta = Math.abs(position.percentage - position.lastPercentage);
        const deltaMeters = percentToDistance(track.length ?? 0, delta);

        if (isPercentagePositionIncreasingRef.current === undefined) {
          // First movement — set direction immediately
          isPercentagePositionIncreasingRef.current = movingForward;
          oppositeDistanceRef.current = 0;
        } else if (movingForward === isPercentagePositionIncreasingRef.current) {
          // Same direction — reset accumulator
          oppositeDistanceRef.current = 0;
        } else {
          // Opposite direction — accumulate distance
          oppositeDistanceRef.current += deltaMeters;
          if (oppositeDistanceRef.current >= DIRECTION_CHANGE_THRESHOLD_METERS) {
            isPercentagePositionIncreasingRef.current = movingForward;
            oppositeDistanceRef.current = 0;
          }
        }
      }

      if (isActive) {
        updateDistances(
          dispatch,
          track.length,
          position.percentage,
          position.lastPercentage,
          track.pointsOfInterest,
          vehiclesRef.current,
          isPercentagePositionIncreasingRef.current,
          currentVehicle.id
        );
      }
    }
  }, [position.percentage, isActive, track.length, track.pointsOfInterest, currentVehicle.id, dispatch]);

  const resetTracking = useCallback(() => {
    lastLocationRef.current = null;
    smoothedSpeedRef.current = 0;
  }, []);

  return { handleLocationUpdate, resetTracking };
};
