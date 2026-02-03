export interface SavedTrip {
  id: string; // e.g. "trip_1706123456789"
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  vehicleId: number;
  vehicleName: string;
  totalDistance: number; // in meters
}
