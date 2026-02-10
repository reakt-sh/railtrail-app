export interface VehicleSegment {
  vehicleId: number;
  vehicleName: string;
  startTime: string;
  endTime: string;
  distanceTravelled: number;
}

export interface SavedTrip {
  id: string; // e.g. "trip_1706123456789"
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  totalDistance: number; // in meters
  segments: VehicleSegment[];
  // Legacy fields for backwards compatibility
  vehicleId?: number;
  vehicleName?: string;
}
