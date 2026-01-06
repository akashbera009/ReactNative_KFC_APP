// type OtpScreenPropType = NativeStackScreenProps<RootStackParamList, 'OTPScreen'>
// type CreateProfilePageProps = NativeStackScreenProps<RootStackParamList, 'CreateProfileScreen'>
// type MenuCategorizationScreenProps = NativeStackScreenProps<RootStackParamList, 'MenuCategorizeScreen'>
// type RemoveCartItemBottomSheetScreenProps = NativeStackScreenProps<RootStackParamList, 'RemoveCartItemBottomSheetScreen'>
// type CheckOutScreenProps = NativeStackScreenProps<RootStackParamList, 'CheckOutScreen'>
// type OrderDetailsScreen = NativeStackScreenProps<RootStackParamList, 'OrderDetailsScreen'>
// type ExploreMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'ExploreMenuScreenProps'>
// type OrderStatusScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderStatusScreenProps'>
// type OfferAppliedScreenProps = NativeStackScreenProps<RootStackParamList, 'OfferAppliedScreen'>
// type CartScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'CartScreen'>
// type TrackOrderScreenProps = NativeStackScreenProps<RootStackParamList, 'TrackOrder'>
// type PaymentModalScreenProps = NativeStackScreenProps<RootStackParamList, 'PaymentModalScreen'>
// type FoodCustomizationScreenProps = NativeStackScreenProps<RootStackParamList, 'FoodCustomizationScreen'>
// type CommonPopUpScreenProps = NativeStackScreenProps<RootStackParamList, 'CommonPopUpScreen'>

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
    
// type ToasterScreenProps = 
//     NativeStackScreenProps<ModalStackParamList , 'ToasterScreen'>