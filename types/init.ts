import { Position } from './position';

export interface InitResponse {
  trackId: number;
  trackName: string;
  trackPath: GeoJSON.FeatureCollection;
  trackLength: number;
  pointsOfInterest: PointOfInterest[];
}

export interface TrackListEntry {
  id: number;
  name: string;
}

export enum POIType {
  Generic = 'generic',
  LevelCrossing = 'crossing',
  LesserLevelCrossing = 'lesser-crossing',
  TrackEnd = 'track-end',
  TurningPoint = 'turning-point',
  Halt = 'halt',
  TouristInfo = 'tourist-info',
  Bridge = 'bridge',
  RoadCrossing = 'road-crossing',
}

export interface PointOfInterest {
  typeId: POIType;
  name?: string;
  pos: Position;
  percentagePosition: number;
  originalType?: POIType; // Original marker type before being converted to turning point
}
