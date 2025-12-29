import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//component
import CheckOutScreen from '../screens/CheckOutScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import OrderHistoryScreens from '../screens/OrderHistoryScreens';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import { useStrings } from '../utils/Strings';

const OrderStack = createNativeStackNavigator<OrderStackParamList>();
export default function OrderStackNavigator() {
    const Strings = useStrings()
    return (
        <OrderStack.Navigator screenOptions={{ headerShown: false }}>
            <OrderStack.Screen name={Strings.CheckOutScreen} component={CheckOutScreen} />
            <OrderStack.Screen name={Strings.OrderStatusScreen} component={OrderStatusScreen} />
            <OrderStack.Screen name={Strings.TrackOrderScreen} component={TrackOrderScreen} />
            <OrderStack.Screen name={Strings.OrderHistoryScreens} component={OrderHistoryScreens} />
            <OrderStack.Screen name={Strings.OrderDetailsScreen} component={OrderDetailsScreen} />
        </OrderStack.Navigator>
    );
}

