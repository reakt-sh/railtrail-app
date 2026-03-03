import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { submitFeedback } from '../api/feedback';
import { DraisineIcon } from '../assets/icons';
import { FeedbackBottomSheet, TripCard } from '../components';
import { Color } from '../constants';
import { textStyles } from '../constants/text-styles';
import {
  deleteSavedTrip,
  getVehicleWithLongestDistance,
  loadSavedTrips,
} from '../effect-actions/trip-storage';
import { useTranslation } from '../hooks/useTranslation';
import { ReduxAppState } from '../redux/init';
import { SavedTrip } from '../types/saved-trip';

export const TripHistoryScreen = () => {
  const dispatch = useDispatch();
  const i18n = useTranslation();
  const { savedTrips, isLoading } = useSelector((state: ReduxAppState) => state.tripHistory);

  const [feedbackTrip, setFeedbackTrip] = useState<SavedTrip | null>(null);

  useEffect(() => {
    loadSavedTrips(dispatch);
  }, [dispatch]);

  const handleMenuAction = (tripId: string, action: string) => {
    switch (action) {
      case 'feedback': {
        const trip = savedTrips.find((t) => t.id === tripId) ?? null;
        setFeedbackTrip(trip);
        break;
      }
    }
  };

  const handleFeedbackSubmit = async (rating: number, text?: string) => {
    if (feedbackTrip) {
      const vehicleId = getVehicleWithLongestDistance(feedbackTrip.segments);
      if (vehicleId) {
        await submitFeedback({ rating, text, vehicle: vehicleId });
      }
    }
    setFeedbackTrip(null);
    Alert.alert(i18n.t('feedbackThankYouTitle'), i18n.t('feedbackThankYouMessage'));
  };

  const handleFeedbackSkip = () => {
    setFeedbackTrip(null);
  };

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(i18n.t('tripHistoryDeleteTitle'), i18n.t('tripHistoryDeleteMessage'), [
      { text: i18n.t('tripHistoryDeleteCancel'), style: 'cancel' },
      {
        text: i18n.t('tripHistoryDeleteConfirm'),
        style: 'destructive',
        onPress: () => deleteSavedTrip(dispatch, tripId),
      },
    ]);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <DraisineIcon width={64} height={64} color={Color.outline} />
      <Text style={[textStyles.bodyMedium, styles.emptyText]}>{i18n.t('tripHistoryEmpty')}</Text>
      <Text style={[textStyles.bodySmall, styles.emptySubtext]}>
        {i18n.t('tripHistoryEmptySubtext')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Color.primary} style={styles.loader} />
        ) : (
          <FlatList
            data={savedTrips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TripCard
                trip={item}
                onDelete={handleDeleteTrip}
                onMenuAction={handleMenuAction}
                i18n={i18n}
              />
            )}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={savedTrips.length === 0 ? styles.emptyContainer : styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <FeedbackBottomSheet
        isVisible={feedbackTrip !== null}
        onSubmit={handleFeedbackSubmit}
        onSkip={handleFeedbackSkip}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundLight,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 32,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    marginTop: 16,
    color: Color.darkGray,
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    color: Color.darkGray,
    textAlign: 'center',
  },
});
