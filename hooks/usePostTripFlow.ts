import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { submitFeedback } from '../api/feedback';
import { getVehicleWithLongestDistance, saveTrip } from '../effect-actions/trip-storage';
import { AppActionType } from '../redux/app';
import { TripActionType } from '../redux/trip';
import { SavedTrip } from '../types/saved-trip';

interface UsePostTripFlowReturn {
  isSummaryVisible: boolean;
  isFeedbackVisible: boolean;
  pendingTripData: SavedTrip | null;
  setPendingTripData: (data: SavedTrip | null) => void;
  showSummary: () => void;
  handleSummaryContinue: () => void;
  handleFeedbackSubmit: (rating: number, text?: string) => void;
  handleFeedbackSkip: () => void;
}

export const usePostTripFlow = (): UsePostTripFlowReturn => {
  const dispatch = useDispatch<Dispatch<AppActionType | TripActionType>>();

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [pendingTripData, setPendingTripData] = useState<SavedTrip | null>(null);

  const showSummary = useCallback(() => {
    setIsSummaryVisible(true);
  }, []);

  const handleSummaryContinue = useCallback(() => {
    setIsSummaryVisible(false);
    setIsFeedbackVisible(true);
  }, []);

  const handleFeedbackSubmit = useCallback(
    async (rating: number, text?: string) => {
      try {
        if (pendingTripData) {
          const vehicleId = getVehicleWithLongestDistance(pendingTripData.segments);
          if (vehicleId) {
            await submitFeedback({ rating, text, vehicle: vehicleId });
          }
          await saveTrip(dispatch, pendingTripData);
        }
      } finally {
        setIsFeedbackVisible(false);
        setPendingTripData(null);
      }
    },
    [pendingTripData, dispatch]
  );

  const handleFeedbackSkip = useCallback(async () => {
    try {
      if (pendingTripData) {
        await saveTrip(dispatch, pendingTripData);
      }
    } finally {
      setIsFeedbackVisible(false);
      setPendingTripData(null);
    }
  }, [pendingTripData, dispatch]);

  return {
    isSummaryVisible,
    isFeedbackVisible,
    pendingTripData,
    setPendingTripData,
    showSummary,
    handleSummaryContinue,
    handleFeedbackSubmit,
    handleFeedbackSkip,
  };
};
