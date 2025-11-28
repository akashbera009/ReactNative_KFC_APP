import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// utils
import Fonts from '../../utils/Fonts';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';

export default function OrderCards({ order }: { order: OrderHistory }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const { countrySelected } = useCountry();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const itemNames: string = order?.Items?.map((i: CartItemType) => `${i?.quantity} ${i?.name}`).join(', ');
    const totalPrice: number = order?.Items.reduce((acc: number, i: any) => acc + (i?.quantity * i?.price), 0);
    return (
        <TouchableOpacity
            activeOpacity={.7}
            onPress={() => navigation.push(Strings?.OrderDetailsScreen, {
                order: order
            })}
            style={Styles.wrapper} >
            <View style={Styles.badge}>
                <Text style={Styles.badgeText}>{Strings?.orderId}:</Text>
                <Text style={Styles.OrderId}> {order?.orderId}</Text>
                <View style={Styles.CustomVerticalBorder} />
                <Text style={Styles.orderDate}>{order?.date}</Text>
            </View>
            <Text style={Styles.itemsTitle}>{order?.Items?.length} {Strings?.items.toUpperCase()}</Text>
            <Text style={Styles.itemDesc}>{itemNames}</Text>
            <View style={Styles.priceRow}>
                <Text style={Styles.priceText}>{totalPrice.toFixed(2)} {countrySelected?.currencyCode}</Text>
                <Text style={[Styles.statusText, (order?.status === 'Delivered') ? Styles.Delivered : Styles.Cencelled]}>
                    {order?.status}
                </Text>
            </View>
        </TouchableOpacity >
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        wrapper: {
            marginBottom: 12,
            backgroundColor: Colors.bodyColor,
            borderRadius: 2,
            padding: 15,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        badge: {
            backgroundColor: Colors.blueMixBG,
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginTop: 4,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start'
        },
        CustomVerticalBorder: {
            height: '80%',
            borderRightColor: Colors?.fadeBorder,
            borderRightWidth: 1,
            marginLeft: 2,
            marginRight: 5
        },
        badgeText: {
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
        },
        OrderId: {
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
            fontWeight: 700,
        },
        orderDate: {
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
            fontWeight: 700,
        },
        itemsTitle: {
            marginTop: 18,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: 15,
            color: Colors.textBlack,
        },
        itemDesc: {
            marginTop: 4,
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText,
            fontSize: 15,
            width: '85%',
            lineHeight: 25,
        },
        priceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            alignItems: 'center',
            marginBottom: 8,
        },
        priceText: {
            fontSize: 17,
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
            fontWeight: 700
        },
        statusText: {
            fontSize: 15,
            fontFamily: Fonts.subHeader,
            fontWeight: 700
        },
        Delivered: {
            color: Colors?.greenOk
        },
        Cencelled: {
            color: Colors?.activeBorder
        }
    });
    return Styles;
};