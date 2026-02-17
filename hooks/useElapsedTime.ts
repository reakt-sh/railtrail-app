import { useEffect, useState } from 'react';

/**
 * Hook that calculates elapsed time since a given start time.
 * Works correctly even after app backgrounding because it uses
 * an ISO timestamp and calculates the diff on each render/interval.
 *
 * @param startTime - ISO timestamp string or null
 * @param updateIntervalMs - How often to update (default 10000ms = 10 seconds)
 * @returns Formatted elapsed time string (e.g., "01:23" for 1 hour 23 minutes)
 */
export const useElapsedTime = (
  startTime: string | null,
  updateIntervalMs: number = 10000
): string => {
  const [elapsedTime, setElapsedTime] = useState(() => formatElapsedTime(startTime));

  useEffect(() => {
    if (!startTime) {
      setElapsedTime('--:--');
      return;
    }

    // Update immediately
    setElapsedTime(formatElapsedTime(startTime));

    // Set up interval for updates
    const interval = setInterval(() => {
      setElapsedTime(formatElapsedTime(startTime));
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [startTime, updateIntervalMs]);

  return elapsedTime;
};

/**
 * Formats the elapsed time since the given start time.
 *
 * @param startTime - ISO timestamp string or null
 * @returns Formatted string like "01:23" (hours:minutes) or "--:--" if no start time
 */
export const formatElapsedTime = (startTime: string | null): string => {
  if (!startTime) return '--:--';

  const start = new Date(startTime);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();

  // Handle negative diff (shouldn't happen, but be safe)
  if (diffMs < 0) return '00:00';

  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};
