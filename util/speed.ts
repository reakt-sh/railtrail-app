import { SPEED_SMOOTHING_ALPHA, STILLSTAND_THRESHOLD_KMH } from '../constants';

/**
 * Verarbeitet GPS-Rohgeschwindigkeit zu geglätteter km/h-Anzeige.
 *
 * Pipeline: m/s → km/h → Stillstand-Filter → EMA-Glättung → Stillstand-Filter
 *
 * @param rawSpeedMs - GPS-Rohgeschwindigkeit in m/s (kann negativ oder undefined sein)
 * @param previousSmoothed - Vorheriger geglätteter Wert in km/h
 * @returns Geglättete Geschwindigkeit in km/h (0 bei Stillstand)
 */
export const processSpeed = (rawSpeedMs: number, previousSmoothed: number): number => {
  console.log('[processSpeed] Input', { rawSpeedMs, previousSmoothed });

  // 1. m/s → km/h, negative Werte → 0
  const rawKmh = rawSpeedMs >= 0 ? rawSpeedMs * 3.6 : 0;
  console.log('[processSpeed] Converted', { rawKmh });

  // 2. Stillstand-Filter vor Glättung (verhindert Rausch-Einspeisung in EMA)
  const filtered = rawKmh < STILLSTAND_THRESHOLD_KMH ? 0 : rawKmh;
  console.log('[processSpeed] Pre-filter', { filtered, threshold: STILLSTAND_THRESHOLD_KMH });

  // 3. EMA-Glättung: α * aktuell + (1-α) * vorher
  // Bei Kaltstart (previousSmoothed === 0) direkt übernehmen, da EMA sonst
  // niedrige Werte (z.B. Gehgeschwindigkeit 5 km/h) unter den Stillstand-Threshold drückt
  const smoothed = previousSmoothed === 0
    ? filtered
    : SPEED_SMOOTHING_ALPHA * filtered + (1 - SPEED_SMOOTHING_ALPHA) * previousSmoothed;
  console.log('[processSpeed] EMA', { smoothed, coldStart: previousSmoothed === 0, alpha: SPEED_SMOOTHING_ALPHA });

  // 4. Stillstand-Filter nach Glättung (EMA-Nachlauf abfangen)
  const result = smoothed < STILLSTAND_THRESHOLD_KMH ? 0 : smoothed;
  console.log('[processSpeed] Output', { result });
  return result;
};
