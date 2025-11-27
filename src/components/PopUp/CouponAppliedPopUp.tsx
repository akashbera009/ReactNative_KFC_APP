import { StyleSheet, Text, View, Animated, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
// utils files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStrings } from '../../utils/Strings';


export default function CouponAppliedPopUp() {
    const Colors = useThemeColors()
    const Styles = createDynamicStyles(Colors, Fonts)
    const Strings = useStrings()
    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const slideUp = () => {
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
    const slideDown = () => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 500,
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
    const closeModal = () => {
        slideDown();
        setTimeout(() => {
            navigation.pop();
        }, 400);
    };

    useEffect(() => {
        slideUp();
    }, []);
    return (
        <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={Styles.OuterContainer}>
                    <View style={Styles.InnerContainer}>
                        <View style={Styles.CoupoonAppliedContainer}>
                            <View >
                                <View style={Styles.verticalStrap} />
                                <Image source={Images?.Bow_Tie} style={Styles.bow_Tie} />
                            </View>
                            <View style={Styles.RightContainer}>
                                <Text style={Styles.offerApplied}>{Strings?.offerApplied.toUpperCase()} </Text>
                                <Text style={Styles.offerAvailderText}>{Strings?.offerAvailText} </Text>
                            </View>
                            <TouchableOpacity
                                style={Styles.gotItButton}
                                onPress={() => navigation.pop()}
                            >
                                <Text style={Styles.gotItText}>{Strings?.gotIt.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        backDrop: {
            backgroundColor: Colors.HyperTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: 180,
        },
        OuterContainer: {
        },
        InnerContainer: {
            height: 200,
            width: "100%",
            position: 'relative',

        },
        CoupoonAppliedContainer: {
            height: 100,
            width: '93%',
            alignSelf: 'center',
            borderRadius: 2,
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        verticalStrap: {
            height: '100%',
            width: 6,
            backgroundColor: Colors?.activeBorder,
            marginLeft: 40
        },
        bow_Tie: {
            height: 45,
            width: 45,
            position: 'absolute',
            left: 21,
            top: '30%'
        },
        RightContainer: {
            backgroundColor: '#0000',
            height: '100%',
            width: '55%',
            marginLeft: 35,
        },
        offerApplied: {
            marginLeft: 5,
            marginTop: 18,
            fontSize: 15,
            color: Colors?.textBlack,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
        },
        offerAvailderText: {
            fontSize: 13,
            marginTop: 12,
            color: Colors?.textFadeBlack2,
            fontFamily: Fonts?.font17,
            fontWeight: 600,
            lineHeight: 16,
        },
        gotItButton: {
            position: 'absolute',
            right: 20,
            top: '40%',
            borderWidth: 1,
            borderColor: Colors?.fadeBorder,
            borderRadius: 2,
        },
        gotItText: {
            marginHorizontal: 15,
            marginVertical: 5,
            fontSize: 11,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.KFC_red
        },
        closeButton: {
            marginVertical: 8,
            marginHorizontal: 'auto',
            height: 40,
            width: 40,
            borderRadius: '50%',
            backgroundColor: Colors.Black,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        closeBtnImage: {
            height: 20,
            width: 20,
            padding: 5
        },
    })
    return Styles
}