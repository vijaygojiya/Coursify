import { StyleSheet } from "react-native";

export const AppFonts = {
  medium: "Poppins-Medium",
  regular: "Poppins-Regular",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
};

export const textStyles = StyleSheet.create({
  displayLarge: {
    fontFamily: AppFonts.regular,
    fontSize: 57,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: AppFonts.regular,
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: AppFonts.regular,
    fontSize: 36,
  },
  headlineLarge: {
    fontFamily: AppFonts.semiBold,
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: AppFonts.semiBold,
    fontSize: 28,
  },
  headlineSmall: {
    fontFamily: AppFonts.semiBold,
    fontSize: 24,
  },
  titleLarge: {
    fontFamily: AppFonts.medium,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: AppFonts.medium,
    fontSize: 16,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: AppFonts.medium,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  labelLargeProminent: {
    fontFamily: AppFonts.semiBold,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontFamily: AppFonts.medium,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  labelMediumProminent: {
    fontFamily: AppFonts.semiBold,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  labelMedium: {
    fontFamily: AppFonts.medium,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: AppFonts.medium,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontFamily: AppFonts.regular,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: AppFonts.regular,
    fontSize: 14,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: AppFonts.regular,
    fontSize: 12,
    letterSpacing: 0.4,
  },
});
