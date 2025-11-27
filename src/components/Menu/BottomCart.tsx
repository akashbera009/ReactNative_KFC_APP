import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// context 
import { useCart } from '../../context/CartContext';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';

export default function BottomCart({ ButtonType, navLink, totalAmount }: BottomCartProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const { countrySelected } = useCountry()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { CartItem } = useCart();
    let totalPrice = CartItem.reduce((acc, item) => acc + item?.price * item?.quantity, 0).toFixed(2);
    let discountPrice = CartItem.reduce((acc2, item) => acc2 + item?.oldPrice * item?.quantity, 0);
    discountPrice -= Number(totalPrice);

    return (
        <View style={Styles.ViewCartWrapper}>
            <View style={Styles.DetailsContainer}>
                <View style={Styles.ImageContainer}>
                    <Image source={Images?.Chicken_Bucket} style={Styles.CartImage} />
                    <View style={Styles.ImageWrapper}>
                        <Text style={Styles.CounterText}>{CartItem?.length} </Text>
                    </View>
                </View>
                <View style={Styles.PriceDetails}>
                    <Text style={Styles.totalPrice}>{totalPrice}</Text>
                    <View style={Styles.DisctointContainer}>
                        <Text style={Styles.discountPrice}>{discountPrice?.toFixed(2)}</Text>
                        <Text style={Styles.countrycode}>{countrySelected?.currencyCode} </Text>
                        <Text style={Styles.savedtext}>{Strings?.youSaved} </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={Styles.ViewCart}
                onPress={() => {
                    if (navLink === 'CartScreen') {
                        navigation.navigate(Strings?.CartScreen);
                    } else {
                        navigation.navigate(Strings?.CheckOutScreen, {
                            totalAmount: totalAmount,
                            // items: cartItems,
                            // address: selectedAddress,
                        });
                    }
                }}
            >
                <Text style={Styles.ViewCartText}>{ButtonType?.toUpperCase()} </Text>
            </TouchableOpacity>
        </View >
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
            width: 42,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 1,
        },
        ImageWrapper: {
            height: 42,
            width: 42,
            position: 'relative',
            left: '-50%',
            zIndex: 4,
            borderRadius: 1,
            backgroundColor: Colors?.HyperTransparent,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        CounterText: {
            fontSize: 12,
            fontWeight: 700,
            color: Colors?.constantWhite,
        },
        CartImage: {
            height: 42,
            width: 42,
            left: '50%',
            position: 'relative',
            zIndex: 3,
            borderRadius: 1,
        },
        PriceDetails: {
            marginLeft: 10,
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            // backgroundColor: '#ffdcdcff',
        },
        totalPrice: {
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 4,
            fontFamily: Fonts?.subHeader
        },
        discountPrice: {
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
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
            marginHorizontal: 2,
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600
        },
        savedtext: {
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600
        },
        ViewCart: {
            backgroundColor: Colors?.KFC_red,
            borderRadius: 4,
            alignSelf: 'flex-end',
            marginLeft: 'auto',
            marginVertical: 14,
        },
        ViewCartText: {
            color: Colors?.constantWhite,
            fontSize: 13,
            marginHorizontal: 16,
            marginVertical: 10,
            fontFamily: Fonts?.font17,
            fontWeight: 700
        },
    });
    return Styles;
};