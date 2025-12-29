import { createSlice } from '@reduxjs/toolkit'
import {
    checkBiometricSupportThunk,
    authenticateWithBiometricsThunk,
} from '../actions/biometricAction';

const initialState: AuthState = {
    isAuthenticated: false,
    biometricEnabled: false,
    biometricSupported: false,
    loading: 'ideal'
}
const BiometricAuthSlice = createSlice({
    name: 'BiometricAuthSlice',
    initialState,
    reducers: {
        resetAuth(state) {
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkBiometricSupportThunk.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(checkBiometricSupportThunk.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.biometricSupported = action.payload;
                state.biometricEnabled = action.payload;
            })
            .addCase(checkBiometricSupportThunk.rejected, (state) => {
                state.loading = 'failed';
                state.biometricSupported = false;
            })
            .addCase(authenticateWithBiometricsThunk.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(authenticateWithBiometricsThunk.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.isAuthenticated = action.payload;
            })
            .addCase(authenticateWithBiometricsThunk.rejected, (state) => {
                state.loading = 'failed';
                state.isAuthenticated = false;
            });
    }
})
export const { resetAuth } = BiometricAuthSlice.actions
export default BiometricAuthSlice.reducer