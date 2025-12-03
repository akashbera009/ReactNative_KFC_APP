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

export default function BottomCart({ ButtonType, navLink, totalAmount , discount }: BottomCartProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const { countrySelected } = useCountry()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { CartItem } = useCart();
    let totalPrice = CartItem.reduce((acc, item) => acc + item?.price * item?.quantity, 0).toFixed(2);
    let discountPrice = CartItem.reduce((acc2, item) => acc2 + item?.oldPrice * item?.quantity, 0);
    discountPrice -= Number(totalPrice);

let formattedCounterText =  CartItem?.length < 10 ? `0${CartItem?.length}` : CartItem?.length
    return (
        <View style={Styles.ViewCartWrapper}>
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
                        navigation.navigate(Strings?.CartScreen , {
                            discount: 0 , 
                            discountPercentage: 0 ,
                            offerCode: '' 
                        });
                    } else {
                        navigation.navigate(Strings?.CheckOutScreen, {
                            totalAmount: totalAmount,
                            discount : discount  
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
            fontSize: 14,
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
        },
        totalPrice: {
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 4,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textBlack
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