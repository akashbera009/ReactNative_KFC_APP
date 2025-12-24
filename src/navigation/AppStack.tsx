import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//component
import HomeScreen from '../screens/HomeScreen';
import ExploreMenuScreen from '../screens/ExploreMenuScreen';
import MenuCategorizeScreen from '../screens/MenuCategorizeScreen';
import FoodCustomizationScreen from '../screens/FoodCustomizationScreen';
import CartScreen from '../screens/CartScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import SearchScreen from '../screens/SearchScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import OrderHistoryScreens from '../screens/OrderHistoryScreens';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const AppStack = createNativeStackNavigator<AppStackParamList>();
export default function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="HomeScreen" component={HomeScreen} />
      <AppStack.Screen name="SearchScreen" component={SearchScreen} />
      <AppStack.Screen name="ExploreMenuScreen" component={ExploreMenuScreen} />
      <AppStack.Screen name="MenuCategorizeScreen" component={MenuCategorizeScreen} />
      <AppStack.Screen name="FoodCustomizationScreen" component={FoodCustomizationScreen} />
      <AppStack.Screen name="CartScreen" component={CartScreen} />
      <AppStack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <AppStack.Screen name="OrderStatusScreen" component={OrderStatusScreen} />
      <AppStack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
      <AppStack.Screen name="OrderHistoryScreens" component={OrderHistoryScreens} />
      <AppStack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
    </AppStack.Navigator>
  );
}

