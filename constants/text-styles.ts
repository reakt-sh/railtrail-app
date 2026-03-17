import { StyleSheet } from 'react-native';
import { Color } from './color';
import { Font } from './fonts';

export const textStyles = StyleSheet.create({
  displayLarge: {
    fontFamily: Font.regular,
    color: Color.white,
    fontSize: 26,
  },
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
  titleMedium: {
    fontFamily: Font.semiBold,
    fontSize: 18,
    color: Color.text,
  },
  titleSmall: {
    fontFamily: Font.semiBold,
    fontSize: 14,
    color: Color.text,
  },
  buttonText: {
    fontFamily: Font.semiBold,
    fontSize: 18,
    fontWeight: '600',
    color: Color.primary,
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
