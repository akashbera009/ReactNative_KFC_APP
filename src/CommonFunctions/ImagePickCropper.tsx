import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, Platform, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// crop and picker 
import { launchImageLibrary } from 'react-native-image-picker'
import { CropView } from 'react-native-image-crop-tools';
// utils
import Fonts from '../utils/Fonts';
import Images from '../utils/LocalImages';
import { useStrings } from '../utils/Strings';
import { useThemeColors } from '../utils/Colors';
import { normalize, vh, vw } from '../utils/Dimensions';
import VideoPlayerComponent from '../components/Home/VideoPlayer';

export default function ImagePickCropper() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [imageUri, setImageUri] = useState<string>('');
    const cropViewRef = useRef<CropView>(null);
    const [videoUri, setVideoUri] = useState<string | undefined>('');
    const [cropModalVisible, setCropModalVisible] = useState(false);
    const [viewOnlyModal, setViewOnlyModal] = useState(false)
    const pickImage = async () => {
        const res = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 1,
        })
        console.log(res)
        if (!res || !res.assets || !res.assets.length) return;
        if (res.assets[0]?.uri)
            setImageUri(res.assets[0]?.uri)
        setCropModalVisible(true)
    };

    const onCropDone = (result: Partial<CropResult>) => {
        console.log(result);
        
        setCropModalVisible(false);
        if (result?.uri) {
            if (Platform.OS == 'ios') {
                setImageUri(result?.uri);
            } else {
                setImageUri(`file://${result?.uri}`)
            }
        }
    };

    const cropImage = () => {
        cropViewRef.current?.saveImage(true, 90);
    };

    const pickVideo = async () => {
        const res = await launchImageLibrary({
            mediaType: 'video',
            selectionLimit: 1,
            quality: 1,
            videoQuality: 'high',
        })
        console.log(res);
        if (!res || !res.assets || !res.assets.length) return;
        setVideoUri(res?.assets[0]?.uri)
    };
    const handleSave = async () => {

    }
    return (
        <View style={Styles?.Parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings?.userInfoHeader}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                {cropModalVisible ? (
                    <Modal
                        visible={cropModalVisible}
                        animationType="slide" >
                        <View style={Styles.cropModalContainer}>
                            <CropView
                                ref={cropViewRef}
                                sourceUrl={imageUri}
                                style={{ flex: 1 }}
                                onImageCrop={onCropDone}
                            />
                            <TouchableOpacity
                                style={[Styles.closeIconButton, { top: inset.top }]}
                                onPress={() => {
                                    // setImageUri('')
                                    setImageUri(imageUri)
                                    setCropModalVisible(false)
                                }}
                            >
                                <Image source={Images?.Cross_Icon} style={Styles.closeIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={cropImage}
                                style={{
                                    position: 'absolute',
                                    bottom: 40,
                                    right: 20,
                                    backgroundColor: 'green',
                                    padding: 15,
                                    borderRadius: 40
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 20 }}>✓</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                ) : (
                    <>
                        {imageUri == '' ? (
                            <TouchableOpacity style={Styles.field} onPress={pickImage}>
                                <Text style={Styles.placeholder}>{Strings?.taptoPick}{Strings?.image}</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setViewOnlyModal(true)}
                                style={Styles.fieldFilled} >
                                <Image source={{ uri: imageUri }} style={Styles.previewImage} />
                                <TouchableOpacity
                                    style={Styles?.editButtonContainer}
                                    onPress={pickImage}>
                                    <Image source={Images?.Edit_Icon} style={Styles.editButton} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={Styles.field} onPress={pickVideo}>
                            {videoUri ? (
                                <VideoPlayerComponent uri={videoUri} />
                            ) : (
                                <Text style={Styles.placeholder}>{Strings?.taptoPick}{Strings?.video}</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={Styles.saveBtn}>
                            <Text style={Styles.saveText}>{Strings?.save}</Text>
                        </TouchableOpacity>
                    </>)}
            </View >
            {viewOnlyModal && (
                <Modal
                    animationType="slide"
                    visible={viewOnlyModal}
                >
                    <View style={Styles.viewOnlyModalContainer}>
                        <TouchableOpacity
                            style={[Styles.closeIconButton, { top: inset.top }]}
                            onPress={() => {
                                setViewOnlyModal(false)
                            }}
                        >
                            <Image source={Images?.Cross_Icon} style={Styles.closeIcon1} />
                        </TouchableOpacity>
                        <Image source={{ uri: imageUri }} style={Styles.viewOnlyModalImage} />
                    </View>
                </Modal>
            )}
        </View >
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        demoImage: {
            height: 100,
            width: 300,
        },
        Parent: {
            flex: 1,
            backgroundColor: Colors?.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: vh(15),
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors?.textBlack,
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
            marginHorizontal: vw(18),
        },
        body: {
            backgroundColor: Colors?.bodyLigheterColor,
            paddingHorizontal: vw(15),
            flex: 1,
        },
        cropModalContainer: {
            flex: 1,
            backgroundColor: Colors?.constantBlack
        },
        closeIconButton: {
            position: 'absolute',
            left: vw(20),
        },
        closeIcon: {
            height: 20,
            width: 20,
            tintColor: Colors?.constantWhite
        },
        closeIcon1: {
            height: 20,
            width: 20,
            tintColor: Colors?.textBlack
        },
        field: {
            height: vh(160),
            borderWidth: normalize(1),
            borderColor: Colors?.blueShadows,
            borderRadius: normalize(14),
            backgroundColor: Colors?.blueLightBG,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: vh(20)
        },
        fieldFilled: {
            height: vh(260),
            borderWidth: normalize(1),
            borderColor: Colors?.blueShadows,
            borderRadius: normalize(14),
            backgroundColor: Colors?.blueLightBG,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: vh(20)
        },
        editButtonContainer: {
            width: '100%',
            height: vh(50),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 100,
            borderBottomLeftRadius: normalize(14),
            borderBottomRightRadius: normalize(14),
            backgroundColor: Colors?.SemiTransparent,
        },
        editButton: {
            height: vh(25),
            width: vw(25),
            tintColor: Colors?.constantWhite
        },
        placeholder: {
            fontSize: normalize(15),
            fontFamily: Fonts.Medium,
        },
        previewImage: {
            width: '100%',
            height: '100%',
            borderRadius: normalize(14),
            resizeMode: 'cover'
        },
        videoPreviewBox: {
            width: '80%',
            height: vh(70),
            borderRadius: normalize(12),
            backgroundColor: Colors?.fadeVerify,
            justifyContent: 'center',
            alignItems: 'center'
        },
        videoLabel: {
            fontSize: normalize(16),
            fontFamily: Fonts.Medium,
        },
        saveBtn: {
            marginTop: vh(35),
            backgroundColor: Colors.KFC_red,
            paddingVertical: vh(14),
            borderRadius: normalize(14),
            alignItems: 'center'
        },
        saveText: {
            color: Colors?.constantWhite,
            fontFamily: Fonts.Bold,
            fontSize: normalize(16)
        },
        viewOnlyModalContainer: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        viewOnlyModalImage: {
            height: '80%',
            width: '100%'
        }
    });
    return Styles;
};