type RootStackParamList = {
  HomeScreen: undefined
  ChangeLocationBottomSheetScreen: undefined
  MapsScreen: undefined
  PopUpScreens: undefined
  LoginScreen: undefined
  LoginScreen2: undefined
  OTPScreen: { phoneNo: string }
  FAQPageScreen: undefined
  DealsAndOfferScreen: undefined
  CreateProfileScreen: { phoneNo: string }
  ExploreMenuScreen: { categoryType: string }
  MenuCategorizeScreen: { activeCategory: string, setActiveCategory: (ele: string) => void, frequencyArray: CategoryFrequency[] }
  FoodCustomizationScreen: undefined
  CartScreen: { discount: number, discountPercentage: number, offerCode: string }
  RemoveCartItemBottomSheetScreen: RemoveCartItemProps
  SearchScreen: undefined
  CheckOutScreen: { totalAmount: number, discount: number }
  PaymentModalScreen: undefined
  OrderStatusScreen: OrderStatusPageProps
  TrackOrderScreen: { currentOrder: OrderHistory, orderId: String, GrandTotal: number }
  OrderHistoryScreens: undefined
  OrderDetailsScreen: { order: OrderHistory }
  FontsScreen: undefined
  OfferAppliedScreen: undefined
  HelpScreen: undefined
  SplashScreen: undefined
  LoginPageCountryBottomSheetScreen: undefined
}
type RootDrawerParamList = {
  Main: undefined;
}
