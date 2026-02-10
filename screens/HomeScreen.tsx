import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { useKeepAwake } from 'expo-keep-awake';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { TrackMapView, TripControls, TripHeader, VehicleSelectionBottomSheet } from '../components';
import {
  disconnectFromServer,
  initializeApp,
  setupPositionUpdates,
} from '../effect-actions/api-actions';
import { getBackgroundPermissionStatus } from '../effect-actions/permissions';
import { updateDistances } from '../effect-actions/trip-actions';
import { saveAndStopTrip } from '../effect-actions/trip-storage';
import { useLocationTracking, useMapCamera, useTranslation, useTripSimulation } from '../hooks';
import { AppAction } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { Vehicle } from '../types/vehicle';

export const HomeScreen = () => {
  const mapRef = useRef<MapLibreGL.MapViewRef>(null);
  const tripStartTimeRef = useRef<string | null>(null);
  const dispatch = useDispatch();
  const store = useStore<ReduxAppState>();
  const localizedStrings = useTranslation();

  useKeepAwake();

  // Custom hooks
  const {
    cameraRef,
    isFollowingUser,
    isFollowingVehicle,
    cameraHeading,
    useSmallMarker,
    setIsFollowingVehicle,
    animateCamera,
    onLocationButtonClicked,
    onRegionChange,
    centerOnPosition,
  } = useMapCamera();

  const { startForegroundTracking, stopTracking, requestBackgroundAndSwitch } =
    useLocationTracking();

  const { startSimulation, stopSimulation } = useTripSimulation();

  // Bottom sheet visibility
  const [isStartTripBottomSheetVisible, setIsStartTripBottomSheetVisible] = useState(false);
  const [isChangeVehicleIdBottomSheetVisible, setIsChangeVehicleIdBottomSheetVisible] =
    useState(false);

  // Direction tracking
  const [isPercentagePositionIncreasing, setIsPercentagePositionIncreasing] = useState<
    boolean | undefined
  >(undefined);

  // Redux state
  const { track, location, permissions } = useSelector((state: ReduxAppState) => state.app);
  const { isActive, currentVehicle, warnings, motion, position, vehicles } = useSelector(
    (state: ReduxAppState) => state.trip
  );

  // Location update handler
  const handleLocationUpdate = useCallback(
    async (loc: Location.LocationObject) => {
      dispatch(AppAction.setLocation(loc));
    },
    [dispatch]
  );

  // Initialize app and WebSocket connection
  useEffect(() => {
    initializeApp(dispatch);
    const unsubscribePositions = setupPositionUpdates(dispatch);

    if (permissions.foreground) {
      startForegroundTracking(handleLocationUpdate);
      getBackgroundPermissionStatus().then((result) => {
        dispatch(AppAction.setPermissions({ background: result }));
      });
    }

    // Auto-start simulation in dev mode
    if (__DEV__) {
      startSimulation();
    }

    return () => {
      unsubscribePositions();
      disconnectFromServer();
      if (__DEV__) {
        stopSimulation();
      }
    };
  }, []);

  // Sync percentagePosition and calculated position from own vehicle in vehicles array
  useEffect(() => {
    if (currentVehicle.id != null && vehicles.length > 0) {
      const myVehicle = vehicles.find((v) => v.id === currentVehicle.id);
      if (myVehicle) {
        dispatch(TripAction.setPosition({
          percentage: myVehicle.percentagePosition,
          calculated: myVehicle.pos,
        }));
      }
    }
  }, [vehicles, currentVehicle.id]);

  // Camera animation: follow vehicle position OR user GPS location
  useEffect(() => {
    if (isFollowingVehicle) {
      // If trip is active, follow own vehicle; otherwise follow first available vehicle
      const vehicleToFollow = currentVehicle.id != null
        ? vehicles.find((v) => v.id === currentVehicle.id)
        : vehicles[0];

      if (vehicleToFollow) {
        animateCamera(vehicleToFollow.pos.lat, vehicleToFollow.pos.lng, vehicleToFollow.heading ?? 0);
      }
    } else if (isFollowingUser && location) {
      animateCamera(location.coords.latitude, location.coords.longitude, location.coords.heading);
    }
  }, [location, vehicles, currentVehicle.id, isFollowingUser, isFollowingVehicle]);

  // Handle trip start/stop
  useEffect(() => {
    if (!isActive) {
      if (permissions.background) {
        stopTracking();
        startForegroundTracking(handleLocationUpdate);
      }
      return;
    }

    if (permissions.foreground) {
      requestBackgroundAndSwitch(handleLocationUpdate);
    }
  }, [isActive]);

  // Calculate distances and direction
  useEffect(() => {
    if (position.percentage != null) {
      if (position.lastPercentage != null && position.lastPercentage !== position.percentage) {
        setIsPercentagePositionIncreasing(position.percentage > position.lastPercentage);
      }

      if (isActive) {
        updateDistances(
          dispatch,
          track.length,
          position.percentage,
          position.lastPercentage,
          track.pointsOfInterest,
          vehicles,
          isPercentagePositionIncreasing,
          currentVehicle.id
        );
      }
    }
  }, [position.percentage]);

  // Event handlers
  const handleLocationButtonClick = useCallback(() => {
    onLocationButtonClicked(location ? { ...location.coords } : null);
  }, [location, onLocationButtonClicked]);

  const handleCenterOnVehicle = useCallback(() => {
    const currentState = store.getState();
    const vehicleId = currentState.trip.currentVehicle.id;
    const allVehicles = currentState.trip.vehicles;

    // Follow own vehicle if trip is active, otherwise follow first available vehicle
    const vehicleToFollow = vehicleId != null
      ? allVehicles.find((v) => v.id === vehicleId)
      : allVehicles[0];

    if (vehicleToFollow) {
      centerOnPosition(vehicleToFollow.pos.lat, vehicleToFollow.pos.lng, vehicleToFollow.heading ?? 0);
      setIsFollowingVehicle(true);
    }
  }, [store, centerOnPosition, setIsFollowingVehicle]);

  const handleStopTrip = useCallback(() => {
    Alert.alert(
      localizedStrings.t('homeDialogEndTripTitle'),
      localizedStrings.t('homeDialogEndTripMessage'),
      [
        { text: localizedStrings.t('alertNo'), onPress: () => {} },
        {
          text: localizedStrings.t('alertYes'),
          onPress: () => {
            const startTime = tripStartTimeRef.current ?? new Date().toISOString();
            saveAndStopTrip(dispatch, store.getState, startTime);
            tripStartTimeRef.current = null;
          },
        },
      ]
    );
  }, [localizedStrings, dispatch, store]);

  const handleStartVehicleSelect = useCallback(
    (vehicle: Vehicle) => {
      tripStartTimeRef.current = new Date().toISOString();
      dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicle.label ?? `Draisine ${vehicle.id}`));
      dispatch(TripAction.start());
    },
    [dispatch]
  );

  const handleChangeVehicle = useCallback(
    (vehicle: Vehicle) => {
      dispatch(TripAction.setCurrentVehicle(vehicle.id, vehicle.label ?? `Draisine ${vehicle.id}`));
    },
    [dispatch]
  );

  return (
    <View style={styles.container}>
      {(isActive || isFollowingVehicle) && (
        <TripHeader
          distance={motion.distanceTravelled}
          speed={motion.speed}
          nextVehicle={warnings.nextVehicle}
          nextCrossing={warnings.nextLevelCrossing}
          vehicleName={isActive ? (currentVehicle.name ?? '') : (vehicles[0]?.label ?? '')}
          onChangeVehicle={isActive ? () => setIsChangeVehicleIdBottomSheetVisible(true) : undefined}
        />
      )}
      <TrackMapView
        mapRef={mapRef}
        cameraRef={cameraRef}
        onRegionChange={(zoom, heading, isUserInteraction) => onRegionChange(zoom, heading, isUserInteraction)}
        location={location}
        calculatedPosition={position.calculated}
        pointsOfInterest={track.pointsOfInterest}
        vehicles={vehicles}
        passingPosition={position.passing}
        track={track.path}
        useSmallMarker={useSmallMarker}
        mapHeading={cameraHeading}
      />
      <TripControls
        isActive={isActive}
        isFollowingUser={isFollowingUser}
        isFollowingVehicle={isFollowingVehicle}
        onLocationButtonClick={handleLocationButtonClick}
        onStartTrip={() => setIsStartTripBottomSheetVisible(true)}
        onStopTrip={handleStopTrip}
        onCenterOnVehicle={handleCenterOnVehicle}
        warnings={warnings}
        speed={motion.speed}
        localizedStrings={localizedStrings}
      />
      <VehicleSelectionBottomSheet
        isVisible={isStartTripBottomSheetVisible}
        setIsVisible={setIsStartTripBottomSheetVisible}
        title={localizedStrings.t('bottomSheetVehicleId')}
        subtitle={
          vehicles.length > 0
            ? localizedStrings.t('bottomSheetSelectVehicle')
            : localizedStrings.t('bottomSheetNoVehicles')
        }
        vehicles={vehicles}
        onVehicleSelected={handleStartVehicleSelect}
      />
      <VehicleSelectionBottomSheet
        isVisible={isChangeVehicleIdBottomSheetVisible}
        setIsVisible={setIsChangeVehicleIdBottomSheetVisible}
        title={localizedStrings.t('bottomSheetVehicleId')}
        subtitle={localizedStrings.t('bottomSheetChangeVehicleId')}
        vehicles={vehicles}
        excludeVehicleId={currentVehicle.id}
        onVehicleSelected={handleChangeVehicle}
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
