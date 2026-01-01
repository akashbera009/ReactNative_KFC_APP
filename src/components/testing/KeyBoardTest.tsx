import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
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
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

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
    const peopleData: peopleType[] = [
        {
            id: '1',
            name: 'Ava Johnson',
            image: 'https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=',
            description: 'Product designer with a passion for minimal UI.',
        },
        // {
        //     id: '2',
        //     name: 'Liam Carter',
        //     image: 'https://randomuser.me/api/portraits/men/32.jpg',
        //     description: 'Full-stack developer focused on scalable apps.',
        // },
        // {
        //     id: '3',
        //     name: 'Sophia Martinez',
        //     image: 'https://randomuser.me/api/portraits/women/68.jpg',
        //     description: 'Mobile engineer who loves smooth animations.',
        // },
        // {
        //     id: '4',
        //     name: 'Noah Williams',
        //     image: 'https://randomuser.me/api/portraits/men/76.jpg',
        //     description: 'Tech lead experienced in React Native & TypeScript.',
        // },
        // {
        //     id: '5',
        //     name: 'Emily Chen',
        //     image: 'https://randomuser.me/api/portraits/women/12.jpg',
        //     description: 'UX researcher turning insights into great products.',
        // },
    ];
    // linear gradient color 
    const linearGradientColorList = ["#00000007", "#0000002c", "#080808ff"]
    const peopleLength = peopleData.length
    // gesture and reanimated 
    const position = useSharedValue({ x: 0, y: 0 })
    const rotateValue = useSharedValue('0')
    const pan = Gesture.Pan()
        .onUpdate((e) => {
            position.value = {
                x: e.translationX,
                y: e.translationY
            }
            // rotateValue.value = i
        })
        .onEnd((e) => {
            position.value = withSpring({ x: 0, y: 0 })
        })
    const cardgestureStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: position.value.x },
            { translateY: position.value.y },
            {
                rotate: interpolate(
                    position.value.x,
                    [-100, 100],
                    [-10, 10],
                    Extrapolation.CLAMP
                ) + 'deg'
            }
        ]
    }))
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
                {/* <ScrollView> */}
                <View style={Styles.CardsContainer}>
                    <FlatList
                        data={peopleData}
                        keyExtractor={people => people.id}
                        renderItem={({ item, index }) => (
                            <GestureDetector gesture={pan}>
                                <Animated.View style={[
                                    Styles.Card,
                                    cardgestureStyle,
                                    { top: peopleLength - index + vh(10) }
                                ]}>
                                    <LinearGradient colors={linearGradientColorList} style={Styles.LinearGradient} >
                                            <Image source={{ uri: item.image }} style={Styles.Image} />
                                        <View style={Styles.NameAndDescContainer}>
                                            <Text style={Styles.name}>{item.name}</Text>
                                            <Text style={Styles.description} numberOfLines={1}>{item.description}</Text>
                                        </View>
                                    </LinearGradient>
                                </Animated.View>
                            </GestureDetector>
                        )}
                    />
                </View>
                {/* </ScrollView> */}
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1,
            backgroundColor: '#f3d1d1ff',
        },
        NavWrapper: {
            paddingHorizontal: vw(16),
            paddingBottom: vh(12),
            width: '100%',
            backgroundColor: '#b7badbff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
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
            backgroundColor: '#b7dbc0ff',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
        },
        body: {
            flex: 1,
            backgroundColor: '#b8eafaff',
            // position: 'relative',
            // zIndex: 10
        },
        CardsContainer: {
            flex: 1,
            // marginTop: vh(20),
            alignItems: 'center',
            backgroundColor: '#a0a0a0',
            // position: 'relative',
            // zIndex: 15
        },
        Card: {
            height: vh(500),
            width: WIDTH - vw(100),
            backgroundColor: 'rgba(255, 239, 239, 1)',
            borderRadius: normalize(20),
            borderWidth: normalize(1),
            borderColor: Colors.textFadeBlack,
            overflow: 'hidden',
            // position: 'relative',
            // zIndex: 20
        },
        LinearGradient: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 20
        },
        Image: {
            height: '100%',
            width: '100%',
            position : 'absolute'
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
        }
    });
    return Styles;
};