import { MAP_STYLE_URL } from '@env';

// Fallback-Werte falls .env nicht geladen wird
const DEFAULT_MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// Map Tile Server
export const mapStyleUrl = MAP_STYLE_URL || DEFAULT_MAP_STYLE_URL;

export const initialRegion = {
  latitude: 54.16757,
  longitude: 10.551278,
  latitudeDelta: 0.0015,
  longitudeDelta: 0.00075,
};

// Debug: Log loaded values
if (__DEV__) {
  console.log('[Config] Map Style URL:', mapStyleUrl);
}
