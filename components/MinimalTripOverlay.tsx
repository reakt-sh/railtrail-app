import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';
import { formatSpeed } from '../util/formatters';

interface ExternalProps {
  readonly speed: number;
  readonly elapsedTime: string;
  readonly onPress: () => void;
}

type Props = ExternalProps;

export const MinimalTripOverlay = memo(({ speed, elapsedTime, onPress }: Props) => {
  const insets = useSafeAreaInsets();
  const formattedSpeed = formatSpeed(speed);

  return (
    <Pressable
      style={[styles.container, { top: insets.top + 16 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Open trip details"
      accessibilityHint="Opens drawer with full trip information"
    >
      <View style={styles.content}>
        <MaterialCommunityIcons name="menu" size={24} color={Color.white} style={styles.menuIcon} />
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
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    opacity: 0.9,
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValue: {
    ...textStyles.bodyMedium,
    color: Color.white,
    marginLeft: 4,
  },
});
