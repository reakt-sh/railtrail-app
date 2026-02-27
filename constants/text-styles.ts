import { StyleSheet } from 'react-native';
import { Color } from './color';
import { Font } from './fonts';

export const textStyles = StyleSheet.create({
  headerTextHuge: {
    fontFamily: Font.semiBold,
    color: Color.text,
    fontSize: 24,
  },
  headerTextMedium: {
    fontFamily: Font.semiBold,
    color: Color.text,
    fontSize: 20,
  },
  headerTextThin: {
    fontFamily: Font.condensed,
    textTransform: 'uppercase',
    color: Color.text,
    fontSize: 20,
  },
  bodyLarge: {
    fontFamily: Font.regular,
    fontSize: 18,
    color: Color.text,
  },
  bodyMedium: {
    fontFamily: Font.regular,
    fontSize: 16,
    color: Color.text,
  },
  bodySmall: {
    fontFamily: Font.regular,
    fontSize: 14,
    color: Color.text,
  },
  titleSmall: {
    fontFamily: Font.semiBold,
    fontSize: 14,
    color: Color.text,
  },
  hint: {
    fontFamily: Font.regular,
    fontSize: 12,
    color: Color.darkGray,
  },
  link: {
    fontFamily: Font.regular,
    fontSize: 16,
    color: Color.primary,
    textDecorationLine: 'underline',
  },
  textButton: {
    fontFamily: Font.regular,
    fontSize: 16,
    color: Color.primary,
  },
  itemText: {
    fontSize: 16,
  },
});
