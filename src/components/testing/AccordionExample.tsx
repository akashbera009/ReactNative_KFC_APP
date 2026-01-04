import { RNSVGFeColorMatrix } from "react-native-svg";

import { Button, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { vw, normalize, vh } from "../../utils/Dimensions";
import Animated, { scrollTo, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useScrollOffset, useSharedValue } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface peopleType {
    id: string,
    name: string,
    image: string,
    description: string
}
export default function MenuCard() {
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
    const [bottomTabHeight, setBottomTabHeight] = useState(0);
    const animatedScrollRef = useAnimatedRef()
    const scrollOffset = useScrollOffset(animatedScrollRef)
    const scrollHeight = useSharedValue(0)
    // useAnimatedReaction(
    //     () => scrollOffset.value,
    //     (currentValue, _) => {
    //         scrollHeight.value = currentValue
    //     })

    const text = useDerivedValue(() => { return { val: scrollHeight.value } })
    const scrollUp = () => {
        scrollTo(
            animatedScrollRef,
            0,
            scrollHeight.value + 200,
            true
        )
    }
    return (
        <View style={Styles.parent} >
            <View style={[Styles.NavWrapper, { paddingTop: inset.top, }]} >
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
            <View style={Styles.Body}>
                <Animated.ScrollView
                    // ref={animatedScrollRef}
                    contentContainerStyle={{
                        paddingBottom: bottomTabHeight,
                    }}
                >
                    {peopleData.map((item, idx) => (
                        <View style={Styles.cards} key={idx}>
                            <Text>{item.name}</Text>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
            {/* <KeyboardAwareScrollView extraScrollHeight={100}>
            <View style={Styles.cards}>
                    <TextInput defaultValue="aja" />
                </View>
            </KeyboardAwareScrollView> */}

            {/* <View
                style={[Styles.BottomTabContainer, { bottom: 0 }]}
                onLayout={(e) => {
                    setBottomTabHeight(e.nativeEvent.layout.height)
                }}
            >
                <View style={[Styles.BottomTab, { marginBottom: inset.bottom }]}>
                    <TouchableOpacity onPress={() => { scrollUp() }}>
                        <Text>FOcus second {text.value.val}</Text>
                    </TouchableOpacity>
                </View>

            </View> */}
        </View>
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
        BottomTabContainer: {
            width: '100%',
            position: 'absolute',
            left: 0,
            alignItems: 'center',
            backgroundColor: '#b8e0eaff',
        },
        BottomTab: {
            width: '80%',
            backgroundColor: '#8be3fc54',
            borderWidth: normalize(1),
            borderColor: '#022833b9',
            borderRadius: normalize(20),
            padding: normalize(20),
            justifyContent: 'center',
            alignItems: 'center'
        },
        cards: {
            height: vh(250),
            width: vw(300),
            borderWidth: normalize(1),
            borderColor: '#022833b9',
            borderRadius: normalize(10),
            backgroundColor: '#ebf0abff',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: normalize(10)
        },
    });
    return Styles;
};