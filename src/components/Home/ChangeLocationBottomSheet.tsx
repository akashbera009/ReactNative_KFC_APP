import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize, vh, vw } from '../../utils/Dimensions';
// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import { useStrings } from '../../utils/Strings';
import Images from '../../utils/LocalImages';
import { DeliveryDetails } from '../../data/DeliveryDetails';
export default function ChangeLocationBottomSheet() {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors)
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
                <View >
                    <View style={Styles.InnerContainer}>
                        <View style={Styles.bottomSheeetContentContainer}>
                            <Image source={Images.Mao_Location} style={Styles.mapImage} />
                            <Image source={Images.Cloud} style={Styles.Cloud1} />
                            <Image source={Images.Cloud2} style={Styles.Cloud2} />
                            <Text style={Styles.ConfirmHeader}>{Strings.consfirmLocation}</Text>
                            <Text style={Styles.countryDescription} >{Strings.consfirmLocationDescription}</Text>
                            <View style={Styles.LocationContainer}>
                                <Image source={Images.Location} style={Styles.locationIcon} />
                                <Text style={Styles.Address} numberOfLines={1}>{DeliveryDetails?.address} </Text>
                            </View>
                            <View style={[Styles.DoneButtonContainer, { bottom: inset.bottom }]}>
                                <TouchableOpacity
                                    style={[Styles.Button, Styles.ChangeButton]}
                                    onPress={() => {
                                        navigation.goBack()
                                        setTimeout(() => {
                                            navigation.navigate(Strings.AppStack, {
                                                screen: Strings.MapsScreen
                                            })
                                        }, 500);
                                    }
                                    }>
                                    <Text style={[Styles.DoneButtonText, Styles.ChangeButtonText]}>{Strings.change.toLocaleUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[Styles.Button]}
                                    onPress={() => navigation.pop()}>
                                    <Text style={Styles.DoneButtonText}>{Strings.confirm.toLocaleUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
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
            height: vh(450),
        },
        InnerContainer: {
            height: '100%',
            backgroundColor: Colors.bodyColor,
            borderTopRightRadius: normalize(45),
            borderTopLeftRadius: normalize(45),
            position: 'relative',
        },

        closeButton: {
            marginVertical: vh(8),
            marginHorizontal: 'auto',
            height: vh(40),
            width: vw(40),
            borderRadius: normalize(100),
            backgroundColor: Colors.textBlack,justifyContent: 'center',
            alignItems: 'center'
        },
        bottomSheeetContentContainer: {
            height: '100%',
        },
        mapImage: {
            height: vh(100),
            width: vw(100),
            alignSelf: 'center',
            marginTop: normalize(30),
            marginBottom: normalize(20)
        },
        Cloud1: {
            position: 'absolute',
            top: '8%',
            right: '20%',
            height: vh(30),
            width: vw(30),
            tintColor: Colors.CloudBorder
        },
        Cloud2: {
            position: 'absolute',
            top: '15%',
            left: '20%',
            height: vh(40),
            width: vw(40),
            tintColor: Colors.CloudBorder,
        },
        ConfirmHeader: {
            fontSize: normalize(22),
            fontFamily: Fonts.helveticaBold,
            alignSelf: 'center',
            letterSpacing: normalize(1),
        },
        countryDescription: {
            width: "90%",
            alignSelf: 'center',
            fontFamily: Fonts.helveticaMedium,
            fontSize: normalize(18),
            textAlign: 'center',
            color: Colors.blueShadows,
            marginTop: vh(15)
        },
        LocationContainer: {
            width: '90%',
            alignSelf: 'center',
            height: vh(50),
            marginVertical: vw(30),
            borderRadius: normalize(2),
            backgroundColor: Colors.blueLightBG,flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        locationIcon: {
            height: vh(22),
            width: vw(22),
            margin: normalize(10),
            marginLeft: vw(20)
        },
        Address: {
            width: '80%',
            fontSize: normalize(14),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.timerFadeText,
        },
        DoneButtonContainer: {
            position: 'absolute',
            left: '5%',
            width: '90%',
            alignSelf: 'center',alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        Button: {
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(4),
            paddingVertical: vh(10),
        },
        ChangeButton: {
            backgroundColor: Colors.bodyColor,
            borderWidth: 1,
            borderColor: Colors.fadeWhiteText2
        },
        ChangeButtonText: {
            color: Colors.textBlack,
        },
        DoneButtonText: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaBold,
            color: Colors.constantWhite,
            marginHorizontal: vw(50),
            marginVertical: vh(5)
        }
    })
    return Styles
}