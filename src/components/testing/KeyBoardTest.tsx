import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw, screenWidth } from '../../utils/Dimensions';
// gesture and reanimated 
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    getRelativeCoords,
    interpolate,
    JumpingTransition,
    RotateInUpLeft,
    RotateOutDownLeft,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { runOnJS } from 'react-native-worklets';

const WIDTH = screenWidth
export default function KeyBoardTest() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // data 
    interface peopleType {
        id: string,
        name: string,
        image: string,
        description: string
    }
    const peopleRawData: peopleType[] = [
        {
            id: '1',
            name: 'Ava Johnson',
            image: 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=',
            description: 'Product designer with a passion for minimal UI.',
        },
        {
            id: '2',
            name: 'Liam Carter',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3jTszSflQt-SjZGIWqJRegF0GrAVzpCQtg&s',
            description: 'Full-stack developer focused on scalable apps.',
        },
        {
            id: '3',
            name: 'Sophia Martinez',
            image: 'https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg',
            description: 'Mobile engineer who loves smooth animations.',
        },
        {
            id: '4',
            name: 'Noah Williams',
            image: 'https://cdn.britannica.com/98/235798-050-3C3BA15D/Hamburger-and-french-fries-paper-box.jpg',
            description: 'Tech lead experienced in React Native & TypeScript.',
        },
        {
            id: '5',
            name: 'Emily Chen',
            image: 'https://blog.swiggy.com/wp-content/uploads/2024/02/Masala-Dosa-1024x538.jpg',
            description: 'UX researcher turning insights into great products.',
        },
    ];
    const [peopleData, setPeopleDate] = useState<peopleType[]>(peopleRawData)
    const handelDelecard = useCallback((idx: string | undefined) => {
        setPeopleDate(prev => prev.filter(peop => peop.id !== idx))
    }, [])
    // linear gradient color 
    const [isRightSwipe, setIsRightSwipe] = useState<number>(0)
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { paddingTop: inset.top, }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        style={{ padding: vw(12) }}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.ReAnimatedScreen}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                <View style={Styles.CardsContainer}>
                    {peopleData.map((item, idx) => (
                        < CardComponent
                            key={idx}
                            idx={idx}
                            item={item}
                            Styles={Styles}
                            peopleData={peopleData}
                            handelDelecard={handelDelecard}
                            setIsRightSwipe={setIsRightSwipe}
                        />
                    ))}
                </View>
                <View style={[Styles.IndicatorContainer, { bottom: inset.bottom }]}>
                    <TouchableOpacity
                        onPress={() => { handelDelecard(peopleData.at(0)?.id) }}
                    >
                        <Image
                            source={Images.Cross_Icon}
                            style={[Styles.IndicatotImage, isRightSwipe === -1 && Styles.CancelBG]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Accepted ')
                        }}
                    >
                        <Image
                            source={Images.Tick_Mark}
                            style={[Styles.IndicatotImage, isRightSwipe === 1 && Styles.AcceptBG]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const CardComponent = ({ idx, setIsRightSwipe, Styles, item, peopleData, handelDelecard, }: any) => {
    const linearGradientColorList = ["#00000007", "#0000002c", "#080808ff"]
    const peopleLength = peopleData.length
    // gesture and reanimated initializations
    const [cord, setCord] = useState({ x: 0, y: 0 })
    const [cardIsUpperTap, setCardIsUppertap] = useState<boolean>(true)
    const CardRef = useAnimatedRef()
    const position = useSharedValue({ x: 0, y: 0 })
    // gestures 
    const fakeTap = Gesture.Tap()
    const [isAccepting, setIsAccepting] = useState<number>(0)
    const pan = Gesture.Pan()
        .onBegin((e) => {
            const relativeCoords = getRelativeCoords(
                CardRef,
                e.absoluteX,
                e.absoluteY
            )
            if (relativeCoords) {
                runOnJS(setCord)(relativeCoords)
            }
        })
        .onUpdate((e) => {
            position.value = {
                x: e.translationX,
                y: e.translationY
            }
            if (e.translationX > 0)
                runOnJS(setIsRightSwipe)(1)
            else
                runOnJS(setIsRightSwipe)(-1)
        })
        .onEnd((e) => {
            if (e.translationX > 110) {
                runOnJS(setIsAccepting)(1)
            } else if (e.translationX < -110) {
                runOnJS(setIsAccepting)(-1)
            }
            position.value = withSpring({ x: 0, y: 0 })
            runOnJS(setIsRightSwipe)(0)
            runOnJS(setIsAccepting)(0)
        })
    // animated styles 
    useEffect(() => {
        if (cord.y > 400) {
            console.log('lower touch');
            setCardIsUppertap(false)
        } else {
            console.log('upper touchh ');
            setCardIsUppertap(true)
        }
    }, [cord.y])
    useEffect(() => {
        if (isAccepting === 1) {
            Alert.alert('This card has been accepted ')
            console.log('accepted ');
        }
        else if (isAccepting === -1) {
            handelDelecard(peopleData.at(0)?.id)
            console.log('deletd ');
        }
    }, [isAccepting, handelDelecard, peopleData])

    const cardgestureStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: position.value.x },
            { translateY: position.value.y },
            {
                rotate: interpolate(
                    position.value.x,
                    [-100, 100],
                    cardIsUpperTap ? [-10, 10] : [10, -10],
                    Extrapolation.CLAMP
                ) + 'deg'
            }
        ]
    }))
    return (
        <GestureDetector gesture={idx === 0 ? pan : fakeTap} key={idx}>
            <Animated.View
                entering={RotateInUpLeft.duration(800).delay(idx * 120)}
                exiting={RotateOutDownLeft.duration(400)}
                layout={JumpingTransition}
                style={[Styles.CardWrapper,
                {
                    top: 5 * (peopleLength - idx),
                    zIndex: peopleLength - idx,
                }]}
            >
                <Animated.View
                    ref={CardRef}
                    style={[
                        Styles.Card,
                        idx === 0 && cardgestureStyle,
                        {
                            transform: [{ scaleX: 1 - idx * 0.05 - idx * idx * 0.02 }]
                        }
                    ]}
                >
                    <Image source={{ uri: item.image }} style={Styles.Image} />
                    <LinearGradient colors={linearGradientColorList} style={StyleSheet.absoluteFill} />
                    <View style={Styles.NameAndDescContainer}>
                        <Text style={Styles.name}>{item.name}</Text>
                        <Text style={Styles.description} numberOfLines={1}>{item.description}</Text>
                    </View>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1,
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            paddingHorizontal: vw(5),
            paddingBottom: vh(12),
            width: '100%',
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            zIndex: 999,
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: 0, height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        BackIconAndHeaderText: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
        },
        body: {
            flex: 1,
            backgroundColor: Colors.bodyShadeColor,
        },
        CardsContainer: {
            height: vh(600),
            width: WIDTH - vw(10),
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center',
        },
        CardWrapper: {
            position: 'absolute',
            left: 0,
        },
        Card: {
            height: vh(600),
            width: WIDTH - vw(10),
            borderRadius: normalize(20),
            borderWidth: normalize(1),
            borderColor: Colors.textFadeBlack,
            overflow: 'hidden',
        },
        Image: {
            height: '100%',
            width: '100%',
            position: 'absolute'
        },
        NameAndDescContainer: {
            position: 'absolute',
            bottom: vh(10),
            left: vw(10)
        },
        name: {
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(20),
            color: Colors.constantWhite,
        },
        description: {
            fontFamily: Fonts.helveticaMedium,
            fontSize: normalize(14),
            color: Colors.constantWhite,
        },
        IndicatorContainer: {
            height: vh(70),
            width: vw(200),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        IndicatotImage: {
            height: vh(50),
            width: vh(50),
            tintColor: Colors.constantWhite,
            backgroundColor: Colors.timerFadeText,
            borderRadius: normalize(50),
            padding: normalize(15)
        },
        CancelBG: {
            backgroundColor: Colors.KFC_red_Fade_Solid
        },
        AcceptBG: {
            backgroundColor: Colors.greenShade
        }
    });
    return Styles;
};