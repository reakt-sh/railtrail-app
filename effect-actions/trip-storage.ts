import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from '@reduxjs/toolkit';
import { RailTrailReduxAction } from '../redux/action';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { TripHistoryAction } from '../redux/tripHistory';
import { SavedTrip, VehicleSegment } from '../types/saved-trip';

const STORAGE_KEY = 'railtrail_saved_trips';

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
    const existingJson = await AsyncStorage.getItem(STORAGE_KEY);
    const existingTrips: SavedTrip[] = existingJson ? JSON.parse(existingJson) : [];

    // Add new trip at the beginning
    const updatedTrips = [savedTrip, ...existingTrips];

    // Save to storage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));

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
    segments: trip.vehicleId != null ? [{
      vehicleId: trip.vehicleId,
      vehicleName: trip.vehicleName ?? `Draisine ${trip.vehicleId}`,
      startTime: trip.startTime,
      endTime: trip.endTime,
      distanceTravelled: trip.totalDistance,
    }] : [],
  };
};

export const loadSavedTrips = async (dispatch: Dispatch<RailTrailReduxAction>): Promise<void> => {
  dispatch(TripHistoryAction.setLoading(true));

  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const rawTrips: SavedTrip[] = json ? JSON.parse(json) : [];
    const trips = rawTrips.map(migrateTrip);
    dispatch(TripHistoryAction.setTrips(trips));
  } catch (error) {
    console.error('Failed to load saved trips:', error);
    dispatch(TripHistoryAction.setTrips([]));
  }

  dispatch(TripHistoryAction.setLoading(false));
};

export const deleteSavedTrip = async (
  dispatch: Dispatch<RailTrailReduxAction>,
  tripId: string
): Promise<void> => {
  try {
    // Load existing trips
    const existingJson = await AsyncStorage.getItem(STORAGE_KEY);
    const existingTrips: SavedTrip[] = existingJson ? JSON.parse(existingJson) : [];

    // Filter out the deleted trip
    const updatedTrips = existingTrips.filter((trip) => trip.id !== tripId);

    // Save to storage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));

    // Update Redux state
    dispatch(TripHistoryAction.removeTrip(tripId));
  } catch (error) {
    console.error('Failed to delete trip:', error);
  }
};
