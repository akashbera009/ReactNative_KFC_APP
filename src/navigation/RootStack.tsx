import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//components 
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigator from './AuthStack';
import AppStackNavigator from './AppStack';
import ModalStackNavigator from './ModalStack';
import { useStrings } from '../utils/Strings';
import TestingStackNavigator from './TestingStack';
import OrderStackNavigator from './OrderStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
    const Strings = useStrings()
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Strings.SplashStack} >
            <RootStack.Screen name={Strings.SplashStack} component={SplashScreen} />
            <RootStack.Screen name={Strings.AuthStack} component={AuthStackNavigator} />
            <RootStack.Screen name={Strings.AppStack} component={AppStackNavigator} />
            <RootStack.Screen name={Strings.ModalStack} component={ModalStackNavigator}
                options={{
                    presentation: 'transparentModal',
                    animation: 'slide_from_bottom',
                }}
            />
            <RootStack.Screen name={Strings.OrderStack} component={OrderStackNavigator} />
            <RootStack.Screen name={Strings.TestingStack} component={TestingStackNavigator} />
        </RootStack.Navigator>
    );
}
