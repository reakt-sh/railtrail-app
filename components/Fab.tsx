import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';

interface ExternalProps {
  readonly onPress: () => void;
  readonly children: JSX.Element;
  readonly accessibilityLabel: string;
  readonly accessibilityHint?: string;
}

type Props = ExternalProps;

export const FAB = ({ onPress, children, accessibilityLabel, accessibilityHint }: Props) => (
  <View style={styles.alignEnd}>
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {children}
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  alignEnd: {
    alignSelf: 'flex-end',
  },
  container: {
    margin: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
});
