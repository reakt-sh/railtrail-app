// MapPosition vom Positioning Service via WebSocket
// Schema: /schema/map_position.json

export interface MapPosition {
  timestamp: string;
  vehicle: number; // Vehicle ID (positiv = Fahrzeug, negativ = Tracker ohne Zuordnung)
  position: number; // Relative Position auf Track (0-1)
  track: string; // Track ID
  heading?: number; // Grad
  speed?: number; // km/h
  latitude?: number;
  longitude?: number;
  label?: string; // Anzeigename
  offtrack?: boolean; // true = Fahrzeug nicht auf Track
}
