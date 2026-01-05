import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, Easing, Share, Linking } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// data imports 
import { DeliveryDetails } from '../../data/DeliveryDetails';
import { selectCurrentOrder } from '../../features/getCurrentOrder';
import { useSelector } from 'react-redux';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';

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
    console.log("status",orderStatus)
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors);
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    const [openAmountDetails, setOpenAmountDetails] = useState<boolean>(false)
    const [pending, setPending] = useState<boolean>(true)
    let currentOrder: OrderHistory | null = useSelector(selectCurrentOrder)
    useEffect((): (() => void) | void => {
        const timeOut = setTimeout(() => {
            setPending(false)
        }, 4000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [])
    const rotate = useRef(new Animated.Value(0)).current
    useEffect((): () => void | void => {
        const animation = Animated.loop(
            Animated.timing(rotate, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        )
        animation.start()
        return () => animation.stop()
    }, [rotate])
    const handleShareInvoice = async (): Promise<void> => {
        const pdfUrl: string = DeliveryDetails?.demoPDFurl
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
        <View style={[Styles.Parent, { paddingTop: inset.top }]}>
            <View style={Styles.NavWrapper}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => {
                            orderStatus ?
                                navigation.replace(Strings.AppStack)
                                :
                                navigation.pop(2)
                        }}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.orderStatus}</Text>
                </View>
            </View>
            <View style={Styles.ContentContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={Styles.OrderBox}>
                        <View style={Styles.Row}>
                            <Image source={{uri :currentOrder?.Items[0]?.image}} style={Styles.BucketImg} />
                            {orderStatus ? (
                                <>
                                    {pending ? (
                                        <View>
                                            <View style={Styles.orderNotConfrimedAndRotator}>
                                                <Text style={Styles.OrderConfirmed}>{Strings.pendingConfirmation}</Text>
                                                <Animated.Image
                                                    style={[Styles.RoundLoader, {
                                                        transform: [{
                                                            rotate: rotate.interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: ['0deg', '360deg'],
                                                            })
                                                        }]
                                                    }]}
                                                    source={Images.RoundLoader}
                                                />
                                            </View>
                                            <Text style={Styles.WaitingText}>{Strings.waitingOrder}</Text>
                                        </View>
                                    ) : (
                                        <View>
                                            <Text style={Styles.OrderConfirmed}>{Strings.orderConfired}</Text>
                                            <Text style={Styles.OrderNumber}>{Strings.OrderNo} {orderId}</Text>
                                        </View>
                                    )}
                                </>) : (
                                <Text style={Styles.OrderConfirmed}>{Strings.orderFailed} </Text>
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
                                        <Text style={[Styles.TrackText, Styles?.FadeText]}>{Strings.trackOrder}</Text>
                                    </View>
                                    <Image source={Images.back_arrow} style={[Styles.TrackArrow, Styles?.FadeIcon]} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(Strings.TrackOrderScreen, {
                                            currentOrder: currentOrder ?? null,
                                            orderId: orderId,
                                            grandTotal: GrandTotal
                                        })
                                    }
                                    style={Styles.TrackBox}>
                                    <View style={Styles.TrackLeft}>
                                        <Image source={Images.Track_Order} style={Styles.TrackIcon} />
                                        <Text style={Styles.TrackText}>{Strings.trackOrder}</Text>
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
                                    <Text style={Styles.SummaryHeader}>{Strings.orderSummary}</Text>
                                    <TouchableOpacity
                                        onPress={handleShareInvoice}
                                    >
                                        <Image source={Images.DownloadIcon} style={Styles.DownloadIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={Styles.SumaryBottomBox}>
                                    <Text style={Styles.DeliveryAddressheader}>{Strings.deliveryAddress}</Text>
                                    <Text style={Styles.AddressInfo}>{DeliveryDetails?.address}</Text>
                                    <View style={Styles.customBorder} />
                                    <View style={Styles.paymentModeContainer}>
                                        <Text style={[Styles.paymentMode]}>{Strings.PaymentMode}</Text>
                                        <Text style={Styles.InfoBold}>{paymentMode}</Text>
                                    </View>
                                    <View style={Styles.customBorder} />
                                    <Text style={Styles.items}>{Strings.items}</Text>
                                    {currentOrder?.Items.map((item, idx) => (
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
                                            <Text style={Styles.TotalLabel}>{Strings.grandTotal}</Text>
                                            <View style={Styles.ExpansionButton}>
                                                <Image source={Images.Arrow_down} style={[Styles.ArrowDown, openAmountDetails && Styles.rotateImage]} />
                                            </View>
                                        </View>
                                        <Text style={Styles.TotalAmount}>{GrandTotal.toFixed(2)} {countrySelected?.currencyCode}</Text>
                                    </TouchableOpacity>
                                    {openAmountDetails && (
                                        <View style={Styles.amountOpenContainer}>
                                            <View style={Styles.BillRowEntries}>
                                                <Text style={Styles.BillRowLeft}>{Strings.SubTotal}</Text>
                                                <Text style={Styles.BillRow}> {SubTotal.toFixed(2)} {countrySelected?.currencyCode}</Text>
                                            </View>
                                            <View style={Styles.BillRowEntries}>
                                                <Text style={Styles.BillRowLeft}>{Strings.vat} @ {DeliveryDetails?.vatCharge}% </Text>
                                                <Text style={Styles.BillRow}>  {vatAmount.toFixed(2)} {countrySelected?.currencyCode}</Text>
                                            </View>
                                            <View style={Styles.BillRowEntries}>
                                                <Text style={Styles.BillRowLeft}>{Strings.deliveriCharge} </Text>
                                                <Text style={Styles.BillRow}> {deliveriCharge} {countrySelected?.currencyCode}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </>
                        ) : (
                            <View style={Styles.FailedContainer}>
                                <Text style={Styles.FailedTitle}>{Strings.unableToProcess}</Text>
                                <Text style={Styles.FailedSubText}>
                                    {Strings.tryAgainMsg} <Text style={Styles.PhoneNumber}>{DeliveryDetails?.supprotMobile}</Text>
                                </Text>
                                <View style={Styles.RefundBox}>
                                    <Text style={Styles.RefundTitle}>{Strings.refundInitiated}</Text>
                                    <Text style={Styles.RefundInfo}>
                                        {Strings.refundMessage} <Text style={Styles.failedTotalAmount}>{GrandTotal.toFixed(2)} {countrySelected?.currencyCode}</Text> {Strings.refundMessage2}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={Styles.RestaurantBox}>
                        {orderStatus ? (
                            <>
                                <Text style={Styles.RestaurantTitle}>{Strings.KFC_restaurant}</Text>
                                <View style={Styles.addressAndCall}>
                                    <Text style={Styles.RestaurantAddress} numberOfLines={2}>{DeliveryDetails?.restaurantName}</Text>
                                    <TouchableOpacity>
                                        <Image source={Images.GreenPhoneCall} style={Styles.CallIcon} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <View>
                                <Text style={Styles.WriteTitle}>{Strings.writeToUs}</Text>
                                <Text style={Styles.WriteSub}>{Strings.writeMessage}</Text>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(`mailto:${DeliveryDetails?.supportMail}`)}
                                    style={Styles.EmailBox}
                                >
                                    <Text style={Styles.EmailText}>
                                        {DeliveryDetails?.supportMail}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType) =>
    StyleSheet.create({
        Parent: {
            flex: 1,
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: vh(10),
            paddingHorizontal: 10,
        },
        BackIconAndHeaderText: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(18),
            width: vw(18),
            marginHorizontal: vw(18),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
        },
        ContentContainer: {
            backgroundColor: Colors.bodyLigheterColor
        },
        OrderBox: {
            backgroundColor: Colors.bodyColor,
            marginHorizontal: vw(15),
            marginTop: vh(15),
            padding: normalize(20),
            borderRadius: normalize(2),
            elevation: 5,
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
        },
        Row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BucketImg: {
            height: vh(60),
            width: vw(60),
            marginRight: vw(15)
        },
        orderNotConfrimedAndRotator: {alignItems: 'center',
            flexDirection: 'row',
        },
        OrderConfirmed: {
            fontSize: normalize(18),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
        },
        RoundLoader: {
            height: vh(15),
            width: vw(15),
            marginHorizontal: vw(10),
            tintColor: Colors.textFadeBlack
        },
        OrderNumber: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
            marginTop: vh(3),
        },
        WaitingText: {
            maxWidth: '80%',
            marginTop: vh(5),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.timerFadeText,
            lineHeight: normalize(20),
            fontSize: normalize(12),
        },
        DateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(20),
        },
        DateText: {
            fontSize: normalize(12),
            color: Colors.textBlack,
            fontFamily: Fonts.helveticaMedium,
        },
        TrackBox: {
            marginTop: vh(15),
            marginHorizontal: vw(15),
            backgroundColor: Colors.bodyColor,
            padding: normalize(14),
            borderRadius: normalize(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 5,
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
        },
        TrackLeft: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        TrackIcon: {
            height: vh(25),
            width: vw(25),
            tintColor: Colors.textBlack
        },
        FadeIcon: {
            tintColor: Colors.fadeBorder
        },
        FadeText: {
            color: Colors.fadeBorder
        },
        TrackText: {
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaMedium,
            marginLeft: vw(10),
            color: Colors.textBlack,
        },
        TrackArrow: {
            height: vh(18),
            width: vw(18),
            tintColor: Colors.textBlack,
            transform: [{ scaleX: -1 }]
        },
        SummaryBox: {
            marginHorizontal: vw(15),
            marginTop: vh(20),
            backgroundColor: Colors.bodyColor,
            paddingBottom: vh(20),
            borderRadius: normalize(2),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        SumaryBottomBox: {
            marginHorizontal: vw(15),
        },
        SummaryHeaderRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors.bodyShadeColor,
            paddingHorizontal: vw(15),
        },
        SummaryHeader: {
            fontSize: normalize(14),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
            marginVertical: vh(20),
        },
        DownloadIcon: {
            height: vh(25),
            width: vw(25),
            tintColor: Colors.textBlack
        },

        SectionTitle: {
            marginTop: vh(20),
            fontSize: normalize(15),
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
            marginBottom: vh(5),
        },
        DeliveryAddressheader: {
            marginTop: vh(10),
            fontSize: normalize(13),
            color: Colors.textBlack,
            fontFamily: Fonts.helveticaMedium
        },
        AddressInfo: {
            marginTop: vh(10),
            marginBottom: vh(10),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.timerFadeText,
            lineHeight: normalize(20),
            fontSize: normalize(13),
        },
        customBorder: {
            width: '100%',
            borderBottomColor: Colors.blueLightBG,
            borderBottomWidth: normalize(1),
        },
        customBorder2: {
            borderBottomColor: Colors.blueLightBG,
            width: '100%',
            marginTop: vh(15),
            borderBottomWidth: normalize(1),
        },
        paymentModeContainer: {
            marginTop: vh(15),
            marginBottom: vh(15),alignItems: 'center',
            flexDirection: 'row',
        },
        paymentMode: {
            fontFamily: Fonts.font12,
            fontSize: normalize(13),
            color: Colors.timerFadeText,
        },
        InfoBold: {
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(13),
            color: Colors.textFadeBlack2,
        },
        items: {
            marginTop: vh(10),
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(14),
            color: Colors.textBlack,
        },
        ItemRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: vh(12),
        },
        ItemRowQty: {
            width: '55%',alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        ItemName: {
            flex: 1,
            fontFamily: Fonts.font12,
            color: Colors.timerFadeText,
            fontSize: normalize(14),
        },
        ItemQty: {
            width: vw(30),
            textAlign: 'center',
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textGrey,
            fontSize: normalize(14),
        },
        ItemPrice: {
            color: Colors.textBlack,
            fontSize: normalize(13),
            marginTop: vh(8),
            fontFamily: Fonts.helveticaMedium,
        },

        TotalRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(25),
        },
        TotalLabelLeft: {alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        TotalLabel: {
            fontFamily: Fonts.subHeader,
            fontSize: normalize(14),
            color: Colors.textFadeBlack2
        },
        ExpansionButton: {
            height: vh(20),
            width: vw(20),
            borderRadius: normalize(15),
            backgroundColor: Colors.blueMixBG,alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginHorizontal: vw(10)
        },
        ArrowDown: {
            height: vh(15),
            width: vw(15),
            tintColor: Colors.textBlack
        },
        rotateImage: {
            transform: [{ rotate: '180deg' }]
        },
        TotalAmount: {
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(16),
            color: Colors.textBlack,
        },
        amountOpenContainer: {
            marginTop: vh(12),
            marginLeft: vw(10),
        },
        BillRowEntries: {alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        BillRowLeft: {
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
            fontSize: normalize(14),
        },
        BillRow: {
            fontSize: normalize(14),
            marginTop: vh(8),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
        },
        FailedContainer: {
            backgroundColor: Colors.bodyColor,
            marginTop: vh(20),
            padding: normalize(20),
        },
        FailedTitle: {
            fontSize: normalize(20),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
            textAlign: 'center',
        },
        FailedSubText: {
            marginTop: vh(10),
            fontSize: normalize(16),
            width: '80%',
            alignSelf: 'center',
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack,
            textAlign: 'center',
            lineHeight: normalize(20),
        },
        PhoneNumber: {
            fontFamily: Fonts.helveticaBold,
            color: Colors.textFadeBlack,
        },
        RefundBox: {
            marginTop: vh(25),
            backgroundColor: Colors.bodyLigheterColor,
            padding: normalize(15),
            borderStyle: 'dashed',
            borderRadius: normalize(2),
            borderWidth: normalize(1),
            borderColor: Colors.textFadeBlack,
        },
        RefundTitle: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
        },
        RefundInfo: {
            marginTop: vh(10),
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.timerFadeText,
            lineHeight: normalize(25),
        },
        failedTotalAmount: {
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
        },
        WriteTitle: {
            fontSize: normalize(18),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
        },
        WriteSub: {
            marginTop: vh(5),
            fontSize: normalize(13),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack,
            lineHeight: vh(20),
        },
        EmailBox: {
            marginHorizontal: 'auto',
            marginTop: vh(15),
            paddingHorizontal: vw(16),
            paddingVertical: vh(12),
            borderWidth: normalize(1),
            borderColor: Colors.timerFadeText,
            borderRadius: normalize(1),
        },
        EmailText: {
            fontFamily: Fonts.helveticaMedium,
            fontSize: normalize(14),
            marginHorizontal: vw(10),
            color: Colors.textFadeBlack,
        },
        RestaurantBox: {
            marginTop: vh(20),
            marginHorizontal: vw(15),
            backgroundColor: Colors.bodyColor,
            padding: normalize(20),
            borderRadius: normalize(2),
            marginBottom: vh(40),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        RestaurantTitle: {
            fontSize: normalize(18),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
        },
        addressAndCall: {alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        RestaurantAddress: {
            marginTop: vh(10),
            color: Colors.timerFadeText,
            lineHeight: vh(20),
            fontSize: normalize(13),
            maxWidth: '75%',
            fontFamily: Fonts.helveticaMedium,
        },
        CallIcon: {
            height: vh(38),
            width: vw(38),
            tintColor: Colors.greenOk
        },
    });
