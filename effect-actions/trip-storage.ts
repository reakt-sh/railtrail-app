import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from '@reduxjs/toolkit';
import { StorageKeys } from '../constants';
import { RailTrailReduxAction } from '../redux/action';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { TripHistoryAction } from '../redux/tripHistory';
import { ActiveSegment } from '../redux/trip';
import { SavedTrip, VehicleSegment } from '../types/saved-trip';

export const getVehicleWithLongestDistance = (segments: VehicleSegment[]): number | null => {
  if (segments.length === 0) return null;

  // Aggregate distance per vehicle
  const distanceByVehicle = segments.reduce(
    (acc, seg) => {
      acc[seg.vehicleId] = (acc[seg.vehicleId] || 0) + seg.distanceTravelled;
      return acc;
    },
    {} as Record<number, number>
  );

  // Find vehicle with maximum distance
  let maxVehicle = segments[0].vehicleId;
  let maxDistance = 0;

  for (const [vehicleId, distance] of Object.entries(distanceByVehicle)) {
    if (distance > maxDistance) {
      maxDistance = distance;
      maxVehicle = Number(vehicleId);
    }
  }

  return maxVehicle;
};

// Save trip data without stopping (used when trip is already stopped)
export const saveTrip = async (
  dispatch: Dispatch<RailTrailReduxAction>,
  trip: SavedTrip
): Promise<void> => {
  try {
    // Load existing trips
    const existingJson = await AsyncStorage.getItem(StorageKeys.SAVED_TRIPS);
    const existingTrips: SavedTrip[] = existingJson ? JSON.parse(existingJson) : [];

    // Add new trip at the beginning
    const updatedTrips = [trip, ...existingTrips];

    // Save to storage
    await AsyncStorage.setItem(StorageKeys.SAVED_TRIPS, JSON.stringify(updatedTrips));

    // Update Redux state
    dispatch(TripHistoryAction.addTrip(trip));
  } catch (error) {
    console.error('Failed to save trip:', error);
  }
};

export const saveAndStopTrip = async (
  dispatch: Dispatch<RailTrailReduxAction>,
  getState: () => ReduxAppState,
  startTime: string
): Promise<void> => {
  const state = getState();
  const { currentVehicle, motion, activeSegment, completedSegments } = state.trip;

  if (currentVehicle.id == null) {
    dispatch(TripAction.stop());
    return;
  }

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

  const savedTrip: SavedTrip = {
    id: `trip_${Date.now()}`,
    startTime,
    endTime,
    totalDistance: motion.distanceTravelled,
    segments,
    // Legacy fields for backwards compatibility
    vehicleId: currentVehicle.id,
    vehicleName: currentVehicle.name ?? `Draisine ${currentVehicle.id}`,
  };

  try {
    // Load existing trips
    const existingJson = await AsyncStorage.getItem(StorageKeys.SAVED_TRIPS);
    const existingTrips: SavedTrip[] = existingJson ? JSON.parse(existingJson) : [];

    // Add new trip at the beginning
    const updatedTrips = [savedTrip, ...existingTrips];

    // Save to storage
    await AsyncStorage.setItem(StorageKeys.SAVED_TRIPS, JSON.stringify(updatedTrips));

    // Update Redux state
    dispatch(TripHistoryAction.addTrip(savedTrip));
  } catch (error) {
    console.error('Failed to save trip:', error);
  }

  // Stop the trip
  dispatch(TripAction.stop());
};

// Migrate old trips without segments array
const migrateTrip = (trip: SavedTrip): SavedTrip => {
  if (trip.segments) {
    return trip;
  }
  // Create a single segment from legacy fields
  return {
    ...trip,
    segments:
      trip.vehicleId != null
        ? [
            {
              vehicleId: trip.vehicleId,
              vehicleName: trip.vehicleName ?? `Draisine ${trip.vehicleId}`,
              startTime: trip.startTime,
              endTime: trip.endTime,
              distanceTravelled: trip.totalDistance,
            },
          ]
        : [],
  };
};

export const loadSavedTrips = async (dispatch: Dispatch<RailTrailReduxAction>): Promise<void> => {
  dispatch(TripHistoryAction.setLoading(true));

  try {
    const json = await AsyncStorage.getItem(StorageKeys.SAVED_TRIPS);
    const rawTrips: SavedTrip[] = json ? JSON.parse(json) : [];
    const trips = rawTrips.map(migrateTrip);
    dispatch(TripHistoryAction.setTrips(trips));
  } catch (error) {
    console.error('Failed to load saved trips:', error);
    dispatch(TripHistoryAction.setTrips([]));
  }

  dispatch(TripHistoryAction.setLoading(false));
};

// --- Active trip persistence (background/kill recovery) ---

interface PersistedTripState {
  tripStartTime: string;
  currentVehicle: { id: number; name: string };
  distanceTravelled: number;
  activeSegment: ActiveSegment | null;
  completedSegments: VehicleSegment[];
}

export const persistActiveTrip = async (getState: () => ReduxAppState): Promise<void> => {
  const { trip } = getState();
  if (!trip.isActive || trip.currentVehicle.id == null || trip.tripStartTime == null) {
    return;
  }

  const data: PersistedTripState = {
    tripStartTime: trip.tripStartTime,
    currentVehicle: {
      id: trip.currentVehicle.id,
      name: trip.currentVehicle.name ?? `Draisine ${trip.currentVehicle.id}`,
    },
    distanceTravelled: trip.motion.distanceTravelled,
    activeSegment: trip.activeSegment,
    completedSegments: trip.completedSegments,
  };

  try {
    await AsyncStorage.setItem(StorageKeys.ACTIVE_TRIP, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to persist active trip:', error);
  }
};

export const restoreActiveTrip = async (
  dispatch: Dispatch<RailTrailReduxAction>
): Promise<boolean> => {
  try {
    const json = await AsyncStorage.getItem(StorageKeys.ACTIVE_TRIP);
    if (!json) return false;

    const data: PersistedTripState = JSON.parse(json);
    dispatch(TripAction.restore(data));

    // Clear the persisted state after successful restore
    await AsyncStorage.removeItem(StorageKeys.ACTIVE_TRIP);
    return true;
  } catch (error) {
    console.error('Failed to restore active trip:', error);
    return false;
  }
};

export const clearPersistedTrip = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(StorageKeys.ACTIVE_TRIP);
  } catch (error) {
    console.error('Failed to clear persisted trip:', error);
  }
};

export const deleteSavedTrip = async (
  dispatch: Dispatch<RailTrailReduxAction>,
  tripId: string
): Promise<void> => {
  try {
    // Load existing trips
    const existingJson = await AsyncStorage.getItem(StorageKeys.SAVED_TRIPS);
    const existingTrips: SavedTrip[] = existingJson ? JSON.parse(existingJson) : [];

    // Filter out the deleted trip
    const updatedTrips = existingTrips.filter((trip) => trip.id !== tripId);

    // Save to storage
    await AsyncStorage.setItem(StorageKeys.SAVED_TRIPS, JSON.stringify(updatedTrips));

    // Update Redux state
    dispatch(TripHistoryAction.removeTrip(tripId));
  } catch (error) {
    console.error('Failed to delete trip:', error);
  }
};
