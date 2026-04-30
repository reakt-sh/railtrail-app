import { SPEED_SMOOTHING_ALPHA, STILLSTAND_THRESHOLD_MS } from '../constants';

/**
 * Verarbeitet GPS-Rohgeschwindigkeit zu geglätteter Geschwindigkeit (m/s).
 *
 * Pipeline: Sanitize → Stillstand-Filter → EMA-Glättung → Stillstand-Filter
 *
 * @param rawSpeedMs - GPS-Rohgeschwindigkeit in m/s (kann negativ oder undefined sein)
 * @param previousSmoothedMs - Vorheriger geglätteter Wert in m/s
 * @returns Geglättete Geschwindigkeit in m/s (0 bei Stillstand)
 */
export const processSpeed = (rawSpeedMs: number, previousSmoothedMs: number): number => {
  // 1. Negative Werte → 0
  const sanitized = rawSpeedMs > 0 ? rawSpeedMs : 0;

  // 2. Stillstand-Filter vor Glättung (verhindert Rausch-Einspeisung in EMA)
  const currentMs = sanitized < STILLSTAND_THRESHOLD_MS ? 0 : sanitized;

  const isStill = currentMs === 0;
  const wasStillBefore = previousSmoothedMs === 0;

  // 3. EMA-Glättung: α * aktuell + (1-α) * vorher
  // - Bei Stillstand sofort 0 zurückgeben statt langsam abklingen
  // - Bei Kaltstart direkt übernehmen, da EMA sonst niedrige Werte unter den
  //   Stillstand-Threshold drücken würde
  const smoothed = isStill
    ? 0
    : wasStillBefore
      ? currentMs
      : SPEED_SMOOTHING_ALPHA * currentMs + (1 - SPEED_SMOOTHING_ALPHA) * previousSmoothedMs;

  // 4. Stillstand-Filter nach Glättung (EMA-Nachlauf abfangen)
  return smoothed < STILLSTAND_THRESHOLD_MS ? 0 : smoothed;
};
