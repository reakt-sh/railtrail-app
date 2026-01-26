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
import { disconnectFromServer, initializeApp, setupPositionUpdates } from '../effect-actions/api-actions';
import {
  setBackgroundLocationListener,
  setForegroundLocationListener,
  stopBackgroundLocationListener,
  stopForegroundLocationListener,
} from '../effect-actions/location';
import { getBackgroundPermissionStatus, requestBackgroundPermission } from '../effect-actions/permissions';
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
  const isFollowingUser = useRef<boolean>(true);
  const [isFollowingUserState, setIsFollowingUserState] = useState<boolean>(true);
  const [useSmallMarker, setUseSmallMarker] = useState<boolean>(false);

  const [isStartTripBottomSheetVisible, setIsStartTripBottomSheetVisible] = useState(false);
  const [isChangeVehicleIdBottomSheetVisible, setIsChangeVehicleIdBottomSheetVisible] = useState(false);

  const [isPercentagePositionIncreasing, setIsPercentagePositionIncreasing] = useState<boolean | undefined>(undefined);

  // Local state for location subscription (not serializable, shouldn't be in Redux)
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

  useKeepAwake();
  const localizedStrings = useTranslation();
  const dispatch = useDispatch();

  // App state selectors (grouped)
  const { track, location, permissions } = useSelector((state: ReduxAppState) => state.app);

  // Trip state selectors (grouped)
  const { isActive, currentVehicle, warnings, motion, position, vehicles } = useSelector(
    (state: ReduxAppState) => state.trip
  );

  // Sync percentagePosition from own vehicle in vehicles array
  useEffect(() => {
    if (currentVehicle.id != null && vehicles.length > 0) {
      const myVehicle = vehicles.find((v) => v.id === currentVehicle.id);
      if (myVehicle) {
        dispatch(TripAction.setPosition({ percentage: myVehicle.percentagePosition }));
      }
    }
  }, [vehicles, currentVehicle.id]);

  // Initialize app and WebSocket connection
  useEffect(() => {
    initializeApp(dispatch);
    const unsubscribePositions = setupPositionUpdates(dispatch);

    if (permissions.foreground) {
      setForegroundLocationListener(handleInternalLocationUpdate, setLocationSubscription);
      getBackgroundPermissionStatus().then((result) => {
        dispatch(AppAction.setPermissions({ background: result }));
      });
    }

    return () => {
      unsubscribePositions();
      disconnectFromServer();
    };
  }, []);

  // Call camera animation when location is updated
  useEffect(() => {
    if (isActive && position.calculated) {
      animateCamera(position.calculated.lat, position.calculated.lng, motion.heading);
    } else if (location) {
      animateCamera(location.coords.latitude, location.coords.longitude, location.coords.heading);
    }
  }, [location, position.calculated]);

  // Handles stuff that should be executed on trip start or trip end
  useEffect(() => {
    if (!isActive) {
      if (permissions.background) {
        stopBackgroundLocationListener();
        setForegroundLocationListener(handleInternalLocationUpdate, setLocationSubscription);
      }
      return;
    }

    if (permissions.foreground) {
      if (!permissions.background) {
        Alert.alert(
          localizedStrings.t('homeDialogBackgroundPermissionTripTitle'),
          localizedStrings.t('homeDialogBackgroundPermissionMessage'),
          [
            {
              text: localizedStrings.t('alertOk'),
              onPress: () => {
                requestBackgroundPermission().then((result) => {
                  if (result) {
                    dispatch(AppAction.setPermissions({ background: true }));
                    stopForegroundLocationListener(locationSubscription);
                    setBackgroundLocationListener(handleInternalLocationUpdate);
                  }
                });
              },
            },
          ]
        );
      } else {
        stopForegroundLocationListener(locationSubscription);
        setBackgroundLocationListener(handleInternalLocationUpdate);
      }
    }
  }, [isActive]);

  // Calculates distances and in which direction on the track the user is moving
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

  const handleInternalLocationUpdate = async (loc: Location.LocationObject) => {
    dispatch(AppAction.setLocation(loc));
  };

  const onLocationButtonClicked = () => {
    isFollowingUser.current = !isFollowingUser.current;
    setIsFollowingUserState(isFollowingUser.current);

    if (isFollowingUser.current && location) {
      animateCamera(location.coords.latitude, location.coords.longitude, location.coords.heading);
    } else if (isFollowingUser.current && position.calculated) {
      animateCamera(position.calculated.lat, position.calculated.lng, motion.heading);
    }
  };

  const onCenterOnMyVehicleClicked = () => {
    const myVehicle = vehicles.find((v) => v.id === currentVehicle.id);
    if (myVehicle) {
      cameraRef.current?.setCamera({
        centerCoordinate: [myVehicle.pos.lng, myVehicle.pos.lat],
        heading: myVehicle.heading ?? 0,
        animationDuration: 500,
        zoomLevel: 25,
      });
    }
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
            dispatch(TripAction.stop());
          },
        },
      ]
    );
  };

  const animateCamera = (lat: number, lng: number, heading: number | null) => {
    if (cameraRef?.current && isFollowingUser.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [lng, lat],
        heading: heading ?? 0,
        animationDuration: 250,
      });
    }
  };

  return (
    <View style={styles.container}>
      {isActive && (
        <Header
          distance={motion.distanceTravelled}
          speed={motion.speed}
          nextVehicle={warnings.nextVehicle}
          nextCrossing={warnings.nextLevelCrossing}
          vehicleName={currentVehicle.name ?? ''}
          setIsChangeVehicleIdBottomSheetVisible={setIsChangeVehicleIdBottomSheetVisible}
        />
      )}
      <MapLibreGL.MapView
        ref={mapRef}
        style={styles.map}
        mapStyle={mapStyleUrl}
        logoEnabled={false}
        attributionEnabled={false}
        onRegionDidChange={(feature: any) => {
          const zoom = feature?.properties?.zoomLevel ?? 14;
          setUseSmallMarker(zoom < 12);
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
          calculatedPosition={position.calculated}
          pointsOfInterest={track.pointsOfInterest}
          vehicles={vehicles}
          passingPosition={position.passing}
          track={track.path}
          useSmallMarker={useSmallMarker}
          mapHeading={cameraHeading}
        />
      </MapLibreGL.MapView>
      <View style={styles.bottomLayout} pointerEvents={'box-none'}>
        {isActive && (
          <Warnings
            localizedStrings={localizedStrings}
            nextLevelCrossingDistance={warnings.nextLevelCrossing}
            nextVehicleDistance={warnings.nextVehicle}
            nextVehicleHeadingTowardsUserDistance={warnings.nextVehicleHeadingTowards}
            speed={motion.speed}
          />
        )}
        <LocationButton onPress={onLocationButtonClicked} isActive={isFollowingUserState} />
        {isActive && (
          <FAB onPress={onCenterOnMyVehicleClicked}>
            <MaterialCommunityIcons name="navigation-variant" size={26} color={Color.primary} />
          </FAB>
        )}
        {isActive ? (
          <FAB onPress={onTripStopClicked}>
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
      />
      <ChangeVehicleIdBottomSheet
        isVisible={isChangeVehicleIdBottomSheetVisible}
        setIsVisible={setIsChangeVehicleIdBottomSheetVisible}
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
