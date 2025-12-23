import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    authenticateWithBiometricsThunk,
    checkBiometricSupportThunk,
} from './src/features/biometricThunks';
import { AppDispatch } from './src/store/store';
// google sign in 
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AppRoot = () => {
    const dispatch = useDispatch<AppDispatch>();
    GoogleSignin.configure({
        iosClientId: "857311075920-em3gq4d9vhpjelvkq4plmgsv4e5oj617.apps.googleusercontent.com",
        webClientId: '857311075920-63nas97d4t9op4i0ctteq42v7g12rc5p.apps.googleusercontent.com',
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
