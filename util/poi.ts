import { I18n } from 'i18n-js';
import { POIType } from '../types';

export const poiTypeTranslationKeys: Record<POIType, string> = {
  [POIType.Generic]: 'poiGeneric',
  [POIType.LevelCrossing]: 'poiLevelCrossing',
  [POIType.LesserLevelCrossing]: 'poiLesserLevelCrossing',
  [POIType.Picnic]: 'poiPicnic',
  [POIType.TrackEnd]: 'poiTrackEnd',
  [POIType.TurningPoint]: 'poiTurningPoint',
  [POIType.Halt]: 'poiHalt',
  [POIType.EndOfTheLine]: 'poiEndOfTheLine',
  [POIType.TouristInfo]: 'poiTouristInfo',
};

export const getPOITypeLabel = (i18n: I18n, typeId: POIType, originalType?: POIType): string => {
  const baseLabel = i18n.t(poiTypeTranslationKeys[typeId]);
  const isTurningPoint = typeId === POIType.TurningPoint;

  // Turning points also have a "normal" type
  if (isTurningPoint && originalType && poiTypeTranslationKeys[originalType]) {
    return `${i18n.t(poiTypeTranslationKeys[originalType])}, ${baseLabel} `;
  }
  return baseLabel;
};

export const getPOITitle = (
  i18n: I18n,
  name: string | undefined,
  typeId: POIType,
  originalType?: POIType
): string => {
  return name || getPOITypeLabel(i18n, typeId, originalType);
};
