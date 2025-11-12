import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// util import 
import { useThemeColors } from '../../../utils/Colors';
import { useStrings } from '../../../utils/Strings';
import Fonts from '../../../utils/Fonts';
import Images from '../../../utils/LocalImages';
import { useCountry } from '../../../context/CountryContext';
import { useLanguage } from '../../../context/LanguageContex';

export default function LoginPage2() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts)
    const { countrySelected } = useCountry()
    const { language, setLanguage } = useLanguage()
    const [mobileNo, setMobileNo] = useState<string>('')
    const [goodToLogin, setGoodToLogin] = useState(false)

    useEffect(() => {
        checkGoodToLogin()
    }, [mobileNo])
    const checkGoodToLogin = () => {
        if (mobileNo.length === countrySelected.mobileNoLength) {
            setGoodToLogin(false)
        } else
            setGoodToLogin(true)
    }
    const handleMobileNoInput = (text: string) => {
        if (text.length <= countrySelected.mobileNoLength) {
            let formattedText
            if (countrySelected?.code == 'uae')
                formattedText = text.replace(/(\d{3})(?=\d)/g, '$1 ');
            else if (countrySelected?.code == 'in')
                formattedText = text.replace(/(\d{5})(?=\d)/g, '$1 ');
            else
                formattedText = text.replace(/(\d{4})(?=\d)/g, '$1 ');
            setMobileNo(formattedText)
        }
    }
    const handleSubmit = async () => {
        // if (mobileNo.length < countrySelected?.mobileNoLength)
        //     return
        // await Keyboard.dismiss()
        // comment
        navigation.push(Strings?.OTPScreen, {
            phoneNo: mobileNo
        })
    }

    return (
        <View style={Styles.ParentContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <View style={Styles.ThreeColumnStyle}>
                        <View style={[Styles.singleCOlumnStyle,]} />
                        <View style={[Styles.singleCOlumnStyle,]} />
                        <View style={[Styles.singleCOlumnStyle,]} />
                    </View>
                    <Image source={Images?.KFC_Combo_Pack} style={[Styles.KFC_ComboImage, { marginTop: inset.top }]} />
                    <Text style={Styles.Welcome2} >{Strings?.welcome2.toUpperCase()}</Text>
                    <View style={Styles.SecondLine}>
                        <Text style={Styles.SecondLineText}>{Strings?.KFC.toUpperCase()}</Text>
                        <Text style={Styles.SecondLineText}>{countrySelected.name.toUpperCase()}</Text>
                        <Text style={Styles.SecondLineText}>{Strings?.app.toUpperCase()}</Text>
                    </View>
                    <View style={Styles.LowerContaienr}>
                        <View style={Styles.ChooseLanguageContainer}>
                            <Text style={Styles.chooseLangHeader}>{Strings?.chooseLanguage}</Text>
                            <View style={Styles.languageContainer}>
                                <TouchableOpacity
                                    style={Styles.LanguageButton}
                                    onPress={() => { setLanguage('en') }}
                                    activeOpacity={.3}
                                >
                                    <Text style={Styles.chooseLangText}>{Strings?.english} </Text>
                                    <View style={[Styles.TickMarkOuter, language == 'en' ? Styles.ActiveBorder : null]} >
                                        {language == 'en' && (
                                            <View style={Styles.CheckBox} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={Styles.LanguageButton}
                                    onPress={() => { setLanguage('ar') }}
                                    activeOpacity={.3}
                                >
                                    <Text style={Styles.chooseLangText}>{Strings?.arabic} </Text>
                                    <View style={[Styles.TickMarkOuter, language == 'ar' ? Styles.ActiveBorder : null]} >
                                        {language == 'ar' && (
                                            <View style={Styles.CheckBox} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.MobileNumberIPContainer}>
                            <View style={Styles.headerTextContainer}>
                                <Text style={Styles.mobileNoHeader}>{Strings?.loginWIthNumberText} </Text>
                                <Text style={Styles.mobileNoHeader}>{countrySelected?.name} </Text>
                                <Text style={Styles.mobileNoHeader}>{Strings?.mobileNumber} </Text>
                            </View>
                            <View
                                style={Styles.loginMobileLowerContainer}
                            >
                                <Text style={Styles.CountryCode}>{countrySelected?.mobileCode}</Text>
                                <View style={Styles.centralMobileContainer}>
                                    <TextInput
                                        value={mobileNo}
                                        onChangeText={handleMobileNoInput}
                                        placeholder={Strings?.enterNumberPlaceHoler.toUpperCase()}
                                        keyboardType='numeric'
                                        style={Styles.MobileInputContainer}
                                    />
                                    <View style={Styles.customBorder} />
                                    <Text style={Styles.egMobile}>{Strings?.EgMobile} </Text>
                                </View>
                                <TouchableOpacity
                                    style={[Styles.submitButton, goodToLogin ? null : Styles.ActiveButton]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={[Styles.SubmitButtonText, goodToLogin ? null : Styles.ActiveButtonText]}>{Strings?.submit.toUpperCase()} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.SocialContainer}>
                            <Text style={Styles.chooseLangHeader}>{Strings?.loginWithSocialHeader} </Text>

                            <View style={Styles.FaangContainer}>

                                <TouchableOpacity
                                    style={Styles.faangButton}
                                    onPress={handleSubmit}
                                >
                                    <Image source={Images?.facebook} style={Styles.faangLogo} />
                                    <Text style={Styles.faangButtonText}>{Strings?.facebook.toUpperCase()} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={Styles.faangButton}
                                    onPress={handleSubmit}
                                >
                                    <Image source={Images?.google} style={Styles.faangLogo} />
                                    <Text style={Styles.faangButtonText}>{Strings?.google.toUpperCase()} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={[Styles.TcContainer, { bottom: inset.bottom }]}>
                <View style={Styles.TcInnerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}>
                        <Text style={Styles.tcText}>{Strings?.tc.toUpperCase()} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Strings?.HomeScreen)}>
                        <Text style={Styles.tcText}>{Strings?.skipLoginAndContinue.toUpperCase()} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const styles = StyleSheet.create({
        ParentContainer: {
            height: '100%'
        },
        ThreeColumnStyle: {
            alignSelf: 'center',
            width: '32%',
            height: 200,
            top: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute'
        },
        singleCOlumnStyle: {
            height: 100,
            width: 25,
            backgroundColor: Colors?.KFC_red,
        },
        KFC_ComboImage: {
            height: 200,
            width: 200,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 10 },
            shadowOpacity: .5,
            shadowRadius: 5,
            elevation: 5,
        },
        Welcome2: {
            fontSize: 18,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            marginHorizontal: 5,
            alignSelf: 'center',
            letterSpacing: .2
        },
        SecondLine: {
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            margin: 5
        },
        SecondLineText: {
            fontSize: 22,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            marginHorizontal: 4
        },

        LowerContaienr: {
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyShadeColor,
        },
        ChooseLanguageContainer: {
            width: '100%',
            alignSelf: 'center',
            height: 100,
            backgroundColor: Colors?.bodyColor,
            marginTop: 10
        },
        headerTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 15,
            marginTop: 15
        },
        chooseLangHeader: {
            color: Colors?.timerFadeText,
            fontWeight: 700,
            fontSize: 13,
            marginTop: 15,
            marginLeft: 15
        },
        languageContainer: {
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            gap: 10,
        },
        LanguageButton: {
            width: '50%',
            height: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',

        },
        chooseLangText: {
            fontSize: 16,
            fontWeight: 600,
            fontFamily: Fonts?.subHeader
        },
        TickMarkOuter: {
            width: 20,
            height: 20,
            borderWidth: 2,
            borderColor: Colors?.textFadeBlack,
            borderRadius: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ActiveBorder: {
            borderColor: Colors?.KFC_red,
        },
        CheckBox: {
            width: 10,
            height: 10,
            backgroundColor: Colors?.KFC_red,
            borderRadius: 50,
        },
        MobileNumberIPContainer: {
            width: '100%',
            alignSelf: 'center',
            height: 140,
            backgroundColor: Colors?.bodyColor,
            marginTop: 10,
        },
        mobileNoHeader: {
            color: Colors?.timerFadeText,
            fontWeight: 700,
            fontSize: 13,
            marginRight: 4
        },
        loginMobileLowerContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        MobileInputContainer: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 600
        },
        customBorder: {
            borderBottomWidth: 1,
            borderBottomColor: Colors?.fadeBorder,
            marginTop: 10,
            marginRight: 10
        },
        CountryCode: {
            marginRight: 10,
            marginTop: -8,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700
        },
        centralMobileContainer: {
            width: 200,
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            marginTop: 20
        },
        egMobile: {
            color: Colors?.timerFadeText,
            fontFamily: Fonts?.subHeader,
            fontSize: 12,
            marginTop: 2
        },
        submitButton: {
            height: 30,
            backgroundColor: Colors?.fadeVerify,
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 'auto',
            borderRadius: 2,
        },
        ActiveButton: {
            backgroundColor: Colors?.KFC_red
        },
        ActiveButtonText: {
            color: Colors?.constantWhite,
            fontWeight: 700,
        },
        SubmitButtonText: {
            fontSize: 13,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600,
            color: Colors?.textFadeBlack,
            paddingHorizontal: 10,
        },
        SocialContainer: {
            width: '100%',
            alignSelf: 'center',
            height: 130,
            backgroundColor: Colors?.bodyColor,
            marginTop: 10,
        },
        FaangContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginTop: 20
        },
        faangButton: {
            height: 50,
            backgroundColor: Colors?.bodyColor,
            paddingHorizontal: 25,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 'auto',
            borderRadius: 2,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
        },
        faangLogo: {
            height: 20,
            width: 20,
        },
        faangButtonText: {
            fontSize: 13,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600,
            color: Colors?.textBlack,
            paddingHorizontal: 10,
            marginLeft: 8
        },
        TcContainer: {
            width: '100%',
            position: 'absolute',
            left: 0,
            height: 60,
            backgroundColor: Colors?.bodyColor,
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
            color: Colors?.ButtonBlueColor,
            fontWeight: 700,
            fontSize: 12
        }
    })
    return styles
}


