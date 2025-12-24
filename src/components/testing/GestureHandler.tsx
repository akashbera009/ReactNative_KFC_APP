import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//  gesture 
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // animation 
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 })

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
        })
        .onChange(() => {
            console.log('changning ');

        })
        // .minPointers(2)
        // .activateAfterLongPress(300)
        // .activeOffsetX(20)
        // .failOffsetX(100)
        // .failOffsetY([-20, 20])
        // .activeOffsetY([-Infinity, Infinity])
        .enabled(true)
        .shouldCancelWhenOutside(false)
        .cancelsTouchesInView(true)
    // .hitSlop({
    //     height :150 , 
    //     top : 150 , 
    //     // bottom : 150 , 
    //     // width : 30 , 
    //     // left : 15 , 
    // })


    // simple pan gesture 
    const onLeft = useSharedValue(true)
    const position = useSharedValue(0)
    const END_POSITION = 200
    const eitherSideStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: position.value }
        ],
        backgroundColor: onLeft.value ? 'blue' : 'green'
    }))
    const panGesture2 = Gesture.Pan()
        .onUpdate((e) => {
            console.log(onLeft.value);
            if (onLeft.value)
                position.value = e.translationX
            else
                position.value = e.translationX + END_POSITION
        })
        .onEnd(() => {
            if (position.value > END_POSITION / 2) {
                position.value = withSpring(END_POSITION)
                onLeft.value = false
            }
            else {
                position.value = withSpring(0)
                onLeft.value = true
            }
        })
        .minDistance(60)

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
    .onUpdate((e)=>{
        rotateRef.value = savedRotation.value +  e.rotation
        console.log(e.rotation);
    })
    .onEnd(()=>{
        savedRotation.value = rotateRef.value
    })
    const rotatorStyles = useAnimatedStyle(()=>({
        transform:[{rotateZ : `${(rotateRef.value/Math.PI)*180}deg`}]
    }))
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
                        <Animated.View style={[Styles.rotator , rotatorStyles]} >
                            <Text style={{color : '#f7f7f7ff'}}>rotate  </Text>
                        </Animated.View>
                    </GestureDetector>
                </View>
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
            paddingBottom :  vh(100)
        },
        ball: {
            width: vh(100),
            height: vw(100),
            borderRadius: normalize(100),
            backgroundColor: 'blue',
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
            height: vw(100),
            borderRadius: normalize(5),
            backgroundColor: '#4d1254ff',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        }
    });
    return Styles;
};