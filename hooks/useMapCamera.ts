import * as MapLibreGL from '@maplibre/maplibre-react-native';
import { RefObject, useCallback, useRef, useState } from 'react';

interface UseMapCameraReturn {
  cameraRef: RefObject<MapLibreGL.CameraRef>;
  isFollowingUser: boolean;
  cameraHeading: number;
  useSmallMarker: boolean;
  setIsFollowingUser: (following: boolean) => void;
  animateCamera: (lat: number, lng: number, heading: number | null) => void;
  onLocationButtonClicked: (
    location: { latitude: number; longitude: number; heading: number | null } | null,
    calculatedPosition: { lat: number; lng: number } | null,
    motionHeading: number
  ) => void;
  onRegionChange: (zoom: number, heading: number) => void;
  centerOnPosition: (lat: number, lng: number, heading: number, zoomLevel?: number) => void;
}

export const useMapCamera = (): UseMapCameraReturn => {
  const cameraRef = useRef<MapLibreGL.CameraRef>(null);
  const isFollowingUserRef = useRef<boolean>(true);
  const [isFollowingUser, setIsFollowingUserState] = useState<boolean>(true);
  const [cameraHeading, setCameraHeading] = useState<number>(0);
  const [useSmallMarker, setUseSmallMarker] = useState<boolean>(false);

  const setIsFollowingUser = useCallback((following: boolean) => {
    isFollowingUserRef.current = following;
    setIsFollowingUserState(following);
  }, []);

  const animateCamera = useCallback((lat: number, lng: number, heading: number | null) => {
    if (cameraRef.current && isFollowingUserRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [lng, lat],
        heading: heading ?? 0,
        animationDuration: 250,
      });
    }
  }, []);

  const onLocationButtonClicked = useCallback(
    (
      location: { latitude: number; longitude: number; heading: number | null } | null,
      calculatedPosition: { lat: number; lng: number } | null,
      motionHeading: number
    ) => {
      const newFollowing = !isFollowingUserRef.current;
      setIsFollowingUser(newFollowing);

      if (newFollowing && location) {
        animateCamera(location.latitude, location.longitude, location.heading);
      } else if (newFollowing && calculatedPosition) {
        animateCamera(calculatedPosition.lat, calculatedPosition.lng, motionHeading);
      }
    },
    [setIsFollowingUser, animateCamera]
  );

  const onRegionChange = useCallback((zoom: number, heading: number) => {
    setUseSmallMarker(zoom < 12);
    setCameraHeading(heading);
  }, []);

  const centerOnPosition = useCallback(
    (lat: number, lng: number, heading: number, zoomLevel: number = 25) => {
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
    cameraHeading,
    useSmallMarker,
    setIsFollowingUser,
    animateCamera,
    onLocationButtonClicked,
    onRegionChange,
    centerOnPosition,
  };
};
