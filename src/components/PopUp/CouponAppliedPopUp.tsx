import { StyleSheet, Text, View, Animated, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useRef, useEffect, useCallback } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// utils files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useStrings } from '../../utils/Strings';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function CouponAppliedPopUp() {
    const Colors = useThemeColors()
    const Styles = createDynamicStyles(Colors)
    const Strings = useStrings()
    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    const slideUp = useCallback((): void => {
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
    }, [slide , fade])
    const slideDown = (): void => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 500,
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
    const closeModal = (): void => {
        slideDown();
        setTimeout(() => {
            navigation.pop();
        }, 400);
    };
    useEffect((): ()=> void | void => {
        const timer = setTimeout(() => {
            navigation.pop();
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigation]);

    useEffect((): void => {
        slideUp();
    }, [slideUp]);
    return (
        <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={Styles.OuterContainer}>
                    <View style={Styles.InnerContainer}>
                        <View style={Styles.CoupoonAppliedContainer}>
                            <View >
                                <View style={Styles.verticalStrap} />
                                <Image source={Images.Bow_Tie} style={Styles.bow_Tie} />
                            </View>
                            <View style={Styles.RightContainer}>
                                <Text style={Styles.offerApplied}>{Strings.offerApplied.toUpperCase()} </Text>
                                <Text style={Styles.offerAvailderText}>{Strings.offerAvailText} </Text>
                            </View>
                            <TouchableOpacity
                                style={Styles.gotItButton}
                                onPress={() => navigation.pop()}
                            >
                                <Text style={Styles.gotItText}>{Strings.gotIt.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    )
}
const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        backDrop: {
            backgroundColor: Colors.HyperTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: vh(180),
        },
        OuterContainer: {
        },
        InnerContainer: {
            height: vh(200),
            width: "100%",
            position: 'relative',

        },
        CoupoonAppliedContainer: {
            height: vh(100),
            width: '93%',
            alignSelf: 'center',
            borderRadius: normalize(2),
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        verticalStrap: {
            height: '100%',
            width: vw(6),
            backgroundColor: Colors.activeBorder,
            marginLeft: vw(40)
        },
        bow_Tie: {
            height: vh(45),
            width: vw(45),
            position: 'absolute',
            left: vw(21),
            top: '30%'
        },
        RightContainer: {
            backgroundColor: '#0000',
            height: '100%',
            width: '55%',
            marginLeft: vw(35),
        },
        offerApplied: {
            marginLeft: vw(5),
            marginTop: vh(18),
            fontSize: normalize(15),
            color: Colors.textBlack,
            fontFamily: Fonts.font18,
        },
        offerAvailderText: {
            fontSize: normalize(13),
            marginTop: vh(12),
            color: Colors.textFadeBlack2,
            fontFamily: Fonts.font17,
            lineHeight: normalize(16),
        },
        gotItButton: {
            position: 'absolute',
            right: vw(20),
            top: '40%',
            borderWidth: normalize(1),
            borderColor: Colors.fadeBorder,
            borderRadius: normalize(2),
        },
        gotItText: {
            marginHorizontal: vw(15),
            marginVertical: vh(5),
            fontSize: normalize(11),
            fontFamily: Fonts.font18,
            color: Colors.KFC_red
        },
        closeButton: {
            marginVertical: vh(8),
            marginHorizontal: 'auto',
            height: vh(40),
            width: vw(40),
            borderRadius: '50%',
            backgroundColor: Colors.Black,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        closeBtnImage: {
            height: vh(20),
            width: vw(20),
            padding: normalize(5)
        },
    })
    return Styles
}