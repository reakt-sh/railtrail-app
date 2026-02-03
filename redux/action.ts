import { AppAction } from './app';
import { TripAction } from './trip';
import { TripHistoryAction } from './tripHistory';

export type RailTrailReduxAction = AppAction | TripAction | TripHistoryAction;
