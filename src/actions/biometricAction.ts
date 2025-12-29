import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkBiometricSupport,
  authenticateWithBiometrics,
} from '../utils/BiometricAuth';

export const checkBiometricSupportThunk = createAsyncThunk(
  'biometric/checkSupport',
  async () => {
    return await checkBiometricSupport();
  }
);

export const authenticateWithBiometricsThunk = createAsyncThunk(
  'biometric/authenticate',
  async () => {
    return await authenticateWithBiometrics();
  }
);
