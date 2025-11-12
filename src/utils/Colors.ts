import { useTheme } from "../context/ThemeContext";

const LightTheme = {
  bodyColor: '#ffffff',
  bodyShadeColor: '#ecf9fdff',
  bodyLigheterColor: '#eef5f8ff',
  textBlack: '#000000',
  textFadeBlack: '#484747ad',
  textFadeBlack2: '#0a0a0aad',
  SemiTransparent: 'rgba(0, 0, 0, 0.6)',
  constantBlack: '#000000',
  constantWhite: '#ffffff',
  fadeBorder: '#19191939',
  activeBorder: '#ed5740ff',
  fadeVerify: '#b4c5d7ff',
  CloudBorder: '#c8d8eaff',
  verifyText: '#486483ff',
  blueShadows: '#88add7ff',
  blueLightBG: '#a3c8f246',
  timerText: '#3c4b5dff',
  timerFadeText: '#6d839cff',
  resendOtpText: '#94a2b2ff',
  fadeWhiteText: '#ffffff82',
  fadeWhiteText2: '#c8c8c882',
  KFC_red: '#E4002B',
  tintOrange: '#ffc400ff',
  ButtonBlueColor: '#298dffff',
  orangeColorText: '#f99007ff'
};

const DarkTheme = {
  bodyColor: '#1B1212',
  bodyShadeColor: '#282828ff',
  bodyLigheterColor: '#1b1b1bff',
  textBlack: '#ffffff',
  textFadeBlack: '#989898ad',
  textFadeBlack2: '#a6a4a4ad',
  SemiTransparent: 'rgba(0,0,0,.5)',
  constantBlack: '#000000',
  constantWhite: '#ffffff',
  fadeBorder: '#86838386',
  activeBorder: '#ed5740ff',
  fadeVerify: '#b4c5d7ff',
  CloudBorder: '#c8d8eaff',
  verifyText: '#37516cff',
  blueShadows: '#90a7c2ff',
  blueLightBG: '#a3c8f28a',
  timerText: '#3c4b5dff',
  timerFadeText: '#3c4b5dff',
  resendOtpText: '#486483ff',
  fadeWhiteText: '#ffffff82',
  fadeWhiteText2: '#ffffff82',
  KFC_red: '#E4002B',
  tintOrange: '#ffc400ff',
  ButtonBlueColor: '#298dffff',
  orangeColorText: '#ff9913'
};

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? DarkTheme : LightTheme;
};
