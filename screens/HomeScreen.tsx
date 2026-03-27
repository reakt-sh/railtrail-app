import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import * as Location from 'expo-location';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Dispatch } from 'redux';
import { submitFeedback } from '../api/feedback';
import {
  FeedbackBottomSheet,
  LoadingVehiclesOverlay,
  MinimalTripOverlay,
  POITooltip,
  TrackMapView,
  TripControls,
  TripSummaryModal,
  VehicleSelectionBottomSheet,
} from '../components';
import {
  disconnectFromServer,
  initializeApp,
  setupPositionUpdates,
} from '../effect-actions/api-actions';
import { updateDistances } from '../effect-actions/trip-actions';
import { getVehicleWithLongestDistance, saveTrip } from '../effect-actions/trip-storage';
import {
  useElapsedTime,
  useLocationTracking,
  useMapCamera,
  useTranslation,
  useTripSimulation,
} from '../hooks';
import { SIMULATION_VEHICLE_ID } from '../hooks/useTripSimulation';
import { AppAction, AppActionType } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripAction, TripActionType } from '../redux/trip';
import { SavedTrip, VehicleSegment } from '../types/saved-trip';
import { Vehicle } from '../types/vehicle';
import {
  MAX_GPS_ACCURACY,
  MIN_DISTANCE_JITTER_FILTER,
  SPEED_SMOOTHING_ALPHA,
  STILLSTAND_THRESHOLD_KMH,
} from '../constants';
import { calculateDistanceFromCoordinates, percentToDistance } from '../util/calculators';
import { AppEvents, events } from '../util/events';

