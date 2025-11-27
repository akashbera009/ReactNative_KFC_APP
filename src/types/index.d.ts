type RootStackParamList = {
  HomeScreen: undefined
  ChangeLocationBottomSheetScreen: undefined
  MapsScreen: undefined
  PopUpScreens: undefined
  LoginScreen: undefined
  LoginScreen2: undefined
  OTPScreen: { phoneNo: string }
  CreateProfileScreen: { phoneNo: string }
  ExploreMenuScreen: undefined
  MenuCategorizeScreen: { activeCategory: string, setActiveCategory: (ele: string) => void, frequencyArray: CategoryFrequency[] }
  CartScreen: undefined
  RemoveCartItemBottomSheetScreen: RemoveCartItemProps
  SearchScreen: undefined
  CheckOutScreen: {totalAmount: number}
  OrderHistoryScreens: undefined
  FontsScreen: undefined
  OfferAppliedScreen: undefined
  HelpScreen: undefined
  SplashScreen: undefined
  LoginPageCountryBottomSheetScreen: undefined
}
type RootDrawerParamList = {
  Main: undefined;
}
