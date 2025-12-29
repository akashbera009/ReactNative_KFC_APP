import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStrings } from '../utils/Strings';
// custom component import 
import SplashPage from '../components/LandingPage/SplashPage'

export default function SplashScreen() {
    const Strings = useStrings()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    setTimeout(() => {
        navigation.replace(Strings.AuthStack)
    }, 1500)
    return (
        <SplashPage />
    )
}
