import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Color } from '../consts/color';

interface ExternalProps {
  readonly text: string;
  readonly onPress: () => void;
  readonly isSecondary?: boolean;
  readonly disabled?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
}

type Props = ExternalProps;

export const Button = ({
  text,
  onPress,
  isSecondary,
  disabled,
  style,
  accessibilityLabel,
  accessibilityHint,
}: Props) => (
  <Pressable
    onPress={() => {
      if (!disabled) onPress();
    }}
    style={({ pressed }) => [style, pressed && !disabled ? { opacity: 0.8 } : {}]}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel ?? text}
    accessibilityHint={accessibilityHint}
    accessibilityState={{ disabled: !!disabled }}
  >
    <View style={isSecondary ? styles.secondary : disabled ? styles.disabled : styles.primary}>
      <Text
        style={
          isSecondary ? (disabled ? styles.textDisabled : styles.textSecondary) : styles.textPrimary
        }
      >
        {text}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  primary: {
    borderRadius: 48,
    padding: 16,
    backgroundColor: Color.primary,
  },
  secondary: {
    borderRadius: 48,
    padding: 16,
  },
  disabled: {
    borderRadius: 48,
    padding: 16,
    backgroundColor: Color.darkGray,
  },
  textPrimary: {
    color: Color.white,
    fontSize: 18,
    textAlign: 'center',
  },
  textSecondary: {
    color: Color.primary,
    fontSize: 18,
    textAlign: 'center',
  },
  textDisabled: {
    color: Color.darkGray,
    fontSize: 18,
    textAlign: 'center',
  },
});