export const HomeScreen = () => {
  const mapRef = useRef<MapLibreGL.MapViewRef>(null);
  const tripStartTimeRef = useRef<string | null>(null);
  const dispatch = useDispatch<Dispatch<AppActionType | TripActionType>>();
  const store = useStore<ReduxAppState>();
  const navigation = useNavigation();
  const localizedStrings = useTranslation();

  useKeepAwake();

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('dark');
    }, [])
  );

  const lastLocationRef = useRef<Location.LocationObject | null>(null);
  const smoothedSpeedRef = useRef<number>(0);
  const isDemoRef = useRef(false);
  const oppositeDistanceRef = useRef(0);
  const isPercentagePositionIncreasingRef = useRef<boolean | undefined>(undefined);
  const DIRECTION_CHANGE_THRESHOLD_METERS = 30;

  // Custom hooks
  const {
    cameraRef,
    isFollowingUser,
    isFollowingVehicle,
    userHasInteracted,
    currentCameraCenter,
    cameraHeading,
    zoomLevel,
    visibleBounds,
    setIsFollowingUser,
    animateCamera,
    onLocationButtonClicked,
    onRegionChange,
    onUserInteraction,
    centerOnPosition,
  } = useMapCamera();

  const { startForegroundTracking, stopTracking } = useLocationTracking();

  const { registerDemoVehicle, startSimulation, stopSimulation } = useTripSimulation();

  // Bottom sheet visibility
  const [isVehicleSelectionVisible, setIsVehicleSelectionVisible] = useState(false);
  const [isChangeVehicleIdBottomSheetVisible, setIsChangeVehicleIdBottomSheetVisible] =
    useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [pendingTripData, setPendingTripData] = useState<SavedTrip | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [tooltipScreenPos, setTooltipScreenPos] = useState<{ x: number; y: number } | null>(null);

  // Redux state
  const { track, location, permissions } = useSelector((state: ReduxAppState) => state.app);
  const {
    isActive,
    currentVehicle,
    warnings,
    motion,
    position,
    vehicles,
    tripStartTime,
    isLoadingVehicles,
  } = useSelector((state: ReduxAppState) => state.trip);

  // Elapsed time hook - uses Redux tripStartTime
  const elapsedTime = useElapsedTime(tripStartTime);

  // Location update handler — also bridges GPS to demo vehicle during active trip
  const handleLocationUpdate = useCallback(
    async (loc: Location.LocationObject) => {
      // GPS accuracy gate: discard fixes with poor accuracy
      if (loc.coords.accuracy != null && loc.coords.accuracy > MAX_GPS_ACCURACY) return;

      dispatch(AppAction.setLocation(loc));

      // During active demo trip: use real GPS for speed + distance
      const state = store.getState();
      const { isActive: tripActive, currentVehicle: cv } = state.trip;
      if (tripActive && cv.id === 99) {
        // Speed from GPS (m/s → km/h)
        const rawSpeedKmh = (loc.coords.speed ?? 0) >= 0
          ? (loc.coords.speed ?? 0) * 3.6
          : 0;

        // Stillstand threshold
        const speedKmh = rawSpeedKmh < STILLSTAND_THRESHOLD_KMH ? 0 : rawSpeedKmh;

        // EMA smoothing
        smoothedSpeedRef.current =
          SPEED_SMOOTHING_ALPHA * speedKmh + (1 - SPEED_SMOOTHING_ALPHA) * smoothedSpeedRef.current;

        // Post-EMA stillstand safety net: snap to 0 once smoothed value decays below threshold
        if (smoothedSpeedRef.current < STILLSTAND_THRESHOLD_KMH) {
          smoothedSpeedRef.current = 0;
        }

        // Distance from last GPS position
        const lastLoc = lastLocationRef.current;
        if (lastLoc) {
          const dist = calculateDistanceFromCoordinates(
            lastLoc.coords.latitude,
            lastLoc.coords.longitude,
            loc.coords.latitude,
            loc.coords.longitude
          );
          if (dist > MIN_DISTANCE_JITTER_FILTER) {
            dispatch(TripAction.addDistance(dist));
          }
        }

        // Update demo vehicle speed with smoothed value
        dispatch(TripAction.setMotion({ speed: smoothedSpeedRef.current }));
        lastLocationRef.current = loc;
      }
    },
    [dispatch, store]
  );

  // Initialize app and WebSocket connection
  useEffect(() => {
    initializeApp(dispatch);
    const unsubscribePositions = setupPositionUpdates(dispatch);

    if (permissions.foreground) {
      startForegroundTracking(handleLocationUpdate);
    }

    // Register Demo vehicle so it appears in vehicle selection
    registerDemoVehicle();

    return () => {
      unsubscribePositions();
      disconnectFromServer();
    };
  }, []);

  // Listen for vehicle change event from drawer
  useEffect(() => {
    const unsubscribe = events.on(AppEvents.SHOW_VEHICLE_CHANGE, () => {
      setIsChangeVehicleIdBottomSheetVisible(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Ref to access latest vehicles without adding it as effect dependency
  const vehiclesRef = useRef(vehicles);
  vehiclesRef.current = vehicles;

  // Sync percentagePosition and calculated position from own vehicle in vehicles array
  const lastSyncedPercentageRef = useRef<number | null>(null);

  useEffect(() => {
    if (currentVehicle.id != null && vehicles.length > 0) {
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
  }, [vehicles, currentVehicle.id]);

  // Camera animation: follow user GPS location (during active trip)
  useEffect(() => {
    if (isFollowingUser && location) {
      animateCamera(location.coords.latitude, location.coords.longitude, location.coords.heading);
    }
  }, [location, isFollowingUser]);

  // Camera animation: follow vehicle marker (no active trip, observing other draisines)
  useEffect(() => {
    if (isFollowingVehicle && !isActive) {
      const vehicleToFollow =
        currentVehicle.id != null ? vehicles.find((v) => v.id === currentVehicle.id) : vehicles[0];

      if (vehicleToFollow) {
        animateCamera(
          vehicleToFollow.pos.lat,
          vehicleToFollow.pos.lng,
          vehicleToFollow.heading ?? 0
        );
      }
    }
  }, [vehicles, currentVehicle.id, isFollowingVehicle, isActive]);

  // Trip start/stop - foreground tracking is already running, no changes needed

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

  // Event handlers
  const handleLocationButtonClick = useCallback(() => {
    onLocationButtonClicked(location ? { ...location.coords } : null);
  }, [location, onLocationButtonClicked]);

  const handleOpenDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const handleStopTrip = useCallback(() => {
    Alert.alert(
      localizedStrings.t('homeDialogEndTripTitle'),
      localizedStrings.t('homeDialogEndTripMessage'),
      [
        { text: localizedStrings.t('alertNo'), onPress: () => {} },
        {
          text: localizedStrings.t('alertYes'),
          onPress: () => {
            const state = store.getState();
            const {
              currentVehicle: vehicle,
              activeSegment,
              completedSegments,
              motion,
            } = state.trip;
            const startTime = tripStartTimeRef.current ?? new Date().toISOString();
            const endTime = new Date().toISOString();

            // Build segments array: completed segments + finalized active segment
            const segments: VehicleSegment[] = [...completedSegments];
            if (activeSegment) {
              segments.push({
                vehicleId: activeSegment.vehicleId,
                vehicleName: activeSegment.vehicleName,
                startTime: activeSegment.startTime,
                endTime,
                distanceTravelled: motion.distanceTravelled - activeSegment.startDistance,
              });
            }

            // Build complete SavedTrip object
            const savedTrip: SavedTrip = {
              id: `trip_${Date.now()}`,
              startTime,
              endTime,
              totalDistance: motion.distanceTravelled,
              segments,
              vehicleId: vehicle.id ?? undefined,
              vehicleName: vehicle.name ?? undefined,
            };

            // Stop the trip immediately
            dispatch(TripAction.stop());
            tripStartTimeRef.current = null;

            // If demo trip, stop simulation and restart real GPS
            if (isDemoRef.current) {
              stopSimulation();
              startForegroundTracking(handleLocationUpdate);
              isDemoRef.current = false;
            }

            // Show trip summary, then feedback
            setPendingTripData(savedTrip);
            setIsSummaryVisible(true);
          },
        },
      ]
    );
  }, [localizedStrings, store, dispatch]);

  const handleStartTrip = useCallback(() => {
    setIsVehicleSelectionVisible(true);
  }, []);

  const handleStartVehicleSelect = useCallback(
    (vehicle: Vehicle) => {
      const vehicleName = vehicle.label ?? `Draisine ${vehicle.id}`;
      tripStartTimeRef.current = new Date().toISOString();
      lastLocationRef.current = null; // Reset GPS distance tracking
      smoothedSpeedRef.current = 0; // Reset EMA speed
      dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicleName));
      dispatch(TripAction.startSegment(vehicle.id, vehicleName));
      dispatch(TripAction.start());
      setIsFollowingUser(true);

      if (vehicle.id === SIMULATION_VEHICLE_ID) {
        isDemoRef.current = true;
        stopTracking(); // Stop real GPS
        startSimulation(handleLocationUpdate); // Feed simulated positions
      } else {
        isDemoRef.current = false;
      }

      // Zoom to vehicle position
      centerOnPosition(vehicle.pos.lat, vehicle.pos.lng, vehicle.heading ?? 0, 17);
    },
    [dispatch, setIsFollowingUser, centerOnPosition, stopTracking, startSimulation, handleLocationUpdate]
  );

  const handleChangeVehicle = useCallback(
    (vehicle: Vehicle) => {
      const vehicleName = vehicle.label ?? `Draisine ${vehicle.id}`;
      dispatch(TripAction.endSegment());
      dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicleName));
      dispatch(TripAction.startSegment(vehicle.id, vehicleName));
    },
    [dispatch]
  );

  const handleSummaryContinue = useCallback(() => {
    setIsSummaryVisible(false);
    setIsFeedbackVisible(true);
  }, []);

  const handleFeedbackSubmit = useCallback(
    async (rating: number, text?: string) => {
      if (pendingTripData) {
        const vehicleId = getVehicleWithLongestDistance(pendingTripData.segments);
        if (vehicleId) {
          await submitFeedback({ rating, text, vehicle: vehicleId });
        }
        await saveTrip(dispatch, pendingTripData);
      }
      setIsFeedbackVisible(false);
      setPendingTripData(null);
    },
    [pendingTripData, dispatch]
  );

  const handlePOIPress = useCallback(
    async (index: number) => {
      if (activeTooltip === index) {
        setActiveTooltip(null);
        setTooltipScreenPos(null);
        return;
      }
      const poi = track.pointsOfInterest[index];
      if (!poi) return;
      setActiveTooltip(index);
      try {
        const point = await mapRef.current?.getPointInView([poi.pos.lng, poi.pos.lat]);
        if (point) {
          setTooltipScreenPos({ x: point[0], y: point[1] });
        }
      } catch {
        setTooltipScreenPos(null);
      }
    },
    [activeTooltip, track.pointsOfInterest]
  );

  const dismissTooltip = useCallback(() => {
    setActiveTooltip(null);
    setTooltipScreenPos(null);
  }, []);

  const handleFeedbackSkip = useCallback(async () => {
    if (pendingTripData) {
      await saveTrip(dispatch, pendingTripData);
    }
    setIsFeedbackVisible(false);
    setPendingTripData(null);
  }, [pendingTripData, dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Minimal trip overlay - replaces TripHeader */}
      {isActive && (
        <MinimalTripOverlay
          speed={motion.speed}
          elapsedTime={elapsedTime}
          onPress={handleOpenDrawer}
          onStopTrip={handleStopTrip}
        />
      )}

      <TrackMapView
        mapRef={mapRef}
        cameraRef={cameraRef}
        onRegionChange={onRegionChange}
        onUserInteraction={onUserInteraction}
        userHasInteracted={userHasInteracted}
        currentCameraCenter={currentCameraCenter}
        location={location}
        calculatedPosition={position.calculated}
        pointsOfInterest={track.pointsOfInterest}
        vehicles={vehicles}
        passingPosition={position.passing}
        track={track.path}
        zoomLevel={zoomLevel}
        mapHeading={cameraHeading}
        visibleBounds={visibleBounds}
        isActive={isActive}
        currentVehicleId={currentVehicle.id}
        activeTooltip={activeTooltip}
        onPOIPress={handlePOIPress}
        onDismissTooltip={dismissTooltip}
      />

      {activeTooltip != null && tooltipScreenPos && (
        <View
          pointerEvents="box-none"
          style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}
        >
          <View
            style={{
              position: 'absolute',
              left: tooltipScreenPos.x,
              top: tooltipScreenPos.y,
              transform: [{ translateX: '-50%' }, { translateY: '-100%' }],
              marginTop: -20,
            }}
          >
            <POITooltip
              name={track.pointsOfInterest[activeTooltip].name}
              type={track.pointsOfInterest[activeTooltip].typeId}
              originalType={track.pointsOfInterest[activeTooltip].originalType}
              description={track.pointsOfInterest[activeTooltip].description}
            />
          </View>
        </View>
      )}

      {isLoadingVehicles && <LoadingVehiclesOverlay />}

      <TripControls
        isActive={isActive}
        isFollowingUser={isFollowingUser}
        onLocationButtonClick={handleLocationButtonClick}
        onStartTrip={handleStartTrip}
        warnings={warnings}
        speed={motion.speed}
        localizedStrings={localizedStrings}
      />

      {/* Vehicle selection for starting trip */}
      <VehicleSelectionBottomSheet
        isVisible={isVehicleSelectionVisible}
        setIsVisible={setIsVehicleSelectionVisible}
        title={localizedStrings.t('bottomSheetVehicleId')}
        subtitle={
          vehicles.length > 0
            ? localizedStrings.t('bottomSheetSelectVehicle')
            : localizedStrings.t('bottomSheetNoVehicles')
        }
        vehicles={vehicles}
        onVehicleSelected={handleStartVehicleSelect}
      />

      {/* Change vehicle during trip */}
      <VehicleSelectionBottomSheet
        isVisible={isChangeVehicleIdBottomSheetVisible}
        setIsVisible={setIsChangeVehicleIdBottomSheetVisible}
        title={localizedStrings.t('bottomSheetVehicleId')}
        subtitle={localizedStrings.t('bottomSheetChangeVehicleId')}
        vehicles={vehicles}
        excludeVehicleId={currentVehicle.id}
        onVehicleSelected={handleChangeVehicle}
      />

      {/* Trip summary after trip ends */}
      <TripSummaryModal
        isVisible={isSummaryVisible}
        tripData={pendingTripData}
        onContinue={handleSummaryContinue}
      />

      {/* Feedback after summary */}
      <FeedbackBottomSheet
        isVisible={isFeedbackVisible}
        onSubmit={handleFeedbackSubmit}
        onSkip={handleFeedbackSkip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
