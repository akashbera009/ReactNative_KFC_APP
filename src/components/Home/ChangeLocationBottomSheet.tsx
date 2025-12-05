import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import { useStrings } from '../../utils/Strings';
import Images from '../../utils/LocalImages';
import{DeliveryDetails}from '../../data/DeliveryDetails';
export default function ChangeLocationBottomSheet() {
    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors, Fonts)
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const slideUp = () => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fade, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const slideDown = () => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 450,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fade, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const closeModal = () => {
        slideDown();
        setTimeout(() => {
            navigation.pop();
        }, 400);
    };

    useEffect(() => {
        slideUp();
    }, []);
    return (
        <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={Styles.OuterContainer}>
                    <View style={Styles.InnerContainer}>
                        <View style={Styles.bottomSheeetContentContainer}>
                            <Image source={Images?.Mao_Location} style={Styles.mapImage} />
                            <Image source={Images?.Cloud} style={Styles.Cloud1} />
                            <Image source={Images?.Cloud2} style={Styles.Cloud2} />
                            <Text style={Styles.ConfirmHeader}>{Strings?.consfirmLocation}</Text>
                            <Text style={Styles.countryDescription} >{Strings?.consfirmLocationDescription}</Text>
                            <View style={Styles.LocationContainer}>
                                <Image source={Images.Location} style={Styles.locationIcon} />
                                <Text style={Styles.Address} numberOfLines={1}>{DeliveryDetails?.address} </Text>
                            </View>
                            <View style={[Styles.DoneButtonContainer, { bottom: inset.bottom }]}>
                                <TouchableOpacity
                                    style={[Styles.Button, Styles.ChangeButton]}
                                    onPress={() => navigation.navigate(Strings?.MapsScreen)}>
                                    <Text style={[Styles.DoneButtonText, Styles.ChangeButtonText]}>{Strings?.change.toLocaleUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[Styles.Button]}
                                    onPress={() => navigation.pop()}>
                                    <Text style={Styles.DoneButtonText}>{Strings?.confirm.toLocaleUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>

        </Animated.View >
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        backDrop: {
            backgroundColor: Colors.SemiTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: 450,
        },
        OuterContainer: {

        },
        InnerContainer: {
            height: '100%',
            backgroundColor: Colors.bodyColor,
            borderTopRightRadius: 45,
            borderTopLeftRadius: 45,
            position: 'relative',
        },

        closeButton: {
            marginVertical: 8,
            marginHorizontal: 'auto',
            height: 40,
            width: 40,
            borderRadius: '50%',
            backgroundColor: Colors.textBlack,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomSheeetContentContainer: {
            height: '100%',
        },
        mapImage: {
            height: 100,
            width: 100,
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 20
        },
        Cloud1: {
            position: 'absolute',
            top: '8%',
            right: '20%',
            height: 30,
            width: 30,
            tintColor: Colors?.CloudBorder
        },
        Cloud2: {
            position: 'absolute',
            top: '15%',
            left: '20%',
            height: 40,
            width: 40,
            tintColor: Colors?.CloudBorder,
        },
        ConfirmHeader: {
            fontSize: 22,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            alignSelf: 'center',
            letterSpacing: 1,
        },
        countryDescription: {
            width: "90%",
            alignSelf: 'center',
            fontFamily: Fonts?.font17,
            fontSize: 18,
            fontWeight: 400,
            textAlign: 'center',
            color: Colors?.blueShadows,
            marginTop: 15
        },
        countryDescription2: {
            width: "90%",
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 400,
            textAlign: 'center',
            color: Colors?.textFadeBlack,
            marginTop: 15
        },
        LocationContainer: {
            width: '90%',
            alignSelf: 'center',
            height: 50,
            marginVertical: 30,
            borderRadius: 2,
            backgroundColor: Colors?.blueLightBG,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        locationIcon: {
            height: 22,
            width: 22,
            margin: 10,
            marginLeft: 20
        },
        Address: {
            width: '80%',
            fontSize: 14,
            fontFamily: Fonts?.subHeader,
            color: Colors?.timerFadeText,
            fontWeight: 700
        },
        DoneButtonContainer: {
            position: 'absolute',
            left: '5%',
            width: '90%',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

        },
        Button: {
            backgroundColor: Colors?.KFC_red,
            borderRadius: 4,
            paddingVertical: 10,
        },
        ChangeButton: {
            backgroundColor: Colors?.bodyColor,
            borderWidth: 1,
            borderColor: Colors?.fadeWhiteText2
        },
        ChangeButtonText: {
            color: Colors?.textBlack,
        },
        DoneButtonText: {
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.constantWhite,
            marginHorizontal: 50,
            marginVertical: 5
        }
    })
    return Styles
}