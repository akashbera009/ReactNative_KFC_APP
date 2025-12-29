// type OtpScreenPropType = NativeStackScreenProps<RootStackParamList2, 'OTPScreen'>
// type CreateProfilePageProps = NativeStackScreenProps<RootStackParamList2, 'CreateProfileScreen'>
// type MenuCategorizationScreenProps = NativeStackScreenProps<RootStackParamList2, 'MenuCategorizeScreen'>
// type RemoveCartItemBottomSheetScreenProps = NativeStackScreenProps<RootStackParamList2, 'RemoveCartItemBottomSheetScreen'>
// type CheckOutScreenProps = NativeStackScreenProps<RootStackParamList2, 'CheckOutScreen'>
// type OrderDetailsScreen = NativeStackScreenProps<RootStackParamList2, 'OrderDetailsScreen'>
// type ExploreMenuScreenProps = NativeStackScreenProps<RootStackParamList2, 'ExploreMenuScreenProps'>
// type OrderStatusScreenProps = NativeStackScreenProps<RootStackParamList2, 'OrderStatusScreenProps'>
// type OfferAppliedScreenProps = NativeStackScreenProps<RootStackParamList2, 'OfferAppliedScreen'>
// type CartScreenScreenProps = NativeStackScreenProps<RootStackParamList2, 'CartScreen'>
// type TrackOrderScreenProps = NativeStackScreenProps<RootStackParamList2, 'TrackOrder'>
// type PaymentModalScreenProps = NativeStackScreenProps<RootStackParamList2, 'PaymentModalScreen'>
// type FoodCustomizationScreenProps = NativeStackScreenProps<RootStackParamList2, 'FoodCustomizationScreen'>
// type CommonPopUpScreenProps = NativeStackScreenProps<RootStackParamList2, 'CommonPopUpScreen'>

type OtpScreenPropType =
    NativeStackScreenProps<AuthStackParamList, 'OTPScreen'>;

type CreateProfilePageProps =
    NativeStackScreenProps<AuthStackParamList, 'CreateProfileScreen'>;

type ExploreMenuScreenProps =
    NativeStackScreenProps<AppStackParamList, 'ExploreMenuScreen'>;

type CartScreenProps =
    NativeStackScreenProps<AppStackParamList, 'CartScreen'>;

type FoodCustomizationScreenProps =
    NativeStackScreenProps<AppStackParamList, 'FoodCustomizationScreen'>; 

type CheckOutScreenProps =
    NativeStackScreenProps<OrderStackParamList, 'CheckOutScreen'>;

type OrderDetailsScreenProps =
    NativeStackScreenProps<OrderStackParamList, 'OrderDetailsScreen'>;

type OrderStatusScreenProps =
    NativeStackScreenProps<OrderStackParamList, 'OrderStatusScreen'>;

type TrackOrderScreenProps =
    NativeStackScreenProps<OrderStackParamList, 'TrackOrderScreen'>;

type PaymentModalScreenProps =
    NativeStackScreenProps<ModalStackParamList, 'PaymentModalScreen'>;

type RemoveCartItemBottomSheetScreenProps =
    NativeStackScreenProps<ModalStackParamList, 'RemoveCartItemBottomSheetScreen'>;

type OfferAppliedScreenProps =
    NativeStackScreenProps<ModalStackParamList, 'OfferAppliedScreen'>;

type CommonPopUpScreenProps =
    NativeStackScreenProps<ModalStackParamList, 'CommonPopUpScreen'>;

type MenuCategorizationScreenProps =
    NativeStackScreenProps<ModalStackParamList, 'MenuCategorizationScreen'>;
