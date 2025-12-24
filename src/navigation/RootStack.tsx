import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//components 
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigator from './AuthStack';
import AppStackNavigator from './AppStack';
import ModalStackNavigator from './ModalStack';

const RootStack = createNativeStackNavigator<RootStackParamList2>();

export default function RootStackNavigator() {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="Auth" component={AuthStackNavigator} />
            <RootStack.Screen name="App" component={AppStackNavigator} />
            <RootStack.Screen name="Modal" component={ModalStackNavigator} options={{ presentation: 'transparentModal' }} />
        </RootStack.Navigator>
    );
}
