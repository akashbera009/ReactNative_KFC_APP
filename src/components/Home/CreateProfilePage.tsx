import { StyleSheet, Text, View, TextInput, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// image picker
import ImagePicker from 'react-native-image-crop-picker';
// redux 
import { useSelector } from "react-redux";
import { addUserDetails, fetctUserDeatails, selectUserByMobile, updateUser } from '../../features/userSlice';
import { RootState, useAppDispatch } from '../../store/store';

// util imports
import Fonts from '../../utils/Fonts'
import { useCountry } from '../../context/CountryContext';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { uploadToImgBB } from '../../utils/uploadToImgBB';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function CreateProfilePage({ phoneNo }: { phoneNo: string }) {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors, Fonts);
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    const rawPhone = phoneNo
    let formattedText
    if (countrySelected?.code == 'uae')
        formattedText = phoneNo.replace(/(\d{3})(?=\d)/g, '$1 ');
    else if (countrySelected?.code == 'in')
        formattedText = phoneNo.replace(/(\d{5})(?=\d)/g, '$1 ');
    else
        formattedText = phoneNo.replace(/(\d{4})(?=\d)/g, '$1 ');
    phoneNo = formattedText
    // data fetch
    const dispatch = useAppDispatch();
    const existingUser = useSelector((state: RootState) =>
        selectUserByMobile(state, rawPhone)
    );
    useEffect(() => {
        dispatch(fetctUserDeatails())
    }, [])
    const userdata = useSelector((state: RootState) => state.users)
    const currentUser = userdata?.userData.find((item) => item?.mobileNo == rawPhone)
    const [email, setEmail] = useState<string | undefined>(currentUser?.email)
    const [name, setName] = useState<string | undefined>(currentUser?.name)
    const [isTouchedEmail, setIsTouchedEmail] = useState<boolean>(false)
    const [isTouchedName, setIsTouchedName] = useState<boolean>(false)
    const [showWarningEmail, setShowWarningEmail] = useState<boolean>(false)
    const [showWarningName, setShowWarningName] = useState<boolean>(false)
    const [showTopEmail, setShowTopgEmail] = useState<boolean>(false)
    const [showTopName, setShowTopName] = useState<boolean>(false)
    const [goodToLogin, setGoodToLogin] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | undefined>(currentUser?.avatar)
    const [successModal, setSuccessModal] = useState(true)
    useEffect(() => {
        checkGoodToLogin();
        handleShowWarningEmail();
        handleShowWarningName();
        showTopEmailPlaceHolder();
        showTopNamePlaceHolder();
    }, [email, name])
    const handleCheckGmail = () => {
        return (email?.endsWith('.com') && email?.includes('@'))
    }
    const checkGoodToLogin = () => {
        if (name != '' && handleCheckGmail())
            setGoodToLogin(true)
        else
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
        if (!goodToLogin) return;
        if (existingUser) {
            dispatch(updateUser({
                id: existingUser.id,
                data: {
                    name,
                    email,
                    avatar: selectedImage || existingUser.avatar
                }
            }));
        } else {
            dispatch(addUserDetails({
                name,
                email,
                mobileNo: rawPhone,
                avatar: selectedImage || undefined,
                orderCount: 0,
                address: []
            }));
        }
        navigation.pop()
        navigation.navigate(Strings?.CommonPopUpScreen, {
            header: Strings?.UserDeatailUpdatedHeader,
            message: Strings?.UserDeatailUpdatedMessage
        })
        setTimeout(() => {
            navigation.pop()
            navigation.navigate(Strings.HomeScreen);
        }, 20000);
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
    const openImagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            mediaType: 'photo',
            cropping: true,
        }).then(async (image) => {
            const url = await uploadToImgBB({
                path: image.path,
                mime: image.mime,
                filename: image.filename
            });
            setSelectedImage(url)
        });
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
                            <TouchableOpacity
                                onPress={openImagePicker}
                                style={Styles.ImageContainer}>
                                {selectedImage != '' ? (
                                    <Image source={{ uri: selectedImage }} style={Styles.profileImage} />
                                ) : (
                                    <Image source={Images?.Camera} style={Styles.CameraImage} />
                                )}
                            </TouchableOpacity>
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
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(0), height: vh(0) },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        innerNavigationContainer: {
            width: '100%',
            height: vh(60),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors?.bodyColor,
        },
        BackBUtton: {
            height: vh(20),
            width: vw(20),
            margin: normalize(20),
        },
        navHeaderText: {
            fontSize: normalize(20),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
        },
        enterCreateProfileHeaderContainer: {
            width: '90%',
            alignSelf: 'center',
        },
        enterCreateProfileHeader: {
            fontSize: normalize(18),
            fontWeight: 600,
            marginTop: vh(30),
            fontFamily: Fonts?.subHeader,
        },
        CreateProfileRelatedContainer: {
            marginTop: vh(15),
            width:'90%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'column',
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(5), height: vh(5) },
            shadowOpacity: .1,
            shadowRadius: normalize(10),
            elevation: normalize(5),
        },
        CreateProfileRelatedContainerAndroid: {
            height: vh(390)
        },
        customBorder: {
            borderBottomWidth: normalize(1),
            borderBottomColor: Colors?.fadeBorder,
            marginTop: vh(2),
        },
        OrangeBorder: {
            borderBottomColor: Colors?.orangeColorText,
        },
        InputEntriesContainer: {
            display: 'flex',
            flexDirection: 'column',
            width:'90%',
            alignSelf: 'center',
            marginTop: vh(25)
        },
        InputEntries: {
            width: '90%',
            fontSize: normalize(16),
            fontFamily: Fonts?.subHeader,
            fontWeight: 600
        },
        WrapperPhoneNoContainer: {
            marginVertical: vh(8),
        },
        PhoneNoContainer: {
            marginVertical: vh(4),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'center',
        },
        leftMobileContainer: {
            width: '25%',
            marginRight: vw(10),
        },
        mobileCodeAndArrow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        mobileCode: {
            marginBottom: vh(5),
            fontSize: normalize(16),
            fontWeight: 600,
        },
        arrowDown: {
            height: vh(15),
            width: vw(15),
            marginTop: vh(2),
            marginRight: vw(4)
        },
        RightMobileContainer: {
            width: '70%',
            marginLeft: vw(10)
        },
        mobileNumberPlaceholder: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.timerFadeText,
            fontSize: normalize(10),
            marginLeft: '32%',
        },
        mobileNo: {
            fontSize: normalize(16),
            fontWeight: 600,
            marginLeft: vw(5)
        },
        placeHolderTopText: {
            fontWeight: 800,
            fontSize: normalize(11),
            fontFamily: Fonts?.subHeader,
            color: Colors?.timerFadeText,
            marginBottom: vh(-15)
        },
        EmailAndWarning: {
            marginTop: vh(20),
            marginBottom: vh(10),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        tickMark: {
            height: vh(25),
            width: vw(25),
            borderRadius: normalize(50),
        },
        tickMark_Green: {
        },
        warningMark: {
            transform: [{ rotate: '180deg' }]
        },
        BlankWarning: {
            height: vh(22),
        },
        orangeMandatoryField: {
            fontSize: normalize(12),
            color: Colors?.orangeColorText,
            marginLeft: vw(10),
            fontWeight: 500,
            marginTop: vh(8)
        },
        mobileAndImage: {
            width:'100%',
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between'
        },
        ImageContainer: {
            height: vh(80),
            width: vw(80),
            borderRadius: normalize(100),
            backgroundColor: Colors?.HyperTransparent,
            objectFit: 'fill',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 'auto'
        },
        profileImage: {
            height: vh(80),
            width: vw(80)
        },
        CameraImage: {
            height: vh(30),
            width: vw(30),
            tintColor: Colors?.timerText,
        },
        verifyButtonContainer: {
            width: '90%',
            alignSelf: 'center',
            marginBottom: vh(40),
        },
        VerifyBUtton: {
            height: vh(40),
            paddingVertical: vh(10),
            paddingHorizontal: vw(30),
            marginTop: vh(30),
            width: 'auto',
            alignSelf: "flex-end",
            backgroundColor: Colors?.fadeVerify,
            borderRadius: normalize(2)
        },
        VerifyBUttonActive: {
            backgroundColor: Colors?.KFC_red
        },
        VerifyBUttonText: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: normalize(16),
            color: Colors?.verifyText
        },
        VerifyBUttonTextActive: {
            color: Colors?.constantWhite
        },

    })
    return Styles
}