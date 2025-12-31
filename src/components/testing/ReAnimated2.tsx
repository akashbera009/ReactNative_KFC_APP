import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//animaiton 
import Animated, {
    Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat, cancelAnimation,
    FadeInUp, FadeInDown, BounceOut, BounceOutRight, FlipInEasyX, FlipInEasyY, FlipInYRight, FlipOutYLeft,
    FlipOutEasyX, LightSpeedInLeft, LightSpeedOutRight, ZoomInUp, ZoomIn, ZoomInDown, ZoomOutDown, ZoomOutRight,
    LinearTransition,
    JumpingTransition,
    FadeIn,
    Keyframe,
    SequencedTransition,
} from 'react-native-reanimated';

// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';
import LinearGradient from 'react-native-linear-gradient';

export default function ReAnimated2() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // card fading entering 
    type Card = {
        id: number;
        label: string;
    };

    const initialCards: Card[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        label: `Card ${i + 1}`,
    }));

    const [cards, setCards] = useState<Card[]>(initialCards);
    // animated shimmer 
    const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)
    const shimmerTranslateref = useSharedValue(-200)
    const shimmerWidth = vw(400);
    useEffect(() => {
        shimmerTranslateref.value = withRepeat(
            withTiming(
                shimmerWidth,
                {
                    duration: 800,
                    easing: Easing.sin,
                }
            ),
            -1,
        )
        return () => {
            cancelAnimation(shimmerTranslateref)
        }
    }, [shimmerTranslateref, shimmerWidth])
    const translateX = useAnimatedStyle(() => ({
        transform: [{ translateX: shimmerTranslateref.value }]
    }))


       const exitingAnimation = new Keyframe({
        0: {
            opacity: 1,
            transform: [{ translateY: 0 }, { rotateZ: '0deg' }, { scale: 1 }],
        },
        10: {
            opacity: .5,
            transform: [{ translateY: 25 }, { rotateZ: '0deg' }, { scale: .9 }],
            easing: Easing.exp,
        },
        50: {
            opacity: 0.3,
            transform: [{ translateY: -100 }, { rotateZ: '60deg' }, { scale: .6 }],
        },
        100: {
            opacity: 0,
            transform: [{ translateY: -300 }, { rotateZ: '120deg' }, { scale: .2 }],
        },
    }).duration(500);



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
                    <Text style={Styles.secitonTitle2}> layout animation   </Text>
                    <Animated.View style={Styles.CardFadingContainer}>
                        {cards.map((item, idx) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    setCards(prev => prev.filter(card => card.id !== item.id));
                                }}
                                key={item.id}
                            >
                                <Animated.View
                                    entering={
                                        ZoomInDown
                                            .duration(2500)
                                            .delay(idx * 120)
                                            .easing(Easing.ease)
                                    }
                                    exiting={
                                        exitingAnimation
                                        // ZoomOutRight
                                        //     .easing(Easing.ease)
                                        //     .withCallback((finished) => {
                                        //         console.log(`finished without interruptions: ${finished}`);
                                        //     })
                                    }
                                    layout={JumpingTransition}
                                    style={[Styles.EnteringCard, {
                                    }]}>
                                    <Text>{item.label}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>

                    <Text style={Styles.secitonTitle2}> Animated Custom shimmer   </Text>
                    <View style={Styles.ShimmerContainer}>
                        <AnimatedLG
                            colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                StyleSheet.absoluteFill,
                                translateX
                            ]}
                        />
                    </View>


                 
                </ScrollView>
            </View>
        </View >
    );
}

// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
// const AnimatedText = (props: { text: DerivedValue<string> }) => {
//     const animatedProp = useAnimatedProps(() => ({
//         text: props.text.value,
//         defaultValue: props.text.value
//     }))
//     return (
//         <AnimatedTextInput
//             {...props}
//             editable={false}
//             animatedProps={animatedProp}
//         />
//     )
// }
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
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
            fontFamily: Fonts.helveticaBold,
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
        secitonTitle2: {
            fontSize: normalize(18),
            alignSelf: 'center',
            marginVertical: vh(10)
        },
        CardFadingContainer: {
            marginBottom: vh(50)
        },
        EnteringCard: {
            backgroundColor: Colors.greenOk,
            borderRadius: normalize(4),
            height: vh(30),
            width: vw(300),
            alignSelf: 'center',
            margin: normalize(5),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        ShimmerContainer: {
            height: vh(200),
            width: '100%',
            backgroundColor: '#a0a0a0',
        },
        fruitContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginVertical: vh(20),
            minHeight: vh(350),
            backgroundColor: Colors.HyperTransparent2,
        },
        fruitCard: {
            height: vh(100),
            width: vw(120),
            borderRadius: normalize(20),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: normalize(5)
        }
    });
    return Styles;
};