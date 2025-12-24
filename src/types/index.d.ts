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
  FoodCustomizationScreen: { foodItem: menuDataType }
  CartScreen: { discount: number, discountPercentage: number, offerCode: string }
  RemoveCartItemBottomSheetScreen: RemoveCartItemProps
  SearchScreen: undefined
  CheckOutScreen: { totalAmount: number, discount: number }
  PaymentModalScreen: { amount: number, onSuccess: (payment_id: string, isSuccess: boolean) => void }
  OrderStatusScreen: OrderStatusPageProps
  TrackOrderScreen: { currentOrder: OrderHistory | null, orderId: String | undefined, GrandTotal: number }
  OrderHistoryScreens: undefined
  OrderDetailsScreen: { order: OrderHistory | null }
  FontsScreen: undefined
  OfferAppliedScreen: undefined
  SplashScreen: undefined
  CommonPopUpScreen: { header: string, message: string }
  TermsAndConditionsScreen: undefined
  HelpScreen: undefined
  LoginPageCountryBottomSheetScreen: undefined
  ReAnimatedScreen: undefined
  GestureScreen: undefined
}
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
  SearchScreen: undefined;
  ExploreMenuScreen: { categoryType: string };
  MenuCategorizeScreen: {
    activeCategory: string;
    frequencyArray: CategoryFrequency[];
  };
  FoodCustomizationScreen: { foodItem: menuDataType };
  CartScreen: undefined;
  CheckOutScreen: { totalAmount: number; discount: number };
  OrderStatusScreen: OrderStatusPageProps;
  TrackOrderScreen: {
    currentOrder: OrderHistory | null;
    orderId?: string;
    GrandTotal: number;
  };
  OrderHistoryScreens: undefined;
  OrderDetailsScreen: { order: OrderHistory | null };
};

type ModalStackParamList = {
  ChangeLocationBottomSheetScreen: undefined;
  RemoveCartItemBottomSheetScreen: RemoveCartItemProps;
  OfferAppliedScreen: undefined;
  PaymentModalScreen: { amount: number };
  CommonPopUpScreen: { header: string; message: string };
  PopUpScreens: undefined;
  LoginPageCountryBottomSheetScreen: undefined;
};
type RootStackParamList2 = {
  Splash: undefined;
  Auth: undefined;
  App: undefined;
  Modal: {
    screen: keyof ModalStackParamList;
    params?: any;
  };
};
