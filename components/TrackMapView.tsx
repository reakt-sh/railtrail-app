import * as MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import React, { memo, RefObject, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { initialRegion, mapStyleUrl } from '../constants';
import { PointOfInterest } from '../types/init';
import { Position } from '../types/position';
import { Vehicle } from '../types/vehicle';
import { MapMarkers } from './MapMarkers';

interface ExternalProps {
  readonly mapRef: RefObject<MapLibreGL.MapViewRef | null>;
  readonly cameraRef: RefObject<MapLibreGL.CameraRef>;
  readonly onRegionChange: (
    zoom: number,
    heading: number,
    center?: [number, number] | null
  ) => void;
  readonly onUserInteraction: () => void;
  readonly userHasInteracted: boolean;
  readonly currentCameraCenter: [number, number] | null;
  readonly location: Location.LocationObject | null;
  readonly calculatedPosition: Position | null;
  readonly pointsOfInterest: PointOfInterest[];
  readonly vehicles: Vehicle[];
  readonly passingPosition: Position | null;
  readonly track: GeoJSON.FeatureCollection | null;
  readonly zoomLevel: number;
  readonly mapHeading: number;
}

type Props = ExternalProps;

export const TrackMapView = memo(
  ({
    mapRef,
    cameraRef,
    onRegionChange,
    onUserInteraction,
    userHasInteracted,
    currentCameraCenter,
    location,
    calculatedPosition,
    pointsOfInterest,
    vehicles,
    passingPosition,
    track,
    zoomLevel,
    mapHeading,
  }: Props) => {
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
    const onPOIPress = useCallback((index: number) => {
      setActiveTooltip((prev) => (prev === index ? null : index));
    }, []);
    const dismissTooltip = useCallback(() => setActiveTooltip(null), []);

    return (
      <MapLibreGL.MapView
        ref={mapRef}
        style={styles.map}
        mapStyle={mapStyleUrl}
        logoEnabled={false}
        attributionEnabled={false}
        onRegionWillChange={(feature: any) => {
          const isUserInteraction = feature?.properties?.isUserInteraction ?? false;
          if (isUserInteraction) {
            onUserInteraction();
          }
        }}
        onRegionDidChange={(feature: any) => {
          const zoom = feature?.properties?.zoomLevel ?? 14;
          const heading = feature?.properties?.heading ?? 0;
          const visibleBounds = feature?.properties?.visibleBounds;

          // Calculate center from visibleBounds [[ne_lng, ne_lat], [sw_lng, sw_lat]]
          let center: [number, number] | null = null;
          if (visibleBounds && visibleBounds.length === 2) {
            const [ne, sw] = visibleBounds;
            center = [(ne[0] + sw[0]) / 2, (ne[1] + sw[1]) / 2];
          }

          onRegionChange(zoom, heading, center);
        }}
        onPress={dismissTooltip}
      >
        <MapLibreGL.Camera
          key={userHasInteracted ? 'free' : 'track'}
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: currentCameraCenter ?? [initialRegion.longitude, initialRegion.latitude],
            zoomLevel: zoomLevel,
            pitch: 0,
            heading: mapHeading,
          }}
          followUserLocation={false}
        />
        <MapMarkers
          location={location}
          calculatedPosition={calculatedPosition}
          pointsOfInterest={pointsOfInterest}
          vehicles={vehicles}
          passingPosition={passingPosition}
          track={track}
          zoomLevel={zoomLevel}
          mapHeading={mapHeading}
          activeTooltip={activeTooltip}
          onPOIPress={onPOIPress}
        />
      </MapLibreGL.MapView>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
  },
});
