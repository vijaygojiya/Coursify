import {StyleSheet} from 'react-native';

export const AppFonts = {
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};
export const FontsSize = {
  LargeTitle: 32,
  Title1: 28,
  Title2: 24,
  Title3: 20,
  Headline: 16,
  Body1: 14,
  Body: 12,
  SubTitle: 8,
};

export const Typography = StyleSheet.create({
  LargeTitle: {
    fontFamily: AppFonts.bold,
    fontSize: FontsSize.LargeTitle,
  },
  Title1: {
    fontFamily: AppFonts.bold,
    fontSize: FontsSize.Title1,
  },
  Title2: {
    fontFamily: AppFonts.medium,
    fontSize: FontsSize.Title2,
  },
  Title3: {
    fontFamily: AppFonts.medium,
    fontSize: FontsSize.Title3,
  },
  Headline: {
    fontFamily: AppFonts.medium,
    fontSize: FontsSize.Headline,
  },
  Body: {
    fontFamily: AppFonts.regular,
    fontSize: FontsSize.Body,
  },
  Subtitle: {
    fontFamily: AppFonts.regular,
    fontSize: FontsSize.SubTitle,
  },
});
