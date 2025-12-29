import { StyleSheet, Text, View, TextInput, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// mage picker 
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from "react-native-image-crop-picker";
// redux 
import { useSelector } from "react-redux";
import { addUserDetails, fetctUserDeatails, updateUser } from '../../features/userSlice';
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
    const Styles = createDynamicStyles(Colors);
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    const { countrySelected } = useCountry()
    const rawPhone = phoneNo;
    let formattedText: string
    if (countrySelected?.code === 'uae')
        formattedText = phoneNo?.replace(/(\d{3})(?=\d)/g, '$1 ');
    else if (countrySelected?.code === 'in')
        formattedText = phoneNo?.replace(/(\d{5})(?=\d)/g, '$1 ');
    else
        formattedText = phoneNo?.replace(/(\d{4})(?=\d)/g, '$1 ');
    phoneNo = formattedText
    // data fetch
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetctUserDeatails(rawPhone))
    }, [dispatch, rawPhone])
    const existingUser = useSelector((state: RootState) =>
        state.users.currentUser
    );
    const userdata = useSelector((state: RootState) => state?.users)
    const currentUser = userdata?.currentUser
    const [email, setEmail] = useState<string | undefined>(currentUser?.email ?? undefined)
    const [name, setName] = useState<string | undefined>(currentUser?.name ?? undefined)
    const [isTouchedEmail, setIsTouchedEmail] = useState<boolean>(false)
    const [isTouchedName, setIsTouchedName] = useState<boolean>(false)
    const [showWarningEmail, setShowWarningEmail] = useState<boolean>(false)
    const [showWarningName, setShowWarningName] = useState<boolean>(false)
    const [showTopEmail, setShowTopgEmail] = useState<boolean>(false)
    const [showTopName, setShowTopName] = useState<boolean>(false)
    const [goodToLogin, setGoodToLogin] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string | undefined>(currentUser?.avatar)
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [imageLoading, setImageLoading] = React.useState<boolean>(false);

    const handleCheckGmail = useCallback((): boolean | undefined => {
        return (email?.endsWith('.com') && email?.includes('@'))
    }, [email])
    const handleChangeEmail = (text: string): void => {
        setEmail(text)
        setIsTouchedEmail(true)
    }
    const handleChangeName = (text: string): void => {
        setName(text)
        setIsTouchedName(true)
    }
    const checkGoodToLogin = useCallback((): void => {
        if (name?.trim() !== '' && handleCheckGmail())
            setGoodToLogin(true)
        else
            setGoodToLogin(false)
    }, [handleCheckGmail, name])
    const handleSave = (): void => {
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
        navigation.navigate("Modal", {
            screen: Strings.CommonPopUpScreen,
            params: {
                header: Strings.UserDeatailUpdatedHeader,
                message: Strings.UserDeatailUpdatedMessage
            }
        })
        setTimeout(() => {
            navigation.pop()
            navigation.replace("App", { screen: Strings.HomeScreen });
        }, 20000);
    }
    const handleShowWarningEmail = useCallback((): void => {
        if (
            isTouchedEmail &&
            (email === '' || !handleCheckGmail())
        ) {
            setShowWarningEmail(true)
        } else {
            setShowWarningEmail(false)
        }
    }, [handleCheckGmail, isTouchedEmail, email])
    const handleShowWarningName = useCallback((): void => {
        if (isTouchedName && name === '') {
            setShowWarningName(true)
        } else {
            setShowWarningName(false)
        }
    }, [isTouchedName, name])
    const showTopEmailPlaceHolder = useCallback((): void => {
        if (isTouchedEmail && email !== '')
            setShowTopgEmail(true)
        else
            setShowTopgEmail(false)
    }, [isTouchedEmail, email])
    const showTopNamePlaceHolder = useCallback((): void => {
        if (isTouchedName && name !== '')
            setShowTopName(true)
        else
            setShowTopName(false)
    }, [isTouchedName, name])
    useEffect((): void => {
        checkGoodToLogin();
        handleShowWarningEmail();
        handleShowWarningName();
        showTopNamePlaceHolder();
        showTopEmailPlaceHolder();
    }, [checkGoodToLogin, handleShowWarningEmail, handleShowWarningName, showTopNamePlaceHolder, showTopEmailPlaceHolder])
    const openImagePicker = async (): Promise<void> => {
        try {
            if (Platform.OS === 'android') {
                const pickResult = await launchImageLibrary({
                    mediaType: 'photo',
                    selectionLimit: 1,
                    quality: 1,
                })
                if (pickResult?.didCancel) return
                const uri = pickResult?.assets?.at(0)?.uri;
                if (!uri) return;
                const cropResult = await ImagePicker.openCropper({
                    path: uri,
                    height: vh(300),
                    width: vw(300),
                    cropping: true,
                    multiple: false,
                    mediaType: 'photo',
                    freeStyleCropEnabled: true,
                    writeTempFile: true,
                    cropperToolbarTitle: 'Crop Image',
                })
                setImageLoading(true)
                const uploadedUrl = await uploadToImgBB({
                    path: cropResult?.path,
                    mime: cropResult?.mime,
                    filename: cropResult?.filename
                })
                setSelectedImage(uploadedUrl)
                setImageLoading(false)
                setTimeout(() => {
                    ImagePicker.cleanSingle(uri).catch(() => { });
                }, 100);
            } else {
                const cropResult = await ImagePicker.openPicker({
                    height: vh(300),
                    width: vw(300),
                    cropping: true,
                    multiple: false,
                    mediaType: 'photo',
                    freeStyleCropEnabled: true,
                    writeTempFile: true,
                    cropperToolbarTitle: 'Crop Image',
                })
                const uploadedUrl = await uploadToImgBB({
                    path: cropResult?.path,
                    mime: cropResult?.mime,
                    filename: cropResult?.filename
                })
                setSelectedImage(uploadedUrl)
            }
        } catch (e: unknown) {
            console.log('Error:', e);
        }
    }
    const onRefresh = React.useCallback((): void => {
        setRefreshing(true);
        dispatch(fetctUserDeatails(rawPhone))
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [dispatch, rawPhone]);
    return (
        <View style={Styles.parentBackground}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.rowCenter}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText} >{Strings.createProfileHeader}</Text>
                </View>
            </View>
            <KeyboardAwareScrollView
                style={Styles.body}
                extraScrollHeight={120}
                extraHeight={20}
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={true}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View  >
                        <View style={Styles.enterCreateProfileHeaderContainer}>
                            <Text style={Styles.enterCreateProfileHeader}>{Strings.enterYourDetails}</Text>
                        </View>
                        <View
                            style={[Styles.CreateProfileRelatedContainer]}
                        >
                            <View style={Styles.InputEntriesContainer}>
                                {userdata?.loading !== 'success' ? (
                                    <Text>{Strings.loading}</Text>
                                ) : (<>
                                    {imageLoading ? (
                                        <Text>{Strings.loading}</Text>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={openImagePicker}
                                            style={Styles.ImageContainer}>
                                            {selectedImage !== '' ? (
                                                <Image source={{ uri: selectedImage }} style={Styles.profileImage} />
                                            ) : (
                                                <Image source={Images.Camera} style={Styles.CameraImage} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </>
                                )}
                                {showTopName && (
                                    <Text style={Styles.placeHolderTopText}>{Strings.name.toUpperCase() + '*'} </Text>
                                )}
                                <View style={Styles.EmailAndWarning} >
                                    {userdata?.loading !== 'success' ? (
                                        <Text>{Strings.loading}</Text>
                                    ) : (
                                        <TextInput
                                            value={name}
                                            onChangeText={handleChangeName}
                                            placeholder={Strings.name + '*'}
                                            style={Styles.InputEntries} />
                                    )}
                                    {showWarningName && (
                                        <Image source={Images.Orange_Warning} style={[Styles.tickMark, Styles.warningMark]} />
                                    )}
                                </View>
                                <View style={[Styles.customBorder, showWarningName && Styles.OrangeBorder]} />
                                {showWarningName ? (
                                    <Text style={Styles.orangeMandatoryField}>{Strings.fieldIsMandatory} </Text>
                                ) : (
                                    <View style={Styles.BlankWarning} />
                                )}
                                <View style={Styles.WrapperPhoneNoContainer}>
                                    <Text style={Styles.mobileNumberPlaceholder}>{Strings.mobileNumber.toUpperCase() + '*'} </Text>
                                    <View style={Styles.PhoneNoContainer}>
                                        <View style={Styles.leftMobileContainer}>
                                            <View style={Styles.mobileCodeAndArrow}>
                                                <Text style={Styles.mobileCode}>{countrySelected?.mobileCode} </Text>
                                                <Image source={Images.Arrow_down} style={Styles.arrowDown} />
                                            </View>
                                            <View style={Styles.customBorder} />
                                        </View>
                                        <View style={Styles.RightMobileContainer}>
                                            <View style={Styles.mobileAndImage}>
                                                <Text style={Styles.mobileNo}>{phoneNo} </Text>
                                                <Image source={Images.Green_Tick} style={[Styles.tickMark, Styles.tickMark_Green]} />
                                            </View>
                                            <View style={Styles.customBorder} />
                                        </View>
                                    </View>
                                </View>
                                {showTopEmail && (
                                    <Text style={Styles.placeHolderTopText}>{Strings.email.toUpperCase() + '*'} </Text>
                                )}
                                <View style={Styles.EmailAndWarning} >
                                    {userdata?.loading !== 'success' ? (
                                        <Text>{Strings.loading}</Text>
                                    ) : (
                                        <TextInput
                                            value={email}
                                            onChangeText={handleChangeEmail}
                                            placeholder={Strings.email + '*'}
                                            style={Styles.InputEntries} />
                                    )}
                                    {showWarningEmail && (
                                        <Image source={Images.Orange_Warning} style={[Styles.tickMark, Styles.warningMark]} />
                                    )}
                                </View>
                                <View style={[Styles.customBorder, showWarningEmail && Styles.OrangeBorder]} />
                                {showWarningEmail ? (
                                    <Text style={Styles.orangeMandatoryField}>{Strings.fieldIsMandatory} </Text>
                                ) : (
                                    <View style={Styles.BlankWarning} />
                                )}
                            </View>
                            <View style={Styles.verifyButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={.5}
                                    onPress={handleSave}
                                    style={[Styles.VerifyBUtton, goodToLogin ? Styles.VerifyBUttonActive : null]}>
                                    <Text style={[Styles.VerifyBUttonText, goodToLogin ? Styles.VerifyBUttonTextActive : null]} >{Strings.save.toUpperCase()}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={.5}
                                    onPress={()=> navigation.replace('App')}
                                    style={[Styles.VerifyBUtton, goodToLogin ? Styles.VerifyBUttonActive : null]}>
                                    <Text style={[Styles.VerifyBUttonText, goodToLogin ? Styles.VerifyBUttonTextActive : null]} >{Strings.save.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        parentBackground: {
            flex: 1,
            backgroundColor: Colors.bodyColor,
        },
        body: {
            backgroundColor: Colors.bodyLighterColor,
            flex: 1,
        },
        NavWrapper: {
            width: '100%',
            paddingBottom: vh(15),
            backgroundColor: Colors.bodyColor,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: vw(10),
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(20),
            width: vw(20),
            marginRight: vw(18),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
        },
        sectionTitle: {
            fontSize: normalize(16),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
            marginTop: vh(10),
            marginLeft: vw(20),
        },
        enterCreateProfileHeaderContainer: {
            marginHorizontal: vw(20),
        },
        enterCreateProfileHeader: {
            fontSize: normalize(18),
            marginTop: vh(30),
            fontFamily: Fonts.font18,
            color: Colors.textBlack
        },
        CreateProfileRelatedContainer: {
            marginTop: vh(15),
            marginHorizontal: vw(15),
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            flexDirection: 'column',
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(5), height: vh(5) },
            shadowOpacity: .25,
            shadowRadius: normalize(10),
            elevation: normalize(5),
        },
        customBorder: {
            borderBottomWidth: normalize(1),
            borderBottomColor: Colors.fadeBorder,
            marginTop: vh(2),
        },
        OrangeBorder: {
            borderBottomColor: Colors.orangeColorText,
        },
        InputEntriesContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginHorizontal: vw(20),
            alignSelf: 'center',
            marginTop: vh(25),
        },
        InputEntries: {
            marginRight: vw(10),
            fontSize: normalize(16),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
            width: '100%'
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
            width: vw(80),
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
            fontFamily: Fonts.font17,
            color: Colors.textBlack
        },
        arrowDown: {
            height: vh(15),
            width: vw(15),
            marginTop: vh(2),
            marginRight: vw(4),
            tintColor: Colors.textBlack
        },
        RightMobileContainer: {
            width: vw(225),
            marginLeft: vw(10)
        },
        mobileNumberPlaceholder: {
            fontFamily: Fonts.font18,
            color: Colors.timerFadeText,
            fontSize: normalize(10),
            marginLeft: vw(105),
        },
        mobileNo: {
            fontSize: normalize(16),
            fontFamily: Fonts.font17,
            alignSelf: 'center',
            marginLeft: vw(5),
            color: Colors.textBlack
        },
        placeHolderTopText: {
            fontSize: normalize(11),
            fontFamily: Fonts.font18,
            color: Colors.timerFadeText,
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
            color: Colors.orangeColorText,
            marginLeft: vw(10),
            fontFamily: Fonts.font17,
            marginTop: vh(8)
        },
        mobileAndImage: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between'
        },
        ImageContainer: {
            height: vh(80),
            width: vw(80),
            borderRadius: normalize(100),
            backgroundColor: Colors.HyperTransparent,
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
            tintColor: Colors.timerText,
        },
        verifyButtonContainer: {
            marginHorizontal: vw(20),
            marginBottom: vh(40),
        },
        VerifyBUtton: {
            height: vh(40),
            paddingVertical: vh(10),
            paddingHorizontal: vw(30),
            marginTop: vh(30),
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

    })
    return Styles
}