import { createSlice } from '@reduxjs/toolkit'
import {
    checkBiometricSupportThunk,
    authenticateWithBiometricsThunk,
} from '../actions/biometricAction';
import { AuthState } from '../components/models';

const initialState: AuthState = {
    isAuthenticated: false,
    biometricEnabled: false,
    biometricSupported: false,
    loading: false,
    biometricChecked: false,
}
const BiometricAuthSlice = createSlice({
    name: 'BiometricAuthSlice',
    initialState,
    reducers: {
        resetAuth(state) {
            state.isAuthenticated = null;
            state.biometricChecked = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkBiometricSupportThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkBiometricSupportThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.biometricSupported = Boolean(action.payload);
                state.biometricEnabled = Boolean(action.payload);
            })
            .addCase(checkBiometricSupportThunk.rejected, (state) => {
                state.loading = false;
                state.biometricSupported = false;
            })
            .addCase(authenticateWithBiometricsThunk.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = null;
            })
            .addCase(authenticateWithBiometricsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = Boolean(action.payload);
                state.biometricChecked = true;
            })
            .addCase(authenticateWithBiometricsThunk.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = null;
                state.biometricChecked = true;
            });
    }
})
export const { resetAuth } = BiometricAuthSlice.actions
export default BiometricAuthSlice.reducer