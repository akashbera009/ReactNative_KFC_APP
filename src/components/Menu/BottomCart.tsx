import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing, type EasingFunction } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// utils
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function BottomCart({ ButtonType, navLink, totalAmount, discount }: BottomCartProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const { countrySelected } = useCountry()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const cartData = useSelector((state: RootState) => state.cart)
    const cartItem = cartData.cartItems
    let totalPrice = cartItem.reduce((acc, item) => acc + item?.price * item?.quantity, 0).toFixed(2);
    let discountPrice = cartItem.reduce((acc2, item) => acc2 + item?.oldPrice * item?.quantity, 0);
    discountPrice -= Number(totalPrice);
    let formattedCounterText = cartItem?.length < 10 ? `0${cartItem?.length}` : cartItem?.length;
    // aimation 
    const slideIn = useRef(new Animated.Value(0)).current;
    const handleSlideIn = (easing: EasingFunction) => {
        Animated.timing(slideIn, {
            toValue: 1,
            duration: 200,
            easing,
            useNativeDriver: true
        }).start()
    }
    useEffect(() => {
        handleSlideIn(Easing.in(Easing.quad))
    }, [slideIn])

    return (
        <Animated.View style={[Styles.ViewCartWrapper, {
            transform: [{
                translateY: slideIn.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })
            }]
        }]}>
            <View style={Styles.DetailsContainer}>
                <View style={Styles.ImageContainer}>
                    <Image source={Images?.Chicken_Bucket} style={Styles.CartImage} />
                    <View style={Styles.ImageWrapper}>
                        <Text style={Styles.CounterText}>{formattedCounterText} </Text>
                    </View>
                </View>
                <View style={Styles.PriceDetails}>
                    <Text style={Styles.totalPrice}>{totalPrice}</Text>
                    <View style={Styles.DisctointContainer}>
                        <Text style={Styles.discountPrice}>{Math.abs(discountPrice)?.toFixed(2)}</Text>
                        <Text style={Styles.countrycode}>{countrySelected?.currencyCode} </Text>
                        <Text style={Styles.savedtext}>{Strings.youSaved} </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={Styles.ViewCart}
                onPress={() => {
                    if (navLink === Strings.CartScreen) {
                        navigation.navigate(Strings.CartScreen, {
                            discount: 0,
                            discountPercentage: 0,
                            offerCode: ''
                        });
                    } else {
                        navigation.navigate(Strings.CheckOutScreen, {
                            totalAmount: totalAmount,
                            discount: discount
                        });
                    }
                }}
            >
                <Text style={Styles.ViewCartText}>{ButtonType?.toUpperCase()} </Text>
            </TouchableOpacity>
        </Animated.View >
    );
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        ViewCartWrapper: {
            width: '93%',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        DetailsContainer: {
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 0,
            alignItems: 'center',
        },
        ImageContainer: {
            width: vw(42),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: normalize(1),
        },
        ImageWrapper: {
            height: vh(42),
            width: vw(42),
            position: 'relative',
            left: '-50%',
            zIndex: 4,
            borderRadius: normalize(1),
            backgroundColor: Colors.HyperTransparent,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        CounterText: {
            fontSize: normalize(14),
            fontWeight: 700,
            color: Colors.constantWhite,
        },
        CartImage: {
            height: vh(42),
            width: vw(42),
            left: '50%',
            position: 'relative',
            zIndex: 3,
            borderRadius: normalize(1),
        },
        PriceDetails: {
            marginLeft: vw(10),
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
        },
        totalPrice: {
            fontSize: normalize(16),
            fontWeight: 700,
            marginBottom:vh(4),
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack
        },
        discountPrice: {
            color: Colors.textFadeBlack,
            fontFamily: Fonts.subHeader,
            fontWeight: 600
        },
        DisctointContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        countrycode: {
            marginHorizontal: vw(2),
            color: Colors.textFadeBlack,
            fontFamily: Fonts.subHeader,
            fontWeight: 600
        },
        savedtext: {
            color: Colors.textFadeBlack,
            fontFamily: Fonts.subHeader,
            fontWeight: 600
        },
        ViewCart: {
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(4),
            alignSelf: 'flex-end',
            marginLeft: 'auto',
            marginVertical: vh(14),
        },
        ViewCartText: {
            color: Colors.constantWhite,
            fontSize: normalize(13),
            marginHorizontal: vw(16),
            marginVertical: vh(10),
            fontFamily: Fonts.font17,
            fontWeight: 700
        },
    });
    return Styles;
};