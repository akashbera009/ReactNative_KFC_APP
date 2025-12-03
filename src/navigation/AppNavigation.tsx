import React from 'react'

// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// util files 
import { useStrings } from '../utils/Strings';
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
import ChangeLocationBottomSheetScreen from '../screens/ChangeLocationBottomSheetScreen';
import PopUpScreens from '../screens/PopUpScreens';
import ExploreMenuScreen from '../screens/ExploreMenuScreen';
import MenuCategorizeScreen from '../screens/MenuCategorizeScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import RemoveCartItemBottomSheetScreen from '../screens/RemoveCartItemBottomSheetScreen';
import OfferAppliedScreen from '../screens/OfferAppliedScreen';
import MapsScreen from '../screens/MapsScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import OrderHistoryScreens from '../screens/OrderHistoryScreens';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import FAQPageScreen from '../screens/FAQPageScreen';
import DealsAndOfferScreen from '../screens/DealsAndOfferScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import FoodCustomizationScreen from '../screens/FoodCustomizationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator()

function StackNavigator() {
    const Strings = useStrings()
    return (
        <Stack.Navigator initialRouteName={Strings?.HomeScreen} screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={Strings?.SplashScreen}
                component={SplashScreen}
            />
            <Stack.Screen
                name={Strings?.HomeScreen}
                component={HomeScreen}
            />
            <Stack.Screen
                name={Strings?.ChangeLocationBottomSheetScreen}
                component={ChangeLocationBottomSheetScreen}
                options={{
                    presentation: 'transparentModal'
                }}
            />
            <Stack.Screen
                name={Strings?.MapsScreen}
                component={MapsScreen}
                options={{
                    presentation: 'fullScreenModal'
                }}
            />
            <Stack.Screen
                name={Strings?.PopUpScreens}
                component={PopUpScreens}
                options={{
                    presentation: 'transparentModal'
                }}
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
                name={Strings?.FAQPageScreen}
                component={FAQPageScreen}
            />
            <Stack.Screen
                name={Strings?.DealsAndOfferScreen}
                component={DealsAndOfferScreen}
            />
            <Stack.Screen
                name={Strings?.ExploreMenuScreen}
                component={ExploreMenuScreen}
            />
            <Stack.Screen
                name={Strings?.MenuCategorizeScreen}
                component={MenuCategorizeScreen}
                options={{
                    presentation: 'transparentModal'
                }}
            />
            <Stack.Screen
                name={Strings?.FoodCustomizationScreen}
                component={FoodCustomizationScreen}
            />
            <Stack.Screen
                name={Strings?.CartScreen}
                component={CartScreen}
            />
            <Stack.Screen
                name={Strings?.RemoveCartItemBottomSheetScreen}
                component={RemoveCartItemBottomSheetScreen}
                options={{
                    presentation: 'transparentModal'
                }}
            />
            <Stack.Screen
                name={Strings?.SearchScreen}
                component={SearchScreen}
            />
            <Stack.Screen
                name={Strings?.OfferAppliedScreen}
                component={OfferAppliedScreen}
                options={{
                    presentation: 'transparentModal'
                }}
            />
            <Stack.Screen
                name={Strings?.CheckOutScreen}
                component={CheckOutScreen}
            />
            <Stack.Screen
                name={Strings?.OrderStatusScreen}
                component={OrderStatusScreen}
            />
            <Stack.Screen
                name={Strings?.OrderHistoryScreens}
                component={OrderHistoryScreens}
            />
            <Stack.Screen
                name={Strings?.OrderDetailsScreen}
                component={OrderDetailsScreen}
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



