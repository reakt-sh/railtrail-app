import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { JSX } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Color } from '../constants/color';

interface ExternalProps {
  readonly isChecked: boolean;
  readonly setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  readonly children?: JSX.Element;
  readonly style?: StyleProp<ViewStyle>;
  readonly accessibilityLabel?: string;
  readonly color?: string;
}

type Props = ExternalProps;

export const Checkbox = ({
  isChecked,
  setIsChecked,
  children,
  style,
  accessibilityLabel,
  color,
}: Props) => {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => {
        setIsChecked(!isChecked);
      }}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: isChecked }}
    >
      {isChecked ? (
        <MaterialCommunityIcons name="checkbox-marked" size={24} color={color ?? Color.primary} />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={24}
          color={color ?? Color.text}
        />
      )}
      <View style={styles.childrenContainer}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childrenContainer: {
    marginStart: 8,
  },
});
