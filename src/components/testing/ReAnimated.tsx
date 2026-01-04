import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// animation 
import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedProps, withTiming, withRepeat, withSequence, withDelay, withDecay, CSSAnimationKeyframes, cubicBezier, Easing, useAnimatedRef, useDerivedValue, scrollTo, useScrollOffset, DerivedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, screenWidth, vh, vw } from '../../utils/Dimensions';
import Svg, { Circle } from 'react-native-svg';
import { Gesture, GestureDetector, TextInput } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')
const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;


// const AnimatedText2 = Animated.createAnimatedComponent(Text);

export default function ReAnimated() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // animation 
    const aniWidth = useSharedValue(100)
    const handelIncrease = () => {
        aniWidth.value = withTiming((aniWidth.value + 50) % width, {
            duration: 1000,
            easing: Easing.inOut(Easing.elastic(5))
        })
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
    //. decay gesture 
    const position = useSharedValue(0)
    // const savedPosition = useSharedValue(0)
    const Screen_OFFSET = vw(10);
    const BOX_SIZE = vw(80);
    const decayGesture = Gesture.Pan()
        .onChange((e) => {
            position.value += e.changeX;
            console.log(e);
        })
        .onFinalize((e) => {
            position.value = withDecay({
                velocity: e.velocityX,
                rubberBandEffect: true,
                clamp: [
                    -screenWidth / 2 + BOX_SIZE / 2 + Screen_OFFSET,
                    screenWidth / 2 - BOX_SIZE / 2 - Screen_OFFSET,
                ]
            })
        })
    const decayStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }]
    }))

    /// expand 
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    const COLORS = ['#fa7f7c', '#b58df1', '#ffe780', '#82cab2', '#87cce8'];
    const colors = width > 500 ? COLORS : COLORS.slice(0, 3);
    const [expandedId, setExpandedId] = useState(0);

    // rotate 
    // const [isToggled, toggle] = useReducer((s) => !s, false);

    /// pulse 
    const pulse: CSSAnimationKeyframes = {
        '0%': {
            transform: [{ scale: 0.8 }, { rotateZ: '-15deg' }]
        },
        '100%': {
            transform: [{ scale: 1.2 }, { rotateZ: '15deg' }]
        },
    }
    // const bounce: CSSAnimationKeyframes = {
    //     '0%': {
    //         transform: [{ translateY: 100 },]
    //     },
    //     '100%': {
    //         transform: [{ translateY: 0 },]
    //     },
    // }
    const rotate: CSSAnimationKeyframes = {
        '0%': {
            transform: [{ rotateY: '0deg' }],
        },
        '100%': {
            transform: [{ rotateY: '180deg' }],
        },
    }

    // animatedref + animated derivedvalue
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollIdx = useSharedValue<number>(0);
    const offset2 = useScrollOffset(animatedRef);
    useDerivedValue(() => {
        scrollTo(
            animatedRef, // ref
            0, // x
            scrollIdx.value * (ITEM_SIZE + 2 * ITEM_MARGIN), // y 
            true // animated 
        )
    })
    const text = useDerivedValue(
        () => `Scroll offset: ${offset2.value.toFixed(1)}`
    );
    const handelIncrement = () => {
        if (scrollIdx.value < items.length - 1)
            scrollIdx.value += 1
    }
    const handelDecrement = () => {
        if (scrollIdx.value > 0)
            scrollIdx.value -= 1
    }
    const items = Array.from(Array(ITEM_COUNT).values());


    // my scroll compoennt 
    const scrollRef2 = useAnimatedRef<Animated.ScrollView>()
    const scrollIdx2 = useSharedValue(0)
    const scrollOffset2 = useScrollOffset(scrollRef2)
    // useDerivedValue(() => {
    //     scrollTo(
    //         scrollRef2,
    //         scrollIdx2.value * (ITEM_SIZE + (2 * ITEM_MARGIN)),
    //         0,
    //         true
    //     )
    // })
    const animatedProp = useDerivedValue(() => {
        return `${scrollOffset2.value.toFixed(1)}`
    })
    // const handelIncrement2 = () => {
    //     if (scrollIdx2.value < items.length - 1) {
    //         scrollIdx2.value += 1
    //     }
    // }
    // const handelDecrement2 = () => {
    //     if (scrollIdx2.value > 0) {
    //         scrollIdx2.value -= 1
    //     }
    // }
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            const idx = Math.round(e.contentOffset.x / (ITEM_SIZE + (2 * ITEM_MARGIN)))
            console.log('scrollidx', idx);
            scrollIdx2.value = idx
        },
        onMomentumEnd: (e) => {
            console.log('momemntun end ', e.contentOffset.x);
        }
    })


    // gyroscope 
    // const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE);
    // const xb = useSharedValue(0)
    // useDerivedValue(() => {
    //     const { x, y, z } = gyroscope.sensor.value;
    //     console.log(x, y, z);
    //     xb.value = x
    // });

    // const gyroValue = useDerivedValue(() => {
    //     return `${(xb.value * 100000).toFixed(3)}`

    // })


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

                    <View style={Styles.fourthSection}>
                        <Text style={Styles.secitonTitle} > with decay </Text>
                        <GestureDetector gesture={decayGesture}>
                            <Animated.View style={[Styles.ThirdBox, decayStyles]} />
                        </GestureDetector>
                    </View>

                    <View style={Styles.ThirdSection}>
                        <Text style={Styles.secitonTitle} > css transition  </Text>
                        <View style={Styles.container}>
                            {colors.map((color, id) => {
                                return (
                                    <AnimatedTouchableOpacity
                                        onPress={() => setExpandedId(id)}
                                        key={id}
                                        style={[
                                            Styles.box, {
                                                backgroundColor: color,
                                                flexGrow: id === expandedId ? 3 : 1,
                                                transitionProperty: 'flexGrow',
                                                transitionDuration: 500,
                                                transitionBehavior: 'allow-discrete'
                                            }
                                        ]}
                                    >
                                    </AnimatedTouchableOpacity>
                                )
                            })}
                        </View>
                    </View>

                    {/* <View style={Styles.RotateSection}>
                        <View style={Styles.container2}>
                            <View style={Styles.row}>
                                {colors.map((color, id) => (
                                    <Animated.View
                                        key={color}
                                        style={[
                                            Styles.box2,
                                            {
                                                backgroundColor: color,
                                                transform: [{ rotateY: isToggled ? '0deg' : '180deg' }],
                                                borderRadius: isToggled ? 16 : 0,
                                                transitionProperty: ['transform', 'borderRadius'],
                                                transitionDuration: [400 * id + 500, '0.5s'],
                                                transitionTimingFunction: cubicBezier(0.25, 0.1, 0.5, 2),
                                            },
                                        ]}
                                    >
                                        <Text>  lo  </Text>
                                    </Animated.View>
                                ))}
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggle} style={Styles.rotateButton}  >
                            <Text>Click me </Text>
                        </TouchableOpacity> 
                    </View>*/}
                    <Text style={Styles.secitonTitle2}> CSS animations </Text>
                    <View style={Styles.PulseSection}>
                        <Animated.View
                            style={[
                                Styles.box2, {
                                    animationName: [pulse],
                                    animationDuration: ['2s'],
                                    animationIterationCount: 'infinite',
                                    animationDirection: 'alternate',
                                    animationPlayState: 'running'
                                }]}
                        />
                    </View>
                    <View style={Styles.row}>
                        {colors.map((color, id) => (
                            <Animated.View
                                key={color}
                                style={[
                                    Styles.box2,
                                    {
                                        backgroundColor: color,
                                        animationName: rotate,
                                        animationDuration: id + 1 * 500 + 1000,
                                        // animationDirection : 'alternate',
                                        animationIterationCount: 'infinite',
                                        animationDelay: 1000,
                                        animationTimingFunction: cubicBezier(0.25, 0.1, 0.26, 1.53)
                                        // animationTimingFunction : steps(4, 'end'),
                                        // animationTimingFunction :  linear(0, [0.25, '75%'], 1),

                                    }]}
                            >
                            </Animated.View>
                        ))}
                    </View>

                    <Text style={Styles.secitonTitle2}> animatedRef + derivedValue  </Text>
                    <View style={Styles.container}>
                        <View style={Styles.boxWrapper}>
                            <AnimatedText text={text} />
                            <TouchableOpacity
                                style={Styles.IncrementBUtton}
                                onPress={handelDecrement}>
                                <Text>scrollup </Text>
                            </TouchableOpacity>
                            <Animated.ScrollView ref={animatedRef}>
                                {items.map((_, i) => (
                                    <View key={i} style={Styles.box3}>
                                        <Text style={{ textAlign: 'center' }}>{i}</Text>
                                    </View>
                                ))}
                            </Animated.ScrollView>
                            <TouchableOpacity
                                style={Styles.IncrementBUtton}
                                onPress={handelIncrement}>
                                <Text>scrolldown </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={Styles.secitonTitle2}> my animated scrollview  </Text>
                    <View style={Styles.container}>
                        <View style={Styles.boxWrapper}>
                            <AnimatedTextComponent text={animatedProp} />
                            {/* <TouchableOpacity
                                style={Styles.IncrementBUtton}
                                onPress={handelDecrement2}>
                                <Text>scrollUp </Text>
                            </TouchableOpacity> */}
                            <Animated.ScrollView
                                horizontal={true}
                                onScroll={scrollHandler}
                                ref={scrollRef2}>
                                {items.map((_, i) => (
                                    <View key={i} style={Styles.box3}>
                                        <Text style={{ textAlign: 'center' }}>{i}</Text>
                                    </View>
                                ))}
                            </Animated.ScrollView>
                            {/* <TouchableOpacity
                                style={Styles.IncrementBUtton}
                                onPress={handelIncrement2}>
                                <Text>scrolldown </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>

                    {/* <Text style={Styles.secitonTitle2}> gryoscope values   </Text>
                    <View style={Styles.container}>
                        <Animated.View style={[Styles.box3,
                        {
                            transform: [{ translateX: Number(gyroValue) }]
                        }
                        ]}>

                        </Animated.View>
                        <AnimatedText
                            text={gyroValue}
                        />
                    </View> */}


                </ScrollView>
            </View>
        </View>
    );
}
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function AnimatedText(props: { text: DerivedValue<string> }) {
    const text = props.text;
    const animatedProps = useAnimatedProps(() => ({
        text: text.value,
        defaultValue: text.value,
    }));
    return (
        <AnimatedTextInput
            {...props}
            editable={false}
            animatedProps={animatedProps}
        />
    );
}
// my compoentn 

