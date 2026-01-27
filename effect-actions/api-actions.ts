import { Dispatch } from 'redux';
import { positionSocket } from '../api/websocket';
import { AppAction } from '../redux/app';
import { TripAction } from '../redux/trip';
import { MapPosition } from '../types/map-position';
import { Vehicle } from '../types/vehicle';
import { malenteLuetjenburgTrack } from '../util/track-loader';

// Initialisiert die App mit statischen Track-Daten und WebSocket-Verbindung
export const initializeApp = (dispatch: Dispatch) => {
  if (__DEV__) console.log('[Init] Initializing app...');

  // Track-Daten laden
  const track = malenteLuetjenburgTrack;
  if (__DEV__) {
    console.log(`[Init] Loaded track: ${track.name} (${track.length}m, ${track.pointsOfInterest.length} POIs)`);
  }

  dispatch(
    AppAction.setTrack({
      id: track.id,
      path: track.path,
      length: track.length,
      pointsOfInterest: track.pointsOfInterest,
    })
  );

  // WebSocket verbinden für Echtzeit-Positionen
  positionSocket.connect();
  if (__DEV__) console.log('[Init] App initialized');
};

// Richtet WebSocket-Updates ein und konvertiert MapPosition zu Vehicle-Format
export const setupPositionUpdates = (dispatch: Dispatch): (() => void) => {
  return positionSocket.subscribe((mapPosition: MapPosition) => {
    // MapPosition zu Vehicle-Format konvertieren für die bestehende UI
    const vehicle: Vehicle = {
      id: mapPosition.vehicle,
      pos: {
        lat: mapPosition.latitude ?? 0,
        lng: mapPosition.longitude ?? 0,
      },
      percentagePosition: mapPosition.position * 100, // 0-1 zu 0-100
      heading: mapPosition.heading,
      headingTowardsUser: undefined, // Wird ggf. später berechnet
      label: mapPosition.label,
    };

    // Vehicles-Array aktualisieren
    dispatch(
      TripAction.updateVehicleFromWebSocket({
        vehicle,
        speed: mapPosition.speed,
      })
    );
  });
};

// Beendet die WebSocket-Verbindung
export const disconnectFromServer = () => {
  positionSocket.disconnect();
};
