import { type AppActionType } from './app';
import { type TripActionType } from './trip';
import { type TripHistoryAction } from './tripHistory';

export type RailTrailReduxAction = AppActionType | TripActionType | TripHistoryAction;
