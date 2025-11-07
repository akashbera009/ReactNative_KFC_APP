import { StyleSheet, } from 'react-native'
import React from 'react'

// custom component import 
import SplashPage from '../components/LandingPage/SplashPage'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStrings } from '../utils/Strings';

export default function SplashScreen() {
    const Strings = useStrings()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    setTimeout(() => {
        navigation.navigate(Strings?.LoginScreen)
    }, 1500)
    return (
        <SplashPage />
    )
}

const styles = StyleSheet.create({})