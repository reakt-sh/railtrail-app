import { POSITIONING_WS_URL, API_TIMEOUT, MAP_STYLE_URL } from '@env';

// Fallback-Werte falls .env nicht geladen wird
const DEFAULT_WS_URL = 'wss://railtrail.rtsys.informatik.uni-kiel.de/api/position-updates';
const DEFAULT_MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// WebSocket für Echtzeit-Positionen
export const positioningWsUrl = POSITIONING_WS_URL || DEFAULT_WS_URL;

// Map Tile Server
export const mapStyleUrl = MAP_STYLE_URL || DEFAULT_MAP_STYLE_URL;

// API Timeout
export const BACKEND_TIMEOUT = parseInt(API_TIMEOUT, 10) || 3000;

// Debug: Log loaded values
console.log('[Config] Map Style URL:', mapStyleUrl);
console.log('[Config] WebSocket URL:', positioningWsUrl);
export const MIN_LOCATION_UPDATE_TIME_INTERVAL = 1000;
export const MIN_LOCATION_UPDATE_DISTANCE_INTERVAL = 0.1;
export const BACKGROUND_LOCATION_TASK = 'BACKGROUND_LOCATION_TASK';
export const VEHICLE_HEADING_TOWARDS_USER_WARNING_DISTANCE = 200;
export const VEHICLE_WARNING_DISTANCE = 10;
export const LEVEL_CROSSING_WARNING_DISTANCE = 200;

export const initialRegion = {
  latitude: 54.16757,
  longitude: 10.551278,
  latitudeDelta: 0.0015,
  longitudeDelta: 0.00075,
};
