import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// animation 
import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedProps, withTiming, withRepeat, withSequence, withDelay } from 'react-native-reanimated';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';
import Svg, { Circle } from 'react-native-svg';
const { width } = Dimensions.get('window')
export default function ReAnimated() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // animation 
    const aniWidth = useSharedValue(100)
    const handelIncrease = () => {
        aniWidth.value = withSpring((aniWidth.value + 50) % width)
    }
    //2nd 
    const translateAnimate = useSharedValue(0)
    const handleSlide = () => {
        translateAnimate.value += 20
    }
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateAnimate.value * 4) },
            { rotate: withSpring(`${translateAnimate.value * 2}deg`) },
        ],
    }))
    // 3rd 
    const AnimatedCircle = Animated.createAnimatedComponent(Circle)
    const r = useSharedValue<number>(20)
    const handleRadius = () => {
        r.value = r.value + 10
    }
    const animatedProps = useAnimatedProps(() => ({
        r: withSpring(r.value)
    }))

    // second secton 4th 
    const offset = useSharedValue<number>(0)
    const transltaeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }]
    }))
    const OFFSET = 40;
    const TIME = 250;
    const DELAY = 400;
    const handleShake = () => {
        // offset.value = withRepeat(withTiming(OFFSET) ,0  , true)
        offset.value = withDelay(
            DELAY,
            withSequence(
                withTiming(-OFFSET, { duration: TIME / 2 }),
                withRepeat(withTiming(OFFSET, { duration: TIME / 3 }), 5, true),
                withTiming(0, { duration: TIME / 2 })
            )
        )
    }
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.ReAnimatedScreen}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                <ScrollView>

                    <Animated.View style={[Styles.firstBox, { width: aniWidth }]} />
                    <TouchableOpacity
                        onPress={handelIncrease}
                        style={{ alignSelf: 'center' }}>
                        <Text style={Styles.buttonContainerText}>increase width </Text>
                    </TouchableOpacity>

                    <Animated.View style={[Styles.SecondBox, animatedStyles]} />
                    <TouchableOpacity
                        onPress={handleSlide}
                        style={{ alignSelf: 'center' }}>
                        <Text style={Styles.buttonContainerText}>slide & rotate  </Text>
                    </TouchableOpacity>

                    <View style={Styles.svgCOntainer}>
                        <Svg>
                            {/* <AnimatedCircle cx="50" cy="50" r={r.value} fill='blue' /> */}
                            <AnimatedCircle
                                cx="50"
                                cy="50"
                                fill='blue'
                                animatedProps={animatedProps}
                            />
                        </Svg>
                        <TouchableOpacity onPress={handleRadius}>
                            <Text style={Styles.buttonContainerText}>increase radius  </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.SecondSection}>
                        <Text style={Styles.secitonTitle}  >second secttion(timing , delay , sequence repeat )</Text>
                        <Animated.View style={[Styles.ThirdBox, transltaeStyle]} />
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={handleShake}>
                            <Text style={Styles.buttonContainerText}>shake</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.ThirdSection}>
                        <TouchableOpacity onPress={() => navigation.navigate(Strings.GestureScreen)}>
                            <Text style={Styles.buttonContainerText}> goto gesture hangles </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        parent: {
            height: '100%',
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: vh(15),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.font18,
            color: Colors.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
            marginHorizontal: vw(18),
        },
        body: {
            flex: 1,
        },
        buttonContainerText: {
            fontSize: normalize(16),
            backgroundColor: Colors.KFC_red,
            marginHorizontal: vw(10),
            marginVertical: vh(6),
            paddingHorizontal: vw(10),
            paddingVertical: vh(6),
            color: Colors.constantWhite,
            borderRadius: normalize(10),
            fontFamily : Fonts.font18
        },
        firstBox: {
            backgroundColor: Colors.ButtonBlueColor,
            height: vh(100),
            alignSelf: 'center'
        },
        SecondBox: {
            backgroundColor: Colors.greenOk,
            height: vh(100),
            width: vw(100)
        },
        svgCOntainer: {
            width: '100%',
            height: vh(100),
            backgroundColor: '#f5d7d7ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        SecondSection: {
            width: '100%',
            backgroundColor: '#e6e4e4ff',
            marginTop: vh(10)
        },
        secitonTitle: {
            fontSize: normalize(16),
            alignSelf: 'center',
            marginVertical: vh(10)
        },
        ThirdBox: {
            height: vh(80),
            width: vw(80),
            backgroundColor: '#ff5d47ff',
            alignSelf: "center"
        },
        ThirdSection: {
            backgroundColor: '#fdf8d6ff',
        }
    });
    return Styles;
};