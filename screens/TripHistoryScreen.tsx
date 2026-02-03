import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSavedTrip, loadSavedTrips } from '../effect-actions/trip-storage';
import { ReduxAppState } from '../redux/init';
import { SavedTrip } from '../types/saved-trip';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
};

const formatDuration = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  if (hours > 0) {
    return `${hours} Std ${mins} Min`;
  }
  return `${mins} Min`;
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface TripCardProps {
  trip: SavedTrip;
  onDelete: (tripId: string) => void;
}

const TripCard = ({ trip, onDelete }: TripCardProps) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(trip.id)}>
      <MaterialCommunityIcons name="delete" size={24} color={Color.white} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="train-car" size={20} color={Color.primary} />
          <Text style={[textStyles.headerTextMedium, styles.vehicleName]}>{trip.vehicleName}</Text>
        </View>
        <Text style={[textStyles.bodySmall, styles.date]}>{formatDate(trip.startTime)}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="map-marker-distance" size={18} color={Color.darkGray} />
            <Text style={textStyles.bodyMedium}>{formatDistance(trip.totalDistance)}</Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="clock-outline" size={18} color={Color.darkGray} />
            <Text style={textStyles.bodyMedium}>
              {formatDuration(trip.startTime, trip.endTime)}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export const TripHistoryScreen = () => {
  const dispatch = useDispatch();
  const { savedTrips, isLoading } = useSelector((state: ReduxAppState) => state.tripHistory);

  useEffect(() => {
    loadSavedTrips(dispatch);
  }, [dispatch]);

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert('Fahrt loeschen', 'Moechtest du diese Fahrt wirklich loeschen?', [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Loeschen',
        style: 'destructive',
        onPress: () => deleteSavedTrip(dispatch, tripId),
      },
    ]);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name="train" size={64} color={Color.outline} />
      <Text style={[textStyles.bodyMedium, styles.emptyText]}>
        Noch keine Fahrten aufgezeichnet.
      </Text>
      <Text style={[textStyles.bodySmall, styles.emptySubtext]}>
        Starte eine Fahrt auf der Karte, um sie hier zu sehen.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View style={styles.container}>
        <Text style={textStyles.headerTextHuge}>Vergangene Fahrten</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Color.primary} style={styles.loader} />
        ) : (
          <FlatList
            data={savedTrips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TripCard trip={item} onDelete={handleDeleteTrip} />}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={savedTrips.length === 0 ? styles.emptyContainer : styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
  card: {
    backgroundColor: Color.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleName: {
    marginLeft: 8,
    flex: 1,
  },
  date: {
    color: Color.darkGray,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteButton: {
    backgroundColor: Color.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 12,
    borderRadius: 12,
  },
});
