export const MIN_LOCATION_UPDATE_TIME_INTERVAL = 1000;
export const MIN_LOCATION_UPDATE_DISTANCE_INTERVAL = 5;
export const MAX_GPS_ACCURACY = 35;
export const SPEED_SMOOTHING_ALPHA = 0.3;
export const MIN_DISTANCE_JITTER_FILTER = 5; // Meter

// Stillstand-Erkennung: alles unterhalb gilt als 0 (0,5 m/s = ca 1,8 km/h).
export const STILLSTAND_THRESHOLD_MS = 0.5;
// Bei langsamer Fahrt (z. B. 3 km/h) kommen GPS-Updates erst alle ~6 s
// (gefiltert durch MIN_LOCATION_UPDATE_DISTANCE_INTERVAL). Reset-Timeout
// muss großzügig sein, damit der Tacho nicht ständig auf 0 fällt.
export const GPS_SPEED_RESET_TIMEOUT_MS = 8000;
export const GPS_GAP_THRESHOLD_MS = 5000;
// Plausible Obergrenze für Geschwindigkeit (20 m/s ≈ 72 km/h).
// Distanz-Updates oberhalb davon kommen aus GPS-Sprüngen und werden verworfen.
export const MAX_PLAUSIBLE_SPEED_MS = 20;
export const BACKGROUND_LOCATION_TASK = 'BACKGROUND_LOCATION_TASK';
