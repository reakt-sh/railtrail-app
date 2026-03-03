import { MaterialCommunityIcons } from '@expo/vector-icons';
import { I18n } from 'i18n-js';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { DraisineIcon } from '../assets/icons';
import { Color, Locale } from '../constants';
import { textStyles } from '../constants/text-styles';
import { SavedTrip } from '../types/saved-trip';
import { formatDate, formatDistance, formatDuration, formatVehicleNames } from '../util/formatters';
import { ContextMenu, ContextMenuItem } from './ContextMenu';

interface TripCardProps {
  trip: SavedTrip;
  onDelete: (tripId: string) => void;
  onMenuAction: (tripId: string, action: string) => void;
  i18n: I18n;
}

export const TripCard = ({ trip, onDelete, onMenuAction, i18n }: TripCardProps) => {
  const locale = i18n.locale as Locale;
  const vehicleDisplayName = formatVehicleNames(trip);
  const menuButtonRef = useRef<View>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleMenuOpen = () => {
    menuButtonRef.current?.measure((_x, _y, width, _height, pageX, pageY) => {
      setMenuPosition({ x: pageX + width - 180, y: pageY });
      setMenuVisible(true);
    });
  };

  const menuItems: ContextMenuItem[] = [
    {
      label: i18n.t('tripCardMenuFeedback'),
      icon: 'star-outline',
      onPress: () => onMenuAction(trip.id, 'feedback'),
    },
    {
      label: i18n.t('tripCardMenuDelete'),
      icon: 'delete-outline',
      onPress: () => onDelete(trip.id),
      destructive: true,
    },
  ];

  const renderDeleteAction = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(trip.id)}
      accessibilityRole="button"
      accessibilityLabel={i18n.t('a11yDeleteTrip')}
    >
      <MaterialCommunityIcons name="delete" size={24} color={Color.white} />
    </TouchableOpacity>
  );

  return (
    <ReanimatedSwipeable renderRightActions={renderDeleteAction}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <DraisineIcon width={20} height={20} color={Color.primary} />
          <Text style={[textStyles.headerTextMedium, styles.vehicleName]}>
            {vehicleDisplayName}
          </Text>
          <TouchableOpacity onPress={handleMenuOpen} hitSlop={8} style={styles.menuButton}>
            <View ref={menuButtonRef} collapsable={false}>
              <MaterialCommunityIcons name="dots-vertical" size={20} color={Color.darkGray} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[textStyles.bodySmall, styles.date]}>
          {formatDate(trip.startTime, locale)}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="map-marker-distance" size={18} color={Color.darkGray} />
            <Text style={textStyles.bodyMedium}>{formatDistance(trip.totalDistance)}</Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="clock-outline" size={18} color={Color.darkGray} />
            <Text style={textStyles.bodyMedium}>
              {formatDuration(
                trip.startTime,
                trip.endTime,
                i18n.t('tripHistoryHours'),
                i18n.t('tripHistoryMinutes')
              )}
            </Text>
          </View>
        </View>
      </View>
      <ContextMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        items={menuItems}
        anchorPosition={menuPosition}
      />
    </ReanimatedSwipeable>
  );
};

const styles = StyleSheet.create({
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
  menuButton: {
    padding: 4,
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
    marginLeft: 8,
    borderRadius: 12,
  },
});
