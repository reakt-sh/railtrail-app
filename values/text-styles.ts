import { StyleSheet } from 'react-native';
import { Color } from './color';
import { Font } from './fonts';

export const textStyles = StyleSheet.create({
  headerTextHuge: {
    fontFamily: Font.semiBold,
    fontSize: 24,
  },
  headerTextBig: {
    fontFamily: Font.semiBold,
    fontSize: 20,
  },
  headerTextMedium: {
    fontFamily: Font.condensed,
    textTransform: 'uppercase',
    fontSize: 20,
  },
  headerTextNormal: {
    fontFamily: Font.semiBold,
    fontSize: 16,
    color: Color.textDark,
  },
  bodyMedium: {
    fontFamily: Font.regular,
    fontSize: 16,
    color: Color.textDark,
  },
  bodySmall: {
    fontFamily: Font.regular,
    fontSize: 14,
    color: Color.textDark,
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
});
