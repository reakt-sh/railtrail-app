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

// Track letzte Positionen für Geschwindigkeits-Validierung
// (GPS kann Geschwindigkeit > 0 melden obwohl Fahrzeug stationär ist)
const lastPositions = new Map<number, number>();

// Schwellwert für Positionsänderung (in Prozent der Strecke)
const POSITION_CHANGE_THRESHOLD = 0.001;

// Demo vehicle ID (should not be cleared on reconnect)
const DEMO_VEHICLE_ID = 99;

// Richtet WebSocket-Updates ein und konvertiert MapPosition zu Vehicle-Format
export const setupPositionUpdates = (dispatch: Dispatch): (() => void) => {
  // Bei Reconnect: Fahrzeuge leeren (außer Demo), damit frische Daten kommen
  const unsubscribeReconnect = positionSocket.onReconnect(() => {
    if (__DEV__) console.log('[WebSocket] Reconnected - clearing vehicle cache (keeping Demo)');
    // Vehicles werden geleert, aber Demo wird behalten
    dispatch(TripAction.clearVehiclesExceptDemo());
    lastPositions.clear();
  });

  const unsubscribePositions = positionSocket.subscribe((mapPosition: MapPosition) => {
    const currentPos = mapPosition.position * 100; // 0-1 zu 0-100
    const lastPos = lastPositions.get(mapPosition.vehicle);

    // Nur Geschwindigkeit > 0 wenn Position sich tatsächlich geändert hat
    const positionChanged =
      lastPos === undefined || Math.abs(currentPos - lastPos) > POSITION_CHANGE_THRESHOLD;
    const effectiveSpeed = positionChanged ? mapPosition.speed : 0;

    // Letzte Position speichern
    lastPositions.set(mapPosition.vehicle, currentPos);

    // MapPosition zu Vehicle-Format konvertieren für die bestehende UI
    const vehicle: Vehicle = {
      id: mapPosition.vehicle,
      pos: {
        lat: mapPosition.latitude ?? 0,
        lng: mapPosition.longitude ?? 0,
      },
      percentagePosition: currentPos,
      heading: mapPosition.heading,
      headingTowardsUser: undefined, // Wird ggf. später berechnet
      label: mapPosition.label,
    };

    // Vehicles-Array aktualisieren
    dispatch(
      TripAction.updateVehicleFromWebSocket({
        vehicle,
        speed: effectiveSpeed,
      })
    );
  });

  // Cleanup function
  return () => {
    unsubscribeReconnect();
    unsubscribePositions();
  };
};

// Beendet die WebSocket-Verbindung
export const disconnectFromServer = () => {
  positionSocket.disconnect();
};

// Erzwingt eine Neuverbindung zum WebSocket (lädt Fahrzeuge neu)
export const reloadVehicles = () => {
  positionSocket.forceReconnect();
};
