import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//  gesture 
import { GestureDetector, Gesture, ScrollView, Directions } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import type { RefObject } from 'react';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function GestureHandler() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    // const [scrollEnabled, setScrollEnabled] = useState(true)
    const scrollEnabled = useSharedValue(true)
    // animation 
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 })


    /// block external 
    const scrollRef = useRef<ScrollView | null>(null);


    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value.x },
            { translateY: offset.value.y }],
        backgroundColor: isPressed.value ? 'blue' : 'yellow'
    }))
    // pan gesture 
    const panGesture = Gesture.Pan()
        .onStart(() => {
            isPressed.value = true;
            scrollEnabled.value = false
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y
            }
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y
            }
        })
        .onFinalize(() => {
            isPressed.value = false
            scrollEnabled.value = true
        })
        .onChange(() => {
        })
        // .minPointers(2)
        // .activateAfterLongPress(300)
        // .activeOffsetX(20)
        // .failOffsetX(100)
        // .failOffsetY([-20, 20])
        // .activeOffsetY([-Infinity, Infinity])
        .enabled(true)
        .shouldCancelWhenOutside(false)
        .hitSlop({
            bottom: 350,
            top: 350,
            left: 350,
            right: 350
            // bottom : 150 , 
            // width : 30 , 
            // left : 15 , 
        })


    // simple pan gesture 
    const onLeft = useSharedValue(true)
    const position = useSharedValue(0)
    const savedPosition = useSharedValue(0)

    const END_POSITION = 200
    const BALL_SIZE = vh(60)
    const CONTAINER_WIDTH = vw(250)
    const MAX_TRANSLATE_X = CONTAINER_WIDTH - BALL_SIZE

    const eitherSideStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: position.value }
        ],
        backgroundColor: onLeft.value ? 'blue' : 'green'
    }))
    const panGesture2 = Gesture.Pan()
        .onUpdate((e) => {
            const nextX = e.translationX + savedPosition.value
            position.value = Math.min(
                Math.max(nextX, 0),
                MAX_TRANSLATE_X
            )
        })
        .onEnd(() => {
            if (position.value < END_POSITION / 2) {
                position.value = withSpring(0)
                savedPosition.value = 0
            } else {
                position.value = withSpring(END_POSITION)
                savedPosition.value = END_POSITION
            }
            onLeft.value = position.value < MAX_TRANSLATE_X / 2
        })
        // .minDistance(60)
        // .cancelsTouchesInView(false)
        .shouldCancelWhenOutside(true)

    // tap gesture 
    const isTapped = useSharedValue('blue')
    const colorTappedChange = useAnimatedStyle(() => ({
        backgroundColor: isTapped.value
    }))
    const TapGesture = Gesture.Tap()
        .onBegin(() => {
            console.log('begin');
            isTapped.value = 'yellow'
        })
        .onStart(() => {
            console.log('start');
            isTapped.value = 'red'
        })
        .onEnd(() => {
            console.log('end');
            isTapped.value = 'orange'
        })
        .onFinalize(() => {
            console.log('finalize');
            isTapped.value = "black"
        })
        // .minPointers(2)
        // .maxDuration(2000)
        .numberOfTaps(2)
        .maxDelay(1500)


    // longpress gesture 
    const bgColorLong = useSharedValue('orange')
    const longpressGesture = Gesture.LongPress()
        .onStart(() => {
            bgColorLong.value = 'red'
        })
        .onEnd(() => {
            // bgColorLong.value = 'blue'
        })
        .minDuration(400)
    const longpressGestureAnimation = useAnimatedStyle(() => ({
        backgroundColor: bgColorLong.value,
    }))

    // rotate 
    const rotateRef = useSharedValue(0)
    const savedRotation = useSharedValue(1);
    const rotateGesture = Gesture.Rotation()
        .onBegin(() => {
            scrollEnabled.value = false
        })
        .onUpdate((e) => {
            rotateRef.value = savedRotation.value + e.rotation
        })
        .onEnd(() => {
            savedRotation.value = rotateRef.value
        })
        .onFinalize(() => {
            scrollEnabled.value = true
        })
    const rotatorStyles = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${(rotateRef.value / Math.PI) * 180}deg` }]
    }))

    //pinch gesture 

    const scaleRef = useSharedValue(1)
    const savedScaleRef = useSharedValue(1)
    const MIN_SCALE = 1;
    const MAX_SCALE = 3;
    const pinchStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scaleRef.value }]
    }))
    const pinchGesture = Gesture.Pinch()
        .onBegin(() => {
            scrollEnabled.value = false
        })
        .onUpdate((e) => {
            scaleRef.value = e.scale * savedScaleRef.value
        })
        .onEnd(() => {
            if (scaleRef.value < MIN_SCALE) {
                console.log('scalref value is lesstha 1 ', scaleRef.value);
                scaleRef.value = withSpring(MIN_SCALE)
                savedScaleRef.value = MIN_SCALE
            } else if (scaleRef.value > MAX_SCALE) {
                console.log('scalref value is greater 3 ', scaleRef.value);
                scaleRef.value = withSpring(MAX_SCALE)
                savedScaleRef.value = MAX_SCALE
            } else {
                savedScaleRef.value = scaleRef.value
            }
        })
        .onFinalize(() => {
            scrollEnabled.value = true
        })
        // .simultaneousWithExternalGesture(scrollRef)

    // fling 
    const flingRef = useSharedValue(0)
    // const savedFlingRef = useSharedValue(0)
    const flingStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: flingRef.value }]
    }))
    const flingGestureRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            flingRef.value = withSpring(flingRef.value + 20);
        })
        .onEnd(() => {
            // console.log(e);
        })
        .numberOfPointers(1)
    const flingGestureLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            flingRef.value = withSpring(flingRef.value - 20);
        })
        .onEnd(() => {
            // console.log(e);
        })

    const composedGestureFling = Gesture.Simultaneous(flingGestureRight, flingGestureLeft)

    // composed
    const offset2 = useSharedValue({ x: 0, y: 0 });
    // const start2 = useSharedValue({ x: 0, y: 0 });
    const popupPosition = useSharedValue({ x: 0, y: 0 });
    const popupAlpha = useSharedValue(0);
    const animatedStyles2 = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset2.value.x },
                { translateY: offset2.value.y },
            ],
        };
    });

    const animatedPopupStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: popupPosition.value.x },
                { translateY: popupPosition.value.y },
            ],
            opacity: popupAlpha.value,
        };
    });

    const dragGesture = Gesture.Pan()
        .onStart((_e) => {
            popupAlpha.value = withTiming(0);
        })
        .onUpdate((e) => {
            offset2.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset2.value.x,
                y: offset2.value.y,
            };
        });

    const longPressGesture = Gesture.LongPress().onStart((_event) => {
        popupPosition.value = { x: offset2.value.x, y: offset2.value.y };
        popupAlpha.value = withTiming(1);
    });

    const composedGesture = Gesture.Race(dragGesture, longPressGesture)



    // simultenious 
    const offset4 = useSharedValue({ x: 0, y: 0 });
    const start4 = useSharedValue({ x: 0, y: 0 });
    const scale4 = useSharedValue(1);
    const savedScale4 = useSharedValue(1);
    const rotation4 = useSharedValue(0);
    const savedRotation4 = useSharedValue(0);
    const animatedStyles4 = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset4.value.x },
                { translateY: offset4.value.y },
                { scale: scale4.value },
                { rotateZ: `${rotation4.value}rad` },
            ],
        };
    });

    const dragGesture4 = Gesture.Pan()
        .averageTouches(true)
        .onUpdate((e) => {
            offset4.value = {
                x: e.translationX + start4.value.x,
                y: e.translationY + start4.value.y,
            };
        })
        .onEnd(() => {
            start4.value = {
                x: offset4.value.x,
                y: offset4.value.y,
            };
        });

    const zoomGesture4 = Gesture.Pinch()
        .onUpdate((event) => {
            scale4.value = savedScale4.value * event.scale;
        })
        .onEnd(() => {
            savedScale4.value = scale4.value;
        });

    const rotateGesture4 = Gesture.Rotation()
        .onUpdate((event) => {
            rotation4.value = savedRotation4.value + event.rotation;
        })
        .onEnd(() => {
            savedRotation4.value = rotation4.value;
        });

    const composed4 = Gesture.Simultaneous(
        dragGesture4,
        Gesture.Simultaneous(zoomGesture4, rotateGesture4)
    );


    // exclusive 
    const singleTap = Gesture.Tap().onEnd((_event, success) => {
        if (success) {
            console.log('single tap!');
        }
    });
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd((_event, success) => {
            if (success) {
                console.log('double tap!');
            }
        });
    const taps = Gesture.Exclusive(doubleTap, singleTap);


    // requireeexternalgesturetofail
    const [tapMessge, setTapMessage] = useState('')
    const innerTap = Gesture.Tap()
        .numberOfTaps(2)
        // .runOnJS(true)
        .onStart(() => {
            console.log('inner tap');
            runOnJS(setTapMessage)('inner double tap')
            // setTapMessage('inner double tap')
        });

    const outerTap = Gesture.Tap()
        .onStart(() => {
            console.log('outer tap');
            runOnJS(setTapMessage)('outer single tap')
        })
        .requireExternalGestureToFail(innerTap)
    // .blocksExternalGesture(innerTap)
    // .simultaneousWithExternalGesture(innerTap)


    // manual gesture 
    // const trackedPointers: Animated.SharedValue<Pointer>[] = [];
    // const active = useSharedValue(false);

    // for (let i = 0; i < 12; i++) {
    //     trackedPointers[i] = useSharedValue<Pointer>
    //     {
    //         visible: false
    //         x: 0
    //         y: 0
    //     };
    // }

    // const gesture = Gesture.Manual()
    //     .onTouchesDown((e, manager) => {
    //         for (const touch of e.changedTouches) {
    //             trackedPointers[touch.id].value = {
    //                 visible: true,
    //                 x: touch.x,
    //                 y: touch.y,
    //             };
    //         }

    //         if (e.numberOfTouches >= 2) {
    //             manager.activate();
    //         }
    //     })
    //     .onTouchesMove((e, _manager) => {
    //         for (const touch of e.changedTouches) {
    //             trackedPointers[touch.id].value = {
    //                 visible: true,
    //                 x: touch.x,
    //                 y: touch.y,
    //             };
    //         }
    //     })
    //     .onTouchesUp((e, manager) => {
    //         for (const touch of e.changedTouches) {
    //             trackedPointers[touch.id].value = {
    //                 visible: false,
    //                 x: touch.x,
    //                 y: touch.y,
    //             };
    //         }

    //         if (e.numberOfTouches === 0) {
    //             manager.end();
    //         }
    //     })
    //     .onStart(() => {
    //         active.value = true;
    //     })
    //     .onEnd(() => {
    //         active.value = false;
    //     });




    //// 
    const touchStyle = useAnimatedStyle(() => ({

    }))
    const touchGesture = Gesture.Tap()
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.GestureScreen}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                {/* scrollEnabled={scrollEnabled.value} */}
                <ScrollView
                    // scrollEnabled={scrollEnabled.value}
                    ref={scrollRef}
                >
                    <View style={Styles.FirstSection}>
                        <Text style={Styles.secitonTitle}>pan gesture </Text>
                        <GestureDetector gesture={panGesture}>
                            <Animated.View style={[Styles.ball, animatedStyles]} />
                        </GestureDetector>
                    </View>

                    <Text style={Styles.secitonTitle}>either side pan gesture </Text>
                    <View style={Styles.eitherSideGestureContainer}>
                        <GestureDetector gesture={panGesture2}>
                            <Animated.View style={[Styles.box, eitherSideStyle]} />
                        </GestureDetector>
                    </View>

                    <View style={Styles.secondSection}>
                        <Text style={Styles.secitonTitle}>tap gesture </Text>
                        <GestureDetector gesture={TapGesture}>
                            <Animated.View style={[Styles.pointer, colorTappedChange]} >
                                <Text>tap</Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                    <View style={Styles.thirdSection}>
                        <Text style={Styles.secitonTitle}>longpress gesture  </Text>
                        <GestureDetector gesture={longpressGesture}>
                            <Animated.View style={[Styles.pointer2, longpressGestureAnimation]} >
                                <Text>long press </Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                    <View style={Styles.fourthSection}>
                        <Text style={Styles.secitonTitle}>rotation gesture  </Text>
                        <GestureDetector gesture={rotateGesture}>
                            <Animated.View style={[Styles.rotator, rotatorStyles]} >
                                <Text style={{ color: '#f7f7f7ff' }}>rotate  </Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                    <View style={Styles.fifthhSection}>
                        <Text style={Styles.secitonTitle}>pinch gesture  </Text>
                        <GestureDetector gesture={pinchGesture}>
                            <Animated.View style={[Styles.pinch, pinchStyles]} >
                                <Text style={{ color: '#f7f7f7ff' }}>pinch  </Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                    <View style={Styles.sixthSection}>
                        <Text style={Styles.secitonTitle}>fling gesture  </Text>
                        <GestureDetector gesture={composedGestureFling}>
                            <Animated.View style={[Styles.fling, flingStyles]} >
                                <Text style={{ color: '#f7f7f7ff' }}>fling   </Text>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                    {/* <View style={Styles.fifthhSection}>
                        <Text style={Styles.secitonTitle}>touch  gesture  </Text>
                        <GestureDetector gesture={touchGesture}>
                            <Animated.View style={[Styles.touchBox, touchStyle]} >
                                <Text style={{ color: '#f7f7f7ff' }}>Touch   </Text>
                            </Animated.View>
                        </GestureDetector>
                    </View> */}

                    <View style={Styles.FirstSection}>
                        <Text style={Styles.secitonTitle}> pan + longpress  gesture(race) </Text>
                        <Popup style={animatedPopupStyles} />
                        <GestureDetector gesture={composedGesture}>
                            <Animated.View style={[Styles.ball, animatedStyles2]} />
                        </GestureDetector>
                    </View>

                    <View style={Styles.seventhSection}>
                        <Text style={Styles.secitonTitle}>zoom rotate , pan (simultenious)  </Text>
                        <GestureDetector gesture={composed4}>
                            <Animated.View style={[Styles.ball4, animatedStyles4]} />
                        </GestureDetector>
                    </View>

                    <View style={Styles.eightSection}>
                        <Text style={Styles.secitonTitle}>single tap and double tap(exlusive )  </Text>
                        <GestureDetector gesture={taps}>
                            <Animated.View style={[Styles.ball5]} />
                        </GestureDetector>
                    </View>

                    <Text style={Styles.secitonTitle}>requireExternalGestureToFail  </Text>
                    <View style={Styles.ninthSction}>
                        <GestureDetector gesture={outerTap}>
                            <View style={Styles.outer}>
                                <GestureDetector gesture={innerTap}>
                                    <View style={Styles.inner} >
                                        <Text style={Styles.boxText} >
                                            make double tap here
                                        </Text>
                                    </View>
                                </GestureDetector>
                            </View>
                        </GestureDetector>
                        <Text style={Styles.secitonTitle}> {tapMessge} </Text>
                    </View>



                    <Text style={Styles.secitonTitle}>blocks extrernal gesture</Text>
                    <ScrollView style={Styles.container} ref={scrollRef}>
                        {ITEMS.map((item: string) => (
                            <Item backgroundColor={item} key={item} scrollRef={scrollRef} />
                        ))}
                    </ScrollView>


                    {/* manual gesture  */}
                    {/* <GestureDetector gesture={gesture}>
                        <Animated.View style={{ flex: 1 }}>
                            {trackedPointers.map((pointer, index) => (
                                <PointerElement pointer={pointer} active={active} key={index} />
                            ))}
                        </Animated.View>
                    </GestureDetector> */}

                </ScrollView>
            </View>
        </View>
    );
}

type ItemProps = {
    backgroundColor: string;
    scrollRef: RefObject<ScrollView | null>;
};
const ITEMS = ['red', 'green', 'blue', 'yellow'];
function Item({ backgroundColor }: ItemProps) {
    const scale = useSharedValue(1);
    const zIndex = useSharedValue(1);

    const pinch23 = Gesture.Pinch()
        // .blocksExternalGesture(scrollRef)
        .onBegin(() => {
            zIndex.value = 100;
        })
        .onChange((e) => {
            scale.value *= e.scaleChange;
        })
        .onFinalize(() => {
            scale.value = withTiming(1, undefined, (finished) => {
                if (finished) {
                    zIndex.value = 1;
                }
            });
        });

    const animatedStyles23 = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        zIndex: zIndex.value,
    }));
    const Colors = useThemeColors();
    const Styles = createDynamicStyles(Colors);
    return (
        <GestureDetector gesture={pinch23}>
            <Animated.View
                style={[
                    { backgroundColor: backgroundColor },
                    Styles.item,
                    animatedStyles23,
                ]}
            />
        </GestureDetector>
    );
}


// manual gesture 
// interface Pointer {
//     visible: boolean;
//     x: number;
//     y: number;
// }
// function PointerElement(props: {
//     pointer: Animated.SharedValue<Pointer>,
//     active: Animated.SharedValue<boolean>,
// }) {
//     const animatedStyle = useAnimatedStyle(() => ({
//         transform: [
//             { translateX: props.pointer.value.x },
//             { translateY: props.pointer.value.y },
//             {
//                 scale:
//                     (props.pointer.value.visible ? 1 : 0) *
//                     (props.active.value ? 1.3 : 1),
//             },
//         ],
//         backgroundColor: props.active.value ? 'red' : 'blue',
//     }));
//     const Colors = useThemeColors();
//     const Styles = createDynamicStyles(Colors);
//     return <Animated.View style={[Styles.pointer, animatedStyle]} />;
// }



function Popup({ style }: any) {
    return (
        <Animated.View style={[styles.popup, style]}>
            <Text style={styles.text}>Popup</Text>
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 6,
        zIndex: 100,
    },
    text: {
        color: 'white',
    },
});
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
            backgroundColor: '#fdf4e4ff',
        },
        secitonTitle: {
            fontSize: normalize(16),
            alignSelf: 'center',
            marginVertical: vh(10)
        },
        FirstSection: {
            backgroundColor: '#ffffffff',
        },
        fourthSection: {
            backgroundColor: '#c7e1fbff',
            paddingBottom: vh(20)
        },
        fifthhSection: {
            backgroundColor: '#d2f4d0ff',
            paddingBottom: vh(20),
            minHeight: vh(200)
        },
        sixthSection: {
            backgroundColor: '#f4ded0ff',
            paddingBottom: vh(20),
            minHeight: vh(200)
        },
        seventhSection: {
            backgroundColor: '#f4ded0ff',
            paddingBottom: vh(20),
            minHeight: vh(200)
        },
        eightSection: {
            backgroundColor: '#c2eda6ff',
            paddingBottom: vh(20),
            minHeight: vh(200)
        },
        ninthSction: {
            backgroundColor: '#f7cc95ff',
            paddingBottom: vh(20),
            minHeight: vh(200),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        ball: {
            width: vh(50),
            height: vw(50),
            borderRadius: normalize(100),
            backgroundColor: 'blue',
            alignSelf: 'center',
        },
        ball4: {
            width: vh(150),
            height: vw(100),
            backgroundColor: '#e47373ff',
            alignSelf: 'center',
        },
        ball5: {
            width: vh(150),
            height: vw(100),
            backgroundColor: '#466debff',
            alignSelf: 'center',
        },
        secondSection: {
            backgroundColor: '#d8f1beff',
        },
        thirdSection: {
            backgroundColor: '#f7f6d0ff',
        },
        pointer: {
            width: vw(60),
            height: vh(60),
            // borderRadius: normalize(30),
            alignSelf: 'center',
            backgroundColor: '#ef9c3fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        pointer2: {
            width: vw(260),
            height: vh(60),
            alignSelf: 'center',
            backgroundColor: '#ef9c3fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        box: {
            width: vh(60),
            height: vw(60),
            borderRadius: normalize(30),
            backgroundColor: 'red',
        },
        eitherSideGestureContainer: {
            alignSelf: 'center',
            backgroundColor: '#f2b6b6ff',
            width: vw(250),
            height: vh(60),
            borderRadius: normalize(30)
        },
        rotator: {
            width: vh(200),
            height: vw(60),
            borderRadius: normalize(5),
            backgroundColor: '#4d1254ff',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        pinch: {
            width: vh(150),
            height: vw(100),
            borderRadius: normalize(5),
            backgroundColor: '#03126fff',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        fling: {
            width: vh(180),
            height: vw(80),
            borderRadius: normalize(30),
            backgroundColor: '#046309ff',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        touchBox: {
            width: vh(380),
            height: vw(80),
            borderRadius: normalize(30),
            backgroundColor: '#ed6814ff',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },


        // container: {
        //     flex: 1,
        //     alignItems: 'center',
        //     justifyContent: 'center',
        // },
        outer: {
            width: vw(250),
            height: vh(250),
            backgroundColor: 'lightblue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        inner: {
            width: vw(100),
            height: vh(100),
            backgroundColor: 'blue',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        boxText: {
            fontSize: normalize(16),
            color: Colors.constantWhite,
            textAlign: 'center'
        },
        container: {
            flex: 1,
        },
        item: {
            height: vh(100),
            width: vw(200)
        },
        pointer10: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'red',
            position: 'absolute',
            marginStart: -30,
            marginTop: -30,
        },
    });
    return Styles;
};