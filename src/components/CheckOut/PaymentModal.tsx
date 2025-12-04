// import RazorpayCheckout from 'react-native-razorpay'
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    Alert
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils
import Fonts from '../../utils/Fonts';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import Images from '../../utils/LocalImages';

export default function PaymentOptionsBottomSheet() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors, Fonts);

    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;

    const [selectedCard, setSelectedCard] = useState<number | null>(0);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [preferred, setPreferred] = useState<boolean>(false);

    const savedCards = [
        {
            bank: 'Emirates Investment Bank',
            last: '9675',
            type: 'Credit Card',
            color: '#8ED5FF'
        },
        {
            bank: 'Emirates Investment Bank',
            last: '4411',
            type: 'Credit Card',
            color: '#C9A6FF'
        },
        {
            bank: 'Mashreq Bank',
            last: '5521',
            type: 'Credit Card',
            color: '#FFA1A1'
        }
    ];

    const slideUp = () => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(fade, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();
    };

    const slideDown = () => {
        Animated.parallel([
            Animated.timing(slide, {
                toValue: 500,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(fade, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();
    };

    const closeModal = () => {
        slideDown();
        setTimeout(() => navigation.pop(), 350);
    };

    useEffect(() => {
        slideUp();
    }, []);

    return (
        <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}
            >
                <View style={Styles.InnerContainer}>
                    {/* ⛔ You will add the 3 red bars here */}
                    <View style={{ height: 34 }} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={Styles.title}>{Strings?.otherPaymentOptions}</Text>
                        {/* SAVED CARDS SECTION */}
                        <Text style={Styles.savedCardsLabel}>3 {Strings?.savedCards}</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={Styles.cardsScroll}
                        >
                            {savedCards.map((card, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        Styles.cardBox,
                                        { backgroundColor: card.color },
                                        selectedCard === index && Styles.cardSelected
                                    ]}
                                    onPress={() => setSelectedCard(index)}
                                >
                                    <Text style={Styles.bankName}>{card.bank}</Text>
                                    <Text style={Styles.cardNumber}>
                                        **** **** **** {card.last}
                                    </Text>
                                    <View style={Styles.cardFooter}>
                                        <Text style={Styles.cardType}>{card.type}</Text>
                                        <View style={Styles.radioOuter}>
                                            {selectedCard === index && (
                                                <View style={Styles.radioInner} />
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {/* OTHER PAYMENT METHODS */}
                        <Text style={Styles.otherMethodLabel}>
                            {Strings?.otherPaymentMethod}
                        </Text>
                        {[
                            { icon: Images.CredtiCardStack, label: Strings?.addCreditDebitCard, offer: '15% Off on Master Card' },
                            { icon: Images.ApplePay, label: 'Samsung Pay', offer: '15% Off on Samsung Pay' },
                            { icon: Images.ClickToPay, label: 'Click to pay' },
                            { icon: Images.CashIcon, label: Strings?.payByCash }
                        ].map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={Styles.methodRow}
                                onPress={() => {
                                    setSelectedCard(null);
                                    setSelectedMethod(item.label);
                                }}
                                activeOpacity={0.6}
                            >
                                <View style={Styles.methodLeft}>
                                    <Image source={item.icon} style={Styles.methodIcon} />
                                    <View>
                                        <Text style={Styles.methodText}>{item.label}</Text>
                                        {item.offer && (
                                            <Text style={Styles.methodOffer}>
                                                {item.offer}  <Text style={Styles.tc}>T&C*</Text>
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <View style={Styles.radioOuter}>
                                    {selectedMethod === item.label && (
                                        <View style={Styles.radioInner} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={Styles.checkboxRow}
                            onPress={() => setPreferred(!preferred)}
                            activeOpacity={0.7}
                        >
                            <View style={[Styles.checkboxOuter, preferred && Styles.checkboxSelected]}>
                                {preferred && <View style={Styles.checkboxInner} />}
                            </View>
                            <Text style={Styles.preferredText}>
                                {Strings?.makePreferredMode}
                            </Text>
                        </TouchableOpacity>
                        {/* Bottom Buttons */}
                        <View style={[Styles.buttonsRow, { marginBottom: inset.bottom + 10 }]}>
                            <TouchableOpacity style={Styles.cancelBtn} onPress={closeModal}>
                                <Text style={Styles.cancelText}>{Strings?.cancel.toUpperCase()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.payBtn}>
                                <Text style={Styles.payText}>{Strings?.makePayment.toUpperCase()}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => {
                                var options = {
                                    description: 'Credits towards consultation',
                                    image: 'https://i.imgur.com/3g7nmJC.jpg',
                                    currency: '<currency>',
                                    key: '<YOUR_KEY_ID>',
                                    amount: '5000',
                                    name: 'Acme Corp',
                                    order_id: 'order_DslnoIgkIDL8Zt',
                                    prefill: {
                                        email: '<email>',
                                        contact: '<phone>',
                                        name: '<name>'
                                    },
                                    theme: { color: '#53a20e' }
                                }
                                RazorpayCheckout.open(options).then((data: any) => {
                                    // handle success
                                    Alert.alert(`Success: ${data.razorpay_payment_id}`);
                                }).catch((error: any) => {
                                    Alert.alert(`Error: ${error.code} | ${error.description}`);
                                });
                            }}>

                            </TouchableOpacity> */}
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </Animated.View>
    );
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    return StyleSheet.create({
        backDrop: {
            backgroundColor: Colors.SemiTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: '78%'
        },
        InnerContainer: {
            backgroundColor: Colors.bodyColor,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 20,
            paddingTop: 10,
            height: '100%'
        },
        title: {
            fontSize: 20,
            fontFamily: Fonts.font17,
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: 25,
            color: Colors.textBlack
        },
        savedCardsLabel: {
            fontSize: 13,
            color: Colors.fadeWhiteText2,
            marginBottom: 10,
            fontFamily: Fonts.regular
        },
        cardsScroll: {
            paddingBottom: 20
        },
        cardBox: {
            width: 220,
            height: 130,
            borderRadius: 14,
            padding: 15,
            marginRight: 12,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: 'transparent'
        },
        cardSelected: {
            borderColor: Colors.KFC_red,
            borderWidth: 2
        },
        bankName: {
            color: Colors.constantWhite,
            fontSize: 14,
            fontWeight: '600'
        },
        cardNumber: {
            color: Colors.constantWhite,
            fontSize: 16,
            fontWeight: '700'
        },
        cardFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        cardType: {
            color: Colors.constantWhite,
            fontSize: 12,
            fontWeight: '500'
        },
        otherMethodLabel: {
            marginTop: 10,
            marginBottom: 10,
            fontSize: 13,
            color: Colors.fadeWhiteText2
        },
        methodRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 16,
            alignItems: 'center'
        },
        methodLeft: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        methodIcon: {
            height: 32,
            width: 32,
            marginRight: 10
        },
        methodText: {
            fontSize: 15,
            color: Colors.textBlack,
            fontWeight: '600'
        },
        methodOffer: {
            fontSize: 12,
            color: '#FF8A00',
            marginTop: 2
        },
        tc: {
            color: Colors.fadeWhiteText2,
            fontSize: 10
        },
        radioOuter: {
            height: 20,
            width: 20,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: Colors.fadeWhiteText2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        radioInner: {
            height: 10,
            width: 10,
            backgroundColor: Colors.KFC_red,
            borderRadius: 10
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15
        },
        checkboxOuter: {
            height: 20,
            width: 20,
            borderWidth: 2,
            borderColor: Colors.fadeWhiteText2,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        checkboxSelected: {
            borderColor: Colors.KFC_red
        },
        checkboxInner: {
            height: 12,
            width: 12,
            backgroundColor: Colors.KFC_red
        },
        preferredText: {
            color: Colors.textBlack,
            fontSize: 13,
            fontWeight: '500'
        },
        buttonsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
        },
        cancelBtn: {
            borderWidth: 1,
            borderColor: Colors.fadeWhiteText2,
            width: '45%',
            paddingVertical: 14,
            borderRadius: 6
        },
        cancelText: {
            color: Colors.textBlack,
            textAlign: 'center',
            fontWeight: '700'
        },
        payBtn: {
            width: '45%',
            backgroundColor: Colors.KFC_red,
            paddingVertical: 14,
            borderRadius: 6
        },
        payText: {
            color: Colors.constantWhite,
            textAlign: 'center',
            fontWeight: '700'
        }
    });
};

