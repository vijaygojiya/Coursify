import {StyleSheet} from 'react-native';
import fonts from './fonts';

const textVariants = StyleSheet.create({
  h1: {
    fontFamily: fonts.bold,
    fontSize: 40,
    lineHeight: 56,
    // letterSpacing: -0.022 * 40, // -2.2% of the font size
  },
  h2: {
    fontFamily: fonts.semiBold,
    fontSize: 32,
    lineHeight: 42,
    // letterSpacing: -0.021 * 30, // -2.1% of the font size
  },
  h3: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 34,
    // letterSpacing: -0.019 * 24, // -1.9% of the font size
  },
  h4: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    lineHeight: 28,
    // letterSpacing: -0.017 * 20, // -1.7% of the font size
  },
  h5: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
    // letterSpacing: -0.011 * 16, // -1.1% of the font size
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    // letterSpacing: -0.006 * 14, // -0.6% of the font size
  },
  small: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    // letterSpacing: 0, // 0% of the font size
  },
  extraSmall: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 14,
    // letterSpacing: 0.01 * 10, // 1% of the font size
  },
});

export default textVariants;
