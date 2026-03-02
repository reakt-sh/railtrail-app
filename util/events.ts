type EventCallback = () => void;

const listeners: Map<string, Set<EventCallback>> = new Map();

export const events = {
  on: (event: string, callback: EventCallback) => {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }
    listeners.get(event)!.add(callback);
    return () => listeners.get(event)?.delete(callback);
  },

  emit: (event: string) => {
    listeners.get(event)?.forEach((callback) => callback());
  },
};

export const AppEvents = {
  SHOW_VEHICLE_CHANGE: 'SHOW_VEHICLE_CHANGE',
} as const;
