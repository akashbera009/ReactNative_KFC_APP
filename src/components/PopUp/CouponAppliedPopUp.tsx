import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // animation
    const slideRef = useSharedValue<number>(0)
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: slideRef.value }],
    }))
    const fadeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            slideRef.value,
            [0, 500],
            [1, 0]
        )
    }))
    const slideDown = () => {
        slideRef.value = withTiming(450, { duration: 500 })
    }
    const closeModal = (): void => {
        slideDown();
        setTimeout(() => {
            navigation.pop()
        }, 400);
    };
    useEffect((): () => void | void => {
        const timer = setTimeout(() => {
            navigation.pop()
        }, 1500);
        return () => clearTimeout(timer);
    }, [navigation]);
    useEffect((): void => {
        slideRef.value = withTiming(0, { duration: 500 })
    }, [slideRef]);
    return (
        <Animated.View style={[Styles.backDrop, fadeStyle]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, animatedStyles]}>
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
            backgroundColor: Colors.bodyColor,flexDirection: 'row',
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
            fontFamily: Fonts.helveticaBold,
        },
        offerAvailderText: {
            fontSize: normalize(13),
            marginTop: vh(12),
            color: Colors.textFadeBlack2,
            fontFamily: Fonts.helveticaMedium,
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
            fontFamily: Fonts.helveticaBold,
            color: Colors.KFC_red
        },
        closeButton: {
            marginVertical: vh(8),
            marginHorizontal: 'auto',
            height: vh(40),
            width: vw(40),
            borderRadius: '50%',
            backgroundColor: Colors.Black,justifyContent: 'center',
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