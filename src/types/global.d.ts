
type RootStackParamList = {
  HomeScreen: undefined
  LoginScreen: undefined
  LoginScreen2: undefined
  OTPScreen: {phoneNo: string}
  CreateProfileScreen: {phoneNo: string}
  FontsScreen : undefined
  HelpScreen : undefined
  SplashScreen:undefined
  LoginPageCountryBottomSheetScreen: undefined
}

type RootDrawerParamList = {
  Main: undefined;
}
type OtpScreenPropType = NativeStackScreenProps<RootStackParamList, 'OTPScreen'>
type CreateProfilePageProps = NativeStackScreenProps<RootStackParamList, 'CreateProfileScreen'>

type ColorContextType = {
 isDarkMode : boolean,
 setIsDarkMode : (mode: boolean) => void;
};
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};
type CountryContextType = {
  countrySelected :  countryType;
  setCountrySelected: (con: countryType)=> void ;
};

type FontType = {
  [key: string]: string;
} 
type ColorType = {
  [key: string] : string
}

type countryType ={
  name : string , 
  flag : Image ,
  code : string,
  mobileCode : string,
  mobileNoLength : number,
  mobileNoFraction: number
}
