import React from 'react'
// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//component
import FontsScreen from '../screens/FontsScreen';
import GestureScreen from '../screens/GestureScreen';
import ReAnimatedScreen from '../screens/ReAnimatedScreen';
import { useStrings } from '../utils/Strings';

const TestingStack = createNativeStackNavigator<TestingStackParamList>();
export default function TestingStackNavigator() {
    const Strings = useStrings()
    return (
        <TestingStack.Navigator screenOptions={{ headerShown: false }}>
            <TestingStack.Screen name={Strings.FontsScreen} component={FontsScreen} />
            <TestingStack.Screen name={Strings.ReAnimatedScreen} component={ReAnimatedScreen} />
            <TestingStack.Screen name={Strings.GestureScreen} component={GestureScreen} />
        </TestingStack.Navigator>
    );
}

