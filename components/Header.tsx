import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../hooks';
import { formatDistance, formatSpeed } from '../util/formatters';
import { Color } from '../values/color';

interface ExternalProps {
  readonly distance: number;
  readonly speed: number;
  readonly nextVehicle: number | null;
  readonly nextCrossing: number | null;
  readonly vehicleName: string;
  readonly onChangeVehicle: () => void;
}

type Props = ExternalProps;

export const Header = memo(
  ({ distance, speed, nextVehicle, nextCrossing, vehicleName, onChangeVehicle }: Props) => {
    const localizedStrings = useTranslation();
    const insets = useSafeAreaInsets();

    const formattedSpeed = formatSpeed(speed);
    const formattedDistance = formatDistance(distance);

    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>{localizedStrings.t('headerDistance')}</Text>
            <Text style={styles.value}>{formattedDistance}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>{localizedStrings.t('headerNextVehicle')}</Text>
            <Text style={styles.value}>
              {nextVehicle != null ? `${Math.round(nextVehicle)} m` : '-'}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>{localizedStrings.t('headerSpeed')}</Text>
            <Text style={styles.value}>{formattedSpeed} km/h</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>{localizedStrings.t('headerNextCrossing')}</Text>
            <Text style={styles.value}>
              {nextCrossing != null ? `${Math.round(nextCrossing)} m` : '-'}
            </Text>
          </View>
        </View>
        <Pressable onPress={onChangeVehicle}>
          <View style={styles.rowSingleLine}>
            <Text style={styles.labelSingleLine}>{localizedStrings.t('headerVehicleId')}</Text>
            <Text style={styles.valueSingleLine}>{vehicleName ?? ''}</Text>

            <MaterialIcons style={styles.icon} name="swap-horiz" size={24} color={Color.textDark} />
          </View>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.backgroundLight,
    width: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box: {
    width: '50%',
    borderColor: Color.gray,
    borderWidth: 1,
  },
  label: {
    margin: 8,
  },
  value: {
    marginStart: 8,
    marginBottom: 8,
    fontSize: 24,
  },
  rowSingleLine: {
    width: '100%',
    flexDirection: 'row',
  },
  labelSingleLine: {
    margin: 8,
    fontSize: 16,
    alignSelf: 'center',
  },
  valueSingleLine: {
    marginVertical: 8,
    marginEnd: 8,
    fontSize: 24,
  },
  icon: {
    alignSelf: 'center',
  },
});
