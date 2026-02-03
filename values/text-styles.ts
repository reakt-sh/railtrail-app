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
  link: {
    fontFamily: Font.regular,
    fontSize: 16,
    color: Color.primary,
    textDecorationLine: 'underline',
  },
  itemText: {
    fontSize: 16,
  },
});
