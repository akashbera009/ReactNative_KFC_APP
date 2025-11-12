type RootStackParamList = {
  HomeScreen: undefined
  ChangeLocationBottomSheetScreen: undefined,
  PopUpScreens: undefined
  LoginScreen: undefined
  LoginScreen2: undefined
  OTPScreen: { phoneNo: string }
  CreateProfileScreen: { phoneNo: string }
  ExploreMenuScreen:undefined 
  FontsScreen: undefined
  HelpScreen: undefined
  SplashScreen: undefined
  LoginPageCountryBottomSheetScreen: undefined
}

type RootDrawerParamList = {
  Main: undefined;
}
type OtpScreenPropType = NativeStackScreenProps<RootStackParamList, 'OTPScreen'>
type CreateProfilePageProps = NativeStackScreenProps<RootStackParamList, 'CreateProfileScreen'>

type ColorContextType = {
  isDarkMode: boolean,
  setIsDarkMode: (mode: boolean) => void;
};
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};
type CountryContextType = {
  countrySelected: countryType;
  setCountrySelected: (con: countryType) => void;
};

type FontType = {
  [key: string]: string;
}
type ColorType = {
  [key: string]: string
}

type countryType = {
  name: string,
  flag: Image,
  code: string,
  mobileCode: string,
  mobileNoLength: number,
  mobileNoFraction: number,
  currencyCode: string
}
type DeliveryDetailsType = {
  [key: string]: string
}
type MenuItem = {
  id: string,
  title: string,
  description: string,
  price: number,
  image: Image,
  category: 'deals' | 'forOne' | 'forSharing' | 'sidesDeserts' | 'beverages' | 'bestSeller',
}
type menuDataType = {
  id: number,
  name: string,
  description: string[],
  price: number,
  oldPrice: number,
  currency: string,
  tag: string,
  image: Image,
  isFavorite: boolean,
  customizable: boolean,
  categories: string[]
}