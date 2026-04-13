export const warningDistance = {
  vehicleHeadingTowardsUser: 500,
  vehicle: 200,
  levelCrossing: 200,
};

// Legacy exports (für Kompatibilität)
export const VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE =
  warningDistance.vehicleHeadingTowardsUser;
export const VEHICLE_WARNING_DISTANCE = warningDistance.vehicle;
export const LEVEL_CROSSING_WARNING_DISTANCE = warningDistance.levelCrossing;
