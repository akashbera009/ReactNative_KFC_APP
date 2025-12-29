
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Config from 'react-native-config';
//redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import {
    authenticateWithBiometricsThunk,
    checkBiometricSupportThunk,
} from './features/biometricThunks';
// google sign in 
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppNavigationTest from './navigation/AppNavigation';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigationTest/>
        </GestureHandlerRootView>
    );
};

export default AppRoot;
