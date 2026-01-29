import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

export const TripHistoryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={textStyles.headerTextBig}>Vergangene Fahrten</Text>
        <Text style={[textStyles.itemText, styles.placeholder]}>
          Hier werden zukünftig deine vergangenen Fahrten angezeigt.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundLight,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    marginTop: 16,
    color: Color.darkGray,
  },
});
