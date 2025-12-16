import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes, isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';
// util file 
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

export default function GoogleLoginPage() {
  const Colors = useThemeColors();
  const Strings = useStrings();
  const Styles = createDynamicStyles(Colors, Fonts);
  const [userToken, setUserToken] = useState<string | null>(null);

  const hasPreviousSignIn = async () => {
    const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
    console.log('has previosu sign in', hasPreviousSignIn)
    if(hasPreviousSignIn) getCurrentUser()
  };
  const getCurrentUser = async () => {
    const currentUser = GoogleSignin.getCurrentUser();
    console.log('current user is ', currentUser)
  };
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log('✅ Google Sign-In response:', response);
      if (isSuccessResponse(response)) {
        console.log('isSuccessResponse(response)', isSuccessResponse(response))
      } else {
        console.log('sign in was calcelled by user ');

      }
      Alert.alert('Success', 'Google Sign-In Successful! Check console for info.');
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log(statusCodes.IN_PROGRESS);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE);
            break;
          default:
            console.log(error);
        }
      }
    };
  }
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserToken(null);
      Alert.alert('Signed Out', 'You have been signed out.');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Google Sign-In Demo</Text>

      {userToken ? (
        <>
          <Text style={Styles.token}>ID Token: {userToken.substring(0, 50)}...</Text>
          <TouchableOpacity onPress={signOut} style={Styles.button}>
            <Text style={Styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={signInWithGoogle} style={Styles.button}>
            <Text style={Styles.buttonText}>Sign In with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={hasPreviousSignIn} style={Styles.button}>
            <Text style={Styles.buttonText}>Check previouslogin </Text>
          </TouchableOpacity>

        </>
      )}
    </View>
  );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  return StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
    token: { marginVertical: 20, textAlign: 'center' },
    button: {
      backgroundColor: '#4285F4',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  });
};
