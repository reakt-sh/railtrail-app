import { Dispatch } from 'redux';
import { TripAction } from '../redux/trip';
import { POIType, PointOfInterest } from '../types/init';
import { Vehicle } from '../types/vehicle';
import { percentToDistance } from '../util/util-functions';

export const updateDistances = (
  dispatch: Dispatch,
  trackLength: number | null,
  percentagePositionOnTrack: number | null,
  lastPercentagePositionOnTrack: number | null,
  pointsOfInterest: PointOfInterest[],
  vehicles: Vehicle[],
  isPercentagePositionIncreasing?: boolean,
  vehicleId?: number | null
) => {
  if (lastPercentagePositionOnTrack && percentagePositionOnTrack && trackLength) {
    const percentageDif = Math.abs(percentagePositionOnTrack - lastPercentagePositionOnTrack);

    dispatch(TripAction.addToDistanceTravelled(percentToDistance(trackLength, percentageDif)));
  }

  dispatch(TripAction.setLastPercentagePositionOnTrack(percentagePositionOnTrack));

  const nextLevelCrossing = getNextPOI(
    percentagePositionOnTrack,
    pointsOfInterest,
    POIType.LevelCrossing,
    isPercentagePositionIncreasing
  );

  if (nextLevelCrossing && percentagePositionOnTrack && trackLength) {
    const percentageDif = Math.abs(
      nextLevelCrossing.percentagePosition - percentagePositionOnTrack
    );

    dispatch(
      TripAction.setNextLevelCrossingDistance(percentToDistance(trackLength, percentageDif))
    );
  } else {
    dispatch(TripAction.setNextLevelCrossingDistance(null));
  }

  const nextVehicle = getNextVehicle(
    percentagePositionOnTrack,
    vehicles,
    undefined, // Beide Richtungen suchen
    undefined,
    vehicleId // Eigene Draisine ausschließen
  );

  if (nextVehicle && percentagePositionOnTrack && trackLength) {
    const percentageDif = Math.abs(nextVehicle.percentagePosition - percentagePositionOnTrack);

    dispatch(TripAction.setNextVehicleDistance(percentToDistance(trackLength, percentageDif)));
  } else {
    dispatch(TripAction.setNextVehicleDistance(null));
  }

  const nextVehicleHeadingTowardsUser = getNextVehicle(
    percentagePositionOnTrack,
    vehicles,
    isPercentagePositionIncreasing,
    true,
    vehicleId // Eigene Draisine ausschließen
  );

  if (nextVehicleHeadingTowardsUser && percentagePositionOnTrack && trackLength) {
    const percentageDif = Math.abs(
      nextVehicleHeadingTowardsUser.percentagePosition - percentagePositionOnTrack
    );

    dispatch(
      TripAction.setNextVehicleHeadingTowardsUserDistance(
        percentToDistance(trackLength, percentageDif)
      )
    );
  } else {
    dispatch(TripAction.setNextVehicleHeadingTowardsUserDistance(null));
  }
};

const getNextPOI = (
  percentagePositionOnTrack: number | null,
  pointsOfInterest: PointOfInterest[],
  type: POIType,
  isPercentagePositionIncreasing?: boolean
) => {
  if (percentagePositionOnTrack == null) return null;

  const filteredPOIs = pointsOfInterest
    .filter((poi) => poi.typeId == type)
    .filter((poi) =>
      isPercentagePositionIncreasing
        ? poi.percentagePosition >= percentagePositionOnTrack
        : poi.percentagePosition <= percentagePositionOnTrack
    );

  return filteredPOIs.reduce((oldValue: PointOfInterest | null, currentValue) => {
    if (!oldValue) return currentValue;
    if (
      (isPercentagePositionIncreasing &&
        currentValue.percentagePosition <= oldValue.percentagePosition) ||
      (!isPercentagePositionIncreasing &&
        currentValue.percentagePosition >= oldValue.percentagePosition)
    )
      return currentValue;
    else return oldValue;
  }, null);
};

const getNextVehicle = (
  percentagePositionOnTrack: number | null,
  vehicles: Vehicle[],
  isPercentagePositionIncreasing?: boolean,
  isHeadingTowardsUser?: boolean,
  excludeVehicleId?: number | null
) => {
  if (percentagePositionOnTrack == null) return null;

  // Eigene Draisine ausschließen
  let filteredVehicles = vehicles.filter(
    (vehicle) => excludeVehicleId == null || vehicle.id !== excludeVehicleId
  );

  // Für "next vehicle": Finde das nächste in BEIDE Richtungen wenn keine Richtung bekannt
  if (isPercentagePositionIncreasing === undefined) {
    if (isHeadingTowardsUser != null) {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.headingTowardsUser === isHeadingTowardsUser
      );
    }

    // Finde das Fahrzeug mit der kleinsten Distanz
    return filteredVehicles.reduce((closest: Vehicle | null, current) => {
      if (!closest) return current;
      const closestDist = Math.abs(closest.percentagePosition - percentagePositionOnTrack);
      const currentDist = Math.abs(current.percentagePosition - percentagePositionOnTrack);
      return currentDist < closestDist ? current : closest;
    }, null);
  }

  // Richtungs-basierte Suche
  filteredVehicles = isPercentagePositionIncreasing
    ? filteredVehicles.filter((vehicle) => vehicle.percentagePosition >= percentagePositionOnTrack)
    : filteredVehicles.filter((vehicle) => vehicle.percentagePosition <= percentagePositionOnTrack);

  if (isHeadingTowardsUser != null)
    filteredVehicles = filteredVehicles.filter(
      (vehicle) => vehicle.headingTowardsUser === isHeadingTowardsUser
    );

  return filteredVehicles.reduce((oldValue: Vehicle | null, currentValue) => {
    if (!oldValue) return currentValue;
    if (
      (isPercentagePositionIncreasing &&
        currentValue.percentagePosition <= oldValue.percentagePosition) ||
      (!isPercentagePositionIncreasing &&
        currentValue.percentagePosition >= oldValue.percentagePosition)
    )
      return currentValue;
    else return oldValue;
  }, null);
};
