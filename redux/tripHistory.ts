import { SavedTrip } from '../types/saved-trip';
import { RailTrailReduxAction } from './action';

export interface TripHistoryState {
  readonly savedTrips: SavedTrip[];
  readonly isLoading: boolean;
}

// Action interfaces
interface TripHistoryActionSetTrips {
  readonly type: 'tripHistory/set-trips';
  readonly payload: SavedTrip[];
}

interface TripHistoryActionAddTrip {
  readonly type: 'tripHistory/add-trip';
  readonly payload: SavedTrip;
}

interface TripHistoryActionRemoveTrip {
  readonly type: 'tripHistory/remove-trip';
  readonly payload: string; // trip id
}

interface TripHistoryActionSetLoading {
  readonly type: 'tripHistory/set-loading';
  readonly payload: boolean;
}

export type TripHistoryAction =
  | TripHistoryActionSetTrips
  | TripHistoryActionAddTrip
  | TripHistoryActionRemoveTrip
  | TripHistoryActionSetLoading;

export const TripHistoryAction = {
  setTrips: (trips: SavedTrip[]): TripHistoryActionSetTrips => ({
    type: 'tripHistory/set-trips',
    payload: trips,
  }),

  addTrip: (trip: SavedTrip): TripHistoryActionAddTrip => ({
    type: 'tripHistory/add-trip',
    payload: trip,
  }),

  removeTrip: (tripId: string): TripHistoryActionRemoveTrip => ({
    type: 'tripHistory/remove-trip',
    payload: tripId,
  }),

  setLoading: (loading: boolean): TripHistoryActionSetLoading => ({
    type: 'tripHistory/set-loading',
    payload: loading,
  }),
};

export const initialTripHistoryState: TripHistoryState = {
  savedTrips: [],
  isLoading: false,
};

const reducer = (
  state = initialTripHistoryState,
  action: RailTrailReduxAction
): TripHistoryState => {
  switch (action.type) {
    case 'tripHistory/set-trips':
      return { ...state, savedTrips: action.payload };

    case 'tripHistory/add-trip':
      return { ...state, savedTrips: [action.payload, ...state.savedTrips] };

    case 'tripHistory/remove-trip':
      return {
        ...state,
        savedTrips: state.savedTrips.filter((trip) => trip.id !== action.payload),
      };

    case 'tripHistory/set-loading':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default reducer;
