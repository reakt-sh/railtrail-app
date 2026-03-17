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
  readonly style?: StyleProp<ViewStyle>;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
}

type Props = ExternalProps;

export const InversedButton = ({
  text,
  style,
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
    <View style={[styles.buttonContainer, props.disabled ? styles.disabled : styles.primary]}>
      <Text style={[styles.buttonText, props.disabled ? styles.textDisabled : styles.textPrimary]}>
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
    backgroundColor: Color.white,
  },
  disabled: {
    backgroundColor: Color.white,
  },
  buttonText: {
    ...textStyles.buttonText,
    color: Color.primary,
    textAlign: 'center',
  },
  textPrimary: {
    color: Color.primary,
  },
  textDisabled: {
    color: Color.outline,
  },
});
