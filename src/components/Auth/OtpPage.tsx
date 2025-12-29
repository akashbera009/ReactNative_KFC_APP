import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// redux 
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { fetctUserDeatails } from '../../features/userSlice';
// util  imports 
import { useThemeColors } from '../../utils/Colors'
import { useStrings } from '../../utils/Strings'
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OtpPage({ phoneNo }: { phoneNo: string }) {
  const [inputValue, setInputValue] = useState<string[]>(new Array(4).fill(''))
  const inputRef = useRef<Array<TextInput | null>>([])
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { countrySelected } = useCountry()
  const [timer, setTimer] = useState<number>(90)
  const [resendActive, setResendActive] = useState<boolean>(false)
  useEffect((): (() => void) | void => {
    if (timer > 0) {
      const intervalId: number = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    if (timer === 0) {
      setResendActive(true)
    }
  }, [timer]);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime: string = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  const [goodToLogin, setGoodToLogin] = useState<boolean>(false)
  const checkGoodToLogin = useCallback((): void => {
    if (inputValue.includes('')) {
      setGoodToLogin(false)
    } else
      setGoodToLogin(true)
  }, [inputValue])
  useEffect((): void => {
    checkGoodToLogin()
  }, [inputValue, checkGoodToLogin])


  // redux part 
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetctUserDeatails(phoneNo))
  }, [dispatch, phoneNo])
  const existingUser = useSelector((state: RootState) =>
    state.users.currentUser
  );
  const handleVerify = async(): Promise<void> =>  {
    if (goodToLogin) {
      if (existingUser) {
        console.log('existing user found ');
        await AsyncStorage.setItem('phoneNo', phoneNo)
        navigation.navigate(Strings.HomeScreen)
      }
      else {
        console.log('not found any iser ');

        navigation.push(Strings.CreateProfileScreen, {
          phoneNo: phoneNo
        })
      }
    }
  }
  const handleResendOtp = (): void => {
    setTimer(60)
    setResendActive(false)
    Alert.alert('OTP sent Successfully')
  }
  const handleCalling = (): void => {
    setTimer(60)
    setResendActive(false)
    Alert.alert('Calliing please wait ')
  }
  return (
    <View style={Styles.parentBackground}>
      <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
        <View style={Styles.BackIconAndHeaderText}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
          >
            <Image source={Images.back_arrow} style={Styles.BackIcon} />
          </TouchableOpacity>
          <Text style={Styles.headerText}>{Strings.otpText}</Text>
        </View>
      </View>
      <View style={Styles.enterOtpHeaderContainer}>
        <Text style={Styles.enterOtpHeader}>{Strings.enterOtpHeader}</Text>
        <Text style={Styles.PhoneNo}>{countrySelected?.mobileCode} {phoneNo}</Text>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={180}
        contentContainerStyle={Styles.scrollviewBottom}
      >
        <View style={Styles.otpRelatedContainer}>
          <View style={Styles.innerOtpContainer}>
            {inputValue.map((item, idx) => (
              <View key={idx} style={[Styles.SingleOtp, (inputValue[idx] !== '') ? Styles.ActiveBorder : Styles.NonActiveBorder]}>
                <TextInput
                  ref={element => { inputRef.current[idx] = element }}
                  keyboardType='numeric'
                  maxLength={1}
                  autoFocus={idx === 0}
                  style={[Styles.OtpInputText]}
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
                    if (event.nativeEvent.key === 'Backspace' && !inputValue[idx] && idx > 0) {
                      inputRef.current[idx - 1]?.focus()
                    }
                  }}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={handleVerify}
            style={[Styles.VerifyBUtton, goodToLogin ? Styles.VerifyBUttonActive : null]}
          >
            <Text style={[Styles.VerifyBUttonText, goodToLogin ? Styles.VerifyBUttonTextActive : null]}>
              {Strings.verifyText}
            </Text>
          </TouchableOpacity>

          <View style={Styles.LowerOtpContainer}>
            <TouchableOpacity
              disabled={resendActive === false}
              onPress={() => handleResendOtp()}
              style={Styles.LowerOtpContainerEntries}
            >
              <View style={Styles.LowerOtpContainerEntriesLeft}>
                <Image source={Images.Messege} style={Styles.otpentriesIcon} />
                <Text style={[Styles.resendRealtedText, resendActive ? Styles.activeResndText : null]}>
                  {Strings.resendOtp.toUpperCase()}
                </Text>
              </View>
              {resendActive === false && (
                <Text style={[Styles.resendRealtedText, Styles.timerText]}>{formattedTime}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              disabled={resendActive === false}
              onPress={() => handleCalling()}
              style={Styles.LowerOtpContainerEntries}
            >
              <View style={Styles.LowerOtpContainerEntriesLeft}>
                <Image source={Images.call} style={Styles.otpentriesIcon} />
                <Text style={[Styles.resendRealtedText, resendActive ? Styles.activeResndText : null]}>
                  {Strings.callMe.toLocaleUpperCase()}
                </Text>
              </View>
              {resendActive === false && (
                <Text style={[Styles.resendRealtedText, Styles.timerText]}>{formattedTime}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const createDynamicStyles = (Colors: ColorType) => {
  const Styles = StyleSheet.create({
    parentBackground: {
      height: '100%',
      width: '100%',
      backgroundColor: Colors.bodyLigheterColor,
    },
    NavWrapper: {
      width: '100%',
      backgroundColor: Colors.bodyColor,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      paddingBottom: vh(15),
      shadowColor: Colors.blueShadows,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
    },
    headerText: {
      fontSize: normalize(20),
      fontFamily: Fonts.font18,
      color: Colors.textBlack
    },
    BackIconAndHeaderText: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    BackIcon: {
      tintColor: Colors.textBlack,
      height: vh(18),
      width: vw(18),
      alignSelf: 'flex-start',
      marginHorizontal: vw(18),
    },
    navHeaderText: {
      fontSize: normalize(20),
      fontFamily: Fonts.font18,
    },
    enterOtpHeaderContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    enterOtpHeader: {
      fontSize: normalize(18),
      marginTop: vh(30),
      fontFamily: Fonts.font18,
      color: Colors.textBlack
    },
    PhoneNo: {
      fontSize: normalize(17),
      marginTop: vh(10),
      fontFamily: Fonts.font18,
      color: Colors.textBlack
    },
    scrollviewBottom: {
      paddingBottom: vh(50)
    },
    otpRelatedContainer: {
      marginTop: vh(100),
      height: vh(320),
      width: '90%',
      alignSelf: 'center',
      backgroundColor: Colors.bodyColor,
      display: 'flex',
      flexDirection: 'column',
      shadowColor: Colors.blueShadows,
      shadowOffset: { width: vw(5), height: vh(5) },
      shadowOpacity: .1,
      shadowRadius: normalize(10),
      elevation: 5,
    },
    innerOtpContainer: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '95%',
      marginTop: vh(50),
    },
    SingleOtp: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: normalize(2),
      height: vh(60),
      width: vw(60)
    },
    OtpInputText: {
      fontSize: normalize(24),
      height: '100%',
      width: '100%',
      textAlign: 'center',
      color: Colors.textBlack
    },
    verifyButtonContainer: {
      width: '90%',
      alignSelf: 'center',
    },
    VerifyBUtton: {
      marginRight: vw(20),
      height: vh(40),
      paddingVertical: vh(10),
      paddingHorizontal: vw(20),
      marginTop: vh(30),
      width: 'auto',
      alignSelf: "flex-end",
      backgroundColor: Colors.fadeVerify,
      borderRadius: normalize(2)
    },
    VerifyBUttonActive: {
      backgroundColor: Colors.KFC_red
    },
    VerifyBUttonText: {
      fontFamily: Fonts.font18,
      fontSize: normalize(16),
      color: Colors.verifyText
    },
    VerifyBUttonTextActive: {
      color: Colors.constantWhite
    },
    LowerOtpContainer: {
      margin: normalize(10),
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
      margin: normalize(8),
    },
    LowerOtpContainerEntriesLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: vh(40),
    },
    otpentriesIcon: {
      height: vh(25),
      width: vw(25)
    },
    resendRealtedText: {
      color: Colors.resendOtpText,
      fontFamily: Fonts.font18,
      margin: normalize(10)
    },
    activeResndText: {
      color: Colors.ButtonBlueColor,
    },
    timerText: {
      color: Colors.timerText,
      padding: normalize(2),
    },
    ActiveBorder: {
      borderBottomColor: Colors.activeBorder,
    },
    NonActiveBorder: {
      borderBottomColor: Colors.fadeBorder,
    },

  })
  return Styles
}