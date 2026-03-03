import { Locale } from '../constants';
import { SavedTrip } from '../types/saved-trip';

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
  const localesArgument = locale === Locale.de ? 'de-DE' : 'en-US';

  return date.toLocaleDateString(localesArgument, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formats the elapsed time since the given start time.
 *
 * @param startTime - ISO timestamp string or null
 * @returns Formatted string like "01:23" (hours:minutes) or "--:--" if no start time
 */
export const formatElapsedTime = (startTime: string | null, withSeconds = true): string => {
  if (!startTime) return '--:--';

  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();

  // Handle negative diff (shouldn't happen, but be safe)
  if (diffMs < 0) return withSeconds ? '00:00:00' : '00:00';

  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  const seconds = Math.floor((diffMs % 60000) / 1000);

  const hoursAndMins = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  if (withSeconds) {
    return `${hoursAndMins}:${seconds.toString().padStart(2, '0')}`;
  }
  return hoursAndMins;
};

export const formatVehicleNames = (trip: SavedTrip): string => {
  if (!trip.segments?.length) {
    return trip.vehicleName ?? '';
  }
  const uniqueNames = [...new Set(trip.segments.map((s) => s.vehicleName))];
  return uniqueNames.join(', ');
};
