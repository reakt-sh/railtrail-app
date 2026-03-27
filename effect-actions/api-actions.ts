import { Dispatch } from 'redux';
import { positionSocket } from '../api/websocket';
import { AppAction, AppActionType } from '../redux/app';
import { TripAction, TripActionType } from '../redux/trip';
import { MapPosition } from '../types/map-position';
import { Vehicle } from '../types/vehicle';
import { SIMULATION_VEHICLE_ID } from '../hooks/useTripSimulation';
import { malenteLuetjenburgTrack, positionToPercentage } from '../util/track-loader';

// Initialisiert die App mit statischen Track-Daten und WebSocket-Verbindung
export const initializeApp = (dispatch: Dispatch<AppActionType>) => {
  if (__DEV__) console.log('[Init] Initializing app...');

  // Track-Daten laden
  const track = malenteLuetjenburgTrack;
  if (__DEV__) {
    console.log(
      `[Init] Loaded track: ${track.name} (${track.length}m, ${track.pointsOfInterest.length} POIs)`
    );
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

// Timeout für Loading-State (falls keine Draisinen verfügbar sind)
const LOADING_TIMEOUT_MS = 5000;

// Debounce für Loading-State: Warte bis keine neuen Fahrzeuge mehr kommen
const LOADING_DEBOUNCE_MS = 1500;

// Richtet WebSocket-Updates ein und konvertiert MapPosition zu Vehicle-Format
export const setupPositionUpdates = (dispatch: Dispatch<TripActionType>): (() => void) => {
  let loadingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let loadingDebounceId: ReturnType<typeof setTimeout> | null = null;
  let knownVehicleIds = new Set<number>();

  // Start loading state
  dispatch(TripAction.setLoadingVehicles(true));

  // Timeout: Loading nach 5 Sekunden beenden, falls keine Fahrzeuge kommen
  loadingTimeoutId = setTimeout(() => {
    if (knownVehicleIds.size === 0) {
      if (__DEV__) console.log('[WebSocket] Loading timeout - no vehicles received');
      dispatch(TripAction.setLoadingVehicles(false));
    }
  }, LOADING_TIMEOUT_MS);

  // Bei Reconnect: Fahrzeuge leeren (außer Demo), damit frische Daten kommen
  const unsubscribeReconnect = positionSocket.onReconnect(() => {
    if (__DEV__) console.log('[WebSocket] Reconnected - clearing vehicle cache (keeping Demo)');
    // Vehicles werden geleert, aber Demo wird behalten
    dispatch(TripAction.clearVehiclesExceptDemo());
    lastPositions.clear();
    // Loading state und Tracking zurücksetzen bei Reconnect
    knownVehicleIds.clear();
    if (loadingDebounceId) {
      clearTimeout(loadingDebounceId);
      loadingDebounceId = null;
    }
    dispatch(TripAction.setLoadingVehicles(true));
    // Neuer Timeout starten
    if (loadingTimeoutId) clearTimeout(loadingTimeoutId);
    loadingTimeoutId = setTimeout(() => {
      if (knownVehicleIds.size === 0) {
        dispatch(TripAction.setLoadingVehicles(false));
      }
    }, LOADING_TIMEOUT_MS);
  });

  const unsubscribePositions = positionSocket.subscribe((mapPosition: MapPosition) => {
    const currentPos = mapPosition.latitude != null && mapPosition.longitude != null
      ? positionToPercentage(mapPosition.latitude, mapPosition.longitude)
      : mapPosition.position * 100; // Fallback wenn keine Koordinaten
    const lastPos = lastPositions.get(mapPosition.vehicle);

    // Nur Geschwindigkeit > 0 wenn Position sich tatsächlich geändert hat
    const positionChanged =
      lastPos === undefined || Math.abs(currentPos - lastPos) > POSITION_CHANGE_THRESHOLD;
    const effectiveSpeed = positionChanged ? mapPosition.speed : 0;

    // Fahrtrichtung aus aufeinanderfolgenden Positionen bestimmen
    const isDirectionIncreasing = lastPos !== undefined && positionChanged
      ? currentPos > lastPos
      : undefined;

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
      label: mapPosition.label?.replace(/^0+/, '') || mapPosition.label,
      isDirectionIncreasing,
    };

    // Vehicles-Array aktualisieren
    dispatch(
      TripAction.updateVehicleFromWebSocket({
        vehicle,
        speed: effectiveSpeed,
      })
    );

    // Debounce: Bei neuem Fahrzeug Timer zurücksetzen (Demo ignorieren)
    const isNewVehicle = !knownVehicleIds.has(mapPosition.vehicle);
    if (isNewVehicle && mapPosition.vehicle !== SIMULATION_VEHICLE_ID) {
      knownVehicleIds.add(mapPosition.vehicle);

      // Debounce: Timer zurücksetzen bei jedem neuen Fahrzeug
      if (loadingDebounceId) {
        clearTimeout(loadingDebounceId);
      }
      loadingDebounceId = setTimeout(() => {
        dispatch(TripAction.setLoadingVehicles(false));
        if (loadingTimeoutId) {
          clearTimeout(loadingTimeoutId);
          loadingTimeoutId = null;
        }
        if (__DEV__) console.log(`[WebSocket] Loading complete - ${knownVehicleIds.size} vehicles loaded`);
      }, LOADING_DEBOUNCE_MS);
    }
  });

  // Cleanup function
  return () => {
    unsubscribeReconnect();
    unsubscribePositions();
    if (loadingTimeoutId) {
      clearTimeout(loadingTimeoutId);
    }
    if (loadingDebounceId) {
      clearTimeout(loadingDebounceId);
    }
    knownVehicleIds.clear();
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
