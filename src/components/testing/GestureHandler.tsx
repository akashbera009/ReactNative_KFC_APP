import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//  gesture 
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { DesignWidth, normalize, vh, vw } from '../../utils/Dimensions';

export default function GestureHandler() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // animation 
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 })
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offset.value.x },
            { translateY: offset.value.y },
            { scale: withSpring(isPressed.value ? 1.2 : 1) },
        ],
        backgroundColor: isPressed.value ? 'yellow' : 'blue',
    }))

    // pan gesture 
    const panGesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y
            }
        })
        .onEnd((e) => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y
            }
        })
        .onFinalize(() => {
            isPressed.value = false
        })

    // simple pan gesture 
    const position = useSharedValue(0)
    const onLeft = useSharedValue(true)
    const END_POSITION = 200
    const panGesture2 = Gesture.Pan()
        .onUpdate((e) => {
            if (onLeft.value) {
                position.value = e.translationX;
            } else {
                position.value = END_POSITION + e.translationX;
            }
        })
        .onEnd((e) => {
            if (position.value > END_POSITION / 2) {
                position.value = withTiming(END_POSITION, { duration: 100 });
                onLeft.value = false;
            } else {
                position.value = withTiming(0, { duration: 100 });
                onLeft.value = true;
            }
        });
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    // tap gesture 
    const isTapped = useSharedValue('blue')
    const colorTappedChange = useAnimatedStyle(() => ({
        backgroundColor: isTapped.value
    }))
    const TapGesture = Gesture.Tap()
        .onStart(() => {
            console.log('start');
            isTapped.value = 'red'
        })
        .onBegin(() => {
            console.log('begin');
            isTapped.value = 'yellow'
        })
        .onEnd(() => {
            console.log('end');
            isTapped.value = 'orange'
        })
        .onFinalize(() => {
            console.log('finalize');
            isTapped.value = "black"
        })
        .numberOfTaps(2)
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
                    <GestureDetector gesture={panGesture2} >
                        <Animated.View style={[Styles.box, animatedStyle]} />
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
            </View>
        </View>
    );
}
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
            // flex : 1 ,
            backgroundColor: '#ffffffff',
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
        pointer: {
            width: vw(60),
            height: vh(60),
            borderRadius: normalize(30),
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
        }
    });
    return Styles;
};