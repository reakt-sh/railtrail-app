import { useEffect, useState } from 'react';
import { formatElapsedTime } from '../util';

/**
 * Hook that calculates elapsed time since a given start time.
 * Works correctly even after app backgrounding because it uses
 * an ISO timestamp and calculates the diff on each render/interval.
 *
 * @param startTime - ISO timestamp string or null
 * @param updateIntervalMs - How often to update (default 1000ms = 1 second)
 * @returns Formatted elapsed time string (e.g., "01:23" for 1 hour 23 minutes)
 */
export const useElapsedTime = (
  startTime: string | null,
  updateIntervalMs: number = 1000
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
