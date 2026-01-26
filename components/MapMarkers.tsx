import React, { memo } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import { PointOfInterest } from '../types/init';
import { Vehicle } from '../types/vehicle';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {
  TrainForegroundIcon,
  UserLocationIcon,
  TrainBackgroundHeadingIcon,
  TrainBackgroundNeutralIcon,
  PassingPositionIcon,
} from '../assets/icons';
import { PointOfInterestMarker } from './PointOfInterestMarker';
import { Position } from '../types/position';
import { Track } from './Track';

interface ExternalProps {
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

export const MapMarkers = memo(
  ({
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
      <>
        {/* User Location Marker */}
        {calculatedPosition ? (
          <MapLibreGL.PointAnnotation
            id="user-location"
            coordinate={[calculatedPosition.lng, calculatedPosition.lat]}
          >
            <View>
              <UserLocationIcon />
            </View>
          </MapLibreGL.PointAnnotation>
        ) : location ? (
          <MapLibreGL.PointAnnotation
            id="user-location"
            coordinate={[location.coords.longitude, location.coords.latitude]}
          >
            <View>
              <UserLocationIcon />
            </View>
          </MapLibreGL.PointAnnotation>
        ) : null}

        {/* POI Markers */}
        {pointsOfInterest.map((poi, index) => (
          <MapLibreGL.PointAnnotation
            key={`poi-${index}`}
            id={`poi-${index}`}
            coordinate={[poi.pos.lng, poi.pos.lat]}
          >
            <View>
              <PointOfInterestMarker
                pointOfInterestType={poi.typeId}
                useSmallMarker={useSmallMarker}
              />
            </View>
          </MapLibreGL.PointAnnotation>
        ))}

        {/* Vehicle Markers - Background + Foreground combined */}
        {vehicles.map((vehicle) => (
          <MapLibreGL.PointAnnotation
            key={`vehicle-${vehicle.id}`}
            id={`vehicle-${vehicle.id}`}
            coordinate={[vehicle.pos.lng, vehicle.pos.lat]}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {/* Background (direction indicator) - rendered first, behind */}
              <View
                style={{
                  position: 'absolute',
                  transform: [
                    {
                      rotate: `${vehicle.heading != undefined ? vehicle.heading - mapHeading : 0}deg`,
                    },
                  ],
                }}
              >
                {useSmallMarker ? (
                  vehicle.heading != null ? (
                    <TrainBackgroundHeadingIcon width={32} height={32} />
                  ) : (
                    <TrainBackgroundNeutralIcon width={32} height={32} />
                  )
                ) : vehicle.heading != null ? (
                  <TrainBackgroundHeadingIcon />
                ) : (
                  <TrainBackgroundNeutralIcon />
                )}
              </View>
              {/* Foreground (train icon) - rendered on top */}
              <View style={{ position: 'absolute' }}>
                {useSmallMarker ? <TrainForegroundIcon width={15} height={18} /> : <TrainForegroundIcon />}
              </View>
              {/* Label unter dem Icon */}
              {vehicle.label && (
                <Text
                  style={{
                    position: 'absolute',
                    top: useSmallMarker ? 20 : 28,
                    fontSize: useSmallMarker ? 8 : 10,
                    fontWeight: 'bold',
                    color: '#333',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    paddingHorizontal: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  {vehicle.label}
                </Text>
              )}
            </View>
          </MapLibreGL.PointAnnotation>
        ))}

        {/* Passing Position Marker */}
        {passingPosition ? (
          <MapLibreGL.PointAnnotation
            id="passing-position"
            coordinate={[passingPosition.lng, passingPosition.lat]}
          >
            <View>
              {useSmallMarker ? <PassingPositionIcon width={32} height={32} /> : <PassingPositionIcon />}
            </View>
          </MapLibreGL.PointAnnotation>
        ) : null}

        {/* Track Line */}
        {track ? <Track track={track} /> : null}
      </>
    );
  }
);
