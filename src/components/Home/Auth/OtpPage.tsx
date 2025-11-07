import { StyleSheet, Text, View, TextInput, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// util  imports 
import { useThemeColors } from '../../../utils/Colors'
import { useStrings } from '../../../utils/Strings'
import Fonts from '../../../utils/Fonts'
import Images from '../../../utils/LocalImages'
import { useCountry } from '../../../context/CountryContext';


export default function OtpPage({ phoneNo1 }: { phoneNo1: string }) {
  const [inputValue, setInputValue] = useState<string[]>(new Array(4).fill(''))
  const inputRef = useRef<Array<TextInput | null>>([])
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { countrySelected } = useCountry()
  const [timer, setTimer] = useState(90)
  const [resendActive, setResendActive] = useState(false)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer == 0) {
      setResendActive(true)
    }
  }, [timer]);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  let formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const [goodToLogin, setGoodToLogin] = useState(false)
  useEffect(() => {
    checkGoodToLogin()
  }, [inputValue])
  const checkGoodToLogin = () => {
    if (inputValue.includes('')) {
      setGoodToLogin(false)
    } else
      setGoodToLogin(true)
  }

  const handleVerify = () => {
    // if(goodToLogin) 
    // comment
    navigation.navigate(Strings?.CreateProfileScreen, {
      phoneNo: phoneNo1
    })
  }
  const handleResendOtp = () => {
    setTimer(60)
    setResendActive(false)
    Alert.alert('OTP sent Successfully')
  }
  const handleCalling = () => {
    setTimer(60)
    setResendActive(false)
    Alert.alert('Calliing please wait ')
  }

  return (
    <View style={Styles.parentBackground}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View >

          <View style={[Styles.navigationContainer, {}]}>
            <View style={[Styles.innerNavigationContainer, { marginTop: inset.top }]}>
              <TouchableOpacity
                onPress={() => navigation.pop()}>
                <Image source={Images?.back_arrow} style={Styles.BackBUtton} />
              </TouchableOpacity>
              <Text style={Styles.navHeaderText} >{Strings?.otpText}</Text>
            </View>
          </View>

          <View style={Styles.enterOtpHeaderContainer}>

            <Text style={Styles.enterOtpHeader}>{Strings?.enterOtpHeader}</Text>
            <Text style={Styles.PhoneNo}>{countrySelected?.mobileCode} {phoneNo1}</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={Styles.otpRelatedContainer}
          >
            <View style={Styles.innerOtpContainer}>
              {inputValue.map((item, idx) => (
                <View key={idx} style={[Styles.SingleOtp, (inputValue[idx] != '') ? Styles.ActiveBorder : Styles.NonActiveBorder]}>
                  <TextInput
                    ref={element => { inputRef.current[idx] = element }}
                    keyboardType='numeric'
                    maxLength={1}
                    autoFocus={idx == 0}
                    style={[Styles.OtpInputText,]}
                    onChangeText={(text) => {
                      let newArray = [...inputValue];
                      newArray[idx] = text;
                      setInputValue(newArray)
                      if (text && idx < inputValue.length - 1) {
                        let c = idx + 1;
                        inputRef.current[c]?.focus()
                      }
                    }}
                    onKeyPress={(event) => {
                      if (event.nativeEvent.key == 'Backspace' && !inputValue[idx] && idx > 0) {
                        inputRef.current[idx - 1]?.focus()
                      }
                    }}
                  />
                </View>
              ))}
            </View>
            <View style={Styles.verifyButtonContainer}>
              <TouchableOpacity
                onPress={handleVerify}
                style={[Styles.VerifyBUtton, goodToLogin ? Styles.VerifyBUttonActive : null]}>
                <Text style={[Styles.VerifyBUttonText, goodToLogin ? Styles.VerifyBUttonTextActive : null]} >{Strings?.verifyText}</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.LowerOtpContainer}>
              <TouchableOpacity
                disabled={resendActive == false}
                onPress={() => handleResendOtp()}
                style={Styles.LowerOtpContainerEntries}>
                <View style={Styles.LowerOtpContainerEntriesLeft}>
                  <Image source={Images?.Messege} style={Styles.otpentriesIcon} />
                  <Text style={[Styles.resendRealtedText, resendActive ? Styles.activeResndText : null]}>{Strings?.resendOtp.toUpperCase()}</Text>
                </View>
                {resendActive == false && (
                  <Text style={[Styles.resendRealtedText, Styles.timerText]} >{formattedTime}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={resendActive == false}
                onPress={() => handleCalling()}
                style={Styles.LowerOtpContainerEntries}>
                <View style={Styles.LowerOtpContainerEntriesLeft}>
                  <Image source={Images?.call} style={Styles.otpentriesIcon} />
                  <Text style={[Styles.resendRealtedText, resendActive ? Styles.activeResndText : null]}>{Strings?.callMe.toLocaleUpperCase()}</Text>
                </View>
                {resendActive == false && (
                  <Text style={[Styles.resendRealtedText, Styles.timerText]} >{formattedTime}</Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
    parentBackground: {
      height: '100%',
      width: '100%',
      backgroundColor: Colors?.bodyLigheterColor,
    },
    navigationContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundColor: Colors?.bodyColor,
    },
    innerNavigationContainer: {
      width: '100%',
      height: 60,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors?.bodyColor,
    },
    BackBUtton: {
      height: 20,
      width: 20,
      margin: 20,
    },
    navHeaderText: {
      fontSize: 20,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
    },
    enterOtpHeaderContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    enterOtpHeader: {
      fontSize: 18,
      fontWeight: 600,
      marginTop: 30,
      fontFamily: Fonts?.subHeader,
    },
    PhoneNo: {
      fontSize: 17,
      fontWeight: 600,
      marginTop: 10,
      fontFamily: Fonts?.subHeader,
    },
    otpRelatedContainer: {
      marginTop: 15,
      height: 320,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: Colors?.bodyColor,
      display: 'flex',
      flexDirection: 'column',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: .1,
      shadowRadius: 10,
      elevation: 5,
    },
    innerOtpContainer: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '95%',
      marginTop: 50,
    },
    SingleOtp: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 2,
      height: 60,
      width: 60
    },
    OtpInputText: {
      fontSize: 24,
      height: '100%',
      width: '100%',
      textAlign: 'center'
    },
    verifyButtonContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    VerifyBUtton: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 30,
      width: 'auto',
      alignSelf: "flex-end",
      backgroundColor: Colors?.fadeVerify,
      borderRadius: 2
    },
    VerifyBUttonActive: {
      backgroundColor: Colors?.KFC_red
    },
    VerifyBUttonText: {
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: 16,
      color: Colors?.verifyText
    },
    VerifyBUttonTextActive: {
      color: Colors?.constantWhite
    },
    LowerOtpContainer: {
      margin: 10,
      width: '90%',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    LowerOtpContainerEntries: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 8,
    },
    LowerOtpContainerEntriesLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      height: 40,

    },
    otpentriesIcon: {
      height: 25,
      width: 25
    },
    resendRealtedText: {
      color: Colors?.resendOtpText,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      margin: 10
    },
    activeResndText: {
      color: Colors?.ButtonBlueColor,
    },
    timerText: {
      color: Colors?.timerText,
      padding: 2,
    },
    ActiveBorder: {
      borderBottomColor: Colors?.activeBorder,
    },
    NonActiveBorder: {
      borderBottomColor: Colors?.fadeBorder,
    },

  })
  return Styles
}