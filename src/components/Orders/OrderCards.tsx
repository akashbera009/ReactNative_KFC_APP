import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// utils
import Fonts from '../../utils/Fonts';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function OrderCards({ order }: { order: OrderHistory }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const { countrySelected } = useCountry();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const itemNames: string = order?.Items
        ? order?.Items?.map((i: CartItemType) => `${i?.quantity} ${i?.name}`).join(', ')
        : '';
    const totalPrice: number = order?.Items
        ? order?.Items.reduce((acc: number, i: CartItemType) => acc + (i?.quantity * i?.price), 0)
        : 0;
    return (
        <TouchableOpacity
            activeOpacity={.7}
            onPress={() => navigation.push(Strings.OrderDetailsScreen, {
                order: order
            })}
            style={Styles.wrapper} >
            <View style={Styles.badge}>
                <Text style={Styles.badgeText}>{Strings.orderId}:</Text>
                <Text style={Styles.OrderId}> {order?.orderId}</Text>
                <View style={Styles.CustomVerticalBorder} />
                <Text style={Styles.orderDate}>{order?.date}</Text>
            </View>
            <Text style={Styles.itemsTitle}>{order?.Items?.length} {Strings.items.toUpperCase()}</Text>
            <Text style={Styles.itemDesc}>{itemNames}</Text>
            <View style={Styles.priceRow}>
                <Text style={Styles.priceText}>{totalPrice.toFixed(2)} {countrySelected?.currencyCode}</Text>
                <Text style={[Styles.statusText, (order?.status === Strings.deliveredString) ? Styles.Delivered : Styles.Cencelled]}>
                    {order?.status}
                </Text>
            </View>
        </TouchableOpacity >
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        wrapper: {
            marginBottom: vh(12),
            backgroundColor: Colors.bodyColor,
            borderRadius: normalize(2),
            padding: normalize(15),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        badge: {
            backgroundColor: Colors.blueMixBG,
            paddingVertical: vh(8),
            paddingHorizontal: vw(10),
            marginTop: vh(4),
            borderRadius: normalize(4),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start'
        },
        CustomVerticalBorder: {
            height: '80%',
            borderRightColor: Colors.fadeBorder,
            borderRightWidth: normalize(1),
            marginLeft: vw(2),
            marginRight: vw(5)
        },
        badgeText: {
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
        },
        OrderId: {
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
        },
        orderDate: {
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
        },
        itemsTitle: {
            marginTop: vh(18),
            fontFamily: Fonts.font18,
            fontSize: normalize(15),
            color: Colors.textBlack,
        },
        itemDesc: {
            marginTop: vh(4),
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText,
            fontSize: normalize(15),
            width: '85%',
            lineHeight: normalize(25),
        },
        priceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(16),
            alignItems: 'center',
            marginBottom: vh(8),
        },
        priceText: {
            fontSize: normalize(17),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
        },
        statusText: {
            fontSize: normalize(15),
            fontFamily: Fonts.font18,
        },
        Delivered: {
            color: Colors.greenOk
        },
        Cencelled: {
            color: Colors.activeBorder
        }
    });
    return Styles;
};