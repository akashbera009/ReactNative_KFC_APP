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

const ModalStack = createNativeStackNavigator<ModalStackParamList>();
export default function ModalStackNavigator() {
    const Strings = useStrings()
    return (
        <ModalStack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
            }}
        >
            <ModalStack.Screen name={Strings.ChangeLocationBottomSheetScreen} component={ChangeLocationBottomSheetScreen} />
            <ModalStack.Screen name="RemoveCartItemBottomSheetScreen" component={RemoveCartItemBottomSheetScreen} />
            <ModalStack.Screen name="OfferAppliedScreen" component={OfferAppliedScreen} />
            <ModalStack.Screen name="PaymentModalScreen" component={PaymentModalScreen} />
            <ModalStack.Screen name="CommonPopUpScreen" component={CommonPopUpScreen} />
            <ModalStack.Screen name="PopUpScreens" component={PopUpScreens} />
            <ModalStack.Screen name="LoginPageCountryBottomSheetScreen" component={LoginPageCountryBottomSheetScreen} />
        </ModalStack.Navigator>
    );
}

