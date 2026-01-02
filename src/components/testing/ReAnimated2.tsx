import { StyleSheet, Text, View, ScrollView, TouchableOpacity,  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//animaiton 
import Animated, {
    Easing, useSharedValue, withTiming, withRepeat, cancelAnimation, ZoomInDown,
    Keyframe,
    JumpingTransition,
    FadeIn, 
    withDelay,
    EntryAnimationsValues,
    ExitAnimationsValues,
    ReduceMotion,
    withSpring,
    withSequence, 
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    interpolateColor,
    getRelativeCoords,
    useAnimatedRef,
    DynamicColorIOS
} from 'react-native-reanimated';

// utils
import Fonts from '../../utils/Fonts';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';
import { LayoutAnimationValues } from 'react-native-reanimated/lib/typescript/commonTypes';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-worklets';
// import LinearGradient from 'react-native-linear-gradient';
// import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
const WIDTH = 200

// custom layout animation 
const customLayoutTransition = (values: LayoutAnimationValues) => {
    'worklet';
    return {
        animations: {
            originX: withTiming(values.targetOriginX, { duration: 2000 }),
            originY: withDelay(
                1500,
                withTiming(values.targetOriginY, { duration: 2000 })
            ),
            width: withSpring(values.targetWidth),
            height: withSpring(values.targetHeight),
            opacity: withSequence(
                withTiming(1, { duration: 800 }),
                withTiming(.5, { duration: 800 }),
                withTiming(1, { duration: 800 })
            )
        },
        initialValues: {
            originX: values.currentOriginX,
            originY: values.currentOriginY,
            width: values.currentWidth,
            height: values.currentHeight,
            opacity: 1
        }
    }
}
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
    // const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)
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
    // const translateX = useAnimatedStyle(() => ({
    //     transform: [{ translateX: shimmerTranslateref.value }]
    // }))

    // const derivedValue = useDerivedValue(() => {
    //     return `derived value is ${shimmerTranslateref.value.toFixed(0)}`
    // })


    // keyfram animation 
    // const enteringAnimation = new Keyframe({
    //     0: {
    //         opacity: 0,
    //         transform: [
    //             { translateY: 50 },
    //             { rotate: '820deg' },
    //             { skewX: '0deg' },
    //             { scale: 0 },
    //         ],
    //     },
    //     50: {
    //         opacity: 0.5,
    //         transform: [
    //             { translateY: 25 },
    //             { rotate: '-180deg' },
    //             { skewX: '30deg' },
    //             { scale: 0.5 },
    //         ],
    //         easing: Easing.out(Easing.quad),
    //     },
    //     100: {
    //         opacity: 1,
    //         transform: [
    //             { translateY: 0 },
    //             { rotate: '0deg' },
    //             { skewX: '0deg' },
    //             { scale: 1 },
    //         ],
    //     },
    // }).duration(1000)
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


    // layout animation 
    interface fruitList {
        id: number,
        emoji: string,
        color: string
    }
    const INITIAL_LIST: fruitList[] = [
        { id: 1, emoji: '🍌', color: '#b58df1' },
        { id: 2, emoji: '🍎', color: '#ffe780' },
        { id: 3, emoji: '🥛', color: '#fa7f7c' },
        { id: 4, emoji: '🍙', color: '#82cab2' },
        { id: 5, emoji: '🍇', color: '#fa7f7c' },
        { id: 6, emoji: '🍕', color: '#b58df1' },
        { id: 7, emoji: '🍔', color: '#ffe780' },
        { id: 8, emoji: '🍟', color: '#b58df1' },
        { id: 9, emoji: '🍩', color: '#82cab2' },
    ];
    const [fruitList, setFruitList] = useState<fruitList[]>(INITIAL_LIST)
    const removeFruit = (id: number) => {
        setFruitList(prev => prev.filter(fruit => fruit.id !== id));
    };

    // custom animation 
    const [show, setShow] = useState<boolean>(false);
    const customEntering = (values: EntryAnimationsValues) => {
        'worklet';
        const animations = {
            originX: withTiming(values.targetGlobalOriginX, { duration: 3000, reduceMotion: ReduceMotion.Never },),
            opacity: withTiming(1, { duration: 2000 }),
            borderRadius: withDelay(1500, withTiming(40, { duration: 3000 })),
            transform: [
                { rotate: withTiming('0deg', { duration: 4000 }) },
                { scale: withTiming(1, { duration: 3500 }) },
            ]
        }
        const initialValues = {
            originX: -WIDTH,
            opacity: 0,
            borderRadius: 10,
            transform: [{ rotate: '90deg' }, { scale: .2 },]
        }
        return {
            animations,
            initialValues
        }
    }
    const customExiting = (values: ExitAnimationsValues) => {
        'worklet';
        const animations = {
            originX: withTiming(2 * WIDTH, { duration: 2000 }),
            opacity: withTiming(0, { duration: 2000 }),
            borderRadius: withTiming(0, { duration: 2000 }),
            transform: [{ scale: withTiming(.2, { duration: 2000 }) }]
        }
        const initialValues = {
            originX: values.currentOriginX,
            opacity: 1,
            borderRadius: 40,
            transform: [{ scale: 1 }]
        }
        return {
            animations,
            initialValues
        }
    }

    // custom layout animation 
    const [state, setState] = useState<boolean>(true);

    const handleToggle = (): void => {
        setState((prevState) => !prevState);
    };


    // interpolate
    const width = 200;
    const offset = useSharedValue(-width)
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(
            offset.value,
            [-width, width],
            [0.3, 1],
            // Extrapolation.IDENTITY
        ),
        transform: [{ translateX: offset.value }],
    }))

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(-offset.value, { duration: 1750 }),
            -1,
            true
        );
    }, [offset]);

    // extrapolation 
    const offset23 = useSharedValue<number>(0);
    const pan = Gesture.Pan()
        .onChange((e) => {
            offset23.value = e.translationX
        })
        .onFinalize(() => {
            offset23.value = withSpring(0)
        })
    const animatedStyles23 = useAnimatedStyle(() => ({
        transform: [{ translateX: offset23.value }, {
            rotate: interpolate(
                offset23.value,
                [-40, 40],
                [-360, 360],
                Extrapolation.CLAMP
            ) + 'deg'
        }]
        ,
        backgroundColor: interpolateColor(
            offset23.value,
            [-40, 40],
            ['red', 'green'],
            'RGB',
            {
                gamma: 2.3
            }
        ),
    }))

    // getrelative cords 
    const animatedRef = useAnimatedRef();
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const tap = Gesture.Tap()
        .onEnd((e) => {
            const relativeCoords = getRelativeCoords(
                animatedRef,
                e.absoluteX,
                e.absoluteY
            )
            if (relativeCoords) {
                runOnJS(setCoords)(relativeCoords)
            }
        })

    // dymanic color IOS 
    const LIGHT_COLORS = ['#38acdd', '#57b495'];
    const DARK_COLORS = ['#b58df1', '#ff6259'];
    const progress = useSharedValue(0); 
    
    const animatedStyle44 = useAnimatedStyle(() => {
        const lightColor = interpolateColor(progress.value, [0, 1], LIGHT_COLORS);
        const darkColor = interpolateColor(progress.value, [0, 1], DARK_COLORS);
        
        return {
            backgroundColor: DynamicColorIOS({
                light: lightColor,
                dark: darkColor,
            }),
        };
    });
    useEffect(() => {
        const interval = setInterval(() => {
            progress.value = withTiming(progress.value === 0 ? 1 : 0);
        }, 2000);
        return () => clearInterval(interval);
    }, [progress]);


    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        {/* <Image source={Images.back_arrow} style={Styles.BackIcon} /> */}
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.ReAnimatedScreen}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                <ScrollView>
                    <Text style={Styles.secitonTitle2}> entry exit  animation   </Text>
                    <View style={Styles.CardFadingContainer}>
                        {cards.map((item, idx) => (
                            <Animated.View
                                entering={
                                    ZoomInDown
                                        .duration(500)
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
                                }]}
                                key={item.id}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        setCards(prev => prev.filter(card => card.id !== item.id));
                                    }}
                                    style={Styles.Cardbutton}
                                >
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    {/* <Text style={Styles.secitonTitle2}> Animated Custom shimmer   </Text>
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
                    </View> */}


                    {/* <Text style={Styles.secitonTitle2}> derived value  </Text>
                    <View>
                        <AnimatedText text={derivedValue} />
                    </View> */}

                    <Text style={Styles.secitonTitle2}> layout transitions  </Text>
                    <View style={Styles.fruitContainer}>
                        {fruitList.map((fruit, index) => (
                            <Animated.View
                                entering={FadeIn.duration(400).delay(index * 80)}
                                layout={JumpingTransition}
                                style={[
                                    Styles.fruitCard,
                                    { backgroundColor: fruit.color },
                                ]}
                                key={fruit.id}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => removeFruit(fruit.id)}
                                >
                                    <Text style={Styles.emoji}>{fruit.emoji}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>


                    <Text style={Styles.secitonTitle2}> custom Animations  </Text>
                    <View style={Styles.customAnimationCOntainer}>
                        <TouchableOpacity
                            style={Styles.buttonContainer}
                            onPress={() => setShow(!show)}
                        >
                            <Text>click </Text>
                        </TouchableOpacity>
                        <View style={Styles.container}>
                            {show && (
                                <Animated.View
                                    style={Styles.card}
                                    entering={customEntering}
                                    exiting={customExiting}
                                />
                            )}
                        </View>
                    </View>


                    <Text style={Styles.secitonTitle2}> custom layout animation  </Text>
                    <View style={Styles.container2}>
                        <View
                            style={[
                                Styles.innerContainer,
                                {
                                    alignItems: state ? 'center' : 'flex-start',
                                },
                            ]}>
                            <View style={{ flexDirection: state ? 'row' : 'column' }}>
                                {/* {state && <Box key="A" label="A" state={state} />} */}
                                <Box key="A" label="A" state={state} />
                                <Box key="B" label="B" state={state} />
                                {/* {!state && <Box key="A" label="A" state={state} />} */}
                                <Box key="C" label="C" state={state} />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={Styles.buttonContainer}
                            onPress={handleToggle} >
                            <Text>Toggle</Text>
                        </TouchableOpacity>
                    </View>


                    {/*   <View style={{ height: vh(300) }}>
                    <Animated.FlatList
                            // nestedScrollEnabled={true}
                            data={cards}
                            renderItem={({ item }) => {
                                return (
                                    <Animated.View
                                        exiting={LightSpeedOutRight.duration(2000)}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                setCards(prev => prev.filter(card => card.id !== item.id))
                                            }
                                            style={Styles.EnteringCard}>
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    </Animated.View>
                                )
                            }}
                            keyExtractor={cards => cards.label}
                            itemLayoutAnimation={LinearTransition.duration(2000)}
                        />
                    </View> */}
                    <Text style={Styles.secitonTitle2}> utilities animation   </Text>
                    <Text style={Styles.secitonTitle2}>interpolate  </Text>
                    <View style={Styles.container23}>
                        <Animated.View style={[Styles.box23, animatedStyles]} />
                    </View>

                    <Text style={Styles.secitonTitle2}> extrapolate   </Text>
                    <View style={Styles.container23}>
                        <GestureDetector gesture={pan}>
                            <Animated.View style={[Styles.box23, animatedStyles23]}>
                                <Text style={Styles.secitonTitle2}>Extrapolate</Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>

                    <Text style={Styles.secitonTitle2}> get relative cords    </Text>
                    <Text style={[Styles.coordsData, Styles.coords]}>
                        x={coords.x.toFixed()} y=
                        {coords.y.toFixed()}
                    </Text>
                    <View style={Styles.container23}>
                        <GestureDetector gesture={tap}>
                            <Animated.View ref={animatedRef} style={[Styles.box33]}>
                                <Text style={Styles.secitonTitle2}>get relative cords</Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>

                    <Text style={Styles.secitonTitle2}> dynamicolorIOS </Text>
                      <Animated.View style={[Styles.box23, animatedStyle44]} />
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
const Box = ({ label, state }: { label: string, state: boolean }) => {
    const Colors = useThemeColors();
    const Styles = createDynamicStyles(Colors, Fonts);
    return (
        <Animated.View
            layout={customLayoutTransition}
            // layout={CurvedTransition.duration(4000)}
            style={[
                Styles.box,
                {
                    flexDirection: state ? 'row' : 'row-reverse',
                    height: state ? 100 : 180,
                },
            ]}>
            <Text>{label}</Text>
        </Animated.View>
    );
};
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
        Cardbutton: {
            backgroundColor: Colors.greenOk,
            height: '100%',
            width: '100%',
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
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        fruitCard: {
            width: vw(70),
            height: vh(70),
            borderRadius: normalize(16),
            margin: normalize(8),
            justifyContent: 'center',
            alignItems: 'center',
        },
        emoji: {
            fontSize: normalize(28),
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            minHeight: vh(400)
        },
        card: {
            width: WIDTH,
            height: vh(300),
            backgroundColor: Colors.greenOk,
            justifyContent: 'center',
            alignItems: 'center',
            margin: normalize(20),
        },
        buttonContainer: {
            width: vw(300),
            height: vh(40),
            alignSelf: 'center',
            borderRadius: normalize(10),
            backgroundColor: Colors.KFC_red,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        box: {
            backgroundColor: 'lightblue',
            borderRadius: 8,
            margin: 5,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        customAnimationCOntainer: {
            backgroundColor: '#e0d9d9ff',
            maxHeight: vh(400)
        },
        container2: {
            marginTop: vh(12),
            padding: normalize(16),
        },
        innerContainer: {
            height: vh(600),
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ddf0c0ff',
        },
        container23: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        box23: {
            height: vh(120),
            width: vw(120),
            backgroundColor: '#b58df1',
            borderRadius: normalize(20),
        },
        box33: {
            height: vh(320),
            width: vw(320),
            backgroundColor: '#b58df1',
            borderRadius: normalize(20),
        },
        coordsData: {
            fontSize: normalize(20),
            fontFamily: 'Aeonik',
            color: 'var(--swm-navy-light-100)',
        },
        coords: {
            marginBottom: vh(16),
            fontWeight: '500',
        },
    });
    return Styles;
};