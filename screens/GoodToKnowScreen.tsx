import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../values';
import { textStyles } from '../values/text-styles';

export const GoodToKnowScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={textStyles.headerTextBig}>Gut zu wissen</Text>
        <Text style={[textStyles.itemText, styles.placeholder]}>
          Hier findest du nützliche Informationen rund um die Draisinenbahn.
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
