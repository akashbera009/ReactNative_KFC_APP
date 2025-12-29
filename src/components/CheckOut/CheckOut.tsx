import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { nanoid } from 'nanoid/non-secure';
// data imports 
import { DeliveryDetails } from '../../data/DeliveryDetails';
import RNDateTimePicker from '@react-native-community/datetimepicker';
// redux 
import { addAsyncOrder } from '../../actions/OrderAction';
import { RootState, useAppDispatch } from '../../store/store';
import { clearCart } from '../../features/cartSlice';
import { useSelector } from 'react-redux';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';
// export default function CheckOut({ totalAmount, discount }: { totalAmount: number, discount: number }) {
export default function CheckOut({ route }: CheckOutScreenProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected } = useCountry()
    const cartData = useSelector((state: RootState) => state.cart)
    const cartItem = cartData?.cartItems
    const totalItem = cartItem.length
    const [deliveryType, setDeliveryType] = useState<'now' | 'later'>('now');
    const cartDescription = cartItem?.reduce((acc: string, item: CartItemType, idx: number) => {
        return (acc + item?.quantity + ' ' + item?.name + ((idx + 1 !== cartItem.length) ? ', ' : ' '))
    }, '');
    const [paymentMethodOpen, setPaymentMethodOpen] = useState<boolean>(false)
    const [paymentMethodSelected, setPaymentMethodSelected] = useState<string>('')
    const [laterDate, setLaterDate] = useState<Date>(new Date())
    const [showTime, setShowTime] = useState<boolean>(false);
    const [showDate, setShowDate] = useState<boolean>(false);
    // amount calculations  
    const { totalAmount, discount } = route.params
    const vatAmount: number = Number((totalAmount * 5 / 100).toFixed(2))
    const beforeTax: number = totalAmount - DeliveryDetails?.charges - vatAmount
    const DiscountPrice: number = discount;
    const AfterDiscount: number = Number((beforeTax - DiscountPrice).toFixed(2));
    const GrandTotal: number = AfterDiscount + DeliveryDetails?.charges
    const dispatch = useAppDispatch()
    // order related details 
    const TempOrderDate = new Date().toDateString().split(' ').slice(1)
    const OrderDate = TempOrderDate.join(' ')
    const OrderTime = new Date().toTimeString().split(' ')[0]
    const OrderId = `ORD-${nanoid(7)}`
    const openPaymentModal = (): void => {
        if (paymentMethodSelected === Strings.cashOnDeliveryString) {
            onPaymentSuccess('', OrderId, true, OrderDate, OrderTime, Strings.cashOnDeliveryString)
        } else {
            navigation.navigate(Strings.ModalStack,
                {
                    screen: Strings.PaymentModalScreen,
                    params: {
                        amount: GrandTotal,
                    }
                })
        }
    }
    const onPaymentSuccess = useCallback((paymentId: string | undefined, orderId: string, isSuccess: boolean, OrderDate: string, OrderTime: string, paymentMode: string): void => {
        const newOrder: OrderHistory = {
            id: Date.now(),
            Items: cartItem,
            date: `${OrderDate}`,
            orderId: orderId,
            status: Strings.beingPreparedString,
            paymentMode: paymentMode,
            paymentId: paymentId
        };
        Alert.alert(isSuccess ? Strings.success : Strings.failed);
        setTimeout(() => {
            navigation.pop(2);
            if (isSuccess) {
                dispatch(addAsyncOrder(newOrder))
                dispatch(clearCart())
            }
            navigation.navigate(Strings.OrderStack, {
                screen: Strings.OrderStatusScreen,
                params: {
                    currentOrders: cartItem,
                    orderId: orderId,
                    OrderDate: OrderDate,
                    OrderTime: OrderTime,
                    paymentMode: paymentMethodSelected,
                    vatAmount: vatAmount,
                    GrandTotal: GrandTotal,
                    SubTotal: beforeTax,
                    deliveriCharge: DeliveryDetails?.charges,
                    orderStatus: isSuccess
                }
            })
        }, 1000);
    }, [GrandTotal, Strings.OrderStack, Strings.OrderStatusScreen, Strings.beingPreparedString, Strings.failed, Strings.success, beforeTax, cartItem, dispatch, navigation, paymentMethodSelected, vatAmount])
    useEffect(() => {
        if (route.params?.result !== undefined) {
            onPaymentSuccess(route.params?.payment_id, OrderId, route.params?.result, OrderDate, OrderTime, Strings.onlineString);
        }
    }, [route.params, OrderDate, OrderId, OrderTime, Strings.onlineString, onPaymentSuccess])

    useEffect((): (() => void) | void => {
        if (paymentMethodOpen) {
            const timeoutId: number = setTimeout(scrollToPosition, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [paymentMethodOpen]);
    const scrollViewRef = useRef<ScrollView>(null)
    const scrollToPosition = (): void => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };
    const HandleAmountBoxToggle = (): void => {
        setPaymentMethodOpen(!paymentMethodOpen)
        paymentMethodOpen === true && scrollToPosition()
    }
    const handelDeliverlater = async () => {
        setShowDate(true)
        setDeliveryType('later')
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
                    <Text style={Styles.headerText}>{Strings.checkOut} </Text>
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
                            onPress={() => navigation.navigate(Strings.CreateProfileScreen, {
                                phoneNo: DeliveryDetails?.mobileNumber
                            })}
                            style={Styles.changeButton}>
                            <Text style={Styles.changeText}>{Strings.change}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.card}>
                        <View style={Styles?.deliveryContainer}>
                            <Image
                                source={Images.DeliveryBike}
                                style={Styles.deliveryBike}
                            />
                            <Text style={Styles.sectionTitle}>{Strings.wantOrder}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={.7}
                            style={Styles.radioRow}
                            onPress={() => {
                                setDeliveryType('now')
                                setShowDate(false)
                                setLaterDate(new Date())
                            }}
                        >
                            <Text style={Styles.radioText}>{Strings.deliverNow}</Text>
                            <View style={[Styles.radioOuter, deliveryType === 'now' && Styles.radioActiveOuter]}>
                                {deliveryType === 'now' && <View style={Styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            style={Styles.radioRow}
                            onPress={handelDeliverlater}
                        >
                            <Text style={Styles.radioText}>{Strings.deliveryLater}</Text>
                            <View style={[Styles.radioOuter, deliveryType === 'later' && Styles.radioActiveOuter]}>
                                {deliveryType === 'later' && <View style={Styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                        {new Date().toLocaleString().slice(0, 17) !== laterDate.toLocaleString().slice(0, 17) && (
                            <Text style={Styles.dateBadge}> {Strings.willBeDeliveredOn} :  {laterDate.toLocaleString().slice(0, 16)}</Text>
                        )}
                        {showDate && (
                            <RNDateTimePicker
                                value={laterDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                minimumDate={new Date()}
                                onChange={(event, selectedDate) => {
                                    setShowDate(false);
                                    if (event.type === 'set' && selectedDate) {
                                        setLaterDate(selectedDate);
                                        setTimeout(() => {
                                            setShowTime(true);
                                        }, 300);
                                    }
                                }}
                            />
                        )}
                        {showTime && (
                            <RNDateTimePicker
                                value={laterDate}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                minuteInterval={10}
                                onChange={(event, selectedTime) => {
                                    setShowTime(false);
                                    if (event.type === 'set' && selectedTime) {
                                        const updatedDate = new Date(laterDate);
                                        updatedDate.setHours(selectedTime.getHours());
                                        updatedDate.setMinutes(selectedTime.getMinutes());
                                        setTimeout(() => {
                                            setLaterDate(updatedDate);
                                        }, 500);
                                    } else if (event.type === 'dismissed') {
                                        setLaterDate(new Date())
                                    }
                                }}
                            />
                        )}
                    </View>
                    <Text style={Styles.sectionLabel}>{Strings.deliveryAddress.toUpperCase()}</Text>
                    <View style={Styles.card}>
                        <View style={Styles.addressHeader}>
                            <View style={Styles.homeTag}>
                                <Text style={Styles.homeTagText}>{Strings.home.toUpperCase()}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(Strings.MapsScreen)}>
                                <Text style={Styles.editText}>{Strings.edit.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={Styles.addressText} numberOfLines={2}>
                            {DeliveryDetails?.address}
                        </Text>
                        <View style={Styles.contactlessRow}>
                            <View style={Styles.checkboxRed} >
                                <Image source={Images.Tick_Mark} style={Styles.Tick_Mark} />
                            </View>
                            <Text style={Styles.contactlessText}>{Strings.contactLessDelivery}</Text>
                        </View>
                    </View>
                    <View style={Styles.ItemsCard}>
                        <View style={Styles.ItemsCardUpperBox}>
                            <View style={Styles.itemCountRow}>
                                <Text style={Styles.itemCount}>{totalItem}</Text>
                                <Text style={Styles.itemsLabel}>{Strings.items}</Text>
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
                                onPress={HandleAmountBoxToggle}
                                style={Styles.amountBox}>
                                <Text style={Styles.amountText}>{Strings.amountToBepaid}</Text>
                                <View style={Styles.AmountWithButton}>
                                    <Text style={Styles.amountNumber}>{GrandTotal.toFixed(2)} {countrySelected?.code.toUpperCase()}</Text>
                                    <View style={Styles.PaymentMethodExpandButtonContainer}>
                                        <Image source={Images.Arrow_down} style={[Styles.ArrowDown, paymentMethodOpen && Styles?.ArrowUp]} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {paymentMethodOpen && (
                                <View style={Styles.amountDetailsContainer}>
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings.SubTotal} </Text>
                                        <Text style={Styles.PriceEntriesRight}>{AfterDiscount} {countrySelected?.currencyCode} </Text>
                                    </View>
                                    {DiscountPrice !== 0 && (
                                        <View style={Styles.PriceEntries}>
                                            <Text style={Styles.PriceEntriesLeft}>{Strings.discount} </Text>
                                            <Text style={[Styles.PriceEntriesRight, Styles?.discountPrice]}>- {DiscountPrice} {countrySelected?.currencyCode} </Text>
                                        </View>
                                    )}
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings.vat.toUpperCase()} @ {DeliveryDetails?.vatCharge}% </Text>
                                        <Text style={Styles.PriceEntriesRight}>{vatAmount} {countrySelected?.currencyCode} </Text>
                                    </View>
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings.deliveriCharge} </Text>
                                        <Text style={Styles.PriceEntriesRight}>{DeliveryDetails?.charges} {countrySelected?.currencyCode} </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                    <Text style={Styles.sectionLabel}>{Strings.paymentMethods.toUpperCase()}</Text>
                    <View style={Styles.PaymentMethodsContainer}>
                        <TouchableOpacity
                            onPress={() => setPaymentMethodSelected(Strings.cashOnDeliveryString)}
                            activeOpacity={.5}
                            style={Styles.PaymentMethodsEntries}>
                            <View style={Styles.PaymentTextLeft}>
                                <Image source={Images.COD_Cash} style={Styles.paymentImage} />
                                <Text style={Styles.paymentText}>{Strings.cashOnDelivery} </Text>
                            </View>
                            <View style={Styles.radioRow}>
                                <View style={[Styles.radioOuter, paymentMethodSelected === Strings.cashOnDeliveryString && Styles.radioActiveOuter]}>
                                    {paymentMethodSelected === Strings.cashOnDeliveryString && <View style={Styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => setPaymentMethodSelected(Strings.creditCardString)}
                            style={Styles.PaymentMethodsEntries}>
                            <View style={Styles.PaymentTextLeft}>
                                <Image source={Images.CreditCard} style={Styles.paymentImage} />
                                <Text style={Styles.paymentText}>{Strings.creditDebitcards} </Text>
                            </View>
                            <View style={Styles.radioRow}>
                                <View style={[Styles.radioOuter, paymentMethodSelected === Strings.creditCardString && Styles.radioActiveOuter]}>
                                    {paymentMethodSelected === Strings.creditCardString && <View style={Styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => setPaymentMethodSelected(Strings.visaString)}
                            style={Styles.PaymentMethodsEntries}>
                            <View style={Styles.PaymentTextLeft}>
                                <View style={Styles.paymentImageVisaContainer}>
                                    <Image source={Images.Visa_Text} style={Styles.paymentImageVisa} />
                                </View>
                                <Text style={Styles.paymentText}>{Strings.visaCheckOut} </Text>
                            </View>
                            <View style={Styles.radioRow} >
                                <View style={[Styles.radioOuter, paymentMethodSelected === Strings.visaString && Styles.radioActiveOuter]}>
                                    {paymentMethodSelected === Strings.visaString && <View style={Styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={[Styles.ButtonWrapper, paymentMethodSelected && Styles.ActiveButton]}>
                <TouchableOpacity
                    style={[Styles.bottomButton, { marginBottom: inset.bottom }, paymentMethodSelected && Styles.ActiveButton]}
                    onPress={() =>
                        paymentMethodSelected &&
                        openPaymentModal()
                    }>
                    <Text style={Styles.bottomButtonText}>{paymentMethodSelected ? Strings.makePayment.toUpperCase() : Strings.paymentMode.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType) => {
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
            fontFamily: Fonts.helveticaBold,
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
        ContentConatiner: {
            height: '90%',
            backgroundColor: Colors.bodyLigheterColor,
        },
        CustomerCard: {
            backgroundColor: Colors.bodyColor,
            marginHorizontal: vw(12),
            marginTop: vh(12),
            padding: normalize(16),
            borderRadius: normalize(2),
            elevation: 3,
            shadowColor: Colors.blueShadows,
            shadowOffset: {
                width: vw(0),
                height: vh(2)
            },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        card: {
            elevation: 3,
            shadowColor: Colors.blueShadows,
            shadowOffset: {
                width: vw(0),
                height: vh(2)
            },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            backgroundColor: Colors.bodyColor,
            marginHorizontal: vw(12),
            marginTop: vh(6),
            padding: normalize(16),
            borderRadius: normalize(2)
        },
        userName: {
            fontSize: normalize(18),
            color: Colors.textBlack,
            fontFamily: Fonts.helveticaBold
        },
        userPhone: {
            fontSize: normalize(14),
            opacity: 0.7,
            marginTop: vh(4),
            color: Colors.textFadeBlack2,
            fontFamily: Fonts.helveticaBold
        },
        changeButton: {
            position: 'absolute',
            right: vw(16),
            top: vh(28),
            borderWidth: normalize(1),
            borderColor: Colors.activeBorder,
            borderRadius: normalize(2),
        },
        changeText: {
            color: Colors.activeBorder,
            fontFamily: Fonts.helveticaMedium,
            fontSize: normalize(10),
            marginHorizontal: vw(12),
            marginVertical: vh(6)
        },
        deliveryContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        deliveryBike: {
            width: vw(40),
            height: vh(40),
            marginRight: vw(8),
            transform: [{ scaleX: -1 }]
        },
        sectionTitle: {
            fontSize: normalize(14),
            marginLeft: vw(8),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textBlack,
        },
        radioRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: vw(12),
            borderBottomWidth: normalize(1),
            borderColor: Colors.bodyColor,
            marginRight: vw(6),
        },
        radioText: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
        },
        radioOuter: {
            width: vw(20),
            height: vh(20),
            borderRadius: normalize(11),
            borderWidth: normalize(2),
            borderColor: Colors.textFadeBlack,
            justifyContent: 'center',
            alignItems: 'center',
        },
        radioActiveOuter: {
            borderColor: Colors.KFC_red,
        },
        radioInner: {
            width: vw(10),
            height: vh(10),
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(6),
        },
        dateBadge: {
            marginTop: vh(10),
            borderRadius: normalize(15),
            backgroundColor: Colors.blueLightBG,
            marginHorizontal: 'auto',
            paddingVertical: vh(8),
            paddingHorizontal: vh(8),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        DateFixingButton: {
            backgroundColor: Colors.activeBorder,
            width: '100%',
            height: vh(30),
            borderRadius: normalize(10),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        DateFixingButtonTxt: {
            color: Colors.constantWhite,
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(16)
        },
        sectionLabel: {
            marginTop: vh(12),
            fontSize: normalize(13),
            color: Colors.textFadeBlack,
            fontFamily: Fonts.helveticaBold,
            width: '90%',
            alignSelf: 'center'
        },
        addressHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: vh(8),
        },
        homeTag: {
            backgroundColor: Colors.KFC_red,
            paddingHorizontal: vw(10),
            paddingVertical: vh(4),
            borderRadius: normalize(2),
            marginLeft: vw(6),
        },
        homeTagText: {
            color: Colors.constantWhite,
            fontSize: normalize(10),
            marginHorizontal: vw(4),
            marginVertical: vh(2),
            fontFamily: Fonts.helveticaBold,
        },
        editText: {
            color: Colors.ButtonBlueColor,
            fontSize: normalize(12),
            fontFamily: Fonts.helveticaMedium,
            marginRight: vw(6),
        },
        addressText: {
            fontSize: normalize(14),
            marginBottom: vh(10),
            marginLeft: vw(6),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack,
            maxWidth: vw(280),
            lineHeight: normalize(20),
        },
        contactlessRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: vw(6),
        },
        checkboxRed: {
            width: vw(16),
            height: vh(16),
            backgroundColor: Colors.KFC_red,
            marginRight: vw(6),
            borderRadius: normalize(1),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Tick_Mark: {
            height: vh(12),
            width: vw(12),
            tintColor: Colors.constantWhite,
        },
        contactlessText: {
            fontSize: normalize(12),
            color: Colors.textFadeBlack,
            marginVertical: vh(10),
            fontFamily: Fonts.helveticaMedium
        },
        ItemsCard: {
            elevation: 3,
            shadowColor: Colors.blueShadows,
            shadowOffset: {
                width: vw(0), height: vh(2)
            },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            backgroundColor: Colors.bodyColor,
            marginHorizontal: vw(12),
            marginTop: vh(6),
            paddingVertical: vh(16),
            paddingHorizontal: vw(10),
            borderRadius: normalize(2),
        },
        ItemsCardUpperBox: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemCountRow: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: vh(6)
        },
        itemCount: {
            fontSize: normalize(22),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        itemsLabel: {
            marginLeft: vw(6),
            fontSize: normalize(12),
            opacity: 0.7,
            color: Colors.textBlack,
            fontFamily: Fonts.helveticaMedium
        },
        ItemTextContainer: {
            width: '70%',
            overflow: 'hidden'
        },
        itemDescription: {
            fontSize: normalize(14),
            marginBottom: vh(12),
            color: Colors.timerFadeText,
            fontFamily: Fonts.helveticaMedium,
            lineHeight: 20
        },
        CustomVerticalBorder: {
            height: '50%',
            borderRightColor: Colors.textFadeBlack,
            borderRightWidth: normalize(1),
            marginHorizontal: vw(10),
        },
        AmountBoxContainer: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: Colors.blueMixBG,
            borderRadius: normalize(4),
            borderStyle: 'dashed',
            borderWidth: normalize(1),
            borderColor: Colors.blueShadows,
        },
        amountBox: {
            height: vh(60),
            padding: normalize(12),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        amountText: {
            fontSize: normalize(14),
            fontFamily: Fonts.helveticaMedium
        },
        AmountWithButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        amountNumber: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaBold
        },
        PaymentMethodExpandButtonContainer: {
            marginLeft: vw(8),
            height: vh(16),
            width: vw(16),
            backgroundColor: Colors.blueShadows,
            borderRadius: normalize(50),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        ArrowDown: {
            height: vh(14),
            width: vw(14),
            tintColor: Colors.constantWhite
        },
        ArrowUp: {
            transform: [{ rotate: '180deg' }]
        },
        amountDetailsContainer: {
            width: '100%',
            marginBottom: vh(6),
        },
        PriceEntries: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: vh(8),
            marginHorizontal: vw(15),
        },
        PriceEntriesLeft: {
            fontSize: normalize(14),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack,
        },
        PriceEntriesRight: {
            fontSize: normalize(14),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack2,
            marginLeft: 'auto'
        },
        discountPrice: {
            color: Colors.greenOk
        },
        PaymentMethodsContainer: {
            marginTop: vh(10),
            backgroundColor: Colors.bodyColor,
            width: '93%',
            marginHorizontal: vw(12),
            alignSelf: 'center',
            display: 'flex',
            marginBottom: vh(150),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        PaymentMethodsEntries: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: vw(10),
            marginVertical: vh(6),
            flexDirection: 'row',
        },
        PaymentTextLeft: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        paymentImage: {
            height: vh(30),
            width: vw(30),
            tintColor: Colors.textBlack,
        },
        paymentImageVisaContainer: {
            borderWidth: normalize(1),
            borderColor: Colors.textBlack,
            borderRadius: normalize(2),
            paddingHorizontal: 4,
        },
        paymentImageVisa: {
            height: vh(30),
            width: vw(30),
            tintColor: Colors.KFC_red,
        },
        paymentText: {
            marginLeft: vw(15),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textFadeBlack2
        },
        ButtonWrapper: {
            width: '100%',
            position: 'absolute',
            left: vw(0),
            bottom: vh(0),
            backgroundColor: Colors.KFC_red_Fade_Solid,
        },
        bottomButton: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: vh(10),
        },
        ActiveButton: {
            backgroundColor: Colors.KFC_red,
        },
        bottomButtonText: {
            marginVertical: vh(10),
            color: Colors.constantWhite,
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(18),
        },
    });
    return Styles;
};