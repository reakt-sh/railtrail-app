import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color, Font } from '../values';

export const CustomHeader = ({ options, navigation }: NativeStackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const title = options.title || '';

  return (
    <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={Color.primary} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.backgroundLight,
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomColor: Color.outline,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: Font.condensed,
    fontSize: 32,
    color: Color.primary,
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
});
