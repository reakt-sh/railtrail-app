import { Position } from '../types/position';
import { VehicleSegment } from '../types/saved-trip';
import { Vehicle } from '../types/vehicle';
import { LOCAL_VEHICLE_ID, SIMULATION_VEHICLE_ID } from '../constants';
import { RailTrailReduxAction } from './action';

// Grouped sub-interfaces for cleaner state structure
export interface CurrentVehicle {
  readonly id: number | null;
  readonly name: string | null;
}

export interface ActiveSegment {
  readonly vehicleId: number;
  readonly vehicleName: string;
  readonly startTime: string;
  readonly startDistance: number;
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
  readonly nextTurningPoint: number | null;
  readonly secondTurningPoint: number | null;
}

export interface TripState {
  readonly isActive: boolean;
  readonly tripStartTime: string | null;
  readonly currentVehicle: CurrentVehicle;
  readonly motion: Motion;
  readonly position: TripPosition;
  readonly warnings: Warnings;
  readonly vehicles: Vehicle[];
  readonly activeSegment: ActiveSegment | null;
  readonly completedSegments: VehicleSegment[];
  readonly isLoadingVehicles: boolean;
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

interface TripActionStartSegment {
  readonly type: 'trip/start-segment';
  readonly payload: {
    vehicleId: number;
    vehicleName: string;
  };
}

interface TripActionEndSegment {
  readonly type: 'trip/end-segment';
}

interface TripActionClearVehiclesExceptDemo {
  readonly type: 'trip/clear-vehicles-except-demo';
}

interface TripActionSetLoadingVehicles {
  readonly type: 'trip/set-loading-vehicles';
  readonly payload: boolean;
}

export type TripActionType =
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
  | TripActionBatchUpdate
  | TripActionStartSegment
  | TripActionEndSegment
  | TripActionClearVehiclesExceptDemo
  | TripActionSetLoadingVehicles;

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

  startSegment: (vehicleId: number, vehicleName: string): TripActionStartSegment => ({
    type: 'trip/start-segment',
    payload: { vehicleId, vehicleName },
  }),

  endSegment: (): TripActionEndSegment => ({
    type: 'trip/end-segment',
  }),

  clearVehiclesExceptDemo: (): TripActionClearVehiclesExceptDemo => ({
    type: 'trip/clear-vehicles-except-demo',
  }),

  setLoadingVehicles: (isLoading: boolean): TripActionSetLoadingVehicles => ({
    type: 'trip/set-loading-vehicles',
    payload: isLoading,
  }),
};

export const initialTripState: TripState = {
  isActive: false,
  tripStartTime: null,
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
    nextTurningPoint: null,
    secondTurningPoint: null,
  },
  vehicles: [],
  activeSegment: null,
  completedSegments: [],
  isLoadingVehicles: true,
};

const reducer = (state = initialTripState, action: RailTrailReduxAction): TripState => {
  switch (action.type) {
    case 'trip/reset':
      return { ...initialTripState };

    case 'trip/start':
      return { ...state, isActive: true, tripStartTime: new Date().toISOString() };

    case 'trip/stop':
      return { ...initialTripState, vehicles: state.vehicles, isLoadingVehicles: false };

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

    case 'trip/clear-vehicles-except-demo': {
      return {
        ...state,
        vehicles: state.vehicles.filter(
          (v) => v.id === SIMULATION_VEHICLE_ID || v.id === LOCAL_VEHICLE_ID
        ),
      };
    }

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

      return {
        ...state,
        vehicles: updatedVehicles,
      };
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

    case 'trip/start-segment': {
      const { vehicleId, vehicleName } = action.payload;
      return {
        ...state,
        activeSegment: {
          vehicleId,
          vehicleName,
          startTime: new Date().toISOString(),
          startDistance: state.motion.distanceTravelled,
        },
      };
    }

    case 'trip/end-segment': {
      if (!state.activeSegment) {
        return state;
      }
      const completedSegment: VehicleSegment = {
        vehicleId: state.activeSegment.vehicleId,
        vehicleName: state.activeSegment.vehicleName,
        startTime: state.activeSegment.startTime,
        endTime: new Date().toISOString(),
        distanceTravelled: state.motion.distanceTravelled - state.activeSegment.startDistance,
      };
      return {
        ...state,
        activeSegment: null,
        completedSegments: [...state.completedSegments, completedSegment],
      };
    }

    case 'trip/set-loading-vehicles':
      return { ...state, isLoadingVehicles: action.payload };

    default:
      return state;
  }
};

export default reducer;
