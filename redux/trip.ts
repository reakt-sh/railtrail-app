import { Position } from '../types/position';
import { Vehicle } from '../types/vehicle';
import { RailTrailReduxAction } from './action';

// Grouped sub-interfaces for cleaner state structure
export interface CurrentVehicle {
  readonly id: number | null;
  readonly name: string | null;
}

export interface Motion {
  readonly distanceTravelled: number;
  readonly speed: number;
  readonly heading: number;
}

export interface TripPosition {
  readonly percentage: number | null;
  readonly lastPercentage: number | null;
  readonly calculated: Position | null;
  readonly passing: Position | null;
}

export interface Warnings {
  readonly nextVehicle: number | null;
  readonly nextVehicleHeadingTowards: number | null;
  readonly nextLevelCrossing: number | null;
}

export interface TripState {
  readonly isActive: boolean;
  readonly currentVehicle: CurrentVehicle;
  readonly motion: Motion;
  readonly position: TripPosition;
  readonly warnings: Warnings;
  readonly vehicles: Vehicle[];
}

// Action interfaces
interface TripActionReset {
  readonly type: 'trip/reset';
}

interface TripActionStart {
  readonly type: 'trip/start';
}

interface TripActionStop {
  readonly type: 'trip/stop';
}

interface TripActionSetCurrentVehicle {
  readonly type: 'trip/set-current-vehicle';
  readonly payload: { id: number | null; name: string | null };
}

interface TripActionSetMotion {
  readonly type: 'trip/set-motion';
  readonly payload: Partial<Motion>;
}

interface TripActionAddDistance {
  readonly type: 'trip/add-distance';
  readonly payload: number;
}

interface TripActionSetPosition {
  readonly type: 'trip/set-position';
  readonly payload: Partial<TripPosition>;
}

interface TripActionSetWarnings {
  readonly type: 'trip/set-warnings';
  readonly payload: Warnings;
}

interface TripActionSetVehicles {
  readonly type: 'trip/set-vehicles';
  readonly payload: Vehicle[];
}

interface TripActionUpdateVehicleFromWebSocket {
  readonly type: 'trip/update-vehicle-from-websocket';
  readonly payload: {
    vehicle: Vehicle;
    speed?: number;
  };
}

interface TripActionBatchUpdate {
  readonly type: 'trip/batch-update';
  readonly payload: {
    addDistance?: number;
    lastPercentage?: number | null;
    warnings?: Warnings;
  };
}

export type TripAction =
  | TripActionReset
  | TripActionStart
  | TripActionStop
  | TripActionSetCurrentVehicle
  | TripActionSetMotion
  | TripActionAddDistance
  | TripActionSetPosition
  | TripActionSetWarnings
  | TripActionSetVehicles
  | TripActionUpdateVehicleFromWebSocket
  | TripActionBatchUpdate;

export const TripAction = {
  reset: (): TripActionReset => ({
    type: 'trip/reset',
  }),

  start: (): TripActionStart => ({
    type: 'trip/start',
  }),

  stop: (): TripActionStop => ({
    type: 'trip/stop',
  }),

  setCurrentVehicle: (id: number | null, name: string | null): TripActionSetCurrentVehicle => ({
    type: 'trip/set-current-vehicle',
    payload: { id, name },
  }),

  setMotion: (motion: Partial<Motion>): TripActionSetMotion => ({
    type: 'trip/set-motion',
    payload: motion,
  }),

  addDistance: (distance: number): TripActionAddDistance => ({
    type: 'trip/add-distance',
    payload: distance,
  }),

  setPosition: (position: Partial<TripPosition>): TripActionSetPosition => ({
    type: 'trip/set-position',
    payload: position,
  }),

  setWarnings: (warnings: Warnings): TripActionSetWarnings => ({
    type: 'trip/set-warnings',
    payload: warnings,
  }),

  setVehicles: (vehicles: Vehicle[]): TripActionSetVehicles => ({
    type: 'trip/set-vehicles',
    payload: vehicles,
  }),

  updateVehicleFromWebSocket: (payload: {
    vehicle: Vehicle;
    speed?: number;
  }): TripActionUpdateVehicleFromWebSocket => ({
    type: 'trip/update-vehicle-from-websocket',
    payload,
  }),

  // Batch update for performance - single dispatch updates multiple values
  batchUpdate: (payload: {
    addDistance?: number;
    lastPercentage?: number | null;
    warnings?: Warnings;
  }): TripActionBatchUpdate => ({
    type: 'trip/batch-update',
    payload,
  }),
};

export const initialTripState: TripState = {
  isActive: false,
  currentVehicle: {
    id: null,
    name: null,
  },
  motion: {
    distanceTravelled: 0,
    speed: 0,
    heading: 0,
  },
  position: {
    percentage: null,
    lastPercentage: null,
    calculated: null,
    passing: null,
  },
  warnings: {
    nextVehicle: null,
    nextVehicleHeadingTowards: null,
    nextLevelCrossing: null,
  },
  vehicles: [],
};

const reducer = (state = initialTripState, action: RailTrailReduxAction): TripState => {
  switch (action.type) {
    case 'trip/reset':
      return { ...initialTripState };

    case 'trip/start':
      return { ...state, isActive: true };

    case 'trip/stop':
      return { ...initialTripState };

    case 'trip/set-current-vehicle':
      return {
        ...state,
        currentVehicle: action.payload,
      };

    case 'trip/set-motion':
      return {
        ...state,
        motion: { ...state.motion, ...action.payload },
      };

    case 'trip/add-distance':
      return {
        ...state,
        motion: {
          ...state.motion,
          distanceTravelled: state.motion.distanceTravelled + action.payload,
        },
      };

    case 'trip/set-position':
      return {
        ...state,
        position: { ...state.position, ...action.payload },
      };

    case 'trip/set-warnings':
      return {
        ...state,
        warnings: action.payload,
      };

    case 'trip/set-vehicles':
      return { ...state, vehicles: action.payload };

    case 'trip/update-vehicle-from-websocket': {
      const { vehicle } = action.payload;
      const existingIndex = state.vehicles.findIndex((v) => v.id === vehicle.id);
      let updatedVehicles: Vehicle[];
      if (existingIndex >= 0) {
        updatedVehicles = [...state.vehicles];
        updatedVehicles[existingIndex] = vehicle;
      } else {
        updatedVehicles = [...state.vehicles, vehicle];
      }
      return { ...state, vehicles: updatedVehicles };
    }

    case 'trip/batch-update': {
      const { addDistance, lastPercentage, warnings } = action.payload;
      return {
        ...state,
        motion:
          addDistance !== undefined
            ? {
                ...state.motion,
                distanceTravelled: state.motion.distanceTravelled + addDistance,
              }
            : state.motion,
        position:
          lastPercentage !== undefined
            ? {
                ...state.position,
                lastPercentage,
              }
            : state.position,
        warnings: warnings ?? state.warnings,
      };
    }

    default:
      return state;
  }
};

export default reducer;
