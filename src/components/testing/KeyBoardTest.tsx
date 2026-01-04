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
    SharedValue,
    SlideInRight,
    SlideOutLeft,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { runOnJS } from 'react-native-worklets';

const WIDTH = screenWidth
const HEIGHT = vh(600)
interface peopleType {
    id: string,
    name: string,
    image: string,
    description: string
}
export default function KeyBoardTest() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // data 
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
    // nimation
    const swipeDirection = useSharedValue<number>(0);
    const acceptAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor:
                swipeDirection.value === 1
                    ? Colors.greenShade
                    : Colors.timerFadeText,
            transform: [{ scale: swipeDirection.value === 1 ? 1.15 : 1, },],
        };
    });

    const rejectAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor:
                swipeDirection.value === -1
                    ? Colors.KFC_red_Fade_Solid
                    : Colors.timerFadeText,
            transform: [{ scale: swipeDirection.value === -1 ? 1.15 : 1, },],
        };
    });
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
                    {peopleData.length === 0 ? null : (
                        peopleData.map((item, idx) => (
                            < CardComponent
                                key={idx}
                                idx={idx}
                                item={item}
                                Styles={Styles}
                                peopleData={peopleData}
                                handelDelecard={handelDelecard}
                                swipeDirection={swipeDirection}
                                Colors={Colors}
                            />
                        ))
                    )}
                </View>
                <View style={[Styles.IndicatorContainer, { bottom: inset.bottom }]}>
                    <Animated.View style={[Styles.IndicatotImageContainer, rejectAnimatedStyle,]}>
                        <TouchableOpacity
                            onPress={() => {
                                handelDelecard(peopleData.at(0)?.id);
                            }}
                        >
                            <Image
                                source={Images.Cross_Icon}
                                style={Styles.IndicatotImage}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[Styles.IndicatotImageContainer, acceptAnimatedStyle,]}>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('Accepted');
                            }}>
                            <Image
                                source={Images.Tick_Mark}
                                style={Styles.IndicatotImage}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
}

interface CardProp {
    idx: number,
    swipeDirection: SharedValue<number>,
    Styles: ReturnType<typeof createDynamicStyles>,
    item: peopleType,
    peopleData: peopleType[],
    handelDelecard: (ele: string | undefined) => void,
    Colors: ColorType
}
const CardComponent = ({
    idx, swipeDirection, Styles, item, peopleData, handelDelecard, Colors
}: CardProp
) => {
    const linearGradientColorList: string[] = [Colors.HyperTransparent2, Colors.HyperTransparent, Colors.constantBlack]
    const peopleLength: number = peopleData?.length
    // gesture and reanimated initializations
    const cardIsUpperTap = useSharedValue<boolean>(true)
    const CardRef = useAnimatedRef<View>()
    const position = useSharedValue<{ x: number, y: number }>({ x: 0, y: 0 })
    // gestures 
    const [isAccepting, setIsAccepting] = useState<number>(0)
    const fakeTap = Gesture.Tap()
    const pan = Gesture.Pan()
        .onBegin((e) => {
            const relativeCoords = getRelativeCoords(
                CardRef,
                e.absoluteX,
                e.absoluteY
            )
            if (relativeCoords) {
                cardIsUpperTap.value = relativeCoords.y < HEIGHT / 2
            }
        })
        .onUpdate((e) => {
            position.value = {
                x: e.translationX,
                y: e.translationY
            }
            swipeDirection.value = e.translationX > 0 ? 1 : -1;
        })
        .onEnd((e) => {
            if (e.translationX > 110) {
                runOnJS(setIsAccepting)(1)
            } else if (e.translationX < -110) {
                runOnJS(setIsAccepting)(-1)
            }
            position.value = withSpring({ x: 0, y: 0 })
            swipeDirection.value = 0;
            runOnJS(setIsAccepting)(0)
        })
    useEffect(() => {
        if (isAccepting === 1) {
            Alert.alert('This card has been accepted ')
            console.log('accepted ');
        }
        else if (isAccepting === -1) {
            handelDelecard(peopleData?.at(0)?.id)
            console.log('deletd ');
        }
    }, [isAccepting, handelDelecard, peopleData])
    // animated styles
    const cardgestureStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: position.value.x },
            { translateY: position.value.y },
            {
                rotate: interpolate(
                    position.value.x,
                    [-100, 100],
                    cardIsUpperTap.value ? [-10, 10] : [10, -10],
                    Extrapolation.CLAMP
                ) + 'deg'
            }
        ]
    }))
    return (
        <GestureDetector gesture={idx === 0 ? pan : fakeTap} key={idx}>
            <Animated.View
                entering={SlideInRight.duration(800).delay(idx * 120)}
                exiting={SlideOutLeft.duration(400)}
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
            backgroundColor: Colors.bodyColor,flexDirection: 'row',
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
            height: HEIGHT,
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
        IndicatotImageContainer: {
            height: vh(50),
            width: vh(50),
            backgroundColor: Colors.timerFadeText,
            borderRadius: normalize(50),
            justifyContent: 'center',
            alignItems: 'center'
        },
        IndicatotImage: {
            height: vh(25),
            width: vh(25),
            tintColor: Colors.constantWhite,
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