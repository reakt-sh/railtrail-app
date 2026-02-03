import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from '@reduxjs/toolkit';
import { RailTrailReduxAction } from '../redux/action';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { TripHistoryAction } from '../redux/tripHistory';
import { SavedTrip } from '../types/saved-trip';

const STORAGE_KEY = 'railtrail_saved_trips';

export const saveAndStopTrip = async (
  dispatch: Dispatch<RailTrailReduxAction>,
  getState: () => ReduxAppState,
  startTime: string
): Promise<void> => {
  const state = getState();
  const { currentVehicle, motion } = state.trip;

  if (currentVehicle.id == null) {
    dispatch(TripAction.stop());
    return;
  }

  const savedTrip: SavedTrip = {
    id: `trip_${Date.now()}`,
    startTime,
    endTime: new Date().toISOString(),
    vehicleId: currentVehicle.id,
    vehicleName: currentVehicle.name ?? `Draisine ${currentVehicle.id}`,
    totalDistance: motion.distanceTravelled,
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

export const loadSavedTrips = async (dispatch: Dispatch<RailTrailReduxAction>): Promise<void> => {
  dispatch(TripHistoryAction.setLoading(true));

  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const trips: SavedTrip[] = json ? JSON.parse(json) : [];
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
