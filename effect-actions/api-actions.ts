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
  dispatch(AppAction.setTrackPath(track));
  dispatch(AppAction.setTrackId(1)); // Malente-Lütjenburg

  // Track-Länge berechnen (ca. 15km für Malente-Lütjenburg)
  dispatch(AppAction.setTrackLength(15000)); // in Metern

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
    };

    // Vehicles-Array aktualisieren
    dispatch(
      TripAction.updateVehicleFromWebSocket({
        vehicle,
        label: mapPosition.label,
        speed: mapPosition.speed,
      })
    );
  });
};

// Beendet die WebSocket-Verbindung
export const disconnectFromServer = () => {
  positionSocket.disconnect();
};

// Legacy-Funktionen für Kompatibilität (werden nicht mehr verwendet)
// Diese können später entfernt werden

export const retrieveInitDataWithPosition = async (dispatch: Dispatch) => {
  console.warn('[API] retrieveInitDataWithPosition is deprecated, use initializeApp instead');
  await initializeApp(dispatch);
};

export const retrieveInitDataWithTrackId = async (_trackId: number, dispatch: Dispatch) => {
  console.warn('[API] retrieveInitDataWithTrackId is deprecated, use initializeApp instead');
  await initializeApp(dispatch);
};

export const retrieveUpdateData = (_dispatch: Dispatch, _vehicleId: number, _location?: any) => {
  console.warn('[API] retrieveUpdateData is deprecated, use setupPositionUpdates instead');
  // WebSocket liefert jetzt Updates automatisch
};

// Vehicle-ID aus Name ermitteln
// Im neuen System: Einfach den Namen als ID verwenden (Server unterstützt beliebige Namen)
export const retrieveVehicleId = async (
  vehicleName: string,
  _trackId: number
): Promise<number | null> => {
  // Generiere eine einfache numerische ID aus dem Fahrzeugnamen
  // In Zukunft könnte hier die VehicleList genutzt werden
  if (!vehicleName || vehicleName.trim() === '') {
    return null;
  }

  // Einfache Hash-Funktion für konsistente IDs
  let hash = 0;
  for (let i = 0; i < vehicleName.length; i++) {
    const char = vehicleName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) + 1; // Positive Zahl > 0
};

// Track-Liste abrufen (statisch, da wir nur einen Track haben)
export const retrieveTracks = async (
  setTracksCallback: React.Dispatch<React.SetStateAction<any[]>>
) => {
  // Statische Track-Liste für Malente-Lütjenburg
  setTracksCallback([{ id: 1, name: 'Malente-Lütjenburg' }]);
};
