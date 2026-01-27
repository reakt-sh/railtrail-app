/**
 * Formatiert eine Distanz in Metern zu einem lesbaren String.
 * Unter 1000m wird in Metern angezeigt, darüber in Kilometern.
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${Math.round(meters / 100) / 10} km`;
};

/**
 * Formatiert Geschwindigkeit für die Anzeige.
 * Werte unter 1 km/h werden als 0 angezeigt.
 */
export const formatSpeed = (kmh: number): number => {
  return kmh < 1 ? 0 : Math.round(kmh);
};
