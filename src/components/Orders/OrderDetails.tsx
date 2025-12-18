import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Share, ErrorUtils } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data imports 
import { DeliveryDetails } from '../../data/DeliveryDetails';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
// redux 
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../../features/getCurrentOrder';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function OrderDetails({ order }: { order: OrderHistory }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    // amount calculations  
    const totalAmount: number = order?.Items.reduce((acc: number, i: CartItemType) => acc + (i?.quantity * i?.price), 0);
    const vatAmount: number = Number((totalAmount * 5 / 100).toFixed(2))
    const beforeTax: number = totalAmount - vatAmount
    const DiscountPrice: number = Number((totalAmount * DeliveryDetails?.discountRate / 100).toFixed(2))
    const AfterDiscount: number = Number((beforeTax - DiscountPrice).toFixed(2));
    const GrandAmount: number = AfterDiscount + DeliveryDetails?.charges
    const currentOrder: OrderHistory | null = useSelector(selectCurrentOrder)
    const handleShareInvoice = async () => {
        const pdfUrl = DeliveryDetails?.demoPDFurl
        try {
            const result = await Share.share({
                message:
                    `${Strings.takeInvoicePlease}: ${pdfUrl}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared using:", result.activityType);
                } else {
                    console.log('no info');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('dismissed');
            }
        } catch (error: unknown) {
            console.log(error)
        }
    }
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.OrderDetail} </Text>
                </View>
            </View>
            <View style={Styles.ContentContainer}>
                <ScrollView>
                    <View style={Styles.TrackContainer}>
                        <View style={Styles.TrackUpperContainer}>
                            <View style={Styles.leftContainer}>
                                <View style={Styles.LeftUpperContainer}>
                                    <Text style={Styles.order}>{Strings.orderId}: </Text>
                                    <Text style={Styles.orderId}>{order?.orderId} </Text>
                                </View>
                                <Text style={Styles.date}>{order?.date} </Text>
                            </View>
                            {order?.status == Strings.beingPreparedString ? (
                                <TouchableOpacity
                                    style={Styles.trackButton}
                                    onPress={() => navigation.push(Strings.TrackOrderScreen, {
                                        currentOrder: currentOrder,
                                        orderId: currentOrder?.orderId,
                                        GrandTotal: GrandAmount
                                    })}
                                >
                                    <Text style={Styles.TrackOrderText}>{Strings.trackOrder} </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={Styles.Blank} />
                            )}
                        </View>
                        <View style={[Styles.PricingTotalContainer]}>
                            <View style={Styles.PriceEntries}>
                                <Text style={Styles.PriceEntriesLeft}>{Strings.SubTotal} </Text>
                                <Text style={Styles.PriceEntriesRight}>{beforeTax.toFixed(2)} {countrySelected?.currencyCode} </Text>
                            </View>
                            <View style={Styles.PriceEntries}>
                                <Text style={Styles.PriceEntriesLeft}>{Strings.vat.toUpperCase()} @ {DeliveryDetails?.vatCharge}% </Text>
                                <Text style={Styles.PriceEntriesRight}>{vatAmount} {countrySelected?.currencyCode} </Text>
                            </View>
                            <View style={Styles.PriceEntries}>
                                <Text style={Styles.PriceEntriesLeft}>{Strings.deliveriCharge} </Text>
                                <Text style={Styles.PriceEntriesRight}>{DeliveryDetails?.charges} {countrySelected?.currencyCode} </Text>
                            </View>
                            <View style={Styles.PriceEntries}>
                                <Text style={[Styles.PriceEntriesLeft, Styles.GrandText]}>{Strings.grandTotal} </Text>
                                <Text style={[Styles.PriceEntriesRight, Styles.GrandText]}>{GrandAmount.toFixed(2)} {countrySelected?.currencyCode} </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleShareInvoice}
                        style={Styles.downloadContainer}>
                        <Text style={Styles.ShareText}>{Strings.shareInvoive} </Text>
                        <Image source={Images.ShareIcon} style={Styles.ShareIcon} />
                    </TouchableOpacity>
                    <View style={Styles.DeliveryAddressContainer}>
                        <View style={Styles.DeliveryUpperContainer}>
                            <Image source={Images.HomeIcon} style={Styles.HomeIcon} />
                            <Text style={Styles.deliveryTo}>{Strings.deliveryTo.toUpperCase()} - </Text>
                            <Text style={Styles.Type}>{DeliveryDetails?.type.toUpperCase()} </Text>
                        </View>
                        <Text style={Styles.address} numberOfLines={1}>{DeliveryDetails?.address} </Text>
                    </View>
                    <Text style={Styles.TotalItems}>{order?.Items?.length} {Strings.items} </Text>
                    {order?.Items?.map((item, idx) => (
                        <View style={Styles.CardContainer} key={idx}>
                            <View style={Styles.UpperContainer}>
                                <Image source={{ uri: item?.image }} style={Styles.LeftfoodImage} />
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
                                    <Text style={Styles.Qty}>{Strings.qty}: </Text>
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
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: vh(15),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.font18,
            color: Colors.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
            marginHorizontal: vw(18),
        },
        ContentContainer: {
            backgroundColor: Colors.bodyLigheterColor,
            height: '90%'
        },
        TrackUpperContainer: {
            marginTop: vh(20),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        leftContainer: {
            marginLeft: vw(15),
        },
        LeftUpperContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        order: {
            fontSize: normalize(15),
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
        },
        orderId: {
            fontSize: normalize(15),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
        },
        date: {
            fontSize: normalize(14),
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText,
            marginTop: vh(6)
        },
        TrackContainer: {
            width: "95%",
            alignSelf: 'center',
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
            backgroundColor: Colors.bodyColor,
            marginTop: vh(15),
            borderRadius: normalize(2),
        },
        PricingTotalContainer: {
            width: '100%',
            alignSelf: 'center',
            backgroundColor: Colors.bodyColor,
            marginTop: vh(25),
            marginBottom: vh(20),
            display: 'flex',
            justifyContent: 'center',
        },
        PriceEntries: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: vh(5),
            marginHorizontal: vw(15),
        },
        PriceEntriesLeft: {
            fontSize: normalize(14),
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText,
        },
        GrandText: {
            fontSize: normalize(15),
            color: Colors.textFadeBlack2,
            fontFamily: Fonts.font18,
        },
        PriceEntriesRight: {
            fontSize: normalize(14),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
            marginLeft: 'auto'
        },
        trackButton: {
            backgroundColor: Colors.KFC_red,
            marginHorizontal: 'auto',
            borderRadius: normalize(4),
            marginRight: vw(15),
            fontSize: normalize(12)
        },
        Blank: {
            marginHorizontal: 'auto'
        },
        TrackOrderText: {
            color: Colors.constantWhite,
            paddingHorizontal: vw(10),
            paddingVertical: vh(6),
            fontSize: normalize(12),
            fontFamily: Fonts.font18
        },
        downloadContainer: {
            width: "95%",
            alignSelf: 'center',
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
            backgroundColor: Colors.bodyColor,
            marginVertical: vh(15),
            borderRadius: normalize(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        ShareIcon: {
            marginVertical: vh(20),
            marginHorizontal: vw(20),
            height: vh(20),
            width: vw(20),
            tintColor: Colors.textBlack
        },
        ShareText: {
            marginHorizontal: vw(15),
            color: Colors.textFadeBlack2,
            fontSize: normalize(16),
            fontFamily: Fonts.font17,
        },
        DeliveryAddressContainer: {
            width: "95%",
            alignSelf: 'center',
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
            backgroundColor: Colors.bodyColor,
            marginVertical: vh(15),
            borderRadius: normalize(2),
        },
        DeliveryUpperContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: vh(10),
        },
        HomeIcon: {
            margin: normalize(10),
            marginLeft: vw(16),
            height: vh(20),
            width: vw(20),
            tintColor: Colors.textBlack
        },
        deliveryTo: {
            fontFamily: Fonts.font17,
            fontSize: normalize(15),
            color: Colors.textFadeBlack2
        },
        Type: {
            fontFamily: Fonts.font18,
            fontSize: normalize(15),
            color: Colors.textBlack
        },
        address: {
            width: '70%',
            marginLeft: vw(47),
            marginTop: vh(-5),
            marginBottom: vh(20),
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText
        },
        TotalItems: {
            fontFamily: Fonts.font18,
            fontSize: normalize(16),
            width: '95%',
            alignSelf: 'center',
            marginTop: vh(5),
            marginBottom: vh(8),
        },
        CardContainer: {
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors.bodyColor,
            marginVertical: vh(6),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: .4,
            shadowRadius: normalize(5),
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
            height: vh(120),
            width: vw(120),
            marginTop: vh(25),
            marginLeft: vw(15)
        },
        RightContainer: {
            width: '60%',
            height: '90%',
            paddingTop: vh(5),
            marginLeft: vw(10),
        },
        FoodName: {
            fontSize: normalize(15),
            fontFamily: Fonts.font18,
            marginVertical: vh(10),
            color: Colors.textBlack
        },
        DescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            marginLeft: vw(1)
        },
        DotAndDescription: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: vh(4)
        },
        dot: {
            margin: normalize(5),
            height: vh(4),
            width: vw(4),
            borderRadius: normalize(20),
            backgroundColor: Colors.textFadeBlack,
        },
        DescriptioText: {
            fontFamily: Fonts.font18,
            color: Colors.timerFadeText,
            fontSize: normalize(11),
            marginRight: vw(5),
        },

        backArrow: {
            height: vh(12),
            width: vw(12),
            marginLeft: vw(2),
            transform: [{ rotate: '180deg' }],
            tintColor: Colors.ButtonBlueColor,
        },
        LowerContainer: {
            height: vh(50),
            marginBottom: vh(8),
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
            marginHorizontal: vw(20)
        },
        Price: {
            fontSize: normalize(15),
            marginHorizontal: vw(2),
            color: Colors.textFadeBlack2,
            fontFamily: Fonts.font18
        },
        OldPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: vw(4)
        },
        OldPrice: {
            fontSize: normalize(13),
            marginHorizontal: vw(2),
            color: Colors.textFadeBlack,
            fontFamily: Fonts.font18
        },
        CrossBorder: {
            width: '100%',
            borderBottomColor: Colors.textFadeBlack,
            borderBottomWidth: normalize(2),
            position: 'absolute',
            top: vh(8),
            left: 0,
        },
        QuantityContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginHorizontal: vw(20),
        },
        Qty: {
            fontFamily: Fonts.font17,
            fontSize: normalize(17),
            color: Colors.textFadeBlack,
        },
        QtyNumber: {
            fontFamily: Fonts.font18,
            fontSize: normalize(18),
            color: Colors.textBlack,
        },
    });
    return Styles;
};