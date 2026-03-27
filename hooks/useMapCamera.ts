import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { RefObject, useCallback, useRef, useState } from 'react';

interface UseMapCameraReturn {
  cameraRef: RefObject<MapLibreGL.CameraRef>;
  isFollowingUser: boolean;
  isFollowingVehicle: boolean;
  userHasInteracted: boolean;
  currentCameraCenter: [number, number] | null;
  cameraHeading: number;
  zoomLevel: number;
  visibleBounds: [[number, number], [number, number]] | null;
  setIsFollowingUser: (following: boolean) => void;
  setIsFollowingVehicle: (following: boolean) => void;
  animateCamera: (lat: number, lng: number, heading: number | null) => void;
  onLocationButtonClicked: (
    location: { latitude: number; longitude: number; heading: number | null } | null
  ) => void;
  onRegionChange: (
    zoom: number,
    heading: number,
    center?: [number, number] | null,
    bounds?: [[number, number], [number, number]] | null
  ) => void;
  onUserInteraction: () => void;
  centerOnPosition: (lat: number, lng: number, heading: number, zoomLevel?: number) => void;
}

export const useMapCamera = (): UseMapCameraReturn => {
  const cameraRef = useRef<MapLibreGL.CameraRef>(null);
  const [isFollowingUser, setIsFollowingUserState] = useState<boolean>(true);
  const [isFollowingVehicle, setIsFollowingVehicleState] = useState<boolean>(false);
  const [userHasInteracted, setUserHasInteracted] = useState<boolean>(false);
  const [currentCameraCenter, setCurrentCameraCenter] = useState<[number, number] | null>(null);
  const [cameraHeading, setCameraHeading] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [visibleBounds, setVisibleBounds] = useState<[[number, number], [number, number]] | null>(null);

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
    setUserHasInteracted(false);
    cameraRef.current?.setCamera({
      centerCoordinate: [lng, lat],
      heading: heading ?? 0,
      animationDuration: 500,
      animationMode: 'easeTo',
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
    (
      zoom: number,
      heading: number,
      center?: [number, number] | null,
      bounds?: [[number, number], [number, number]] | null
    ) => {
      setZoomLevel(Math.round(zoom));
      setCameraHeading(heading);
      if (center) {
        setCurrentCameraCenter(center);
      }
      if (bounds) {
        setVisibleBounds(bounds);
      }
    },
    []
  );

  // Called when user touches the map - disables following
  const onUserInteraction = useCallback(() => {
    setUserHasInteracted(true);
    setIsFollowingUserState(false);
    setIsFollowingVehicleState(false);
  }, []);

  const centerOnPosition = useCallback(
    (lat: number, lng: number, heading: number, zoomLevel: number = 20) => {
      setUserHasInteracted(false);
      cameraRef.current?.setCamera({
        centerCoordinate: [lng, lat],
        heading,
        animationDuration: 500,
        animationMode: 'easeTo',
        zoomLevel,
      });
    },
    []
  );

  return {
    cameraRef,
    isFollowingUser,
    isFollowingVehicle,
    userHasInteracted,
    currentCameraCenter,
    cameraHeading,
    zoomLevel,
    visibleBounds,
    setIsFollowingUser,
    setIsFollowingVehicle,
    animateCamera,
    onLocationButtonClicked,
    onRegionChange,
    onUserInteraction,
    centerOnPosition,
  };
};
