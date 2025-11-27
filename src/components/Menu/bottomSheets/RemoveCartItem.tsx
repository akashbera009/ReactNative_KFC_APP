import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils
import Fonts from '../../../utils/Fonts';
import { useStrings } from '../../../utils/Strings';
import { useThemeColors } from '../../../utils/Colors';
import { useCart } from '../../../context/CartContext';

export default function RemoveCartItem({ imageLink, idx }: RemoveCartItemProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors, Fonts);
    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const { CartItem, setCartItem } = useCart()
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
    const handleConfirmDelete = () => {
        setCartItem((prev: CartItemType[]) => prev.filter(((_, index) => 
            index != idx
        )))
        navigation.pop()

    }
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
                < View style={Styles.OuterContainer}>
                    <View
                        style={Styles.InnerContainer}>
                        <Image source={imageLink} style={Styles.foodImage} />
                        <Text style={Styles.confirmAskingText} numberOfLines={3}>{Strings?.confirmAskingText} </Text>
                        <View style={[Styles.DoneButtonContainer, { bottom: inset.bottom }]}>
                            <TouchableOpacity
                                style={[Styles.Button, Styles.ChangeButton]}
                                onPress={() => navigation.pop()}>
                                <Text style={[Styles.DoneButtonText, Styles.ChangeButtonText]}>{Strings?.cancel.toLocaleUpperCase()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[Styles.Button]}
                                onPress={handleConfirmDelete}>
                                <Text style={Styles.DoneButtonText}>{Strings?.yesConfirm.toLocaleUpperCase()}</Text>
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
            backgroundColor: Colors.SemiTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: 500,
        },
        OuterContainer: {
        },
        InnerContainer: {
            height: 500,
            backgroundColor: Colors.bodyColor,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            position: 'relative',
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
        foodImage: {
            height: 220,
            width: 220,
            alignSelf: 'center',
            marginTop: 30,
            shadowColor: Colors?.textBlack,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        confirmAskingText: {
            width: '75%',
            marginTop: 20,
            lineHeight: 40,
            fontFamily: Fonts?.font17,
            fontWeight: 700,
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 24,
            color: Colors?.textBlack,
        },
        DoneButtonContainer: {
            position: 'absolute',
            left: '10%',
            width: '80%',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

        },
        Button: {
            backgroundColor: Colors?.KFC_red,
            borderRadius: 2,
            paddingVertical: 10,
            width: '47%',

        },
        ChangeButton: {
            backgroundColor: Colors?.bodyColor,
            borderWidth: 1,
            borderColor: Colors?.fadeWhiteText2,

        },
        ChangeButtonText: {
            color: Colors?.textBlack,
            textAlign: 'center'
        },
        DoneButtonText: {
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.constantWhite,
            marginHorizontal: 20,
            marginVertical: 3
        }
    })
    return Styles;
}