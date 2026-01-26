import { Dispatch } from 'redux';
import { positionSocket } from '../api/websocket';
import { AppAction } from '../redux/app';
import { TripAction } from '../redux/trip';
import { MapPosition } from '../types/map-position';
import { Vehicle } from '../types/vehicle';
import { track } from '../util/consts';

// Initialisiert die App mit statischen Track-Daten und WebSocket-Verbindung
export const initializeApp = (dispatch: Dispatch) => {
  console.log('[Init] Initializing app...');

  // Track-Daten laden (statisch aus consts.ts)
  dispatch(
    AppAction.setTrack({
      id: 1, // Malente-Lütjenburg
      path: track,
      length: 15000, // in Metern
    })
  );

  // WebSocket verbinden für Echtzeit-Positionen
  positionSocket.connect();
  console.log('[Init] App initialized');
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
