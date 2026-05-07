import * as Location from 'expo-location';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Dispatch } from 'redux';
import { updateDistances } from '../effect-actions/trip-actions';
import { AppAction, AppActionType } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripAction, TripActionType } from '../redux/trip';
import { LOCAL_VEHICLE_ID, SIMULATION_VEHICLE_ID, MAX_GPS_ACCURACY, GPS_SPEED_RESET_TIMEOUT_MS, GPS_GAP_THRESHOLD_MS, MIN_DISTANCE_JITTER_FILTER, MAX_PLAUSIBLE_SPEED_MS } from '../constants';
import { calculateDistanceFromCoordinates, percentToDistance } from '../util/calculators';
import { processSpeed } from '../util/speed';
import { positionToPercentage, percentageToPosition } from '../util/track-loader';

const DIRECTION_CHANGE_THRESHOLD_METERS = 30;

interface UseGPSProcessingReturn {
  handleLocationUpdate: (loc: Location.LocationObject, knownPercentage?: number) => void;
  resetTracking: () => void;
}

export const useGPSProcessing = (): UseGPSProcessingReturn => {
  const dispatch = useDispatch<Dispatch<AppActionType | TripActionType>>();
  const store = useStore<ReduxAppState>();

  const lastLocationRef = useRef<Location.LocationObject | null>(null);
  const smoothedSpeedRef = useRef<number>(0);
  const speedResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const oppositeDistanceRef = useRef(0);
  const isPercentagePositionIncreasingRef = useRef<boolean | undefined>(undefined);
  const vehiclesRef = useRef(useSelector((state: ReduxAppState) => state.trip.vehicles));
  const lastSyncedPercentageRef = useRef<number | null>(null);
  const lastUpdateTimestampRef = useRef<number>(0);

  // Keep vehiclesRef in sync
  const vehicles = useSelector((state: ReduxAppState) => state.trip.vehicles);
  vehiclesRef.current = vehicles;

  const { isActive, currentVehicle, position } = useSelector(
    (state: ReduxAppState) => state.trip
  );
  const { track } = useSelector((state: ReduxAppState) => state.app);

  // Location update handler — GPS is primary data source during active trips
  const handleLocationUpdate = useCallback(
    async (loc: Location.LocationObject, knownPercentage?: number) => {
      // GPS accuracy gate: discard fixes with poor accuracy
      if (loc.coords.accuracy != null && loc.coords.accuracy > MAX_GPS_ACCURACY) {
        if (__DEV__) console.log(`[GPS] Discarded: accuracy ${loc.coords.accuracy}m > ${MAX_GPS_ACCURACY}m`);
        return;
      }

      dispatch(AppAction.setLocation(loc));

      const state = store.getState();
      const { isActive: tripActive, currentVehicle: tripVehicle } = state.trip;
      if (tripActive) {
        if (tripVehicle.id === LOCAL_VEHICLE_ID) {
          // Local mode: use raw GPS coordinates, no track projection
          const calculated = { lat: loc.coords.latitude, lng: loc.coords.longitude };
          dispatch(TripAction.setPosition({ percentage: null, calculated }));

          // Speed-Quelle: GPS-eigener Wert (loc.coords.speed) ist auf modernen iOS/Android-
          // Geräten zuverlässig und reagiert auch bei langsamen Bewegungen, bei denen die
          // Haversine-Berechnung scheitert (Distanz < accuracy). Haversine als Fallback,
          // wenn GPS keinen Speed liefert (-1 / null).
          let rawSpeedMs = 0;
          const gpsSpeedMs = loc.coords.speed;
          const hasValidGpsSpeed = gpsSpeedMs != null && gpsSpeedMs >= 0;

          // Bezugspunkt nur dann verschieben, wenn wir die Distanz auch akzeptiert haben
          // oder ein Gap einen Reset erfordert. Sonst gehen Bewegungen unterhalb des
          // Jitter-Filters verloren (expo-location liefert wegen timeInterval auch Updates
          // mit < 5 m Bewegung; die müssen sich kumulieren statt verworfen zu werden).
          let advanceLastLocation = false;

          if (lastLocationRef.current) {
            const distanceM = calculateDistanceFromCoordinates(
              lastLocationRef.current.coords.latitude,
              lastLocationRef.current.coords.longitude,
              loc.coords.latitude,
              loc.coords.longitude
            );
            const timeDeltaMs = loc.timestamp - lastLocationRef.current.timestamp;
            const timeDeltaS = timeDeltaMs / 1000;

            const isGap = timeDeltaMs > GPS_GAP_THRESHOLD_MS;
            const isSignificantMovement = distanceM >= MIN_DISTANCE_JITTER_FILTER;
            // Plausibilität: implizite Geschwindigkeit darf MAX_PLAUSIBLE_SPEED_MS nicht überschreiten
            // (filtert GPS-Sprünge nach Empfangsverlust). Akzeptiert Lücken, solange sie zu einer
            // realistischen Geschwindigkeit passen — so geht Distanz im Hintergrund nicht verloren.
            const isPlausible =
              timeDeltaS > 0 && distanceM / timeDeltaS <= MAX_PLAUSIBLE_SPEED_MS;
            const shouldAddDistance = isSignificantMovement && isPlausible;
            advanceLastLocation = shouldAddDistance || isGap;

            dispatch(TripAction.batchUpdate({
              addDistance: shouldAddDistance ? distanceM : undefined,
              lastPercentage: null,
              warnings: { nextVehicle: null, nextVehicleHeadingTowards: null, nextLevelCrossing: null, nextTurningPoint: null, secondTurningPoint: null },
            }));

            // Speed-Berechnung mit Fallback-Hierarchie:
            // 1. GPS-Speed (primär, funktioniert auch bei langsamer Fahrt)
            // 2. Haversine-Speed (Fallback bei iOS-Altgeräten / GPS ohne Speed)
            // Bei Gap (Hintergrund-Resume) auf 0 zurücksetzen.
            if (isGap) {
              smoothedSpeedRef.current = 0;
            } else if (hasValidGpsSpeed) {
              rawSpeedMs = gpsSpeedMs > MAX_PLAUSIBLE_SPEED_MS ? 0 : gpsSpeedMs;
            } else if (timeDeltaS > 0 && isSignificantMovement && isPlausible) {
              rawSpeedMs = distanceM / timeDeltaS;
            }
          } else {
            // Erstes Update: Referenzpunkt setzen
            advanceLastLocation = true;
            if (hasValidGpsSpeed) {
              rawSpeedMs = gpsSpeedMs > MAX_PLAUSIBLE_SPEED_MS ? 0 : gpsSpeedMs;
            }
          }
          smoothedSpeedRef.current = processSpeed(rawSpeedMs, smoothedSpeedRef.current);

          if (advanceLastLocation) {
            lastLocationRef.current = loc;
          }
        } else {
          // Normal mode: project GPS position onto track
          // Im Demo-Modus echtes GPS ignorieren (kommt ohne knownPercentage)
          if (tripVehicle.id === SIMULATION_VEHICLE_ID && knownPercentage == null) {
            return;
          }

          const percentage = knownPercentage ?? positionToPercentage(loc.coords.latitude, loc.coords.longitude);
          const calculated = percentageToPosition(percentage);
          dispatch(TripAction.setPosition({ percentage, calculated }));

          // Gap detection: bei großem Zeitsprung (z.B. App-Resume) lastPercentage
          // auf aktuelle Position setzen, damit updateDistances keinen Sprung berechnet
          const now = loc.timestamp;
          const prevTimestamp = lastUpdateTimestampRef.current;
          lastUpdateTimestampRef.current = now;
          const isGap = prevTimestamp > 0 && (now - prevTimestamp) > GPS_GAP_THRESHOLD_MS;

          if (isGap) {
            // Track-basierter Fallback: Distanz anhand der Track-Positionen berechnen,
            // da die Draisine nur auf dem Gleis fährt
            const lastPct = state.trip.position.percentage;
            const trackDistance = lastPct != null && track.length
              ? percentToDistance(track.length, Math.abs(percentage - lastPct))
              : undefined;

            dispatch(TripAction.batchUpdate({
              addDistance: trackDistance,
              lastPercentage: percentage,
              warnings: { nextVehicle: null, nextVehicleHeadingTowards: null, nextLevelCrossing: null, nextTurningPoint: null, secondTurningPoint: null },
            }));
            // Bei Gap (z.B. App-Resume aus Hintergrund) Geschwindigkeit zurücksetzen,
            // damit die EMA nicht mit veralteten Werten weiterläuft.
            smoothedSpeedRef.current = 0;
          }

          // GPS-Rohgeschwindigkeit (m/s) mit Plausibilitäts-Cap: Spikes nach
          // Empfangsverlust (Tunnel/Wald) verwerfen statt in den Tacho durchzulassen.
          const rawTrackSpeedMs = loc.coords.speed ?? 0;
          const sanitizedTrackSpeedMs =
            rawTrackSpeedMs > MAX_PLAUSIBLE_SPEED_MS ? 0 : rawTrackSpeedMs;
          smoothedSpeedRef.current = processSpeed(
            sanitizedTrackSpeedMs,
            smoothedSpeedRef.current
          );

          // Distance: handled by updateDistances() via position.percentage changes
        }

        // smoothedSpeedRef ist in m/s; Redux/UI erwarten km/h.
        dispatch(TripAction.setMotion({ speed: smoothedSpeedRef.current * 3.6 }));

        // Reset speed to 0 if no GPS update arrives within timeout. Greift in allen
        // Modi mit echtem GPS — im Stillstand pausiert expo-location die Updates
        // (distanceInterval), wodurch sonst der letzte geglättete Wert hängenbleibt.
        // Simulation-Mode ausnehmen, da dort Geschwindigkeit aus useTripSimulation kommt.
        if (tripVehicle.id !== SIMULATION_VEHICLE_ID) {
          if (speedResetTimerRef.current) clearTimeout(speedResetTimerRef.current);
          speedResetTimerRef.current = setTimeout(() => {
            smoothedSpeedRef.current = 0;
            dispatch(TripAction.setMotion({ speed: 0 }));
          }, GPS_SPEED_RESET_TIMEOUT_MS);
        }
      }
    },
    [dispatch, store]
  );

  // Sync percentagePosition and calculated position from own vehicle in vehicles array
  useEffect(() => {
    // During active trip, position comes from GPS — skip WebSocket sync
    if (!isActive && currentVehicle.id != null && vehicles.length > 0) {
      const myVehicle = vehicles.find((v) => v.id === currentVehicle.id);
      if (myVehicle && myVehicle.percentagePosition !== lastSyncedPercentageRef.current) {
        lastSyncedPercentageRef.current = myVehicle.percentagePosition;
        dispatch(
          TripAction.setPosition({
            percentage: myVehicle.percentagePosition,
            calculated: myVehicle.pos,
          })
        );
      }
    }
  }, [vehicles, currentVehicle.id, isActive]);

  // Calculate distances and direction
  useEffect(() => {
    if (position.percentage != null) {
      if (position.lastPercentage != null && position.lastPercentage !== position.percentage) {
        const movingForward = position.percentage > position.lastPercentage;
        const delta = Math.abs(position.percentage - position.lastPercentage);
        const deltaMeters = percentToDistance(track.length ?? 0, delta);

        if (isPercentagePositionIncreasingRef.current === undefined) {
          // First movement — set direction immediately
          isPercentagePositionIncreasingRef.current = movingForward;
          oppositeDistanceRef.current = 0;
        } else if (movingForward === isPercentagePositionIncreasingRef.current) {
          // Same direction — reset accumulator
          oppositeDistanceRef.current = 0;
        } else {
          // Opposite direction — accumulate distance
          oppositeDistanceRef.current += deltaMeters;
          if (oppositeDistanceRef.current >= DIRECTION_CHANGE_THRESHOLD_METERS) {
            isPercentagePositionIncreasingRef.current = movingForward;
            oppositeDistanceRef.current = 0;
          }
        }
      }

      if (isActive) {
        updateDistances(
          dispatch,
          track.length,
          position.percentage,
          position.lastPercentage,
          track.pointsOfInterest,
          vehiclesRef.current,
          isPercentagePositionIncreasingRef.current,
          currentVehicle.id
        );
      }
    }
  }, [position.percentage, isActive, track.length, track.pointsOfInterest, currentVehicle.id, dispatch]);

  // Cleanup speed reset timer on unmount
  useEffect(() => {
    return () => {
      if (speedResetTimerRef.current) clearTimeout(speedResetTimerRef.current);
    };
  }, []);

  const resetTracking = useCallback(() => {
    lastLocationRef.current = null;
    smoothedSpeedRef.current = 0;
    lastUpdateTimestampRef.current = 0;
    if (speedResetTimerRef.current) {
      clearTimeout(speedResetTimerRef.current);
      speedResetTimerRef.current = null;
    }
  }, []);

  return { handleLocationUpdate, resetTracking };
};
