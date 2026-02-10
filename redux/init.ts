import { Reducer, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit';
import { RailTrailReduxAction } from './action';
import app, { initialAppState } from './app';
import trip, { initialTripState } from './trip';
import tripHistory, { initialTripHistoryState } from './tripHistory';

const rootReducer = combineReducers({
  app,
  trip,
  tripHistory,
});

export type ReduxAppState = ReturnType<typeof rootReducer>;

export type RailTrailDispatch = ThunkDispatch<ReduxAppState, {}, RailTrailReduxAction>;

export const defaultReduxAppState: ReduxAppState = {
  app: initialAppState,
  trip: initialTripState,
  tripHistory: initialTripHistoryState,
};

export const createReduxStore = (
  initialState?: ReduxAppState,
  reducer?: Reducer<any, RailTrailReduxAction>
) =>
  configureStore({
    reducer: reducer ?? rootReducer,
    middleware: (defaultMiddleware) =>
      defaultMiddleware({ immutableCheck: false, serializableCheck: false }),
    preloadedState: initialState ?? defaultReduxAppState,
  });

export const initStore = () => {
  const store = createReduxStore(defaultReduxAppState);

  return { store };
};
