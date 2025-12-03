import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data imports 
import DeliveryDetails from '../../data/DeliveryDetails';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import { useCart } from '../../context/CartContext';
export default function CheckOut({ totalAmount, discount }: { totalAmount: number, discount: number }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    const { CartItem } = useCart()
    const totalItem = CartItem.length
    const [deliveryType, setDeliveryType] = useState<'now' | 'later'>('now');
    const cartDescription = CartItem?.reduce((acc, item, idx) => {
        return (acc + item?.quantity + ' ' + item?.name + ((idx + 1 != CartItem.length) ? ', ' : ' '))
    }, '');
    const [paymentMethodOpen, setPaymentMethodOpen] = useState<boolean>(false)
    const [paymentMethodSelected, setPaymentMethodSelected] = useState<string>('')
    // amount calculations  
    const vatAmount: number = Number((totalAmount * 5 / 100).toFixed(2))
    const beforeTax: number = totalAmount - DeliveryDetails?.charges - vatAmount
    const DiscountPrice: number = discount;
    const AfterDiscount: number = Number((beforeTax - DiscountPrice).toFixed(2));
    const GrandTotal: number = AfterDiscount + DeliveryDetails?.charges
    const openPaymentOptions = () => {
        // setPaymentMethodOpen(true);
    }
    const HandlePaymentMethodToggle = () => {
        setPaymentMethodOpen(!paymentMethodOpen)
        paymentMethodOpen == true && scrollToPosition()
    }
    const openPaymentModal = () => {
        // on payment success , navigate to orderstatus page
        let TempOrderDate = new Date().toDateString().split(' ').slice(1)
        const OrderDate = TempOrderDate.join(' ')
        const OrderTime = new Date().toTimeString().split(' ')[0]
        onPaymentSuccess("ORD-123", OrderDate, OrderTime)
    }

    const orderStatus = Math.floor(Math.random() * 2) + 1;
    const onPaymentSuccess = (orderId: string, OrderDate: string, OrderTime: string) => {
        navigation.navigate(Strings?.OrderStatusScreen, {
            currentOrder: CartItem,
            orderId: orderId,
            OrderDate: OrderDate,
            OrderTime: OrderTime,
            paymentMode: paymentMethodSelected,
            vatAmount: vatAmount,
            GrandTotal: GrandTotal,
            SubTotal: beforeTax,
            deliveriCharge: DeliveryDetails?.charges,
            orderStatus: orderStatus
        })
    }
    useEffect(() => {
        if (paymentMethodOpen) {
            setTimeout(() => {
                scrollToPosition();
            }, 100);
        }
    }, [paymentMethodOpen]);
    const scrollViewRef = useRef<ScrollView>(null)
    const scrollToPosition = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings?.checkOut} </Text>
                </View>
            </View>
            <View style={Styles.ContentConatiner}>
                <ScrollView ref={scrollViewRef}>
                    <View style={Styles.CustomerCard}>
                        <View >
                            <Text style={Styles.userName}>{DeliveryDetails?.personName}</Text>
                            <Text style={Styles.userPhone}>{countrySelected?.mobileCode} - {DeliveryDetails?.mobileNumber}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(Strings?.CreateProfileScreen, {
                                phoneNo: DeliveryDetails?.mobileNumber
                            })}
                            style={Styles.changeButton}>
                            <Text style={Styles.changeText}>{Strings?.change}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.card}>
                        <View style={Styles?.deliveryContainer}>
                            <Image
                                source={Images?.DeliveryBike}
                                style={Styles.deliveryBike}
                            />
                            <Text style={Styles.sectionTitle}>{Strings?.wantOrder}</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={.7}
                            style={Styles.radioRow}
                            onPress={() => setDeliveryType('now')}
                        >
                            <Text style={Styles.radioText}>{Strings?.deliverNow}</Text>
                            <View style={[Styles.radioOuter, deliveryType === 'now' && Styles.radioActiveOuter]}>
                                {deliveryType === 'now' && <View style={Styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            style={Styles.radioRow}
                            onPress={() => setDeliveryType('later')}
                        >
                            <Text style={Styles.radioText}>{Strings?.deliveryLater}</Text>
                            <View style={[Styles.radioOuter, deliveryType === 'later' && Styles.radioActiveOuter]}>
                                {deliveryType === 'later' && <View style={Styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={Styles.sectionLabel}>{Strings?.deliveryAddress.toUpperCase()}</Text>
                    <View style={Styles.card}>
                        <View style={Styles.addressHeader}>
                            <View style={Styles.homeTag}>
                                <Text style={Styles.homeTagText}>{Strings?.home.toUpperCase()}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(Strings?.MapsScreen)}>
                                <Text style={Styles.editText}>{Strings?.edit.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={Styles.addressText} numberOfLines={2}>
                            {DeliveryDetails?.address}
                        </Text>
                        <View style={Styles.contactlessRow}>
                            <View style={Styles.checkboxRed} >
                                <Image source={Images?.Tick_Mark} style={Styles.Tick_Mark} />
                            </View>
                            <Text style={Styles.contactlessText}>{Strings?.contactLessDelivery}</Text>
                        </View>
                    </View>
                    <View style={Styles.ItemsCard}>
                        <View style={Styles.ItemsCardUpperBox}>
                            <View style={Styles.itemCountRow}>
                                <Text style={Styles.itemCount}>{totalItem}</Text>
                                <Text style={Styles.itemsLabel}>{Strings?.items}</Text>
                            </View>
                            <View style={Styles.CustomVerticalBorder} />
                            <View style={Styles.ItemTextContainer}>
                                <Text style={Styles.itemDescription}
                                    numberOfLines={2}>
                                    {cartDescription}
                                </Text>
                            </View>
                        </View>
                        <View style={Styles.AmountBoxContainer}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={HandlePaymentMethodToggle}
                                style={Styles.amountBox}>
                                <Text style={Styles.amountText}>{Strings?.amountToBepaid}</Text>
                                <View style={Styles.AmountWithButton}>
                                    <Text style={Styles.amountNumber}>{GrandTotal.toFixed(2)} {countrySelected?.code.toUpperCase()}</Text>
                                    <View
                                        style={Styles.PaymentMethodExpandButtonContainer}
                                    >
                                        <Image source={Images?.Arrow_down} style={[Styles.ArrowDown, paymentMethodOpen && Styles?.ArrowUp]} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {paymentMethodOpen && (
                                <View style={Styles.amountDetailsContainer}>
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings?.SubTotal} </Text>
                                        <Text style={Styles.PriceEntriesRight}>{AfterDiscount} {countrySelected?.currencyCode} </Text>
                                    </View>
                                    {DiscountPrice != 0 && (
                                        <View style={Styles.PriceEntries}>
                                            <Text style={Styles.PriceEntriesLeft}>{Strings?.discount} </Text>
                                            <Text style={[Styles.PriceEntriesRight, Styles?.discountPrice]}>- {DiscountPrice} {countrySelected?.currencyCode} </Text>
                                        </View>
                                    )}
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings?.vat.toUpperCase()} @ {DeliveryDetails?.vatCharge}% </Text>
                                        <Text style={Styles.PriceEntriesRight}>{vatAmount} {countrySelected?.currencyCode} </Text>
                                    </View>
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings?.deliveriCharge} </Text>
                                        <Text style={Styles.PriceEntriesRight}>{DeliveryDetails?.charges} {countrySelected?.currencyCode} </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                    <Text style={Styles.sectionLabel}>{Strings?.paymentMethods.toUpperCase()}</Text>
                    <View style={Styles.PaymentMethodsContainer}>
                        <TouchableOpacity
                            onPress={() => setPaymentMethodSelected('Cash On Delivery')}
                            activeOpacity={.5}
                            style={Styles.PaymentMethodsEntries}>
                            <View style={Styles.PaymentTextLeft}>
                                <Image source={Images?.COD_Cash} style={Styles.paymentImage} />
                                <Text style={Styles.paymentText}>{Strings?.cashOnDelivery} </Text>
                            </View>
                            <View style={Styles.radioRow}>
                                <View style={[Styles.radioOuter, paymentMethodSelected === 'Cash On Delivery' && Styles.radioActiveOuter]}>
                                    {paymentMethodSelected === 'Cash On Delivery' && <View style={Styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => setPaymentMethodSelected('Credit Card')}
                            style={Styles.PaymentMethodsEntries}>
                            <View style={Styles.PaymentTextLeft}>
                                <Image source={Images?.CreditCard} style={Styles.paymentImage} />
                                <Text style={Styles.paymentText}>{Strings?.creditDebitcards} </Text>
                            </View>
                            <View style={Styles.radioRow}>
                                <View style={[Styles.radioOuter, paymentMethodSelected === 'Credit Card' && Styles.radioActiveOuter]}>
                                    {paymentMethodSelected === 'Credit Card' && <View style={Styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => setPaymentMethodSelected('Visa Checkout')}
                            style={Styles.PaymentMethodsEntries}>
                            <View style={Styles.PaymentTextLeft}>
                                <View style={Styles.paymentImageVisaContainer}>
                                    <Image source={Images?.Visa_Text} style={Styles.paymentImageVisa} />
                                </View>
                                <Text style={Styles.paymentText}>{Strings?.visaCheckOut} </Text>
                            </View>
                            <View style={Styles.radioRow} >
                                <View style={[Styles.radioOuter, paymentMethodSelected === 'Visa Checkout' && Styles.radioActiveOuter]}>
                                    {paymentMethodSelected === 'Visa Checkout' && <View style={Styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={[Styles.ButtonWrapper,]}>
                <TouchableOpacity
                    style={[Styles.bottomButton, { marginBottom: inset.bottom }]}
                    onPress={() => paymentMethodSelected
                        ? openPaymentModal()
                        : openPaymentOptions()
                    }>
                    <Text style={Styles.bottomButtonText}>{paymentMethodSelected ? Strings?.makePayment.toUpperCase() : Strings?.paymentMode.toUpperCase()}</Text>
                </TouchableOpacity>
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
        ContentConatiner: {
            height: '90%',
            backgroundColor: Colors?.bodyLigheterColor,
        },
        CustomerCard: {
            backgroundColor: Colors?.bodyColor,
            marginHorizontal: 12,
            marginTop: 12,
            padding: 16,
            borderRadius: 2,
            elevation: 3,
            shadowColor: Colors?.blueShadows,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        card: {
            elevation: 3,
            shadowColor: Colors?.blueShadows,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: Colors?.bodyColor,
            marginHorizontal: 12,
            marginTop: 6,
            padding: 16,
            borderRadius: 2
        },
        userName: {
            fontSize: 18,
            fontWeight: 700,
            color: Colors?.textBlack,
            fontFamily: Fonts?.font17
        },
        userPhone: {
            fontSize: 14,
            opacity: 0.7,
            marginTop: 4,
            fontWeight: 700,
            color: Colors?.textFadeBlack2,
            fontFamily: Fonts?.subHeader
        },
        changeButton: {
            position: 'absolute',
            right: 16,
            top: 28,
            borderWidth: 1,
            borderColor: Colors?.activeBorder,
            borderRadius: 2,
        },
        changeText: {
            color: Colors?.activeBorder,
            fontWeight: 500,
            fontFamily: Fonts?.font17,
            fontSize: 10,
            marginHorizontal: 12,
            marginVertical: 6
        },
        deliveryContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        deliveryBike: {
            width: 40,
            height: 40,
            marginRight: 8,
            transform: [{ scaleX: -1 }]
        },
        sectionTitle: {
            fontSize: 14,
            marginLeft: 8.,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        radioRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: Colors?.bodyColor,
            marginRight: 6,
        },
        radioText: {
            fontSize: 16,
            fontWeight: 500,
            color: Colors?.textFadeBlack2,
        },
        radioOuter: {
            width: 20,
            height: 20,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: Colors?.textFadeBlack,
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioActiveOuter: {
            borderColor: Colors?.KFC_red,
        },
        radioInner: {
            width: 10,
            height: 10,
            backgroundColor: Colors?.KFC_red,
            borderRadius: 6,
        },

        sectionLabel: {
            marginTop: 12,
            fontSize: 13,
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            width: '90%',
            alignSelf: 'center'
        },
        addressHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        homeTag: {
            backgroundColor: Colors?.KFC_red,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 2,
            marginLeft: 6,
        },
        homeTagText: {
            color: Colors?.constantWhite,
            fontSize: 10,
            fontWeight: 700,
            marginHorizontal: 4,
            marginVertical: 2,
            fontFamily: Fonts?.font17,
        },
        editText: {
            color: Colors?.ButtonBlueColor,
            fontWeight: 600,
            fontSize: 12,
            fontFamily: Fonts?.font17,
            marginRight: 6,
        },
        addressText: {
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 10,
            marginLeft: 6,
            fontFamily: Fonts?.font17,
            color: Colors?.textFadeBlack,
            maxWidth: 280,
            lineHeight: 20,
        },
        contactlessRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 6,
        },
        checkboxRed: {
            width: 16,
            height: 16,
            backgroundColor: Colors?.KFC_red,
            marginRight: 6,
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Tick_Mark: {
            height: 12,
            width: 12,
            tintColor: Colors?.constantWhite,
        },
        contactlessText: {
            fontSize: 12,
            color: Colors?.textFadeBlack,
            marginVertical: 10,
        },
        ItemsCard: {
            elevation: 3,
            shadowColor: Colors?.blueShadows,
            shadowOffset: {
                width: 0, height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: Colors?.bodyColor,
            marginHorizontal: 12,
            marginTop: 6,
            paddingVertical: 16,
            paddingHorizontal: 10,
            borderRadius: 2,
        },
        ItemsCardUpperBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemCountRow: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 6
        },
        itemCount: {
            fontSize: 22,
            fontWeight: 700,
            color: Colors?.textBlack
        },
        itemsLabel: {
            marginLeft: 6,
            fontSize: 12,
            opacity: 0.7,
            color: Colors?.textBlack
        },
        ItemTextContainer: {
            width: '70%',
            overflow: 'hidden'
        },
        itemDescription: {
            fontSize: 14,
            marginBottom: 12,
            color: Colors?.timerFadeText,
            fontFamily: Fonts?.font17,
            fontWeight: 600,
            lineHeight: 20
        },
        CustomVerticalBorder: {
            height: '50%',
            borderRightColor: Colors?.textFadeBlack,
            borderRightWidth: 1,
            marginHorizontal: 10,
        },
        AmountBoxContainer: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Colors?.blueMixBG,
            borderRadius: 4,
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: Colors?.blueShadows,
        },
        amountBox: {
            height: 60,
            padding: 12,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        amountText: {
            fontSize: 14,
            fontWeight: '600'
        },
        AmountWithButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        amountNumber: {
            fontSize: 16,
            fontWeight: '700'
        },
        PaymentMethodExpandButtonContainer: {
            marginLeft: 8,
            height: 16,
            width: 16,
            backgroundColor: Colors?.blueShadows,
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        ArrowDown: {
            height: 14,
            width: 14,
            tintColor: Colors?.constantWhite
        },
        ArrowUp: {
            transform: [{ rotate: '180deg' }]
        },
        amountDetailsContainer: {
            width: '100%',
            marginBottom: 6,
        },
        PriceEntries: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 8,
            marginHorizontal: 15,
        },
        PriceEntriesLeft: {
            fontSize: 14,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textFadeBlack,
            fontWeight: 500,
        },
        PriceEntriesRight: {
            fontSize: 14,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textFadeBlack2,
            fontWeight: 500,
            marginLeft: 'auto'
        },
        discountPrice: {
            color: Colors?.greenOk
        },
        PaymentMethodsContainer: {
            marginTop: 10,
            backgroundColor: Colors?.bodyColor,
            width: '93%',
            marginHorizontal: 12,
            alignSelf: 'center',
            display: 'flex',
            marginBottom: 150,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        PaymentMethodsEntries: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginVertical: 6,
            flexDirection: 'row',
        },
        PaymentTextLeft: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        paymentImage: {
            height: 30,
            width: 30,
            tintColor: Colors?.textBlack,
        },
        paymentImageVisaContainer: {
            borderWidth: 1,
            borderColor: Colors?.textBlack,
            borderRadius: 2,
            paddingHorizontal: 4,
        },
        paymentImageVisa: {
            height: 30,
            width: 30,
            tintColor: Colors?.KFC_red,
        },
        paymentText: {
            marginLeft: 15,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textFadeBlack2
        },
        ButtonWrapper: {
            width: '100%',
            position: 'absolute',
            left: 0,
            bottom: 0,
            backgroundColor: Colors?.KFC_red,
        },
        bottomButton: {
            backgroundColor: Colors?.KFC_red,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        bottomButtonText: {
            marginVertical: 10,
            color: Colors?.constantWhite,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: 18,
        },
    });
    return Styles;
};