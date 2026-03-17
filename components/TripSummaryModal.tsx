import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { DraisineIcon } from '../assets/icons';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';
import { SavedTrip } from '../types/saved-trip';
import { formatDistance, formatDuration } from '../util/formatters';
import { Button } from './Button';

interface Props {
  readonly isVisible: boolean;
  readonly tripData: SavedTrip | null;
  readonly onContinue: () => void;
}

const formatVehicleNames = (trip: SavedTrip): string => {
  if (!trip.segments?.length) {
    return trip.vehicleName ?? '';
  }
  const uniqueNames = [...new Set(trip.segments.map((s) => s.vehicleName))];
  return uniqueNames.join(', ');
};

export const TripSummaryModal = memo(({ isVisible, tripData, onContinue }: Props) => {
  const i18n = useTranslation();

  if (!tripData) return null;

  const vehicleDisplayName = formatVehicleNames(tripData);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{i18n.t('feedbackTripSummary')}</Text>

          <View style={styles.vehicleRow}>
            <DraisineIcon width={24} height={24} color={Color.primary} />
            <Text style={textStyles.headerTextMedium}>{vehicleDisplayName}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="map-marker-distance" size={20} color={Color.darkGray} />
              <Text style={textStyles.bodyMedium}>{formatDistance(tripData.totalDistance)}</Text>
            </View>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={Color.darkGray} />
              <Text style={textStyles.bodyMedium}>
                {formatDuration(
                  tripData.startTime,
                  tripData.endTime,
                  i18n.t('tripHistoryHours'),
                  i18n.t('tripHistoryMinutes')
                )}
              </Text>
            </View>
          </View>

          <Button
            text={i18n.t('buttonContinue')}
            onPress={onContinue}
            style={styles.continueButton}
            innerStyle={styles.continueButton}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    backgroundColor: Color.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    ...textStyles.headerTextHuge,
    marginBottom: 20,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});
