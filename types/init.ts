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
  Generic = 0,
  LevelCrossing = 1,
  LesserLevelCrossing = 2,
  Picnic = 3,
  TrackEnd = 4,
  TurningPoint = 5,
}

export interface PointOfInterest {
  typeId: POIType;
  name?: string;
  pos: Position;
  percentagePosition: number;
}
