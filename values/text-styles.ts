import { StyleSheet } from 'react-native';
import { Color, Font } from './color';

export const textStyles = StyleSheet.create({
  headerTextHuge: {
    fontFamily: Font.semiBold,
    fontSize: 24,
  },
  headerTextBig: {
    fontFamily: Font.semiBold,
    fontSize: 18,
  },
  headerTextNormal: {
    fontFamily: Font.semiBold,
    fontSize: 14,
  },
  itemText: {
    fontSize: 16,
  },
  textDark: {
    color: Color.textDark,
  },
  textLight: {
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
