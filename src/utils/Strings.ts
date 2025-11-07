import { useLanguage } from '../context/LanguageContex'

const en = {
  // screens
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  LoginScreen2: 'LoginScreen2',
  LoginPageCountryBottomSheetScreen: 'LoginPageCountryBottomSheetScreen',
  OTPScreen: 'OTPScreen',
  CreateProfileScreen: "CreateProfileScreen",
  FontsScreen: 'FontsScreen',
  SplashScreen: 'SplashScreen',
  HelpScreen: 'HelpScreen',
  Main: 'Main',
  Help: 'Help',

  // landing
  lickingGood: "It's finger lickin' good",

  // login
  KFC: 'KFC',
  loginToUlock: 'Login to Unlock',
  awesomeNewFeature: 'awesome new features',
  fingerLicking: 'Finger\nLickin Good',
  dealAndOfferTxt: 'Great\nDeals & Offers',
  easyOrdering: 'Easy \nOrdering',
  chooseLanguage: 'Choose Language',
  english: 'English',
  arabic: 'عربي',
  uae: 'UAE',
  kuwait: 'Kuwait',
  india: 'India',
  login: 'LOGIN',
  termsCondition: 'TERMS & CONDITIONS',
  skipLogin: 'SKIP LOGIN',
  change: 'CHANGE',

  // country bottomsheet 
  welcome: 'Welcome to KFC',
  countryDescription: 'Now  you can order in the following countries using this App. Please select the country where you want to place order 😎',
  needToHaveLocalNumber: 'You need to have a local number',
  done: 'Done',

  // loginPage 2 
  welcome2: 'Welcome to all new',
  app: 'app',
  loginWIthNumberText: 'Login with valid',
  mobileNumber: 'Mobile number',
  shouldBeXDigit: 'Mobile number should be 10 digit ',
  EgMobile: 'eg 987 654 123',
  enterNumberPlaceHoler: 'Mobile Number ',
  loginWithSocialHeader: 'Login with Social Accounts',
  facebook: 'Facebook',
  google: 'google',
  tc: 't&c',
  skipLoginAndContinue: 'skip login & continue',
  submit: 'submit',


  // otp auth
  otpText: 'One Time Password',
  enterOtpHeader: 'Please enter the 4 digit OTP sent to ',
  resendOtp: 'Resend OTP',
  callMe: 'Call Me',
  verifyText: 'VERIFY',

  // create profile 
  createProfileHeader: 'Create Profile',
  enterYourDetails: 'Please enter your details',
  name: 'Name',
  email: 'Email',
  save: 'save',
  fieldIsMandatory: 'This field is mandatory.'

} as const

const ar = {
  // screens
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  LoginScreen2: 'LoginScreen2',
  LoginPageCountryBottomSheetScreen: 'LoginPageCountryBottomSheetScreen',
  OTPScreen: 'OTPScreen',
  CreateProfileScreen: 'CreateProfileScreen',
  FontsScreen: 'FontsScreen',
  SplashScreen: 'SplashScreen',
  HelpScreen: 'HelpScreen',
  Main: 'Main',
  Help: 'Help',


  // landing
  lickingGood: 'إنه لذيذ للغاية',

  // country bottomsheet
  welcome: 'مرحبًا بكم في كنتاكي',
  countryDescription: 'يمكنك الآن الطلب في البلدان التالية باستخدام هذا التطبيق. يرجى اختيار البلد الذي ترغب في تقديم الطلب فيه 😎',
  needToHaveLocalNumber: 'يجب أن يكون لديك رقم محلي',
  done: '',


  // login
  KFC: 'كنتاكي',
  loginToUlock: 'سجّل الدخول لفتح',
  awesomeNewFeature: 'مميزات جديدة مذهلة',
  fingerLicking: 'طعم\nلا يُقاوم',
  dealAndOfferTxt: 'عروض\nوصفقات رائعة',
  easyOrdering: 'طلب\nسهل وسريع',
  chooseLanguage: 'اختر اللغة',
  english: 'English',
  arabic: 'العربية',
  uae: 'الإمارات',
  login: 'تسجيل الدخول',
  termsCondition: 'الشروط والأحكام',
  skipLogin: 'تخطي تسجيل الدخول',
  change: 'تغيير',

  // loginPage 2 
  welcome2: 'مرحبًا بكم في التطبيق الجديد',
  app: 'التطبيق',
  loginWIthNumberText: 'سجّل الدخول برقم صالح',
  mobileNumber: 'رقم الجوال',
  shouldBeXDigit: 'يجب أن يكون رقم الجوال مكونًا من 10 أرقام',
  EgMobile: 'eg 987 654 123',
  enterNumberPlaceHoler: 'Enter mobile no ',
  loginWithSocialHeader: 'سجّل الدخول عبر الحسابات الاجتماعية',
  facebook: 'فيسبوك',
  google: 'جوجل',
  tc: 'الشروط والأحكام',
  skipLoginAndContinue: 'تخطّ تسجيل الدخول واستمر',
  submit: 'إرسال',


  // otp auth
  otpText: 'رمز التحقق لمرة واحدة',
  enterOtpHeader: 'يرجى إدخال رمز التحقق المكون من 4 أرقام المرسل إلى',
  resendOtp: 'إعادة إرسال الرمز',
  callMe: 'اتصل بي',
  verifyText: 'تحقق',

  // create profile 
  createProfileHeader: 'Create Profile',
  enterYourDetails: 'Please enter your details',
  name: 'Name',
  email: 'Email',
  save: 'save',
  fieldIsMandatory: 'This field is mandatory.'

} as const

// Hook-based selector
export const useStrings = () => {
  const { language } = useLanguage();
  return language === 'ar' ? ar : en;
};
