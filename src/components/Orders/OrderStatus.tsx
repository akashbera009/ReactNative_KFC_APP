import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// data imports 
import { DeliveryDetails } from '../../data/DeliveryDetails';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';
import { useOrderQueue } from '../../context/OrderQueueContext';

export default function OrderStatus({
    orderId,
    OrderDate,
    OrderTime,
    paymentMode,
    vatAmount,
    GrandTotal,
    SubTotal,
    deliveriCharge,
    orderStatus
}: OrderStatusPageProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    const [openAmountDetails, setOpenAmountDetails] = useState<boolean>(false)
    const [pending, setPending] = useState(true)
    const { orderQueueItem } = useOrderQueue()
    const currentOrder = orderQueueItem.filter(item => item?.status ==  Strings?.beingPreparedString)[0]
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setPending(false)
        }, 4000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [])
    const rotate = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotate, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start()
    }, [])

    return (
        <View style={[Styles.Parent, { paddingTop: inset.top }]}>
            <View style={Styles.NavWrapper}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => {
                            orderStatus ?
                                navigation.navigate(Strings?.HomeScreen)
                                :
                                navigation.pop(2)
                        }}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings?.orderStatus}</Text>
                </View>
            </View>
            <View style={Styles.ContentContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={Styles.OrderBox}>
                        <View style={Styles.Row}>
                            <Image source={currentOrder.Items[0]?.image} style={Styles.BucketImg} />
                            {orderStatus ? (
                                <>
                                    {pending ? (
                                        <View>
                                            <View style={Styles.orderNotConfrimedAndRotator}>
                                                <Text style={Styles.OrderConfirmed}>{Strings?.pendingConfirmation}</Text>
                                                <Animated.Image
                                                    style={[Styles.RoundLoader, {
                                                        transform: [{
                                                            rotate: rotate.interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: ['0deg', '360deg'],
                                                            })
                                                        }]
                                                    }]}
                                                    source={Images?.RoundLoader}
                                                />
                                            </View>
                                            <Text style={[Styles.WaitingText,]}>{Strings?.waitingOrder}</Text>
                                        </View>
                                    ) : (
                                        <View>
                                            <Text style={Styles.OrderConfirmed}>{Strings?.orderConfired}</Text>
                                            <Text style={Styles.OrderNumber}>{Strings?.OrderNo} {orderId}</Text>
                                        </View>
                                    )}
                                </>) : (
                                <Text style={Styles.OrderConfirmed}>{Strings?.orderFailed} </Text>
                            )}
                        </View>
                        <View style={Styles.DateRow}>
                            <Text style={Styles.DateText}>{OrderDate}</Text>
                            <Text style={Styles.DateText}>{OrderTime}</Text>
                        </View>
                    </View>
                    {orderStatus && (
                        <>
                            {pending ? (
                                <TouchableOpacity
                                    disabled={true}
                                    style={Styles.TrackBox}>
                                    <View style={Styles.TrackLeft}>
                                        <Image source={Images.Track_Order} style={[Styles.TrackIcon, Styles?.FadeIcon]} />
                                        <Text style={[Styles.TrackText, Styles?.FadeText]}>{Strings?.trackOrder}</Text>
                                    </View>
                                    <Image source={Images.back_arrow} style={[Styles.TrackArrow, Styles?.FadeIcon]} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(Strings?.TrackOrderScreen, {
                                            currentOrder: currentOrder,
                                            orderId: orderId,
                                            GrandTotal: GrandTotal
                                        })}
                                    style={Styles.TrackBox}>
                                    <View style={Styles.TrackLeft}>
                                        <Image source={Images.Track_Order} style={Styles.TrackIcon} />
                                        <Text style={Styles.TrackText}>{Strings?.trackOrder}</Text>
                                    </View>
                                    <Image source={Images.back_arrow} style={Styles.TrackArrow} />
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                    <View style={Styles.SummaryBox}>
                        {orderStatus ? (
                            <>
                                <View style={Styles.SummaryHeaderRow}>
                                    <Text style={Styles.SummaryHeader}>{Strings?.orderSummary}</Text>
                                    <Image source={Images.DownloadIcon} style={Styles.DownloadIcon} />
                                </View>
                                <View style={Styles.SumaryBottomBox}>
                                    <Text style={Styles.DeliveryAddressheader}>{Strings?.deliveryAddress}</Text>
                                    <Text style={Styles.AddressInfo}>{DeliveryDetails?.address}</Text>
                                    <View style={Styles.customBorder} />
                                    <View style={Styles.paymentModeContainer}>
                                        <Text style={[Styles.paymentMode]}>{Strings?.PaymentMode}</Text>
                                        <Text style={Styles.InfoBold}>{paymentMode}</Text>
                                    </View>
                                    <View style={Styles.customBorder} />
                                    <Text style={[Styles.items]}>{Strings?.items}</Text>
                                    {currentOrder.Items.map((item, idx) => (
                                        <View key={idx} style={Styles.ItemRow}>
                                            <View style={Styles.ItemRowQty}>
                                                <Text style={Styles.ItemName}>{item?.name}</Text>
                                                <Text style={Styles.ItemQty}>{item?.quantity}</Text>
                                            </View>
                                            <Text style={Styles.ItemPrice}>{item?.price * item?.quantity} {countrySelected?.currencyCode}</Text>
                                        </View>
                                    ))}
                                    <View style={Styles.customBorder2} />
                                    <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={() => { setOpenAmountDetails(!openAmountDetails) }}
                                        style={Styles.TotalRow}>
                                        <View style={Styles.TotalLabelLeft}>
                                            <Text style={Styles.TotalLabel}>{Strings?.grandTotal}</Text>
                                            <View style={Styles.ExpansionButton}>
                                                <Image source={Images?.Arrow_down} style={[Styles.ArrowDown, openAmountDetails && Styles.rotateImage]} />
                                            </View>
                                        </View>
                                        <Text style={Styles.TotalAmount}>{GrandTotal.toFixed(2)} {countrySelected?.currencyCode}</Text>
                                    </TouchableOpacity>
                                    {openAmountDetails && (
                                        <View style={Styles.amountOpenContainer}>
                                            <View style={Styles.BillRowEntries}>
                                                <Text style={Styles.BillRowLeft}>{Strings?.SubTotal}</Text>
                                                <Text style={Styles.BillRow}> {SubTotal.toFixed(2)} {countrySelected?.currencyCode}</Text>
                                            </View>
                                            <View style={Styles.BillRowEntries}>
                                                <Text style={Styles.BillRowLeft}>{Strings?.vat} @ {DeliveryDetails?.vatCharge}% </Text>
                                                <Text style={Styles.BillRow}>  {vatAmount.toFixed(2)} {countrySelected?.currencyCode}</Text>
                                            </View>
                                            <View style={Styles.BillRowEntries}>
                                                <Text style={Styles.BillRowLeft}>{Strings?.deliveriCharge} </Text>
                                                <Text style={Styles.BillRow}> {deliveriCharge} {countrySelected?.currencyCode}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </>
                        ) : (
                            <View style={Styles.FailedContainer}>
                                <Text style={Styles.FailedTitle}>{Strings?.unableToProcess}</Text>
                                <Text style={Styles.FailedSubText}>
                                    {Strings?.tryAgainMsg} <Text style={Styles.PhoneNumber}>{DeliveryDetails?.supprotMobile}</Text>
                                </Text>
                                <View style={Styles.RefundBox}>
                                    <Text style={Styles.RefundTitle}>{Strings?.refundInitiated}</Text>
                                    <Text style={Styles.RefundInfo}>
                                        {Strings?.refundMessage} <Text style={Styles.failedTotalAmount}>{GrandTotal.toFixed(2)} {countrySelected?.currencyCode}</Text> {Strings?.refundMessage2}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={Styles.RestaurantBox}>
                        {orderStatus ? (
                            <>
                                <Text style={Styles.RestaurantTitle}>{Strings?.KFC_restaurant}</Text>
                                <View style={Styles.addressAndCall}>
                                    <Text style={Styles.RestaurantAddress} numberOfLines={2}>{DeliveryDetails?.restaurantName}</Text>
                                    <TouchableOpacity>
                                        <Image source={Images.GreenPhoneCall} style={Styles.CallIcon} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <View style={Styles.WriteBox}>
                                <Text style={Styles.WriteTitle}>{Strings?.writeToUs}</Text>
                                <Text style={Styles.WriteSub}>{Strings?.writeMessage}</Text>
                                <View style={Styles.EmailBox}>
                                    <Text style={Styles.EmailText}>{DeliveryDetails?.supportMail}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) =>
    StyleSheet.create({
        Parent: {
            flex: 1,
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
            paddingHorizontal: 10,
        },
        BackIconAndHeaderText: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: 18,
            width: 18,
            marginHorizontal: 18,
        },
        headerText: {
            fontSize: 20,
            fontFamily: Fonts.subHeader,
            fontWeight: 700,
            color: Colors.textBlack,
        },
        ContentContainer: {
            backgroundColor: Colors?.bodyLigheterColor
        },
        OrderBox: {
            backgroundColor: Colors.bodyColor,
            marginHorizontal: 15,
            marginTop: 15,
            padding: 20,
            borderRadius: 2,
            elevation: 5,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        Row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BucketImg: {
            height: 60,
            width: 60,
            marginRight: 15
        },
        orderNotConfrimedAndRotator: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        OrderConfirmed: {
            fontSize: 18,
            fontFamily: Fonts.subHeader,
            fontWeight: 700,
            color: Colors.textBlack,
        },
        RoundLoader: {
            height: 15,
            width: 15,
            marginHorizontal: 10,
            tintColor: Colors?.textFadeBlack
        },
        OrderNumber: {
            fontSize: 16,
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
            marginTop: 3,
            fontWeight: 600,
        },
        WaitingText: {
            maxWidth: '80%',
            marginTop: 5,
            fontFamily: Fonts.font17,
            fontWeight: 500,
            color: Colors.timerFadeText,
            lineHeight: 20,
            fontSize: 12,
        },
        DateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
        },
        DateText: {
            fontSize: 12,
            color: Colors.textBlack,
            fontFamily: Fonts.font17,
            fontWeight: 600
        },
        TrackBox: {
            marginTop: 15,
            marginHorizontal: 15,
            backgroundColor: Colors.bodyColor,
            padding: 14,
            borderRadius: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 5,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        TrackLeft: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        TrackIcon: {
            height: 25,
            width: 25,
            tintColor: Colors.textBlack
        },
        FadeIcon: {
            tintColor: Colors.fadeBorder
        },
        FadeText: {
            color: Colors.fadeBorder
        },
        TrackText: {
            fontSize: 15,
            fontFamily: Fonts.font17,
            marginLeft: 10,
            fontWeight: 600,
            color: Colors.textBlack,
        },
        TrackArrow: {
            height: 18,
            width: 18,
            tintColor: Colors.textBlack,
            transform: [{ scaleX: -1 }]
        },
        SummaryBox: {
            marginHorizontal: 15,
            marginTop: 20,
            backgroundColor: Colors.bodyColor,
            paddingBottom: 20,
            borderRadius: 2,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        SumaryBottomBox: {
            marginHorizontal: 15,
        },
        SummaryHeaderRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors?.bodyShadeColor,
            paddingHorizontal: 15,
        },
        SummaryHeader: {
            fontSize: 14,
            fontFamily: Fonts.subHeader,
            fontWeight: 700,
            color: Colors.textBlack,
            marginVertical: 20,
        },
        DownloadIcon: {
            height: 25,
            width: 25,
            tintColor: Colors?.textBlack
        },

        SectionTitle: {
            marginTop: 20,
            fontSize: 15,
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
            marginBottom: 5,
        },
        DeliveryAddressheader: {
            marginTop: 10,
            fontSize: 13,
            color: Colors?.textBlack,
            fontWeight: 600,
            fontFamily: Fonts?.font17
        },
        AddressInfo: {
            marginTop: 10,
            marginBottom: 10,
            fontFamily: Fonts.font17,
            fontWeight: 500,
            color: Colors.timerFadeText,
            lineHeight: 20,
            fontSize: 13,
        },
        customBorder: {
            width: '100%',
            borderBottomColor: Colors?.blueLightBG,
            borderBottomWidth: 1,
        },
        customBorder2: {
            borderBottomColor: Colors?.blueLightBG,
            width: '100%',
            marginTop: 15,
            borderBottomWidth: 1,
        },
        paymentModeContainer: {
            marginTop: 15,
            marginBottom: 15,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        paymentMode: {
            fontFamily: Fonts.font12,
            fontSize: 13,
            color: Colors.timerFadeText,
            fontWeight: 700,
        },
        InfoBold: {
            fontFamily: Fonts.subHeader,
            fontSize: 13,
            fontWeight: 700,
            color: Colors.textFadeBlack2,
        },
        items: {
            marginTop: 10,
            fontFamily: Fonts.subHeader,
            fontSize: 14,
            fontWeight: 700,
            color: Colors.textBlack,
        },
        ItemRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
        },
        ItemRowQty: {
            width: '55%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        ItemName: {
            flex: 1,
            fontFamily: Fonts.font12,
            color: Colors.timerFadeText,
            fontSize: 14,
            fontWeight: 500
        },
        ItemQty: {
            width: 30,
            textAlign: 'center',
            fontFamily: Fonts.regular,
            color: Colors.textGrey,
            fontSize: 14,
        },
        ItemPrice: {
            color: Colors.textBlack,
            fontSize: 13,
            marginTop: 8,
            fontFamily: Fonts.subHeader,
            fontWeight: 500
        },

        TotalRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
        },
        TotalLabelLeft: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        TotalLabel: {
            fontFamily: Fonts.subHeader,
            fontSize: 14,
            color: Colors?.textFadeBlack2
        },
        ExpansionButton: {
            height: 20,
            width: 20,
            borderRadius: 15,
            backgroundColor: Colors?.blueMixBG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginHorizontal: 10
        },
        ArrowDown: {
            height: 15,
            width: 15,
            tintColor: Colors?.textBlack
        },
        rotateImage: {
            transform: [{ rotate: '180deg' }]
        },
        TotalAmount: {
            fontFamily: Fonts.subHeader,
            fontSize: 16,
            color: Colors.textBlack,
            fontWeight: 600,
        },
        amountOpenContainer: {
            marginTop: 12,
            marginLeft: 10,
        },
        BillRowEntries: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        BillRowLeft: {
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack2,
            fontSize: 14,
            fontWeight: 500.
        },
        BillRow: {
            fontSize: 14,
            marginTop: 8,
            fontFamily: Fonts.subHeader,
            color: Colors.textFadeBlack2,
            fontWeight: 500
        },
        FailedContainer: {
            backgroundColor: Colors.bodyColor,
            marginTop: 20,
            padding: 20,
        },
        FailedTitle: {
            fontSize: 20,
            fontFamily: Fonts.font17,
            fontWeight: '700',
            color: Colors.textBlack,
            textAlign: 'center',
        },
        FailedSubText: {
            marginTop: 10,
            fontSize: 16,
            width: '80%',
            alignSelf: 'center',
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack,
            textAlign: 'center',
            lineHeight: 20,
        },
        PhoneNumber: {
            fontFamily: Fonts.subHeader,
            fontWeight: 700,
            color: Colors.textFadeBlack,
        },
        RefundBox: {
            marginTop: 25,
            backgroundColor: Colors.bodyLigheterColor,
            padding: 15,
            borderStyle: 'dashed',
            borderRadius: 2,
            borderWidth: 1,
            borderColor: Colors.textFadeBlack,
        },
        RefundTitle: {
            fontSize: 16,
            fontFamily: Fonts.subHeader,
            fontWeight: 600,
            color: Colors.textFadeBlack2,
        },
        RefundInfo: {
            marginTop: 10,
            fontSize: 15,
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText,
            fontWeight: 500,
            lineHeight: 25,
        },
        failedTotalAmount: {
            fontSize: 15,
            fontFamily: Fonts.subHeader,
            fontWeight: 600,
            color: Colors.textFadeBlack2,
        },
        WriteBox: {
        },
        WriteTitle: {
            fontSize: 18,
            fontFamily: Fonts.font17,
            fontWeight: 500,
            color: Colors.textFadeBlack2,
        },
        WriteSub: {
            marginTop: 5,
            fontSize: 13,
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack,
            lineHeight: 20,
        },
        EmailBox: {
            marginHorizontal: 'auto',
            marginTop: 15,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: Colors.timerFadeText,
            borderRadius: 1,
        },
        EmailText: {
            fontFamily: Fonts.subHeader,
            fontSize: 14,
            fontWeight: 600,
            marginHorizontal: 10,
            color: Colors.textFadeBlack,
            // textAlign: 'center',
        },
        RestaurantBox: {
            marginTop: 20,
            marginHorizontal: 15,
            backgroundColor: Colors.bodyColor,
            padding: 20,
            borderRadius: 2,
            marginBottom: 40,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        RestaurantTitle: {
            fontSize: 18,
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
            fontWeight: 700,
        },
        addressAndCall: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        RestaurantAddress: {
            marginTop: 10,
            color: Colors.timerFadeText,
            lineHeight: 20,
            fontSize: 13,
            fontWeight: 500,
            maxWidth: '75%'
        },
        CallIcon: {
            height: 38,
            width: 38,
            tintColor: Colors?.greenOk
        },
    });
