import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { RefObject, useCallback, useRef, useState } from 'react';

interface UseMapCameraReturn {
  cameraRef: RefObject<MapLibreGL.CameraRef>;
  isFollowingUser: boolean;
  isFollowingVehicle: boolean;
  cameraHeading: number;
  useSmallMarker: boolean;
  setIsFollowingUser: (following: boolean) => void;
  setIsFollowingVehicle: (following: boolean) => void;
  animateCamera: (lat: number, lng: number, heading: number | null) => void;
  onLocationButtonClicked: (
    location: { latitude: number; longitude: number; heading: number | null } | null
  ) => void;
  onRegionChange: (zoom: number, heading: number, isUserInteraction?: boolean) => void;
  centerOnPosition: (lat: number, lng: number, heading: number, zoomLevel?: number) => void;
}

export const useMapCamera = (): UseMapCameraReturn => {
  const cameraRef = useRef<MapLibreGL.CameraRef>(null);
  const [isFollowingUser, setIsFollowingUserState] = useState<boolean>(true);
  const [isFollowingVehicle, setIsFollowingVehicleState] = useState<boolean>(false);
  const [cameraHeading, setCameraHeading] = useState<number>(0);
  const [useSmallMarker, setUseSmallMarker] = useState<boolean>(false);
  const isProgrammaticMove = useRef<boolean>(false);

  const setIsFollowingUser = useCallback((following: boolean) => {
    setIsFollowingUserState(following);
    if (following) {
      setIsFollowingVehicleState(false);
    }
  }, []);

  const setIsFollowingVehicle = useCallback((following: boolean) => {
    setIsFollowingVehicleState(following);
    if (following) {
      setIsFollowingUserState(false);
    }
  }, []);

  const animateCamera = useCallback((lat: number, lng: number, heading: number | null) => {
    isProgrammaticMove.current = true;
    cameraRef.current?.setCamera({
      centerCoordinate: [lng, lat],
      heading: heading ?? 0,
      animationDuration: 250,
    });
  }, []);

  const onLocationButtonClicked = useCallback(
    (location: { latitude: number; longitude: number; heading: number | null } | null) => {
      const newFollowing = !isFollowingUser;
      setIsFollowingUser(newFollowing);

      if (newFollowing && location) {
        animateCamera(location.latitude, location.longitude, location.heading);
      }
    },
    [isFollowingUser, setIsFollowingUser, animateCamera]
  );

  const onRegionChange = useCallback(
    (zoom: number, heading: number, isUserInteraction: boolean = false) => {
      setUseSmallMarker(zoom < 15);
      setCameraHeading(heading);
      // Only disable following on explicit user interaction (scroll/zoom gesture)
      if (isUserInteraction) {
        isProgrammaticMove.current = false;
        setIsFollowingUserState(false);
        setIsFollowingVehicleState(false);
      }
    },
    []
  );

  const centerOnPosition = useCallback(
    (lat: number, lng: number, heading: number, zoomLevel: number = 20) => {
      isProgrammaticMove.current = true;
      cameraRef.current?.setCamera({
        centerCoordinate: [lng, lat],
        heading,
        animationDuration: 500,
        zoomLevel,
      });
    },
    []
  );

  return {
    cameraRef,
    isFollowingUser,
    isFollowingVehicle,
    cameraHeading,
    useSmallMarker,
    setIsFollowingUser,
    setIsFollowingVehicle,
    animateCamera,
    onLocationButtonClicked,
    onRegionChange,
    centerOnPosition,
  };
};
