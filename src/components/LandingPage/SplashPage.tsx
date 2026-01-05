import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    SlideInUp,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
//util files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useStrings } from '../../utils/Strings'
import { useThemeColors } from '../../utils/Colors'
import { normalize, vh, vw } from '../../utils/Dimensions'
export default function SplashPage() {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const inset = useSafeAreaInsets()
    const Styles = createDynamicStyles(Colors)
    // animation  
    const translateY = useSharedValue<number>(vh(100));
    const textAnimation = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            {
                scale: interpolate(
                    translateY.value,
                    [100, 0],
                    [0.23, 1],
                )
            }
        ],
        opacity: interpolate(
            translateY.value,
            [100, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
    }))
    const imageTranslateY = useSharedValue<number>(vh(-500))
    const imageStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: imageTranslateY.value },
            {
                scale: interpolate(
                    imageTranslateY.value,
                    [-100, 0],
                    [0.5, 1],
                    Extrapolation.CLAMP
                )
            }
        ],
    }))
    useEffect(() => {
        imageTranslateY.value = withTiming(0, { duration: 1500, easing: Easing.elastic(3) } , ()=>{
            translateY.value = withTiming(0, { duration: 1000, easing: Easing.bounce })
        })
    }, [imageTranslateY , translateY])

    return (
        <View style={Styles.HomeScreen}>
            <View style={Styles.backGroundContainer}>
                <View style={Styles.ThreeColumnStyle}>
                    {new Array(3).fill(0).map((_, idx) => (
                        <Animated.View
                            key={idx}
                            style={Styles.singleCOlumnStyle}
                            entering={SlideInUp.delay(idx * 200).duration(500)}
                        />
                    ))}
                </View>
                <View style={[Styles.LowerContainer, { marginBottom: inset.bottom + vh(80) }]}>
                    <Animated.Text numberOfLines={2} style={[Styles.mainText, textAnimation]}>
                        "{Strings.lickingGood}"
                    </Animated.Text>
                </View>
            </View>
            <Animated.View style={[Styles.logoImageContainer,imageStyle]}>
                <Image source={Images.KFC_logo_image} style={Styles.LogoImage} />
            </Animated.View>
        </View>
    )
}
const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        HomeScreen: {
            width: '100%',
            height: '100%',
            backgroundColor: Colors.KFC_red
        },
        backGroundContainer: {
            width: '100%',
            height: '100%', flexDirection: 'column',
            justifyContent: 'space-between',
        },
        ThreeColumnStyle: {
            marginHorizontal: "auto",
            width: '50%',
            height: vh(180), flexDirection: 'row',
            justifyContent: 'space-around',
        },
        singleCOlumnStyle: {
            height: vh(120),
            width: vw(40),
            backgroundColor: Colors.constantWhite
        },
        LowerContainer: {
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transform: [{ rotate: '-8deg' }],
        },
        logoImageContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%', justifyContent: 'center',
            alignItems: 'center',
        },
        LogoImage: {
            height: vh(220),
            width: (220),
            marginHorizontal: 'auto',
        },
        mainText: {
            fontFamily: Fonts.firstPageCUrsuve,
            color: Colors.constantWhite,
            fontSize: normalize(65),
            maxWidth: '90%',
            marginHorizontal: 'auto',
            textAlign: 'center'
        }
    })
    return Styles
}