import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../constants/color';
import { textStyles } from '../constants/text-styles';

interface ExternalProps {
  readonly title: string;
  readonly message: string;
  readonly state: SnackbarState;
  readonly onPress?: () => void;
}

type Props = ExternalProps;

export const Snackbar = ({ title, message, state, onPress = () => {} }: Props) => (
  <Pressable
    onPress={() => {
      onPress();
    }}
    accessibilityRole="alert"
    accessibilityLabel={`${title}: ${message}`}
  >
    <View
      style={[
        styles.container,
        state == SnackbarState.WARNING ? styles.backgroundWarning : styles.backgroundInfo,
      ]}
    >
      <Text
        style={[
          styles.headerText,
          { color: state == SnackbarState.WARNING ? Color.white : Color.primary },
        ]}
      >
        {title}
      </Text>
      <Text style={[textStyles.bodyMedium, { color: state == SnackbarState.WARNING ? Color.white : Color.primary }]}>
        {message}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  backgroundWarning: {
    backgroundColor: Color.warning,
  },
  backgroundInfo: {
    backgroundColor: Color.backgroundLight,
  },
  headerText: {
    ...textStyles.bodyMedium,
    marginBottom: 4,
  },
});

export enum SnackbarState {
  WARNING,
  INFO,
}
