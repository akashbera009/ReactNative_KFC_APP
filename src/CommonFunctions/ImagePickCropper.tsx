import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ScrollView, } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// crop and picker 
import { launchImageLibrary } from 'react-native-image-picker'
import ImagePicker from "react-native-image-crop-picker";
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
    const [selectedLocalFile, setSelectedLocalFile] = useState({ uri: '' });
    const [pdfViewer, setPdfViewer] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [videoThumbnail, setVideoThumbnail] = useState('');
    const pickImage = async () => {
        try {
            const pickerResult = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
                quality: 1,
            });
            if (pickerResult.didCancel) return;
            const uri = pickerResult.assets?.[0]?.uri;
            if (!uri) return;
            const croppedImage = await ImagePicker.openCropper({
                path: uri,
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                freeStyleCropEnabled: true,
                multiple: false,
                writeTempFile: true,
                cropperToolbarTitle: 'Crop Image',
            });
            console.log('Final image:', croppedImage);
            setImageUri(croppedImage?.path);
            setTimeout(() => {
                ImagePicker.cleanSingle(uri).catch(() => { });
            }, 100);
        } catch (err) {
            console.log('Error:', err);
        }
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
            setVideoThumbnail(thumbnailData?.path)
        } catch (e) {
            console.log('error', e);
        }
    };

    const pickDocument = async () => {
        try {
            const [result] = await pick({
                mode: 'open',
                type: [types.pdf],
                allowMultiSelection: false,
            });
            setSelectedFile(result);
            if (!result?.uri) return;
            const [copyResult] = await keepLocalCopy({
                files: [
                    {
                        uri: result.uri,
                        fileName: result.name ?? 'unknown.pdf',
                    },
                ],
                destination: 'documentDirectory',
            });
            if (copyResult.status === 'success') {
                setSelectedLocalFile({ uri: copyResult.localUri });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleSave = async () => {

    }
    return (
        <View style={[Styles?.Parent, { marginBottom: inset.bottom }]}>
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {/* image section  */}
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

                    {/* video section  */}
                    {videoUri == '' ? (
                        <TouchableOpacity style={Styles.field} onPress={pickVideo}>
                            <Text style={Styles.placeholder}>{Strings?.taptoPick}{Strings?.video}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setVideoModal(true)}
                            style={Styles.fieldFilled} >
                            <Image source={{ uri: videoThumbnail }} style={Styles.VideoThumbnail} />
                            <TouchableOpacity
                                style={Styles?.editButtonContainer}
                                onPress={pickVideo}>
                                <Image source={Images?.Edit_Icon} style={Styles.editButton} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}

                    {/* pdf section */}
                    {selectedFile ? (
                        <View
                            style={Styles.field}>
                            <TouchableOpacity
                                onPress={() => {
                                    setPdfViewer(true)
                                }}
                                style={Styles.pdfPreviewer}>
                                <Pdf
                                    source={{ uri: selectedLocalFile.uri }}
                                    onError={(error) => console.log(error)}
                                    scale={4}
                                    style={Styles.previewedPdf}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={Styles?.editButtonContainer}
                                onPress={pickDocument}>
                                <Image source={Images?.Edit_Icon} style={Styles.editButton} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={Styles.field} onPress={pickDocument}>
                            <Text style={Styles.placeholder}>{Strings?.taptoPick}{Strings?.document}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={handleSave}
                        style={Styles.saveBtn}>
                        <Text style={Styles.saveText}>{Strings?.save}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
            {/* image modal */}
            {viewOnlyModal && (
                <Modal
                    animationType="slide"
                    visible={viewOnlyModal}
                >
                    <View style={Styles.viewOnlyModalContainer}>
                        <TouchableOpacity
                            style={[Styles.closeIconButtonImage, { top: inset.top }]}
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

            {/* video modal  */}
            {videoModal && (
                <Modal
                    animationType="slide"
                    visible={videoModal}
                >
                    <View style={Styles.videoModalContainer}>
                        <TouchableOpacity
                            style={[Styles.closeIconButton, { top: inset.top }]}
                            onPress={() => {
                                setVideoModal(false)
                            }}
                        >
                            <Image source={Images?.Cross_Icon} style={Styles.closeIcon1} />
                        </TouchableOpacity>
                        <View style={Styles.videoPreviewContainer}>
                            <VideoPlayerComponent uri={videoUri} />
                        </View>
                    </View>
                </Modal>
            )}
            {/* pdf modal  */}
            {pdfViewer && selectedLocalFile.uri !== '' && (
                <Modal animationType="slide" visible={pdfViewer}>
                    <View style={Styles.pdfModalContainer}>
                        <View style={Styles.headerCOntainer}>
                            <TouchableOpacity
                                style={[
                                    Styles.closeIconButtonPDF, { top: inset.top }
                                ]}
                                onPress={() => setPdfViewer(false)}
                            >
                                <Image
                                    source={Images.Cross_Icon}
                                    style={Styles.crossIconPDF}
                                />
                            </TouchableOpacity>
                            <Text style={[Styles.pdfheaderText,]} numberOfLines={1}>{selectedFile?.name}  </Text>
                        </View>
                        <Pdf
                            source={{ uri: selectedLocalFile.uri ?? selectedFile?.uri }}
                            onError={(error) => console.log(error)}
                            style={Styles.pdf}
                        />
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
            zIndex: 999
        },
        closeIconButtonImage: {
            // position: 'absolute',
            left: vw(20),
            zIndex: 999
        },
        closeIcon: {
            height: vh(20),
            width: vw(20),
            tintColor: Colors?.constantWhite
        },
        closeIcon1: {
            height: vh(18),
            width: vw(18),
            tintColor: Colors?.textBlack,
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
        VideoThumbnail: {
            width: '100%',
            height: '100%',
            borderRadius: normalize(10)
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
        videoPreviewContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
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
            height: vh(50),
            width: '100%',
            backgroundColor: Colors?.bodyColor,
        },
        videoModalContainer: {
            flex: 1,
            display: 'flex',
        },
        viewOnlyModalImage: {
            marginTop: vh(50),
            height: '80%',
            width: '100%'
        },
        pdfModalContainer: {
            flex: 1,
        },
        headerCOntainer: {
            height: vh(25),
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        pdf: {
            marginTop: vh(20),
            flex: 1
        },
        closeIconButton2: {
            position: 'absolute',
            left: vw(20),
        },
        closeIconButtonPDF: {
            position: 'absolute',
            left: vw(20),
        },
        pdfheaderText: {
            marginLeft: vw(30),
            width: '80%',
            top: vh(25),
            fontSize: normalize(18),
        },
        crossIconPDF: {
            height: vh(18),
            width: vw(18),
            tintColor: Colors?.textBlack,
            zIndex: 999,
        },
        pdfPreviewer: {
            marginTop: vh(-50),
            height: vh(100),
            paddingHorizontal: vw(5),
            width: '100%',
        },
        previewedPdf: {
            height: '100%',
            width: '100%',
            backgroundColor: 'transparent',
            borderRadius: normalize(10),
        },

    });
    return Styles;
};