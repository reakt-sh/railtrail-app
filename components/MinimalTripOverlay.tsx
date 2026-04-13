import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { useTranslation } from '../hooks';
import { formatDistance, formatSpeed } from '../util/formatters';

interface ExternalProps {
  readonly speed: number;
  readonly elapsedTime: string;
  readonly distance: number;
  readonly onPress: () => void;
  readonly onStopTrip: () => void;
}

type Props = ExternalProps;

export const MinimalTripOverlay = memo(({ speed, elapsedTime, distance, onPress, onStopTrip }: Props) => {
  const insets = useSafeAreaInsets();
  const formattedSpeed = formatSpeed(speed);
  const i18n = useTranslation();

  return (
    <View style={[styles.container, { top: insets.top + 32 }]}>
      {/* Left area: tap opens drawer */}
      <Pressable
        style={styles.infoArea}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Open trip details"
        accessibilityHint="Opens drawer with full trip information"
      >
        <View style={styles.menuContainer}>
          <MaterialCommunityIcons name="speedometer" size={24} color={Color.white} />
          <Text style={styles.menuLabel}>{i18n.t('menuButtonLabel')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.speedContainer}>
          <Text style={styles.speedValue}>{formattedSpeed}</Text>
          <Text style={styles.speedUnit}>km/h</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.timeContainer}>
          <MaterialCommunityIcons name="clock-outline" size={16} color={Color.white} />
          <Text style={styles.timeValue}>{elapsedTime}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.distanceContainer}>
          <MaterialCommunityIcons name="map-marker-distance" size={16} color={Color.white} />
          <Text style={styles.distanceValue}>{formatDistance(distance)}</Text>
        </View>
      </Pressable>

      {/* Right area: stop button */}
      <View style={styles.stopDivider} />
      <Pressable
        style={styles.stopButton}
        onPress={onStopTrip}
        accessibilityRole="button"
        accessibilityLabel="Stop trip"
        accessibilityHint="Shows confirmation dialog to end the current trip"
      >
        <View style={styles.stopIconWrapper}>
          <View style={styles.stopIconBackground} />
          <MaterialCommunityIcons name="stop-circle" size={28} color={Color.stop} />
        </View>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 12,
  },
  menuContainer: {
    alignItems: 'center',
  },
  menuLabel: {
    color: Color.white,
    fontSize: 10,
    opacity: 0.7,
    marginTop: 1,
  },
  speedContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  speedValue: {
    ...textStyles.headerTextHuge,
    color: Color.white,
    fontSize: 32,
    lineHeight: 36,
  },
  speedUnit: {
    ...textStyles.bodySmall,
    color: Color.white,
    marginLeft: 4,
    opacity: 0.8,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
  stopDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValue: {
    ...textStyles.bodyMedium,
    color: Color.white,
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceValue: {
    ...textStyles.bodyMedium,
    color: Color.white,
    marginLeft: 4,
  },
  stopButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  stopIconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopIconBackground: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
});
