import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// utils 
import { useStrings } from '../utils/Strings';
// components 
import LoginScreen from '../screens/LoginScreen';
import LoginScreen2 from '../screens/LoginScreen2';
import OTPScreen from '../screens/OTPScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStackNavigator() {
    const Strings = useStrings()
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={Strings.LoginScreen} component={LoginScreen} />
            <AuthStack.Screen name={Strings.LoginScreen2} component={LoginScreen2} />
            <AuthStack.Screen name={Strings.OTPScreen} component={OTPScreen} />
            <AuthStack.Screen name={Strings.CreateProfileScreen} component={CreateProfileScreen} />
        </AuthStack.Navigator>
    );
}
