import { feedbackUrl } from '../constants';

interface FeedbackPayload {
  rating: number; // 0-5
  text?: string; // optional
  vehicle: number; // vehicle ID
}

export const submitFeedback = async (payload: FeedbackPayload): Promise<void> => {
  if (!feedbackUrl) {
    if (__DEV__) {
      console.log('[Feedback] No FEEDBACK_URL configured, skipping');
    }
    return;
  }

  try {
    const res = await fetch(feedbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('[Feedback] Feedback submitted:', res);
  } catch (error) {
    // Silently ignore errors - feedback is optional
    if (__DEV__) {
      console.warn('[Feedback] Submit failed:', error);
    }
  }
};
