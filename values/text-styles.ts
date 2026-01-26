import { StyleSheet } from 'react-native';
import { Color } from './color';

export const textStyles = StyleSheet.create({
  headerTextHuge: {
    fontWeight: '600',
    fontSize: 24,
  },
  headerTextBig: {
    fontWeight: '600',
    fontSize: 18,
  },
  headerTextNormal: {
    fontWeight: '600',
    fontSize: 14,
  },
  itemText: {
    fontSize: 16,
  },
  textDark: {
    color: Color.textDark,
  },
  textLigth: {
    color: Color.textLight,
  },
  textAccent: {
    color: Color.primary,
  },
  textAlignmentCenter: {
    textAlign: 'center',
  },
  textSpacing24: {
    marginBottom: 24,
  },
  textSpacing16: {
    marginBottom: 16,
  },
  textSpacing8: {
    marginBottom: 8,
  },
  textSpacing4: {
    marginBottom: 4,
  },
});
