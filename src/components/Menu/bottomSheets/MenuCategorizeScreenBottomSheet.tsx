import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// util imports 
import { useThemeColors } from '../../../utils/Colors';
import { useStrings } from '../../../utils/Strings';
import Fonts from '../../../utils/Fonts'
import Images from '../../../utils/LocalImages';
import { normalize, vh, vw } from '../../../utils/Dimensions';
import { useMenuCategory } from '../../../context/MenuContext';
export default function MenuCategorizeScreenBottomSheet({ frequencyArray }: MenuCategorizationScreenProps) {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { setActiveCategory } = useMenuCategory()
    // animation
    const slideRef = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: slideRef.value }],
    }))
    const fadeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            slideRef.value,
            [0, 500],
            [1, 0]
        )
    }))
    const slideDown = () => {
        slideRef.value = withTiming(450, { duration: 500 })
    }
    const closeModal = (): void => {
        slideDown();
        setTimeout(() => {
            navigation.pop();
        }, 400);
    };
    useEffect((): void => {
        slideRef.value = withTiming(0, { duration: 500 })
    }, [slideRef]);
    return (
        <Animated.View style={[Styles.backDrop, fadeStyle]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, animatedStyles]}>
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

const createDynamicStyles = (Colors: ColorType) => {
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
            backgroundColor: Colors.blueMixBG,justifyContent: 'center',
            alignItems: 'center',
        },
        HeaderWrapper: {
            width: '90%',
            alignSelf: 'center',flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        Header: {
            fontSize: normalize(18),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        crossIconContainer: {
            height: vh(23),
            width: vw(23),justifyContent: 'center',
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
            alignSelf: 'center',flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: vh(10),
        },
        CategoryTextContainer: {flexDirection: 'row',
            alignItems: 'center',
        },
        CategoryText: {
            fontSize: normalize(18),
            fontFamily: Fonts.helveticaMedium,
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