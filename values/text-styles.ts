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
});
