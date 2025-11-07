import React from 'react'

// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// util files 
import {useStrings} from '../utils/Strings';
// screens 
import SideBarScreen from '../screens/SideBarScreen';
import SplashScreen from '../screens/SplashScreen';
import FontsScreen from '../screens/FontsScreen';
import HelpScreen from '../screens/HelpScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginScreen2 from '../screens/LoginScreen2';
import OTPScreen from '../screens/OTPScreen';
import LoginPageCountryBottomSheetScreen from '../screens/LoginPageCountryBottomSheetScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator()


function StackNavigator() {
    const Strings = useStrings()
    return (
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={Strings?.SplashScreen}
                component={SplashScreen}
            />
            <Stack.Screen
                name={Strings?.HomeScreen}
                component={HomeScreen}
            />
            <Stack.Screen
                name={Strings?.LoginScreen}
                component={LoginScreen}
            />
            <Stack.Screen
                name={Strings?.LoginScreen2}
                component={LoginScreen2}
            />
            <Stack.Screen
                name={Strings?.LoginPageCountryBottomSheetScreen}
                component={LoginPageCountryBottomSheetScreen}
                options={{
                    presentation: 'transparentModal'
                }}
            />
            <Stack.Screen
                name={Strings?.OTPScreen}
                component={OTPScreen}
            />
            <Stack.Screen
                name={Strings?.CreateProfileScreen}
                component={CreateProfileScreen}
            />
            <Stack.Screen
               name={Strings?.FontsScreen}
                component={FontsScreen}
            />
            <Stack.Screen
                name={Strings?.HelpScreen}
                component={HelpScreen}
            />

        </Stack.Navigator>
    )
}

export default function AppNavigation() {
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{ headerShown: false, drawerPosition: 'left', }}
                    drawerContent={(props) => <SideBarScreen{...props} />}
                >
                    <Drawer.Screen name='Main' component={StackNavigator} />
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}



