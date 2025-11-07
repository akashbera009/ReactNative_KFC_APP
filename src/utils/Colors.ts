import { useTheme } from "../context/ThemeContext";

const LightTheme = {
  bodyColor: '#ffffff',
  bodyShadeColor: '#ecf9fdff',
  bodyLigheterColor: '#e0e2e3ff',
  textBlack: '#000000',
  textFadeBlack: '#484747ad',
  SemiTransparent:'rgba(0, 0, 0, 0.6)',
  constantBlack: '#000000',
  constantWhite: '#ffffff',
  fadeBorder: '#19191939',
  activeBorder: '#ed5740ff',
  fadeVerify: '#b4c5d7ff',
  verifyText: '#486483ff',
  blueShadows: '#88add7ff',
  timerText: '#3c4b5dff',
  timerFadeText: '#6d839cff',
  resendOtpText : '#94a2b2ff',
  fadeWhiteText: '#ffffff82',
  KFC_red: '#E4002B',
  tintOrange: '#ffc400ff',
  ButtonBlueColor: '#298dffff',
  orangeColorText:'#f99007ff'
};

const DarkTheme = {
  bodyColor: '#000000',
  bodyShadeColor: '#282828ff',
  bodyLigheterColor: '#1b1b1bff',
  textBlack: '#ffffff',
  textFadeBlack: '#000000ad',
  SemiTransparent:'rgba(0,0,0,.5)',
  constantBlack: '#000000',
  constantWhite: '#ffffff',
  fadeborder: '#19191939',
  activeBorder: '#ed5740ff',
  fadeVerify: '#b4c5d7ff',
  verifyText: '#37516cff',
  blueShadows: '#486483ff',
  timerText: '#3c4b5dff',
  timerFadeText: '#3c4b5dff',
  resendOtpText : '#486483ff',
  fadeWhiteText: '#ffffff82',
  KFC_red: '#E4002B',
  tintOrange: '#ffc400ff',
  ButtonBlueColor: '#298dffff',
  orangeColorText:'#ff9913'
};

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? DarkTheme : LightTheme;
};
