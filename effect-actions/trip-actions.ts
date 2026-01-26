import { Dispatch } from 'redux';
import { TripAction, Warnings } from '../redux/trip';
import { POIType, PointOfInterest } from '../types/init';
import { Vehicle } from '../types/vehicle';
import { percentToDistance } from '../util/util-functions';

/**
 * Calculates and dispatches distance updates for the trip.
 * Uses batch update for better performance (single dispatch instead of multiple).
 */
export const updateDistances = (
  dispatch: Dispatch,
  trackLength: number | null,
  percentagePosition: number | null,
  lastPercentagePosition: number | null,
  pointsOfInterest: PointOfInterest[],
  vehicles: Vehicle[],
  isPercentagePositionIncreasing?: boolean,
  vehicleId?: number | null
) => {
  // Calculate distance to add
  let addDistance: number | undefined;
  if (lastPercentagePosition && percentagePosition && trackLength) {
    const percentageDif = Math.abs(percentagePosition - lastPercentagePosition);
    addDistance = percentToDistance(trackLength, percentageDif);
  }

  // Calculate warning distances
  const warnings = calculateWarnings(
    percentagePosition,
    trackLength,
    pointsOfInterest,
    vehicles,
    isPercentagePositionIncreasing,
    vehicleId
  );

  // Single batch dispatch for all updates
  dispatch(
    TripAction.batchUpdate({
      addDistance,
      lastPercentage: percentagePosition,
      warnings,
    })
  );
};

/**
 * Calculates all warning distances in one pass.
 */
const calculateWarnings = (
  percentagePosition: number | null,
  trackLength: number | null,
  pointsOfInterest: PointOfInterest[],
  vehicles: Vehicle[],
  isPercentagePositionIncreasing?: boolean,
  vehicleId?: number | null
): Warnings => {
  // Next level crossing
  const nextLevelCrossing = getNextPOI(
    percentagePosition,
    pointsOfInterest,
    POIType.LevelCrossing,
    isPercentagePositionIncreasing
  );
  const nextLevelCrossingDist =
    nextLevelCrossing && percentagePosition != null && trackLength
      ? percentToDistance(
          trackLength,
          Math.abs(nextLevelCrossing.percentagePosition - percentagePosition)
        )
      : null;

  // Next vehicle (any direction)
  const nextVehicle = getNextVehicle(
    percentagePosition,
    vehicles,
    undefined, // Both directions
    undefined,
    vehicleId
  );
  const nextVehicleDist =
    nextVehicle && percentagePosition != null && trackLength
      ? percentToDistance(
          trackLength,
          Math.abs(nextVehicle.percentagePosition - percentagePosition)
        )
      : null;

  // Next vehicle heading towards user
  const nextVehicleHeadingTowards = getNextVehicle(
    percentagePosition,
    vehicles,
    isPercentagePositionIncreasing,
    true,
    vehicleId
  );
  const nextVehicleHeadingTowardsDist =
    nextVehicleHeadingTowards && percentagePosition != null && trackLength
      ? percentToDistance(
          trackLength,
          Math.abs(nextVehicleHeadingTowards.percentagePosition - percentagePosition)
        )
      : null;

  return {
    nextLevelCrossing: nextLevelCrossingDist,
    nextVehicle: nextVehicleDist,
    nextVehicleHeadingTowards: nextVehicleHeadingTowardsDist,
  };
};

/**
 * Finds the next POI of a given type in the current travel direction.
 */
const getNextPOI = (
  percentagePosition: number | null,
  pointsOfInterest: PointOfInterest[],
  type: POIType,
  isPercentagePositionIncreasing?: boolean
): PointOfInterest | null => {
  if (percentagePosition == null) return null;

  const filteredPOIs = pointsOfInterest
    .filter((poi) => poi.typeId === type)
    .filter((poi) =>
      isPercentagePositionIncreasing
        ? poi.percentagePosition >= percentagePosition
        : poi.percentagePosition <= percentagePosition
    );

  return filteredPOIs.reduce((closest: PointOfInterest | null, current) => {
    if (!closest) return current;
    const closestDist = Math.abs(closest.percentagePosition - percentagePosition);
    const currentDist = Math.abs(current.percentagePosition - percentagePosition);
    return currentDist < closestDist ? current : closest;
  }, null);
};

/**
 * Finds the next vehicle, optionally filtering by direction and heading.
 */
const getNextVehicle = (
  percentagePosition: number | null,
  vehicles: Vehicle[],
  isPercentagePositionIncreasing?: boolean,
  isHeadingTowardsUser?: boolean,
  excludeVehicleId?: number | null
): Vehicle | null => {
  if (percentagePosition == null) return null;

  // Exclude own vehicle
  let filtered = vehicles.filter(
    (v) => excludeVehicleId == null || v.id !== excludeVehicleId
  );

  // Filter by heading towards user if specified
  if (isHeadingTowardsUser != null) {
    filtered = filtered.filter((v) => v.headingTowardsUser === isHeadingTowardsUser);
  }

  // Filter by direction if known
  if (isPercentagePositionIncreasing !== undefined) {
    filtered = isPercentagePositionIncreasing
      ? filtered.filter((v) => v.percentagePosition >= percentagePosition)
      : filtered.filter((v) => v.percentagePosition <= percentagePosition);
  }

  // Find closest vehicle
  return filtered.reduce((closest: Vehicle | null, current) => {
    if (!closest) return current;
    const closestDist = Math.abs(closest.percentagePosition - percentagePosition);
    const currentDist = Math.abs(current.percentagePosition - percentagePosition);
    return currentDist < closestDist ? current : closest;
  }, null);
};
