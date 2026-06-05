import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Dispatch } from 'redux';
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
import {
  useElapsedTime,
  useGPSProcessing,
  useLocationTracking,
  useMapCamera,
  usePostTripFlow,
  useTranslation,
  useTripLifecycle,
  useTripSimulation,
} from '../hooks';
import { DEMO_MODE_ENABLED, SIMULATION_VEHICLE_ID } from '../constants';
import { AppActionType } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripActionType } from '../redux/trip';

export const HomeScreen = () => {
  const mapRef = useRef<MapLibreGL.MapViewRef>(null);
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

  const { startForegroundTracking, stopTracking, requestBackgroundAndSwitch } = useLocationTracking();
  const { registerDemoVehicle, registerLocalVehicle, startSimulation, stopSimulation } = useTripSimulation();
  const { handleLocationUpdate, resetTracking } = useGPSProcessing();

  const {
    isSummaryVisible,
    isFeedbackVisible,
    pendingTripData,
    setPendingTripData,
    showSummary,
    handleSummaryContinue,
    handleFeedbackSubmit,
    handleFeedbackSkip,
  } = usePostTripFlow();

  const {
    isVehicleSelectionVisible,
    setIsVehicleSelectionVisible,
    isChangeVehicleIdBottomSheetVisible,
    setIsChangeVehicleIdBottomSheetVisible,
    handleStartTrip,
    handleStopTrip,
    handleStartVehicleSelect,
    handleChangeVehicle,
  } = useTripLifecycle({
    setIsFollowingUser,
    centerOnPosition,
    startForegroundTracking,
    stopTracking,
    requestBackgroundAndSwitch,
    startSimulation,
    stopSimulation,
    handleLocationUpdate,
    resetTracking,
    setPendingTripData,
    showSummary,
  });

  // POI tooltip state
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

  // Initialize app and WebSocket connection
  useEffect(() => {
    initializeApp(dispatch);
    const unsubscribePositions = setupPositionUpdates(dispatch);

    if (permissions.foreground) {
      startForegroundTracking(handleLocationUpdate);
    }

    // Register Demo and Lokal vehicles so they appear in vehicle selection
    if (DEMO_MODE_ENABLED) {
      registerDemoVehicle();
      registerLocalVehicle();
    }

    return () => {
      unsubscribePositions();
      disconnectFromServer();
    };
  }, []);

  // Resubscribe to foreground location updates when app returns from background
  // (nur wenn kein aktiver Trip läuft — aktive Trips nutzen Background-Tracking)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        const state = store.getState();
        const isSimulation = state.trip.currentVehicle.id === SIMULATION_VEHICLE_ID;
        // Während eines aktiven Trips läuft Background-Tracking — kein Foreground-Restart nötig
        if (!isSimulation && !state.trip.isActive && permissions.foreground) {
          startForegroundTracking(handleLocationUpdate);
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [startForegroundTracking, handleLocationUpdate, permissions.foreground, store]);

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

  // Event handlers
  const handleLocationButtonClick = useCallback(() => {
    onLocationButtonClicked(location ? { ...location.coords } : null);
  }, [location, onLocationButtonClicked]);

  const handleOpenDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

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

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Minimal trip overlay - replaces TripHeader */}
      {isActive && (
        <MinimalTripOverlay
          speed={motion.speed}
          elapsedTime={elapsedTime}
          distance={motion.distanceTravelled}
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
