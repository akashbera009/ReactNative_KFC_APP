import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, Platform, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// crop and picker 
import { launchImageLibrary } from 'react-native-image-picker'
import ImagePicker, { openCropper } from "react-native-image-crop-picker";
import { createThumbnail } from "react-native-create-thumbnail";
import { DocumentPickerResponse, keepLocalCopy, pick, types } from '@react-native-documents/picker'
import Pdf from 'react-native-pdf'
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
    const [videoUri, setVideoUri] = useState<string | undefined>('');
    const [viewOnlyModal, setViewOnlyModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse>();
    const [selectedLocalFile, setSelectedLocalFile] = useState({uri: ''});
    const [pdfViewer,setPdfViewer] = useState(false);

    const pickImage = async () => {
        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 1,
        })
            .then((pickerResult) => {
                if (pickerResult.didCancel) return;
                console.log(pickerResult);

                const uri = pickerResult.assets?.[0]?.uri;
                console.log('uri', uri);

                if (!uri) return;
                console.log('coming to this line ');
                return ImagePicker.openCropper({
                    path: uri,
                    width: 300,
                    height: 300,
                    cropping: true,
                    mediaType: 'photo',
                    freeStyleCropEnabled: true,
                    multiple: false,
                    writeTempFile: false,
                    cropperToolbarTitle: 'hii '
                });
            })
            .then((croppedImage) => {
                if (!croppedImage) return;

                console.log('Final image:', croppedImage);
                setImageUri(croppedImage?.path)

            })
            .catch((err) => {
                console.log('Error:', err);
            });
    };
    const pickVideo = async () => {
        try {
            const res = await launchImageLibrary({
                mediaType: 'video',
                selectionLimit: 1,
                quality: 1,
                videoQuality: 'high',
            })
            console.log(res);
            if (!res || !res.assets || !res.assets.length) return;
            const videoUriLocal = res.assets[0]?.uri;
            setVideoUri(res?.assets[0]?.uri)

            if (!videoUriLocal) return

            const thumbnailData = await createThumbnail({
                url: videoUriLocal,
                timeStamp: 1000,
                format: 'png'
            })
            console.log(thumbnailData);
        } catch (e) {
            console.log('error', e);
        }
    };

    const pickDocument = async () => {
        try {
            const [result] = await pick({
                mode: 'open',
                type: [types.pdf],
                allowMultiSelection: false
            })
            console.log('document after picking ', result)
            setSelectedFile(result)
            // keep a local copy 
            if (!selectedFile?.uri) return
            const [copyResult] = await keepLocalCopy({
                files: [
                    {
                        uri: selectedFile?.uri,
                        fileName: selectedFile?.name ?? 'unknown name '
                    }
                ],
                destination: 'documentDirectory',
            })
            if (copyResult?.status === 'success') {
                console.log('local url is ', copyResult.localUri)
                setSelectedLocalFile({uri : copyResult?.localUri})
            }else{
                console.log('local copying is failed ')
            }
        }
        catch (e) {
            console.log(e);
        }
    }

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

                <TouchableOpacity style={Styles.field} onPress={pickDocument}>
                    {videoUri ? (
                        <>
                        </>
                    ) : (
                        <Text style={Styles.placeholder}>{Strings?.taptoPick}{Strings?.document}</Text>
                    )}
                </TouchableOpacity>
                {selectedFile && (
                    <View>
                        <Text numberOfLines={1}>{selectedFile.name}</Text>
                        <Text numberOfLines={1}>{selectedFile.uri}</Text>
                        <TouchableOpacity
                            onPress={() => setPdfViewer(true)}
                        >
                            <Text> preview</Text>
                        </TouchableOpacity>
                        {pdfViewer && (
                                <Pdf 
                                    source={selectedLocalFile}
                                    style={{ flex: 1 }}
                                />
                        )}
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleSave}
                    style={Styles.saveBtn}>
                    <Text style={Styles.saveText}>{Strings?.save}</Text>
                </TouchableOpacity>
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
            height: vh(20),
            width: vw(20),
            tintColor: Colors?.constantWhite
        },
        closeIcon1: {
            height: vh(20),
            width: vw(20),
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