import MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import React, { memo, RefObject } from 'react';
import { StyleSheet } from 'react-native';
import { PointOfInterest } from '../types/init';
import { Position } from '../types/position';
import { Vehicle } from '../types/vehicle';
import { initialRegion, mapStyleUrl } from '../util/consts';
import { MapMarkers } from './MapMarkers';

interface ExternalProps {
  readonly mapRef: RefObject<MapLibreGL.MapViewRef>;
  readonly cameraRef: RefObject<MapLibreGL.CameraRef>;
  readonly onRegionChange: (zoom: number, heading: number) => void;
  readonly location: Location.LocationObject | null;
  readonly calculatedPosition: Position | null;
  readonly pointsOfInterest: PointOfInterest[];
  readonly vehicles: Vehicle[];
  readonly passingPosition: Position | null;
  readonly track: GeoJSON.FeatureCollection | null;
  readonly useSmallMarker: boolean;
  readonly mapHeading: number;
}

type Props = ExternalProps;

export const TrackMapView = memo(
  ({
    mapRef,
    cameraRef,
    onRegionChange,
    location,
    calculatedPosition,
    pointsOfInterest,
    vehicles,
    passingPosition,
    track,
    useSmallMarker,
    mapHeading,
  }: Props) => {
    return (
      <MapLibreGL.MapView
        ref={mapRef}
        style={styles.map}
        mapStyle={mapStyleUrl}
        logoEnabled={false}
        attributionEnabled={false}
        onRegionDidChange={(feature: any) => {
          const zoom = feature?.properties?.zoomLevel ?? 14;
          const heading = feature?.properties?.heading ?? 0;
          onRegionChange(zoom, heading);
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
          track={track}
          useSmallMarker={useSmallMarker}
          mapHeading={mapHeading}
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
