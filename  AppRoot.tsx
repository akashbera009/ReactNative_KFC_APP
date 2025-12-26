
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
//redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from './src/store/store';
import {
    authenticateWithBiometricsThunk,
    checkBiometricSupportThunk,
} from './src/features/biometricThunks';
// google sign in 
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AppRoot = () => {
    const dispatch = useDispatch<AppDispatch>();
    GoogleSignin.configure({
        iosClientId: Config.IOS_GOOGLE_SIGNIN_CLIENT_ID,
        webClientId: Config.WEB_GOOGLE_SIGNIN_CLIENT_ID,
    })

    useEffect(() => {
        dispatch(checkBiometricSupportThunk());
        dispatch(authenticateWithBiometricsThunk());
    }, [dispatch]);

    return (
        <GestureHandlerRootView>
            <AppNavigation />
        </GestureHandlerRootView>
    );
};

export default AppRoot;
