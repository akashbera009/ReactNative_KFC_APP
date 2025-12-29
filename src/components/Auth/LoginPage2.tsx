import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// google sign in 
import { GoogleSignin, statusCodes, isSuccessResponse, isErrorWithCode } from '@react-native-google-signin/google-signin';
// util import 
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useCountry } from '../../context/CountryContext';
import { useLanguage } from '../../context/LanguageContex';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function LoginPage2() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors)
    const { countrySelected } = useCountry()
    const { language, setLanguage } = useLanguage()
    const [mobileNo, setMobileNo] = useState<string>('')
    const [rawMobileNO, setRawMobileNo] = useState<string>('')
    const [goodToLogin, setGoodToLogin] = useState<boolean>(false)
    // const [userToken, setUserToken] = useState<string | null>(null);
    const checkGoodToLogin = useCallback((): void => {
        setGoodToLogin(mobileNo.length <= countrySelected.mobileNoLength)
    }, [mobileNo, countrySelected.mobileNoLength])
    useEffect((): void => {
        checkGoodToLogin()
    }, [checkGoodToLogin])
    const handleMobileNoInput = (text: string): void => {
        const digitsOnly = text.replace(' ', '')
        if (digitsOnly.length <= countrySelected.mobileNoLength) {
            let formattedText
            if (countrySelected?.code === 'uae')
                formattedText = text.replace(/(\d{3})(?=\d)/g, '$1 ');
            else if (countrySelected?.code === 'in')
                formattedText = text.replace(/(\d{5})(?=\d)/g, '$1 ');
            else
                formattedText = text.replace(/(\d{4})(?=\d)/g, '$1 ');
            setMobileNo(formattedText)
        }
        setRawMobileNo(digitsOnly)
    }
    const signInWithGoogle = async (): Promise<void> => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            console.log('Google Sign-In response:', response);
            if (isSuccessResponse(response)) {
                console.log('isSuccessResponse(response)', isSuccessResponse(response))
                // setUserToken(response?.data?.idToken)
                Alert.alert('Success', `Google Sign-In Successful! token is ${response?.data?.user?.id}`);
                navigation.navigate(Strings.HomeScreen)
            } else if (response.type === 'cancelled') {
                console.log('sign in was calcelled by user ');
                Alert.alert('Alert', 'Sigin in calcelled by user');
            } else {
                console.log('unknown action');
            }
        } catch (error: unknown) {
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
    const handleSubmit = async (): Promise<void> => {
        if (mobileNo.length < countrySelected?.mobileNoLength) return
        await Keyboard.dismiss()
        navigation.push(Strings.OTPScreen, {
            phoneNo: rawMobileNO
        })
    }

    return (
        <View style={Styles.ParentContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={150}
                    contentContainerStyle={Styles.scrollviewBottom}
                >
                    <View style={Styles.UpperCOntainer}>
                        <View style={Styles.ThreeColumnStyle}>
                            <View style={[Styles.singleCOlumnStyle,]} />
                            <View style={[Styles.singleCOlumnStyle,]} />
                            <View style={[Styles.singleCOlumnStyle,]} />
                        </View>
                        <Image source={Images.KFC_Combo_Pack} style={[Styles.KFC_ComboImage, { marginTop: inset.top }]} />
                        <Text style={Styles.Welcome2} >{Strings.welcome2.toUpperCase()}</Text>
                        <View style={Styles.SecondLine}>
                            <Text style={Styles.SecondLineText}>{Strings.KFC.toUpperCase()}</Text>
                            <Text style={Styles.SecondLineText}>{countrySelected.name.toUpperCase()}</Text>
                            <Text style={Styles.SecondLineText}>{Strings.app.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={Styles.LowerContaienr}>
                        <View style={Styles.ChooseLanguageContainer}>
                            <Text style={Styles.chooseLangHeader}>{Strings.chooseLanguage}</Text>
                            <View style={Styles.languageContainer}>
                                <TouchableOpacity
                                    style={Styles.LanguageButton}
                                    onPress={() => { setLanguage('en') }}
                                    activeOpacity={.3}
                                >
                                    <Text style={Styles.chooseLangText}>{Strings.english} </Text>
                                    <View style={[Styles.TickMarkOuter, language === 'en' ? Styles.ActiveBorder : null]} >
                                        {language === 'en' && (
                                            <View style={Styles.CheckBox} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={Styles.LanguageButton}
                                    onPress={() => { setLanguage('ar') }}
                                    activeOpacity={.3}
                                >
                                    <Text style={Styles.chooseLangText}>{Strings.arabic} </Text>
                                    <View style={[Styles.TickMarkOuter, language === 'ar' ? Styles.ActiveBorder : null]} >
                                        {language === 'ar' && (
                                            <View style={Styles.CheckBox} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.MobileNumberIPContainer}>
                            <View style={Styles.headerTextContainer}>
                                <Text style={Styles.mobileNoHeader}>{Strings.loginWIthNumberText} </Text>
                                <Text style={Styles.mobileNoHeader}>{countrySelected?.name} </Text>
                                <Text style={Styles.mobileNoHeader}>{Strings.mobileNumber} </Text>
                            </View>
                            <View
                                style={Styles.loginMobileLowerContainer}
                            >
                                <Text style={Styles.CountryCode}>{countrySelected?.mobileCode}</Text>
                                <View style={Styles.centralMobileContainer}>
                                    <TextInput
                                        value={mobileNo}
                                        onChangeText={handleMobileNoInput}
                                        placeholder={Strings.enterNumberPlaceHoler.toUpperCase()}
                                        keyboardType='numeric'
                                        placeholderTextColor={Colors.textFadeBlack}
                                        style={Styles.MobileInputContainer}
                                    />
                                    <View style={Styles.customBorder} />
                                    <Text style={Styles.egMobile}>{Strings.EgMobile} </Text>
                                </View>
                                <TouchableOpacity
                                    style={[Styles.submitButton, goodToLogin ? null : Styles.ActiveButton]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={[Styles.SubmitButtonText, goodToLogin ? null : Styles.ActiveButtonText]}>{Strings.submit.toUpperCase()} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.SocialContainer}>
                            <Text style={Styles.chooseLangHeader}>{Strings.loginWithSocialHeader} </Text>
                            <View style={Styles.FaangContainer}>
                                <TouchableOpacity
                                    style={Styles.faangButton}
                                    onPress={signInWithGoogle}
                                >
                                    <Image source={Images.facebook} style={Styles.faangLogo} />
                                    <Text style={Styles.faangButtonText}>{Strings.facebook.toUpperCase()} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={Styles.faangButton}
                                    onPress={signInWithGoogle}
                                >
                                    <Image source={Images.google} style={Styles.faangLogo} />
                                    <Text style={Styles.faangButtonText}>{Strings.google.toUpperCase()} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
            <View style={[Styles.TcContainer, { bottom: inset.bottom }]}>
                <View style={Styles.TcInnerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Strings.AppStack, { screen: Strings.TermsAndConditionsScreen })}>
                        <Text style={Styles.tcText}>{Strings.tc.toUpperCase()} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.replace(Strings.AppStack, { screen: Strings.HomeScreen })}>
                        <Text style={Styles.tcText}>{Strings.skipLoginAndContinue.toUpperCase()} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const createDynamicStyles = (Colors: ColorType) => {
    const styles = StyleSheet.create({
        ParentContainer: {
            height: '100%'
        },
        scrollviewBottom: {
            paddingBottom: vh(50)
        },
        UpperCOntainer: {
            backgroundColor: Colors.bodyColor,
        },
        ThreeColumnStyle: {
            alignSelf: 'center',
            width: '32%',
            height: vh(200),
            top: vh(0),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute'
        },
        singleCOlumnStyle: {
            height: vh(100),
            width: vw(25),
            backgroundColor: Colors.KFC_red,
        },
        KFC_ComboImage: {
            height: vh(200),
            width: vw(200),
            alignSelf: 'center',
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(2), height: vh(10) },
            shadowOpacity: .5,
            shadowRadius: normalize(5),
            elevation: 5,
        },
        Welcome2: {
            fontSize: normalize(18),
            fontFamily: Fonts.helveticaBold,
            marginHorizontal: vw(5),
            alignSelf: 'center',
            letterSpacing: normalize(.2),
            color: Colors.textBlack
        },
        SecondLine: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            margin: normalize(5)
        },
        SecondLineText: {
            fontSize: normalize(22),
            fontFamily: Fonts.helveticaBold,
            marginHorizontal: vw(4),
            color: Colors.textBlack
        },
        LowerContaienr: {
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            backgroundColor: Colors.bodyShadeColor,
        },
        ChooseLanguageContainer: {
            width: '100%',
            alignSelf: 'center',
            height: vh(100),
            backgroundColor: Colors.bodyColor,
            marginTop: vh(10)
        },
        headerTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: vw(15),
            marginTop: vh(15)
        },
        chooseLangHeader: {
            color: Colors.timerFadeText,
            fontFamily: Fonts.helveticaMedium,
            fontSize: normalize(13),
            marginTop: vh(15),
            marginLeft: vw(15)
        },
        languageContainer: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            gap: normalize(10),
        },
        LanguageButton: {
            width: '50%',
            height: vh(60),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center'
        },
        chooseLangText: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textBlack
        },
        TickMarkOuter: {
            width: vw(20),
            height: vh(20),
            borderWidth: normalize(2),
            borderColor: Colors.textFadeBlack,
            borderRadius: normalize(40),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ActiveBorder: {
            borderColor: Colors.KFC_red,
        },
        CheckBox: {
            width: vw(10),
            height: vh(10),
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(50),
        },
        MobileNumberIPContainer: {
            width: '100%',
            alignSelf: 'center',
            height: vh(140),
            backgroundColor: Colors.bodyColor,
            marginTop: vh(10),
        },
        mobileNoHeader: {
            color: Colors.timerFadeText,
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(13),
            marginRight: vw(4)
        },
        loginMobileLowerContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        MobileInputContainer: {
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        customBorder: {
            borderBottomWidth: normalize(1),
            borderBottomColor: Colors.fadeBorder,
            marginTop: vh(10),
            marginRight: vw(10)
        },
        CountryCode: {
            marginRight: vw(10),
            marginTop: vh(-8),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textFadeBlack2
        },
        centralMobileContainer: {
            width: vw(200),
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            marginTop: vh(20)
        },
        egMobile: {
            color: Colors.timerFadeText,
            fontFamily: Fonts.subHeader,
            fontSize: normalize(12),
            marginTop: vh(2)
        },
        submitButton: {
            height: vh(30),
            backgroundColor: Colors.fadeVerify,
            paddingHorizontal: vw(10),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 'auto',
            borderRadius: normalize(2),
        },
        ActiveButton: {
            backgroundColor: Colors.KFC_red
        },
        ActiveButtonText: {
            color: Colors.constantWhite,
            fontFamily: Fonts.helveticaBold
        },
        SubmitButtonText: {
            fontSize: normalize(13),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack,
            paddingHorizontal: vw(10),
        },
        SocialContainer: {
            width: '100%',
            alignSelf: 'center',
            height: vh(130),
            backgroundColor: Colors.bodyColor,
            marginTop: vh(10),
        },
        FaangContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: vh(20)
        },
        faangButton: {
            height: vh(50),
            backgroundColor: Colors.bodyColor,
            paddingHorizontal: vw(25),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 'auto',
            borderRadius: normalize(2),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.3,
            shadowRadius: normalize(5),
            elevation: 5,
        },
        faangLogo: {
            height: vh(20),
            width: vw(20),
        },
        faangButtonText: {
            fontSize: normalize(13),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textBlack,
            paddingHorizontal: vw(10),
            marginLeft: vw(8)
        },
        TcContainer: {
            width: '100%',
            position: 'absolute',
            left: vw(0),
            height: vh(60),
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            justifyContent: 'center',
        },
        TcInnerContainer: {
            width: '85%',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        tcText: {
            color: Colors.ButtonBlueColor,
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(12)
        }
    })
    return styles
}