const AnimatedTextInputComponent = Animated.createAnimatedComponent(TextInput)
const AnimatedTextComponent = (props: { text: DerivedValue<string> }) => {
    const text = props.text
    const animatedProps = useAnimatedProps(() => ({
        text: text.value,
        defaultValue: text.value
    }))
    return (
        <AnimatedTextInputComponent
            {...props}
            animatedProps={animatedProps}
            editable={false}
        />
    )
}



const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        parent: {
            height: '100%',
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors.bodyColor,flexDirection: 'row',
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
        BackIconAndHeaderText: {flexDirection: 'row',
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
            fontFamily: Fonts.helveticaBold
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
            backgroundColor: '#f5d7d7ff',alignItems: 'center',
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
        secitonTitle2: {
            fontSize: normalize(18),
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
        },
        PulseSection: {
            backgroundColor: '#d6e6fdff',
        },
        fourthSection: {
            backgroundColor: '#bff7f3ff',
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 16,
            marginHorizontal: 16,
        },
        container2: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            height: '100%',
            gap: 16,
            // marginHorizontal: 16,
        },
        row: {
            flexDirection: 'row',
            gap: 16,
        },
        rotateButton: {
            height: vh(50),
            width: '80%',
            backgroundColor: '#f47d7dff',
            marginBottom: vh(10),
            alignSelf: 'center',
            borderRadius: normalize(10),alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        box: {
            height: vh(120),
            marginVertical: vw(64),
        },
        box2: {
            width: 100,
            height: 100,
            borderRadius: 20,
            marginVertical: 64,
            backgroundColor: '#589409ff',
            alignSelf: 'center'
        },
        boxWrapper: {
            width: '100%',
            height: 250,
            alignItems: 'center',
            marginBottom: vh(40)
        },
        box3: {
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            margin: ITEM_MARGIN,
            borderRadius: 15,
            backgroundColor: '#b58df1',
            alignItems: 'center',
            justifyContent: 'center',
        },
        IncrementBUtton: {
            backgroundColor: Colors.greenOk,
            height: vh(40),
            width: vw(200),alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: normalize(10)
        }
    });
    return Styles;
};