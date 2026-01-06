import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// animation
import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
// utils
import Fonts from '../utils/Fonts';
import Images from '../utils/LocalImages';
import { useThemeColors } from '../utils/Colors';
import { vh, normalize } from '../utils/Dimensions'
import { useStrings } from '../utils/Strings';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import { runOnJS } from 'react-native-worklets';
export default function Toaster({ header, description, type }: ToasterPropType) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const HIDDEN_Y = vh(-200);
    const slideInRef = useSharedValue<number>(HIDDEN_Y)
    let bgColor: string
    switch (type) {
        case Strings.success:
            bgColor = Colors.greenOk
            break;
        case Strings.failed:
            bgColor = Colors.KFC_red
            break;
        default:
            bgColor = Colors.orangeColorText
            break;
    }
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: slideInRef.value },
            {
                scale: interpolate(
                    slideInRef.value,
                    [HIDDEN_Y, 0],
                    [.25, 1],
                    Extrapolation.CLAMP
                )
            },
        ],
        opacity: interpolate(
            slideInRef.value,
            [HIDDEN_Y, 0],
            [.25, 1],
            Extrapolation.CLAMP
        )
    }))
    const handelSlideUp = useCallback(() => {
        slideInRef.value = withTiming(HIDDEN_Y, { duration: 500, easing: Easing.elastic() })
    }, [slideInRef, HIDDEN_Y])
    useEffect(() => {
        slideInRef.value = withTiming(0, { duration: 500, easing: Easing.elastic() })
    }, [slideInRef])
    useEffect(() => {
        const timerId = setTimeout(() => {
            handelSlideUp()
        }, 5000);
        return () => clearTimeout(timerId)
    }, [handelSlideUp])
    const pan = Gesture.Pan()
        .activeOffsetY([-20, 20])
        .failOffsetX([-20, 20])
        .simultaneousWithExternalGesture()
        .onEnd((e) => {
            if (e.translationY < -40 && e.velocityY < -300) {
                slideInRef.value = withDelay(200,
                    withTiming(HIDDEN_Y, {
                        duration: 500,
                        easing: Easing.elastic(),
                    })
                )
            }
        })
    return (
        <View style={[Styles.ToasterOuterContainer, { top: inset.top }]}>
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[Styles.ToasterContainer, animatedStyle, { backgroundColor: bgColor }]}>
                    <Image source={Images.Tick_Mark} style={Styles.ToasterImage} />
                    <View style={Styles.DescriptionContainer}>
                        <Text style={Styles.toasterHeader}>{header} </Text>
                        <Text style={Styles.toasterDescription} numberOfLines={1}>{description} </Text>
                    </View>
                    <TouchableOpacity
                        style={Styles.CrossImageContainer}
                        onPress={handelSlideUp}
                    >
                        <Image source={Images.Cross_Icon} style={Styles.CrossImage} />
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        ToasterOuterContainer: {
            height: vh(60),
            width: '100%',
            position: 'absolute',
            left: 0,
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center',
        },
        ToasterContainer: {
            height: '100%',
            width: '90%',
            borderRadius: normalize(10),
            alignItems: 'center',
            flexDirection: 'row'
        },
        ToasterImage: {
            height: vh(30),
            width: vh(30),
            padding: normalize(4),
            tintColor: Colors.constantWhite,
            borderWidth: normalize(3),
            borderColor: Colors.constantWhite,
            borderRadius: normalize(30),
            margin: normalize(15)
        },
        DescriptionContainer: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        toasterHeader: {
            color: Colors.constantWhite,
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(16),
            marginVertical: vh(2)
        },
        toasterDescription: {
            color: Colors.constantWhite,
            fontFamily: Fonts.helveticaMedium,
            fontSize: normalize(13),
            maxWidth : '85%'
        },
        CrossImageContainer: {
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            justifyContent: 'center',
            padding: normalize(10),
        },
        CrossImage: {
            height: vh(12),
            width: vh(12),
            tintColor: Colors.constantWhite,
            margin: normalize(15)
        },
    });
    return Styles;
};