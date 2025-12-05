import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data imports 
import{DeliveryDetails}from '../../data/DeliveryDetails';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import { useOrderQueue } from '../../context/OrderQueueContext';

export default function OrderDetails({ order }: { order: OrderHistory }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    // amount calculations  
    const totalAmount: number = order?.Items.reduce((acc: number, i: any) => acc + (i?.quantity * i?.price), 0);
    const vatAmount: number = Number((totalAmount * 5 / 100).toFixed(2))
    const beforeTax: number = totalAmount - vatAmount
    const DiscountPrice: number = Number((totalAmount * DeliveryDetails?.discountRate / 100).toFixed(2))
    const AfterDiscount: number = Number((beforeTax - DiscountPrice).toFixed(2));
    const GrandAmount: number = AfterDiscount + DeliveryDetails?.charges
    const { orderQueueItem } = useOrderQueue()
    const currentOrder: OrderHistory = orderQueueItem.filter((item) => item?.status ==  Strings?.beingPreparedString)[0]
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings?.OrderDetail} </Text>
                </View>
            </View>
            <View style={Styles.ContentContainer}>
                <ScrollView>
                    <View style={Styles.TrackContainer}>
                        <View style={Styles.TrackUpperContainer}>
                            <View style={Styles.leftContainer}>
                                <View style={Styles.LeftUpperContainer}>
                                    <Text style={Styles.order}>{Strings?.orderId}: </Text>
                                    <Text style={Styles.orderId}>{order?.orderId} </Text>
                                </View>
                                <Text style={Styles.date}>{order?.date} </Text>
                            </View>
                            {order?.status ==  Strings?.beingPreparedString ? (
                                <TouchableOpacity
                                    style={Styles.trackButton}
                                    onPress={() => navigation.push(Strings?.TrackOrderScreen, {
                                        currentOrder: currentOrder,
                                        orderId:currentOrder?.orderId,
                                        GrandTotal:  GrandAmount
                                    })}
                                >
                                    <Text style={Styles.TrackOrderText}>{Strings?.trackOrder} </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={Styles.Blank}/>
                            )}
                        </View>
                        <View style={[Styles.PricingTotalContainer]}>
                            <View style={Styles.PriceEntries}>
                                <Text style={Styles.PriceEntriesLeft}>{Strings?.SubTotal} </Text>
                                <Text style={Styles.PriceEntriesRight}>{beforeTax.toFixed(2)} {countrySelected?.currencyCode} </Text>
                            </View>
                            <View style={Styles.PriceEntries}>
                                <Text style={Styles.PriceEntriesLeft}>{Strings?.vat.toUpperCase()} @ {DeliveryDetails?.vatCharge}% </Text>
                                <Text style={Styles.PriceEntriesRight}>{vatAmount} {countrySelected?.currencyCode} </Text>
                            </View>
                            <View style={Styles.PriceEntries}>
                                <Text style={Styles.PriceEntriesLeft}>{Strings?.deliveriCharge} </Text>
                                <Text style={Styles.PriceEntriesRight}>{DeliveryDetails?.charges} {countrySelected?.currencyCode} </Text>
                            </View>
                            <View style={Styles.PriceEntries}>
                                <Text style={[Styles.PriceEntriesLeft, Styles.GrandText]}>{Strings?.grandTotal} </Text>
                                <Text style={[Styles.PriceEntriesRight, Styles.GrandText]}>{ GrandAmount.toFixed(2)} {countrySelected?.currencyCode} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.DeliveryAddressContainer}>
                        <View style={Styles.DeliveryUpperContainer}>
                            <Image source={Images?.HomeIcon} style={Styles.HomeIcon} />
                            <Text style={Styles.deliveryTo}>{Strings?.deliveryTo.toUpperCase()} - </Text>
                            <Text style={Styles.Type}>{DeliveryDetails?.type.toUpperCase()} </Text>
                        </View>
                        <Text style={Styles.address} numberOfLines={1}>{DeliveryDetails?.address} </Text>
                    </View>
                    <Text style={Styles.TotalItems}>{order?.Items?.length} {Strings?.items} </Text>
                    {order?.Items?.map((item, idx) => (
                        <View style={Styles.CardContainer} key={idx}>
                            <View style={Styles.UpperContainer}>
                                <Image source={item?.image} style={Styles.LeftfoodImage} />
                                <View style={Styles.RightContainer}>
                                    <Text style={Styles.FoodName}>{item.name}</Text>
                                    <View style={Styles.DescriptionContainer}>
                                        {item?.description.map((item, idx) => (
                                            <View key={idx} style={Styles.DotAndDescription}>
                                                <View style={Styles.dot} />
                                                <Text style={Styles.DescriptioText}>{item}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View style={Styles.LowerContainer}>
                                <View style={Styles.LowerLeftPriceContainer}>
                                    <Text style={Styles.Price}>{item?.price.toFixed(2)}</Text>
                                    <Text style={Styles.Price}>{countrySelected.currencyCode}</Text>
                                    <View style={Styles.OldPriceContainer}>
                                        <Text style={Styles.OldPrice}>{item?.oldPrice.toFixed(2)}</Text>
                                        <Text style={Styles.OldPrice}>{countrySelected.currencyCode}</Text>
                                        <View style={Styles.CrossBorder} />
                                    </View>
                                </View>
                                <View style={Styles.QuantityContainer}>
                                    <Text style={Styles.Qty}>{Strings?.qty}: </Text>
                                    <Text style={Styles.QtyNumber}>{item?.quantity} </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    <View style={{ height: inset.bottom }} />
                </ScrollView>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            backgroundColor: Colors?.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: 15,
        },
        headerText: {
            fontSize: 20,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors?.textBlack,
            height: 18,
            width: 18,
            alignSelf: 'flex-start',
            marginHorizontal: 18,
        },
        ContentContainer: {
            backgroundColor: Colors?.bodyLigheterColor,
            height: '90%'
        },
        TrackUpperContainer: {
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        leftContainer: {
            marginLeft: 15,
        },
        LeftUpperContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        order: {
            fontSize: 15,
            fontFamily: Fonts?.font17,
            color: Colors?.textFadeBlack2,
            fontWeight: 500
        },
        orderId: {
            fontSize: 15,
            fontFamily: Fonts?.font17,
            color: Colors?.textBlack,
            fontWeight: 700
        },
        date: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            color: Colors?.timerFadeText,
            fontWeight: 600,
            marginTop: 6
        },
        TrackContainer: {
            width: "95%",
            alignSelf: 'center',
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: Colors?.bodyColor,
            marginTop: 15,
            borderRadius: 2,
        },
        PricingTotalContainer: {
            width: '100%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginTop: 25,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'center',
        },
        PriceEntries: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 5,
            marginHorizontal: 15,
        },
        PriceEntriesLeft: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            color: Colors?.timerFadeText,
            fontWeight: 500,
        },
        GrandText: {
            fontSize: 15,
            color: Colors?.textFadeBlack2,
            fontWeight: 700,
        },
        PriceEntriesRight: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            color: Colors?.textBlack,
            fontWeight: 600,
            marginLeft: 'auto'
        },
        trackButton: {
            backgroundColor: Colors?.KFC_red,
            marginHorizontal: 'auto',
            borderRadius: 4,
            marginRight: 15,
            fontSize: 12
        },
        Blank: {
            marginHorizontal: 'auto'
        },
        TrackOrderText: {
            color: Colors?.constantWhite,
            paddingHorizontal: 10,
            paddingVertical: 6,
            fontWeight: 700,
            fontSize: 12,
            fontFamily: Fonts?.font17
        },
        DeliveryAddressContainer: {
            width: "95%",
            alignSelf: 'center',
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: Colors?.bodyColor,
            marginVertical: 15,
            borderRadius: 2,
        },
        DeliveryUpperContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
        },
        HomeIcon: {
            margin: 10,
            marginLeft: 16,
            height: 20,
            width: 20,
            tintColor: Colors?.textBlack
        },
        deliveryTo: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: 15,
            color: Colors?.textFadeBlack2
        },
        Type: {
            fontFamily: Fonts?.font17,
            fontWeight: 700,
            fontSize: 15,
            color: Colors?.textBlack
        },
        address: {
            width: '70%',
            marginLeft: 47,
            marginTop: -5,
            marginBottom: 20,
            fontFamily: Fonts?.font17,
            fontWeight: 600,
            color: Colors?.timerFadeText
        },
        TotalItems: {
            fontFamily: Fonts?.font17,
            fontSize: 16,
            fontWeight: 700,
            width: '95%',
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 8,
        },
        CardContainer: {
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: 6,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: .4,
            shadowRadius: 5,
            elevation: 5,
        },
        UpperContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        LeftfoodImage: {
            height: 120,
            width: 120,
            marginTop: 25,
            marginLeft: 15
        },
        RightContainer: {
            width: '60%',
            height: '90%',
            paddingTop: 5,
            marginLeft: 10,
        },
        FoodName: {
            fontSize: 15,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            marginVertical: 10,
            color: Colors?.textBlack
        },
        DescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            marginLeft: 1
        },
        DotAndDescription: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4
        },
        dot: {
            margin: 5,
            height: 4,
            width: 4,
            borderRadius: 20,
            backgroundColor: Colors?.textFadeBlack,
        },
        DescriptioText: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.timerFadeText,
            fontSize: 11,
            marginRight: 5,
        },

        backArrow: {
            height: 12,
            width: 12,
            marginLeft: 2,
            transform: [{ rotate: '180deg' }],
            tintColor: Colors?.ButtonBlueColor,
        },
        LowerContainer: {
            height: 50,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
        },
        LowerLeftPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 20
        },
        Price: {
            fontSize: 15,
            fontWeight: 700,
            marginHorizontal: 2,
            color: Colors?.textFadeBlack2,
        },
        OldPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 4
        },
        OldPrice: {
            fontSize: 13,
            fontWeight: 700,
            marginHorizontal: 2,
            color: Colors?.textFadeBlack,
        },
        CrossBorder: {
            width: '100%',
            borderBottomColor: Colors?.textFadeBlack,
            borderBottomWidth: 2,
            position: 'absolute',
            top: 8,
            left: 0,
        },
        QuantityContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginHorizontal: 20,
        },
        Qty: {
            fontFamily: Fonts?.font17,
            fontSize: 17,
            fontWeight: 600,
            color: Colors?.textFadeBlack,
        },
        QtyNumber: {
            fontFamily: Fonts?.font17,
            fontSize: 18,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
    });
    return Styles;
};