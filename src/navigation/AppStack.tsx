import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//component
import HomeScreen from '../screens/HomeScreen';
import ExploreMenuScreen from '../screens/ExploreMenuScreen';
import FoodCustomizationScreen from '../screens/FoodCustomizationScreen';
import CartScreen from '../screens/CartScreen';
import FAQPageScreen from '../screens/FAQPageScreen';
import DealsAndOfferScreen from '../screens/DealsAndOfferScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
// utils 
import { useStrings } from '../utils/Strings';
import MapsScreen from '../screens/MapsScreen';
import HelpScreen from '../screens/HelpScreen';

const AppStack = createNativeStackNavigator<AppStackParamList>();
export default function AppStackNavigator() {
  const Strings = useStrings()
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name={Strings.HomeScreen} component={HomeScreen} />
      <AppStack.Screen name={Strings.MapsScreen} component={MapsScreen} options={{ presentation: 'fullScreenModal' }} />
      <AppStack.Screen name={Strings.ExploreMenuScreen} component={ExploreMenuScreen} />
      <AppStack.Screen name={Strings.FoodCustomizationScreen} component={FoodCustomizationScreen} />
      <AppStack.Screen name={Strings.CartScreen} component={CartScreen} options={{ animation: 'fade' }} />
      <AppStack.Screen name={Strings.FAQPageScreen} component={FAQPageScreen} />
      <AppStack.Screen name={Strings.DealsAndOfferScreen} component={DealsAndOfferScreen} />
      <AppStack.Screen name={Strings.TermsAndConditionsScreen} component={TermsAndConditionsScreen} />
      <AppStack.Screen name={Strings.HelpScreen} component={HelpScreen} />
    </AppStack.Navigator>
  );
}