import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// utils
import Fonts from '../../utils/Fonts';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, useAnimatedProps, measure, useAnimatedRef, useAnimatedReaction, useDerivedValue, useScrollOffset, scrollTo, withClamp, clamp, useAnimatedScrollHandler } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { normalize, vh, vw } from '../../utils/Dimensions';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Images from '../../utils/LocalImages';

export default function AnimatedMeasure() {
    const Colors = useThemeColors();
    const Styles = createDynamicStyles(Colors, Fonts);
    const Strings = useStrings();
    const WIDTH = 400;

    // Move a box horizontally when button is pressed.
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedPOsition = useSharedValue({ x: 0, y: 0 })

    const handleMoveForward = () => {
        translateX.value = withTiming((translateX.value + 100) % WIDTH, { duration: 300, easing: Easing.sin },
            () => {
                savedPOsition.value = {
                    x: translateX.value,
                    y: savedPOsition.value.y,
                }
            })
    }
    // Scale the box based on its X position.
    const scale = useDerivedValue(() => (
        1 + translateX.value / 100
    ))
    // Drag the box with pan gesture.
    const pan = Gesture.Pan()
        .onChange((e) => {
            translateX.value = e.translationX + savedPOsition.value.x,
                translateY.value = e.translationY + savedPOsition.value.y
        })
        .onEnd(() => {
            savedPOsition.value = {
                x: translateX.value,
                y: translateY.value,
            }
        })
    // Animate TextInput fontSize or ProgressBar value
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
    const animatedProp = useAnimatedProps(() => {
        return {
            text: `${translateX.value}`,
            value: `${translateX.value}`,
            defaultValue: '122',
            fontSize: clamp(20 + translateX.value / 10, 16, 30),
            editable: false
        }
    })
    const animatedMoveStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: clamp(scale.value, 1, 3) }
        ]
    }))

    // Scroll a ScrollView programmatically with animation.
    const scrollRef = useAnimatedRef()
    const scrollOffset = useScrollOffset(scrollRef)
    const scrollIdx = useSharedValue(0)
    const scrolUp = () => {
        if (scrollIdx.value > 0)
            scrollIdx.value -= 1
    }
    const scrolDown = () => {
        if (scrollIdx.value < 10 - 1)
            scrollIdx.value += 1
    }
    useEffect(() => {
        const timerId = setInterval(() => {
            if (scrollIdx.value < 9) {
                scrollIdx.value += 1
            } else {
                scrollIdx.value = 0
            }
        }, 2000);
        return () => clearInterval(timerId)
    }, [])
    // useDerivedValue(() => {
    //     scrollTo(
    //         scrollRef,
    //         0,
    //         scrollIdx.value * 100,
    //         true
    //     )
    // })
    const scrollHandeler = useAnimatedScrollHandler({
        onScroll: (e) => {
            // console.log(e.contentOffset.y)
        },
        onMomentumEnd: (e) => {
            const nextIdx = Math.ceil(e.contentOffset.y / 100)
            scrollIdx.value = nextIdx
        }
    })
    useAnimatedReaction(
        () => scrollIdx.value,
        () => {
            scrollTo(
                scrollRef,
                0,
                scrollIdx.value * 100,
                true
            )
        }
    )
    const scrollProps = useAnimatedProps(() => {
        return {
            text: `${scrollOffset.value.toFixed(0)}`,
            defaultValue: `${scrollOffset.value}`
        }
    })
    return (
        <SafeAreaView>
            <View style={[Styles.NavWrapper,]} >
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        style={{ padding: vw(12) }}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.ReAnimatedScreen}</Text>
                </View>
            </View>
            <View style={Styles.Body}>
                <View style={Styles.bodythings}>
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[Styles.box, animatedMoveStyles]} />
                    </GestureDetector>
                    <TouchableOpacity
                        onPress={handleMoveForward}
                        style={Styles.buttonOCntainer}
                    >
                        <Text > move right</Text>
                    </TouchableOpacity>
                    <AnimatedTextInput animatedProps={animatedProp} />
                    <TouchableOpacity
                        style={Styles.Cardbutton}
                        onPress={scrolUp}
                    >
                        <Text > scroll up </Text>
                    </TouchableOpacity>
                    <View style={Styles.ScrollContainer}>
                        <Animated.ScrollView ref={scrollRef} onScroll={scrollHandeler} >
                            {new Array(10).fill(0).map((_, idx) => (
                                <View style={Styles.box} key={idx}>
                                    <Text>{idx}</Text>
                                </View>
                            ))}
                        </Animated.ScrollView>
                    </View>
                    <TouchableOpacity
                        style={Styles.Cardbutton}
                        onPress={scrolDown}
                    >
                        <Text > scroll doen </Text>
                    </TouchableOpacity>
                    <AnimatedTextInput animatedProps={scrollProps} />
                </View>
            </View >
        </SafeAreaView >
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1,
            backgroundColor: '#fededeff',
        },
        NavWrapper: {
            backgroundColor: '#c1f1a5ff',
        },
        BackIconAndHeaderText: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.helveticaBold
        },
        BackIcon: {
            height: vh(15),
            width: vw(20)
        },
        body: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#b4b5edff',
            flex: 1
        },
        Body: {
            flex: 1,
            backgroundColor: '#e4b7f5ff',
        },
        Box: {
            height: 100,
            backgroundColor: '#e88383ff',
            alignSelf: 'center'
        },
        box: {
            height: 80,
            width: 80,
            backgroundColor: '#43ee43ff',
            borderRadius: normalize(20),
            alignSelf: 'center',
            margin: 12
        },
        label: {
            fontSize: 24,
            marginVertical: 16,
            color: '#b58df1',
            textAlign: 'center',
        },
        buttonOCntainer: {

        },
        ScrollContainer: {
            alignSelf: 'center',
            height: 200,
            width: 300,
            backgroundColor: 'rgba(213, 235, 193, 1)'
        },
        bodythings: {
            height: 600,
            width: '100%',
            marginTop: 10,
            backgroundColor: 'rgba(248, 220, 220, 1)',
        },
        Cardbutton: {
            backgroundColor: Colors.greenOk,
            height: 50,
            width: 120,
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
    });
    return Styles;
};