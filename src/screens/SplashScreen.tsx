import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// redux
import { RootState, useAppDispatch } from '../store/store';
import { authenticateWithBiometricsThunk } from '../actions/biometricAction';
import { useSelector } from 'react-redux';
// custom component import 
import SplashPage from '../components/LandingPage/SplashPage'
//utils 
import { useStrings } from '../utils/Strings';
import { Alert } from 'react-native';

export default function SplashScreen() {
    const Strings = useStrings();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const [storedPhone, setStoredPhone] = useState<string | null>(null);
    const [isPhoneChecked, setIsPhoneChecked] = useState(false);
    const { isAuthenticated, loading, biometricChecked } = useSelector(
        (state: RootState) => state?.bioAuth
    );
    const [autoAuthTried, setAutoAuthTried] = useState<boolean>(false);
    const [showAuthAlert, setShowAuthAlert] = useState<boolean>(false);

    useEffect(() => {
        const loadPhone = async () => {
            try {
                const phone = await AsyncStorage.getItem('phoneNo');
                setStoredPhone(phone);
                setIsPhoneChecked(true);
            } catch (error) {
                setStoredPhone(null)
                console.warn('Failed to read phoneNo from storage', error);
            } finally {
                setIsPhoneChecked(true);
            }
        };
        loadPhone();
    }, []);
    useEffect(() => {
        if (!isPhoneChecked || !storedPhone) return;
        if (autoAuthTried) return;
        setAutoAuthTried(true);
        dispatch(authenticateWithBiometricsThunk());

    }, [isPhoneChecked, storedPhone, autoAuthTried, dispatch]);
    useEffect(() => {
        if (!autoAuthTried) return;
        if (loading) return;

        if (!isAuthenticated && biometricChecked) {
            setShowAuthAlert(true);
        }
    }, [autoAuthTried, biometricChecked, loading, isAuthenticated]);
    useEffect(() => {
        if (!showAuthAlert) return;
        Alert.alert(
            Strings.authRequired,
            Strings.authReQuiredDesc,
            [
                {
                    text: Strings.Authenticate,
                    onPress: () => {
                        setShowAuthAlert(false);
                        dispatch(authenticateWithBiometricsThunk());
                    },
                },
            ],
            { cancelable: false }
        );
    }, [showAuthAlert, dispatch, Strings.authRequired, Strings.authReQuiredDesc, Strings.Authenticate]);

    useEffect(() => {
        if (!isPhoneChecked) return;
        if (!storedPhone) {
            navigation.reset({
                index: 0,
                routes: [{ name: Strings.AuthStack }],
            });
            return;
        }
        if (!biometricChecked || loading) return;

        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: Strings.AppStack }],
            });
            return;
        }
    }, [dispatch, isPhoneChecked, storedPhone, biometricChecked, loading, isAuthenticated, Strings.AppStack, Strings.AuthStack, navigation]);

    return <SplashPage />
}
