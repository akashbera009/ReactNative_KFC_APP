import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// utuls 
import { useStrings } from '../utils/Strings';
/// component 
import PaymentModalScreen from '../screens/PaymentModalScreen';
import RemoveCartItemBottomSheetScreen from '../screens/RemoveCartItemBottomSheetScreen';
import ChangeLocationBottomSheetScreen from '../screens/ChangeLocationBottomSheetScreen';
import CommonPopUpScreen from '../screens/CommonPopUpScreen';
import OfferAppliedScreen from '../screens/OfferAppliedScreen';
import LoginPageCountryBottomSheetScreen from '../screens/LoginPageCountryBottomSheetScreen';
import PopUpScreens from '../screens/PopUpScreens';
import MenuCategorizeScreen from '../screens/MenuCategorizeScreen';

const ModalStack = createNativeStackNavigator<ModalStackParamList>();
export default function ModalStackNavigator() {
    const Strings = useStrings()
    return (
        <ModalStack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" }
            }}
        >
            <ModalStack.Screen
                name={Strings.LoginPageCountryBottomSheetScreen}
                component={LoginPageCountryBottomSheetScreen}
            />
            <ModalStack.Screen
                name={Strings.MenuCategorizeScreen}
                component={MenuCategorizeScreen}
            />
            <ModalStack.Screen
                name={Strings.ChangeLocationBottomSheetScreen}
                component={ChangeLocationBottomSheetScreen}
            />
            <ModalStack.Screen
                name={Strings.RemoveCartItemBottomSheetScreen}
                component={RemoveCartItemBottomSheetScreen}
            />
            <ModalStack.Screen
                name={Strings.OfferAppliedScreen}
                component={OfferAppliedScreen}
            />
            <ModalStack.Screen
                name={Strings.PaymentModalScreen}
                component={PaymentModalScreen}
            />
            <ModalStack.Screen
                name={Strings.CommonPopUpScreen}
                component={CommonPopUpScreen}
            />
            <ModalStack.Screen
                name={Strings.PopUpScreens}
                component={PopUpScreens}
            />
        </ModalStack.Navigator>
    );
}

