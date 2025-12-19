import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// util imports 
import { useThemeColors } from '../../../utils/Colors';
import { useStrings } from '../../../utils/Strings';
import Fonts from '../../../utils/Fonts'
import Images from '../../../utils/LocalImages';
import { normalize, vh, vw } from '../../../utils/Dimensions';
export default function MenuCategorizeScreenBottomSheet({ setActiveCategory, frequencyArray }: MenuCategorizationScreenProps) {
    const slide = useRef(new Animated.Value(800)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors, Fonts)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const slideUp = () :void=> {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fade, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };
    const slideDown = ():void => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 450,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fade, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };
    const closeModal = ():void => {
        slideDown();
        setTimeout(() :void=> {
            navigation.pop();
        }, 400);
    };
    useEffect(():void => {
        slideUp();
    }, []);
    return (
        <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View>
                    <View style={Styles.InnerContainer}>
                        <View style={Styles.HeaderContainer}>
                            <View style={Styles.HeaderWrapper}>
                                <Text style={Styles.Header} >{Strings.menuCategorizationHeader.toUpperCase()} </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.pop()}
                                    style={Styles.crossIconContainer}>
                                    <Image source={Images.Cross_Icon} style={Styles.crossIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.categoryContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {frequencyArray.map((item: CategoryFrequency, idx: number) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setActiveCategory(item?.category);
                                            navigation.pop()
                                        }}
                                        key={idx} style={Styles.categoryEntries}>
                                        <View style={Styles.CategoryTextContainer}>
                                            <Text style={Styles.CategoryText}>{item.category} </Text>
                                            <Text style={Styles.CategoryText}>({item.count}) </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={Styles.ArrowContainer}
                                            onPress={() => { }}
                                        >
                                            <Image source={Images.Arrow_down} style={Styles.arrowRight} />
                                        </TouchableOpacity>
                                        <View style={Styles.customBorder} />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Animated.View >
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        backDrop: {
            backgroundColor: Colors.SemiTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: vh(600)
        },
        InnerContainer: {
            height: '100%',
            backgroundColor: Colors.bodyColor,
            position: 'relative',
        },
        HeaderContainer: {
            height: vh(70),
            width: '100%',
            backgroundColor: Colors.blueMixBG,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        HeaderWrapper: {
            width: '90%',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        Header: {
            fontSize: normalize(18),
            fontFamily: Fonts.font18,
            color: Colors.textBlack
        },
        crossIconContainer: {
            height: vh(23),
            width: vw(23),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(50),
            backgroundColor: Colors.textBlack,
        },
        crossIcon: {
            height: vh(10),
            width: vw(10),
            tintColor: Colors.bodyColor
        },
        categoryContainer: {
            width: '100%',
        },
        categoryEntries: {
            width: '90%',
            height: vh(45),
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: vh(10),
        },
        CategoryTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        CategoryText: {
            fontSize: normalize(18),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
        },
        ArrowContainer: {
            transform: [{ rotate: '-90deg' }],
        },
        arrowRight: {
            height: vh(25),
            width: vw(25),
            tintColor: Colors.textFadeBlack
        },
        customBorder: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            borderBottomColor: Colors.blueLightBG,
            borderBottomWidth: normalize(1),
        }
    })
    return Styles
}