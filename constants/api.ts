import { POSITIONING_WS_URL, API_TIMEOUT, FEEDBACK_URL } from '@env';

// Fallback-Werte falls .env nicht geladen wird
const DEFAULT_WS_URL = 'wss://railtrail.rtsys.informatik.uni-kiel.de/api/position-updates';

// WebSocket für Echtzeit-Positionen
export const positioningWsUrl = POSITIONING_WS_URL || DEFAULT_WS_URL;

// API Timeout
export const BACKEND_TIMEOUT = parseInt(API_TIMEOUT, 10) || 3000;

// Feedback URL (optional - wenn nicht gesetzt, wird kein Feedback gesendet)
export const feedbackUrl = FEEDBACK_URL || '';

// Debug: Log loaded values
if (__DEV__) {
  console.log('[Config] WebSocket URL:', positioningWsUrl);
}
