import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// redux
import { removeFromCart } from '../../../features/cartSlice';
import { useAppDispatch } from '../../../store/store';
// utils
import Fonts from '../../../utils/Fonts';
import { useStrings } from '../../../utils/Strings';
import { useThemeColors } from '../../../utils/Colors';
import { normalize, vh, vw } from '../../../utils/Dimensions';

export default function RemoveCartItem({ imageLink, uid }: RemoveCartItemProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors)
    const dispatch = useAppDispatch()
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
    const handleConfirmDelete = (): void => {
        dispatch(removeFromCart(uid))
        navigation.pop()
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
                <View
                    style={Styles.InnerContainer}>
                    <Image source={{uri : imageLink}} style={Styles.foodImage} />
                    <Text style={Styles.confirmAskingText} numberOfLines={3}>{Strings.confirmAskingText} </Text>
                    <View style={[Styles.DoneButtonContainer, { bottom: inset.bottom }]}>
                        <TouchableOpacity
                            style={[Styles.Button, Styles.ChangeButton]}
                            onPress={() => navigation.pop()}>
                            <Text style={[Styles.DoneButtonText, Styles.ChangeButtonText]}>{Strings.cancel.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Styles.Button}
                            onPress={handleConfirmDelete}>
                            <Text style={Styles.DoneButtonText}>{Strings.yesConfirm.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
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
            height: vh(500),
        },
        InnerContainer: {
            height: vh(500),
            backgroundColor: Colors.bodyColor,
            borderTopRightRadius: normalize(40),
            borderTopLeftRadius: normalize(40),
            position: 'relative',
        },
        closeButton: {
            marginVertical: vh(8),
            marginHorizontal: 'auto',
            height: vh(40),
            width: vw(40),
            borderRadius: '50%',
            backgroundColor: Colors.Black,justifyContent: 'center',
            alignItems: 'center'
        },
        closeBtnImage: {
            height: vh(20),
            width: vw(20),
            padding: normalize(5)
        },
        foodImage: {
            height: vh(220),
            width: vw(220),
            alignSelf: 'center',
            marginTop: vh(30),
            shadowColor: Colors.textBlack,
            shadowOffset: { width: vw(2), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        confirmAskingText: {
            width: '75%',
            marginTop: vh(20),
            lineHeight: vh(40),
            fontFamily: Fonts.helveticaBold,
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: normalize(24),
            color: Colors.textBlack,
        },
        DoneButtonContainer: {
            position: 'absolute',
            left: '10%',
            width: '80%',
            alignSelf: 'center',alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        Button: {
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(2),
            paddingVertical: vh(10),
            width: '47%',
        },
        ChangeButton: {
            backgroundColor: Colors.bodyColor,
            borderWidth: normalize(1),
            borderColor: Colors.fadeWhiteText2,
        },
        ChangeButtonText: {
            color: Colors.textBlack,
            textAlign: 'center'
        },
        DoneButtonText: {
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaBold,
            color: Colors.constantWhite,
            marginHorizontal: vw(20),
            marginVertical: vh(3)
        }
    })
    return Styles;
}