type RootDrawerParamList = {
  Main: undefined;
}

type AuthStackParamList = {
  LoginScreen: undefined;
  LoginScreen2: undefined;
  OTPScreen: { phoneNo: string };
  CreateProfileScreen: { phoneNo: string };
};

type AppStackParamList = {
  HomeScreen: undefined;
  MapsScreen: undefined;
  ExploreMenuScreen: { categoryType: string };
  FoodCustomizationScreen: { foodItem: menuDataType };
  CartScreen: undefined;
  FAQPageScreen: undefined
  DealsAndOfferScreen: undefined
  TermsAndConditionsScreen: undefined
  HelpScreen: undefined
};

type OrderStackParamList = {
  CheckOutScreen: { totalAmount: number; discount: number };
  OrderStatusScreen: OrderStatusPageProps;
  TrackOrderScreen: {
    currentOrder: OrderHistory | null;
    orderId?: string;
    GrandTotal: number;
  };
  OrderHistoryScreens: undefined;
  OrderDetailsScreen: { order: OrderHistory | null };
}

type ModalStackParamList = {
  ChangeLocationBottomSheetScreen: undefined;
  RemoveCartItemBottomSheetScreen: RemoveCartItemProps;
  OfferAppliedScreen: undefined;
  PaymentModalScreen: { amount: number };
  CommonPopUpScreen: { header: string; message: string };
  PopUpScreens: undefined;
  LoginPageCountryBottomSheetScreen: undefined;
  MenuCategorizeScreen: {
    frequencyArray: CategoryFrequency[];
  };
  // ToasterScreen : { header: string, description: string, type : string}
};

type TestingStackParamList = {
  ReAnimatedScreen: undefined
  GestureScreen: undefined
}

type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  App: NavigatorScreenParams<AppStackParamList> | undefined;
  Order: NavigatorScreenParams<OrderStackParamList> | undefined;
  Modal: NavigatorScreenParams<ModalStackParamList> | undefined;
  Testing: NavigatorScreenParams<TestingStackParamList> | undefined;
};
