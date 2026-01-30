import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../values/color';
import { textStyles } from '../values/text-styles';

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
          state == SnackbarState.WARNING ? textStyles.textLight : textStyles.textAccent,
        ]}
      >
        {title}
      </Text>
      <Text style={state == SnackbarState.WARNING ? textStyles.textLight : textStyles.textDark}>
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
    ...textStyles.headerTextNormal,
    marginBottom: 4,
  },
});

export enum SnackbarState {
  WARNING,
  INFO,
}
