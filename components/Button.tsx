import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { textStyles } from '../constants';
import { Color } from '../constants/color';

interface ExternalProps extends PressableProps {
  readonly text: string;
  readonly onPress: () => void;
  readonly isSecondary?: boolean;
  readonly disabled?: boolean;
  readonly innerStyle?: StyleProp<ViewStyle>;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
}

type Props = ExternalProps;

export const Button = ({
  text,
  isSecondary,
  innerStyle,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: Props) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel ?? text}
    accessibilityHint={accessibilityHint}
    accessibilityState={{ disabled: !!props.disabled }}
    {...props}
  >
    <View
      style={[
        styles.buttonContainer,
        innerStyle,
        props.disabled ? styles.disabled : isSecondary ? {} : styles.primary,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          props.disabled
            ? styles.textDisabled
            : isSecondary
              ? styles.textSecondary
              : styles.textPrimary,
        ]}
      >
        {text}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 48,
    padding: 16,
  },
  primary: {
    backgroundColor: Color.primary,
  },
  disabled: {
    backgroundColor: Color.outline,
  },
  buttonText: {
    ...textStyles.buttonText,
    textAlign: 'center',
  },
  textPrimary: {
    color: Color.white,
  },
  textSecondary: {
    ...textStyles.bodyMedium,
    color: Color.primary,
  },
  textDisabled: {
    color: Color.white,
  },
});
