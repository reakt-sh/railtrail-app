import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { memo, useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';
import { ReduxAppState } from '../redux/init';
import { formatDistance, formatElapsedTime, formatSpeed } from '../util/formatters';

interface InfoRowProps {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const InfoRow = memo(({ label, value, icon }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <MaterialCommunityIcons name={icon} size={24} color={Color.primary} style={styles.rowIcon} />
    <View style={styles.rowContent}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
));

export const TripDrawerContent = memo((props: DrawerContentComponentProps) => {
  const localizedStrings = useTranslation();
  const insets = useSafeAreaInsets();

  const { isActive, currentVehicle, motion, warnings, tripStartTime } = useSelector(
    (state: ReduxAppState) => state.trip
  );

  // Update elapsed time every minute
  const [elapsedTime, setElapsedTime] = useState(formatElapsedTime(tripStartTime ?? null, true));

  useEffect(() => {
    if (!isActive || !tripStartTime) {
      setElapsedTime('--:--');
      return;
    }

    setElapsedTime(formatElapsedTime(tripStartTime, true));
    const interval = setInterval(() => {
      setElapsedTime(formatElapsedTime(tripStartTime, true));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isActive, tripStartTime]);

  const formattedSpeed = `${formatSpeed(motion.speed)} km/h`;
  const formattedDistance = formatDistance(motion.distanceTravelled);

  if (!isActive) {
    return (
      <DrawerContentScrollView {...props} style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="train-car" size={48} color={Color.darkGray} />
          <Text style={styles.emptyStateText}>{localizedStrings.t('drawerNoActiveTrip')}</Text>
        </View>
      </DrawerContentScrollView>
    );
  }

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <MaterialCommunityIcons name="bicycle-cargo" size={32} color={Color.primary} />
        <Text style={styles.vehicleName}>
          {currentVehicle.name ?? localizedStrings.t('drawerUnknownVehicle')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizedStrings.t('drawerTripStats')}</Text>

        <InfoRow
          icon="speedometer"
          label={localizedStrings.t('drawerSpeed')}
          value={formattedSpeed}
        />

        <InfoRow
          icon="map-marker-distance"
          label={localizedStrings.t('drawerDistance')}
          value={formattedDistance}
        />

        <InfoRow
          icon="clock-outline"
          label={localizedStrings.t('drawerElapsedTime')}
          value={elapsedTime}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizedStrings.t('drawerUpcoming')}</Text>

        <InfoRow
          icon="train"
          label={localizedStrings.t('drawerNextDraisine')}
          value={warnings.nextVehicle != null ? `${Math.round(warnings.nextVehicle)} m` : '-'}
        />

        <InfoRow
          icon="boom-gate"
          label={localizedStrings.t('drawerNextCrossing')}
          value={
            warnings.nextLevelCrossing != null ? `${Math.round(warnings.nextLevelCrossing)} m` : '-'
          }
        />

        <InfoRow
          icon="rotate-3d-variant"
          label={localizedStrings.t('drawerNextTurningPoint')}
          value={
            warnings.nextTurningPoint != null ? `${Math.round(warnings.nextTurningPoint)} m` : '-'
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localizedStrings.t('drawerRidingTips')}</Text>

        <Pressable
          style={styles.tipButton}
          onPress={() => Linking.openURL('https://www.youtube.com/watch?v=Y_b3CLVxdr4')}
        >
          <MaterialCommunityIcons name="play-circle" size={24} color={Color.primary} />
          <Text style={styles.tipButtonText}>{localizedStrings.t('infoDraisineRules')}</Text>
        </Pressable>

        <Pressable
          style={styles.tipButton}
          onPress={() => Linking.openURL('https://www.youtube.com/watch?v=hUnVDZjz-_o')}
        >
          <MaterialCommunityIcons name="play-circle" size={24} color={Color.primary} />
          <Text style={styles.tipButtonText}>{localizedStrings.t('infoDraisineTurning')}</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  vehicleName: {
    ...textStyles.headerTextHuge,
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  sectionTitle: {
    ...textStyles.titleSmall,
    color: Color.darkGray,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rowIcon: {
    width: 32,
  },
  rowContent: {
    flex: 1,
    marginLeft: 8,
  },
  rowLabel: {
    ...textStyles.bodySmall,
    color: Color.darkGray,
  },
  rowValue: {
    ...textStyles.headerTextMedium,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tipButtonText: {
    ...textStyles.bodyMedium,
    color: Color.primary,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    ...textStyles.bodyMedium,
    color: Color.darkGray,
    marginTop: 16,
    textAlign: 'center',
  },
});
