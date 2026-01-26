import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useKeepAwake } from 'expo-keep-awake';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeVehicleIdBottomSheet } from '../components/change-vehicle-id-bottom-sheet';
import { FAB } from '../components/fab';
import { Header } from '../components/header';
import { LocationButton } from '../components/location-button';
import { MapMarkers } from '../components/map-markers';
import { StartTripBottomSheet } from '../components/start-trip-bottom-sheet';
import { Warnings } from '../components/warnings';
import {
  disconnectFromServer,
  initializeApp,
  setupPositionUpdates,
} from '../effect-actions/api-actions';
import {
  setBackgroundLocationListener,
  setForegroundLocationListener,
  stopBackgroundLocationListener,
  stopForegroundLocationListener,
} from '../effect-actions/location';
import {
  getBackgroundPermissionStatus,
  requestBackgroundPermission,
} from '../effect-actions/permissions';
import { updateDistances } from '../effect-actions/trip-actions';
import { useTranslation } from '../hooks/use-translation';
import { AppAction } from '../redux/app';
import { ReduxAppState } from '../redux/init';
import { TripAction } from '../redux/trip';
import { initialRegion, mapStyleUrl } from '../util/consts';
import { Color } from '../values/color';

export const HomeScreen = () => {
  const mapRef = useRef<MapLibreGL.MapViewRef>(null);
  const cameraRef = useRef<MapLibreGL.CameraRef>(null);
  const [cameraHeading, setCameraHeading] = useState<number>(0);
  // Used to determine if the map should update
  const isFollowingUser = useRef<boolean>(true);
  // Used to set and update location icon
  const [isFollowingUserState, setIsFollowingUserState] = useState<boolean>(true);
  const [useSmallMarker, setUseSmallMarker] = useState<boolean>(false);

  const [isStartTripBottomSheetVisible, setIsStartTripBottomSheetVisible] = useState(false);
  const [isChangeVehicleIdBottomSheetVisible, setIsChangeVehicleIdBottomSheetVisible] =
    useState(false);

  const [isPercentagePositionIncreasing, setIsPercentagePositionIncreasing] = useState<
    boolean | undefined
  >(undefined);

  useKeepAwake();
  const localizedStrings = useTranslation();
  const dispatch = useDispatch();

  const hasForegroundLocationPermission = useSelector(
    (state: ReduxAppState) => state.app.hasForegroundLocationPermission
  );
  const hasBackgroundLocationPermission = useSelector(
    (state: ReduxAppState) => state.app.hasBackgroundLocationPermission
  );
  const isTripStarted = useSelector((state: ReduxAppState) => state.app.isTripStarted);
  const trackId = useSelector((state: ReduxAppState) => state.app.trackId);
  const trackPath = useSelector((state: ReduxAppState) => state.app.trackPath);
  const location = useSelector((state: ReduxAppState) => state.app.location);
  const pointsOfInterest = useSelector((state: ReduxAppState) => state.app.pointsOfInterest);
  const foregroundLocationSubscription = useSelector(
    (state: ReduxAppState) => state.app.foregroundLocationSubscription
  );

  const vehicleId = useSelector((state: ReduxAppState) => state.trip.vehicleId);
  const vehicleName = useSelector((state: ReduxAppState) => state.trip.vehicleName);
  const trackLength = useSelector((state: ReduxAppState) => state.app.trackLength);
  const distanceTravelled = useSelector((state: ReduxAppState) => state.trip.distanceTravelled);
  const speed = useSelector((state: ReduxAppState) => state.trip.speed);
  const heading = useSelector((state: ReduxAppState) => state.trip.heading);
  const calculatedPosition = useSelector((state: ReduxAppState) => state.trip.calculatedPosition);
  const nextVehicleDistance = useSelector((state: ReduxAppState) => state.trip.nextVehicleDistance);
  const nextVehicleHeadingTowardsUserDistance = useSelector(
    (state: ReduxAppState) => state.trip.nextVehicleHeadingTowardsUserDistance
  );
  const nextLevelCrossingDistance = useSelector(
    (state: ReduxAppState) => state.trip.nextLevelCrossingDistance
  );
  const vehicles = useSelector((state: ReduxAppState) => state.trip.vehicles);
  const percentagePositionOnTrack = useSelector(
    (state: ReduxAppState) => state.trip.percentagePositionOnTrack
  );
  const lastPercentagePositionOnTrack = useSelector(
    (state: ReduxAppState) => state.trip.lastPercentagePositionOnTrack
  );
  const passingPosition = useSelector((state: ReduxAppState) => state.trip.passingPositon);

  // Sync percentagePositionOnTrack from own vehicle in vehicles array
  useEffect(() => {
    if (vehicleId != null && vehicles.length > 0) {
      const myVehicle = vehicles.find((v) => v.id === vehicleId);
      if (myVehicle) {
        dispatch(TripAction.setPercentagePositionOnTrack(myVehicle.percentagePosition));
      }
    }
  }, [vehicles, vehicleId]);

  // Initialize app and WebSocket connection
  useEffect(() => {
    // Initialisiere App mit statischen Track-Daten und WebSocket
    initializeApp(dispatch);

    // Abonniere Position-Updates vom Server
    const unsubscribePositions = setupPositionUpdates(dispatch);

    // Location-Tracking einrichten wenn Berechtigung vorhanden
    if (hasForegroundLocationPermission) {
      setForegroundLocationListener(handleInternalLocationUpdate, dispatch);

      getBackgroundPermissionStatus().then((result) => {
        dispatch(AppAction.setHasBackgroundLocationPermission(result));
      });
    }

    // Cleanup bei Unmount
    return () => {
      unsubscribePositions();
      disconnectFromServer();
    };
  }, []);

  // Call camera animation when location is updated
  useEffect(() => {
    if (isTripStarted && calculatedPosition) {
      animateCamera(calculatedPosition.lat, calculatedPosition.lng, heading);
    } else if (location) {
      animateCamera(location.coords.latitude, location.coords.longitude, location.coords.heading);
    }
  }, [location, calculatedPosition]);

  // WebSocket liefert jetzt automatisch Updates - kein Polling mehr nötig

  // Handles stuff that should be executed on trip start or trip end
  useEffect(() => {
    if (!isTripStarted) {
      // Background location tracking is only needed druring a trip
      if (hasBackgroundLocationPermission) {
        stopBackgroundLocationListener();
        setForegroundLocationListener(handleInternalLocationUpdate, dispatch);
      }
      return;
    }

    if (hasForegroundLocationPermission) {
      // Switch from foreground to background location tracking if possible (because trip is started).
      if (!hasBackgroundLocationPermission) {
        // Inform about background location tracking
        Alert.alert(
          localizedStrings.t('homeDialogBackgroundPermissionTripTitle'),
          localizedStrings.t('homeDialogBackgroundPermissionMessage'),
          [
            {
              text: localizedStrings.t('alertOk'),
              onPress: () => {
                requestBackgroundPermission().then((result) => {
                  if (result) {
                    dispatch(AppAction.setHasBackgroundLocationPermission(true));

                    stopForegroundLocationListener(foregroundLocationSubscription);
                    setBackgroundLocationListener(handleInternalLocationUpdate);
                  }
                });
              },
            },
          ]
        );
      } else {
        stopForegroundLocationListener(foregroundLocationSubscription);
        setBackgroundLocationListener(handleInternalLocationUpdate);
      }
      return;
    }

    // WebSocket liefert automatisch Updates - kein Polling mehr nötig
  }, [isTripStarted]);

  // Calculates distances and in which direction on the track the user is moving
  useEffect(() => {
    if (percentagePositionOnTrack != null) {
      if (
        lastPercentagePositionOnTrack != undefined &&
        lastPercentagePositionOnTrack !== percentagePositionOnTrack
      )
        setIsPercentagePositionIncreasing(
          percentagePositionOnTrack > lastPercentagePositionOnTrack
        );

      if (isTripStarted) {
        updateDistances(
          dispatch,
          trackLength,
          percentagePositionOnTrack,
          lastPercentagePositionOnTrack,
          pointsOfInterest,
          vehicles,
          isPercentagePositionIncreasing,
          vehicleId
        );
      }
    }
  }, [percentagePositionOnTrack]);

  const handleInternalLocationUpdate = async (location: Location.LocationObject) => {
    dispatch(AppAction.setLocation(location));
  };

  const onLocationButtonClicked = () => {
    isFollowingUser.current = !isFollowingUser.current;
    setIsFollowingUserState(isFollowingUser.current);

    if (isFollowingUser.current && location)
      animateCamera(location.coords.latitude, location.coords.longitude, location.coords.heading);
    else if (isFollowingUser.current && calculatedPosition)
      animateCamera(calculatedPosition.lat, calculatedPosition.lng, heading);
  };

  // Zentriert die Kamera auf die eigene Draisine (aus WebSocket-Daten)
  const onCenterOnMyVehicleClicked = () => {
    const myVehicle = vehicles.find((v) => v.id === vehicleId);
    if (myVehicle) {
      cameraRef.current?.setCamera({
        centerCoordinate: [myVehicle.pos.lng, myVehicle.pos.lat],
        heading: myVehicle.heading ?? 0,
        animationDuration: 500,
        zoomLevel: 25,
      });
    }
  };

  const onMapDrag = () => {
    if (isFollowingUser.current) {
      isFollowingUser.current = false;
      setIsFollowingUserState(false);
    }
  };

  const updateCameraHeading = async () => {
    // MapLibre doesn't have getCamera, we track heading via onRegionDidChange
  };

  const onTripStopClicked = () => {
    Alert.alert(
      localizedStrings.t('homeDialogEndTripTitle'),
      localizedStrings.t('homeDialogEndTripMessage'),
      [
        {
          text: localizedStrings.t('alertNo'),
          onPress: () => {},
        },
        {
          text: localizedStrings.t('alertYes'),
          onPress: () => {
            dispatch(AppAction.setIsTripStarted(false));
            dispatch(TripAction.reset());
          },
        },
      ]
    );
  };

  const animateCamera = (lat: number, lng: number, heading: number | null) => {
    if (cameraRef && cameraRef.current && isFollowingUser.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [lng, lat], // MapLibre uses [lng, lat] format
        heading: heading ?? 0,
        animationDuration: 250,
      });
    }
  };

  return (
    <View style={styles.container}>
      {isTripStarted ? (
        <Header
          distance={distanceTravelled}
          speed={speed}
          nextVehicle={nextVehicleDistance}
          nextCrossing={nextLevelCrossingDistance}
          vehicleName={vehicleName!!}
          setIsChangeVehicleIdBottomSheetVisible={setIsChangeVehicleIdBottomSheetVisible}
        />
      ) : null}
      <MapLibreGL.MapView
        ref={mapRef}
        style={styles.map}
        mapStyle={mapStyleUrl}
        logoEnabled={false}
        attributionEnabled={false}
        onRegionDidChange={(feature: any) => {
          // Check zoom level to determine marker size
          const zoom = feature?.properties?.zoomLevel ?? 14;
          setUseSmallMarker(zoom < 12);
          // Update heading if available
          if (feature?.properties?.heading !== undefined) {
            setCameraHeading(feature.properties.heading);
          }
        }}
        onPress={() => {}}
      >
        <MapLibreGL.Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [initialRegion.longitude, initialRegion.latitude],
            zoomLevel: 14,
          }}
        />
        <MapMarkers
          location={location}
          calculatedPosition={calculatedPosition}
          pointsOfInterest={pointsOfInterest}
          vehicles={vehicles}
          passingPosition={passingPosition}
          track={trackPath}
          useSmallMarker={useSmallMarker}
          mapHeading={cameraHeading}
        />
      </MapLibreGL.MapView>
      <View style={styles.bottomLayout} pointerEvents={'box-none'}>
        {isTripStarted && (
          <Warnings
            localizedStrings={localizedStrings}
            nextLevelCrossingDistance={nextLevelCrossingDistance}
            nextVehicleDistance={nextVehicleDistance}
            nextVehicleHeadingTowardsUserDistance={nextVehicleHeadingTowardsUserDistance}
            speed={speed}
          />
        )}
        <LocationButton onPress={() => onLocationButtonClicked()} isActive={isFollowingUserState} />
        {isTripStarted && (
          <FAB onPress={() => onCenterOnMyVehicleClicked()}>
            <MaterialCommunityIcons name="navigation-variant" size={26} color={Color.primary} />
          </FAB>
        )}
        {isTripStarted ? (
          <FAB onPress={() => onTripStopClicked()}>
            <MaterialCommunityIcons name="stop-circle" size={30} color={Color.warning} />
          </FAB>
        ) : (
          <FAB onPress={() => setIsStartTripBottomSheetVisible(true)}>
            <MaterialCommunityIcons name="play-circle" size={30} color={Color.primary} />
          </FAB>
        )}
      </View>
      <StartTripBottomSheet
        isVisible={isStartTripBottomSheetVisible}
        setIsVisible={setIsStartTripBottomSheetVisible}
        trackId={trackId}
      />
      <ChangeVehicleIdBottomSheet
        isVisible={isChangeVehicleIdBottomSheetVisible}
        setIsVisible={setIsChangeVehicleIdBottomSheetVisible}
        trackId={trackId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  bottomLayout: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column-reverse',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
