import ReactNativeBiometrics, {
  BiometryTypes,
} from 'react-native-biometrics';
const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
export const checkBiometricSupport = async (): Promise<boolean> => {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable();
  if (!available) return false;
  return (
    biometryType === BiometryTypes.Biometrics ||
    biometryType === BiometryTypes.FaceID ||
    biometryType === BiometryTypes.TouchID
  );
};

export const authenticateWithBiometrics = async (): Promise<boolean> => {
  try {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Authenticate using biometrics',
      fallbackPromptMessage: 'Authentication Required'
    });
    return result.success;
  } catch (error) {
    return false;
  }
};
