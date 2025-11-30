import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const AppColors = {
  // Neutrals

  neutral10: "#FFFFFF",
  neutral20: "#F6F6F6",
  neutral30: "#EFEFEF",
  neutral40: "#E3E3E3",
  neutral50: "#C7C8C8",
  neutral60: "#A7A8A7",
  neutral70: "#828382",
  neutral80: "#707070",
  neutral90: "#525252",
  neutral100: "#212221",
  back: "#000000",

  // Primary
  primaryMain: "#0CA190",
  primaryPressed: "#1D4D50",
  primaryHover: "#308681",
  primaryFocus: "#D8ECEB",
  primaryBorder: "#BDE0D8",
  primarySurface: "#E9FFFB",

  // Semantic - Success
  successMain: "#3CA6B9",
  successPressed: "#4E5F36",
  successHover: "#4E5F36",
  successBorder: "#DEEACE",
  successSurface: "#EBF2E2",

  // Semantic - Warning
  warningMain: "#FFA654",
  warningPressed: "#80532A",
  warningHover: "#D48A46",
  warningBorder: "#FFE1C6",
  warningSurface: "#FFF1E5",

  // Semantic - Danger
  dangerMain: "#F2645A",
  dangerPressed: "#79322D",
  dangerHover: "#CA534B",
  dangerBorder: "#FBCBC8",
  dangerSurface: "#FFF1F0",

  // Semantic - Info
  infoMain: "#42454E",
  infoPressed: "#212227",
  infoHover: "#242426",
  infoBorder: "#C0C1C4",
  infoSurface: "#D9DADC",

  // Gradient
  gradientYellow: ["#0CA190", "#BDE0D8"],
  gradientBlack: ["#ffffff", "#121212"],

  gradientPrimary: ["#0CA190", "transparent"],

  // Transparent
  transparent70: "rgba(34, 34, 34, 0.7)",
  transparent60: "rgba(70, 70, 70, 0.6)",
  transparent50: "rgba(161, 161, 161, 0.5)",
  transparent20: "rgba(34, 34, 34, 0.2)",
  transparent: "transparent",
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primaryMain,
    background: AppColors.neutral10,
    ...AppColors,
  },
} as ReactNavigation.Theme;

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: AppColors.neutral100,
    ...AppColors,
  },
} as ReactNavigation.Theme;

export type IAppColor = typeof AppColors;
