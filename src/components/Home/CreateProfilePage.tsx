import { StyleSheet, Text, View, TextInput, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// util imports
import Fonts from '../../utils/Fonts'
import { useCountry } from '../../context/CountryContext';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';

export default function CreateProfilePage({ phoneNo }: { phoneNo: string }) {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors, Fonts);
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    let formattedText
    if (countrySelected?.code == 'uae')
        formattedText = phoneNo.replace(/(\d{3})(?=\d)/g, '$1 ');
    else if (countrySelected?.code == 'in')
        formattedText = phoneNo.replace(/(\d{5})(?=\d)/g, '$1 ');
    else
        formattedText = phoneNo.replace(/(\d{4})(?=\d)/g, '$1 ');
    phoneNo = formattedText

    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [isTouchedEmail, setIsTouchedEmail] = useState<boolean>(false)
    const [isTouchedName, setIsTouchedName] = useState<boolean>(false)
    const [showWarningEmail, setShowWarningEmail] = useState<boolean>(false)
    const [showWarningName, setShowWarningName] = useState<boolean>(false)
    const [showTopEmail, setShowTopgEmail] = useState<boolean>(false)
    const [showTopName, setShowTopName] = useState<boolean>(false)

    const [goodToLogin, setGoodToLogin] = useState(false)
    useEffect(() => {
        checkGoodToLogin();
        handleShowWarningEmail();
        handleShowWarningName();
        showTopEmailPlaceHolder();
        showTopNamePlaceHolder();

    }, [email, name])
    const handleCheckGmail = () => {
        return (email.endsWith('.com') && email.includes('@'))
    }
    const checkGoodToLogin = () => {
        if (name != '' && handleCheckGmail()) {
            setGoodToLogin(true)
        } else
            setGoodToLogin(false)
    }
    const handleChangeEmail = (text: string) => {
        setEmail(text)
        setIsTouchedEmail(true)
    }
    const handleChangeName = (text: string) => {
        setName(text)
        setIsTouchedName(true)
    }
    const handleSave = () => {
        // if (name != '' && handleCheckGmail())
        // comment
            navigation.navigate(Strings?.HomeScreen)
    }

    const handleShowWarningEmail = () => {
        if (isTouchedEmail && email == '' || isTouchedEmail && !handleCheckGmail()) {
            setShowWarningEmail(true)
        } else {
            setShowWarningEmail(false)
        }
    }
    const handleShowWarningName = () => {
        if (isTouchedName && name == '') {
            setShowWarningName(true)
        } else {
            setShowWarningName(false)
        }
    }
    const showTopEmailPlaceHolder = () => {
        if (isTouchedEmail && email != '')
            setShowTopgEmail(true)
        else
            setShowTopgEmail(false)
    }
    const showTopNamePlaceHolder = () => {
        if (isTouchedName && name != '')
            setShowTopName(true)
        else
            setShowTopName(false)
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
                            <Text style={Styles.navHeaderText} >{Strings?.createProfileHeader}</Text>
                        </View>
                    </View>

                    <View style={Styles.enterCreateProfileHeaderContainer}>
                        <Text style={Styles.enterCreateProfileHeader}>{Strings?.enterYourDetails}</Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={[Styles.CreateProfileRelatedContainer, Platform.OS == 'android' ? Styles.CreateProfileRelatedContainerAndroid : null]}
                    >
                        <View style={Styles.InputEntriesContainer}>
                            {showTopName && (
                                <Text style={Styles.placeHolderTopText}>{Strings?.name.toUpperCase() + '*'} </Text>
                            )}
                            <View style={Styles.EmailAndWarning} >
                                <TextInput
                                    value={name}
                                    onChangeText={handleChangeName}
                                    placeholder={Strings?.name + '*'}
                                    style={Styles.InputEntries} />
                                {showWarningName && (
                                    <Image source={Images?.Orange_Warning} style={[Styles.tickMark, Styles.warningMark]} />
                                )}
                            </View>
                            <View style={[Styles.customBorder, showWarningName && Styles.OrangeBorder]} />
                            {showWarningName ? (
                                <Text style={Styles.orangeMandatoryField}>{Strings?.fieldIsMandatory} </Text>
                            ) : (
                                <View style={Styles.BlankWarning} />
                            )}
                            <View style={Styles.WrapperPhoneNoContainer}>
                                <Text style={Styles.mobileNumberPlaceholder}>{Strings?.mobileNumber.toUpperCase() + '*'} </Text>
                                <View style={Styles.PhoneNoContainer}>
                                    <View style={Styles.leftMobileContainer}>
                                        <View style={Styles.mobileCodeAndArrow}>
                                            <Text style={Styles.mobileCode}>{countrySelected?.mobileCode} </Text>
                                            <Image source={Images?.Arrow_down} style={Styles.arrowDown} />
                                        </View>
                                        <View style={Styles.customBorder} />
                                    </View>
                                    <View style={Styles.RightMobileContainer}>
                                        <View style={Styles.mobileAndImage}>
                                            <Text style={Styles.mobileNo}>{phoneNo} </Text>
                                            <Image source={Images?.Green_Tick} style={[Styles.tickMark, Styles.tickMark_Green]} />
                                        </View>
                                        <View style={Styles.customBorder} />
                                    </View>
                                </View>
                            </View>
                            {showTopEmail && (
                                <Text style={Styles.placeHolderTopText}>{Strings?.email.toUpperCase() + '*'} </Text>
                            )}
                            <View style={Styles.EmailAndWarning} >
                                <TextInput
                                    value={email}
                                    onChangeText={handleChangeEmail}
                                    placeholder={Strings?.email + '*'}
                                    style={Styles.InputEntries} />
                                {showWarningEmail && (
                                    <Image source={Images?.Orange_Warning} style={[Styles.tickMark, Styles.warningMark]} />
                                )}
                            </View>
                            <View style={[Styles.customBorder, showWarningEmail && Styles.OrangeBorder]} />
                            {showWarningEmail ? (
                                <Text style={Styles.orangeMandatoryField}>{Strings?.fieldIsMandatory} </Text>
                            ) : (
                                <View style={Styles.BlankWarning} />
                            )}
                        </View>

                        <View style={Styles.verifyButtonContainer}>
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={handleSave}
                                style={[Styles.VerifyBUtton, goodToLogin ? Styles.VerifyBUttonActive : null]}>
                                <Text style={[Styles.VerifyBUttonText, goodToLogin ? Styles.VerifyBUttonTextActive : null]} >{Strings?.save.toUpperCase()}</Text>
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
        enterCreateProfileHeaderContainer: {
            width: '90%',
            alignSelf: 'center',
        },
        enterCreateProfileHeader: {
            fontSize: 18,
            fontWeight: 600,
            marginTop: 30,
            fontFamily: Fonts?.subHeader,
        },
        CreateProfileRelatedContainer: {
            marginTop: 15,
            height: 350,
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
        CreateProfileRelatedContainerAndroid: {
            height: 390
        },
        customBorder: {
            borderBottomWidth: 1,
            borderBottomColor: Colors?.fadeBorder,
            marginTop: 2,
        },
        OrangeBorder: {
            borderBottomColor: Colors?.orangeColorText,
        },
        InputEntriesContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            alignSelf: 'center',
            marginTop: 25
        },
        InputEntries: {
            width: '90%',
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600
        },
        WrapperPhoneNoContainer: {
            marginVertical: 8,
        },
        PhoneNoContainer: {
            marginVertical: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'center',
        },
        leftMobileContainer: {
            width: '25%',
            marginRight: 10,
        },
        mobileCodeAndArrow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        mobileCode: {
            marginBottom: 5,
            fontSize: 16,
            fontWeight: 600,
        },
        arrowDown: {
            height: 15,
            width: 15,
            marginTop: 2,
            marginRight: 4
        },
        RightMobileContainer: {
            width: '70%',
            marginLeft: 10
        },
        mobileNumberPlaceholder: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.timerFadeText,
            fontSize: 10,
            marginLeft: '32%',
        },
        mobileNo: {
            fontSize: 16,
            fontWeight: 600,
            marginLeft: 5
        },
        placeHolderTopText: {
            fontWeight: 800,
            fontSize: 11,
            fontFamily: Fonts?.subHeader,
            color: Colors?.timerFadeText,
            marginBottom: -15
        },
        EmailAndWarning: {
            marginTop: 20,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        tickMark: {
            height: 25,
            width: 25,
            borderRadius: 50,
        },
        tickMark_Green: {
        },
        warningMark: {
            transform: [{ rotate: '180deg' }]
        },
        BlankWarning: {
            height: 22,
        },
        orangeMandatoryField: {
            fontSize: 12,
            color: Colors?.orangeColorText,
            marginLeft: 10,
            fontWeight: 500,
            marginTop: 8
        },
        mobileAndImage: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between'
        },
        verifyButtonContainer: {
            width: '90%',
            alignSelf: 'center',
        },
        VerifyBUtton: {
            height: 40,
            paddingVertical: 10,
            paddingHorizontal: 30,
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

    })
    return Styles
}