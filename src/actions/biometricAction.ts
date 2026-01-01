import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkBiometricSupport,
  authenticateWithBiometrics,
} from '../utils/BiometricAuth';

export const checkBiometricSupportThunk = createAsyncThunk(
  'biometric/checkSupport',
  async () => {
    try {
      return await checkBiometricSupport();
    } catch (e) {
      console.log('biometric error', e);
      return e
    }
  }
);

export const authenticateWithBiometricsThunk = createAsyncThunk(
  'biometric/authenticate',
  async () => {
    try {
      return await authenticateWithBiometrics();
    } catch (e) {
      console.log('biometric error', e);
      return e
    }
  }
);
