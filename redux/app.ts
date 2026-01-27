import * as Location from 'expo-location';
import { PointOfInterest } from '../types/init';
import { RailTrailReduxAction } from './action';

// Grouped sub-interfaces
export interface Track {
  readonly id: number | null;
  readonly path: GeoJSON.FeatureCollection | null;
  readonly length: number | null;
  readonly pointsOfInterest: PointOfInterest[];
}

export interface Permissions {
  readonly foreground: boolean;
  readonly background: boolean;
}

export interface AppState {
  readonly track: Track;
  readonly location: Location.LocationObject | null;
  readonly permissions: Permissions;
}

// Action interfaces
interface AppActionSetTrack {
  readonly type: 'app/set-track';
  readonly payload: Partial<Track>;
}

interface AppActionSetLocation {
  readonly type: 'app/set-location';
  readonly payload: Location.LocationObject | null;
}

interface AppActionSetPermissions {
  readonly type: 'app/set-permissions';
  readonly payload: Partial<Permissions>;
}

export type AppAction = AppActionSetTrack | AppActionSetLocation | AppActionSetPermissions;

export const AppAction = {
  setTrack: (track: Partial<Track>): AppActionSetTrack => ({
    type: 'app/set-track',
    payload: track,
  }),

  setLocation: (location: Location.LocationObject | null): AppActionSetLocation => ({
    type: 'app/set-location',
    payload: location,
  }),

  setPermissions: (permissions: Partial<Permissions>): AppActionSetPermissions => ({
    type: 'app/set-permissions',
    payload: permissions,
  }),
};

export const initialAppState: AppState = {
  track: {
    id: null,
    path: null,
    length: null,
    pointsOfInterest: [],
  },
  location: null,
  permissions: {
    foreground: false,
    background: false,
  },
};

const reducer = (state = initialAppState, action: RailTrailReduxAction): AppState => {
  switch (action.type) {
    case 'app/set-track':
      return {
        ...state,
        track: { ...state.track, ...action.payload },
      };

    case 'app/set-location':
      return { ...state, location: action.payload };

    case 'app/set-permissions':
      return {
        ...state,
        permissions: { ...state.permissions, ...action.payload },
      };

    default:
      return state;
  }
};

export default reducer;
