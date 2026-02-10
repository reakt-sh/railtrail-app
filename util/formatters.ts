/**
 * Formatiert eine Distanz in Metern zu einem lesbaren String.
 * Unter 1000m wird in Metern angezeigt, darüber in Kilometern.
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
};

/**
 * Formatiert Geschwindigkeit für die Anzeige.
 * Werte unter 1 km/h werden als 0 angezeigt.
 */
export const formatSpeed = (kmh: number): number => {
  return kmh < 1 ? 0 : Math.round(kmh);
};

export const formatDuration = (
  startTime: string,
  endTime: string,
  hoursLabel: string,
  minutesLabel: string
): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  if (hours > 0) {
    return `${hours} ${hoursLabel} ${mins} ${minutesLabel}`;
  }
  return `${mins} ${minutesLabel}`;
};

export const formatDate = (isoString: string, locale: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
