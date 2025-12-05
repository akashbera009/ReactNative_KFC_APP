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
import { useRazorpayPayment } from '../../utils/RazorpayPayments';
// utils
import Fonts from '../../utils/Fonts';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import Images from '../../utils/LocalImages';
import { savedCards, otherPaymentOption } from '../../data/DeliveryDetails';

export default function PaymentOptionsBottomSheet({ amount, orderId, onSuccess }: PaymentModalScreenProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors, Fonts);
    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const [selectedCard, setSelectedCard] = useState<number | null>(0);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [preferred, setPreferred] = useState<boolean>(false);
    const [paymentRes, setPaymentRes] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const { handlePayment } = useRazorpayPayment();
    const initiatePayment = async () => {
        const result = await handlePayment(amount);
        setPaymentRes(result);
        openResponseModal(result.success, result.payment_id)
    };
    const openResponseModal = (success: boolean, payment_id: string | undefined) => {
        setOpenModal(true);
        if (success) {
            onSuccess?.(payment_id, true);
        } else {
            onSuccess?.(payment_id, false);
        }
    }
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
                    <View style={Styles.ThreeColumnStyle}>
                        <View style={[Styles.singleCOlumnStyle,]} />
                        <View style={[Styles.singleCOlumnStyle,]} />
                        <View style={[Styles.singleCOlumnStyle,]} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={Styles.title}>{Strings?.otherPaymentOptions}</Text>
                        <Text style={Styles.savedCardsLabel}>{savedCards.length} {Strings?.savedCards.toUpperCase()}</Text>
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
                                        { backgroundColor: card?.color },
                                        selectedCard === index && Styles.cardSelected
                                    ]}
                                    onPress={() => setSelectedCard(index)}
                                >
                                    <Image source={Images?.VisaPNG} style={Styles.VisaPNGFade} />
                                    <View style={Styles.HeaderAndButton}>
                                        <View style={Styles.Headers}>
                                            <Text style={Styles.bankName}>{card?.bank}</Text>
                                            <Text style={Styles.cardNumber}>
                                                **** **** **** {card.last}
                                            </Text>
                                        </View>
                                        <View style={Styles.radioBlackOuter}>
                                            {selectedCard === index && (
                                                <View style={Styles.radioBlackInner} />
                                            )}
                                        </View>
                                    </View>
                                    <View style={Styles.cardFooter}>
                                        <Text style={Styles.cardType}>{card.type}</Text>
                                        <Image source={Images?.VisaPNG} style={Styles.VisaPNG} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={Styles.otherMethodLabel}>
                            {Strings?.otherPaymentMethod.toUpperCase()}
                        </Text>
                        {otherPaymentOption.map((item, idx) => (
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
                                {preferred && <Image source={Images?.Tick_Mark} style={Styles.tickMark} />}
                            </View>
                            <Text style={Styles.preferredText}>
                                {Strings?.makePreferredMode}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={[Styles.buttonsRow, { marginBottom: inset.bottom + 10 }]}>
                        <TouchableOpacity style={Styles.cancelBtn} onPress={closeModal}>
                            <Text style={Styles.cancelText}>{Strings?.cancel.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Styles.payBtn}
                            onPress={initiatePayment}>
                            <Text style={Styles.payText}>{Strings?.makePayment.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    return StyleSheet.create({
        backDrop: {
            backgroundColor: Colors?.SemiTransparent,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        bottomSheet: {
            width: '100%',
            height: '78%'
        },
        InnerContainer: {
            backgroundColor: Colors?.bodyColor,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 20,
            height: '100%'
        },
        ThreeColumnStyle: {
            alignSelf: 'center',
            width: '34%',
            height: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        singleCOlumnStyle: {
            height: 25,
            width: 24,
            backgroundColor: Colors?.KFC_red,
        },
        title: {
            fontSize: 20,
            fontFamily: Fonts.font17,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 25,
            marginTop: 10 ,
            color: Colors?.textBlack
        },
        savedCardsLabel: {
            fontSize: 13,
            color: Colors?.textFadeBlack,
            marginBottom: 15,
            fontFamily: Fonts.font17,
            fontWeight: 700,
        },
        cardsScroll: {
            paddingBottom: 20
        },
        cardBox: {
            width: 260,
            height: 120,
            borderRadius: 2,
            padding: 15,
            marginRight: 12,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: Colors?.ButtonTextBlueColor,
            borderStyle: 'dotted'
        },
        VisaPNGFade: {
            tintColor: Colors?.HyperFadeWhiteText,
            height: 60,
            width: 200,
            position: 'absolute',
            right: 5,
            top: 30
        },
        HeaderAndButton: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
        },
        Headers: {

        },
        cardSelected: {
            borderColor: Colors?.ButtonTextBlueColor,
            borderWidth: 2,
        },
        bankName: {
            color: Colors?.constantWhite,
            fontSize: 14,
            fontWeight: 600
        },
        cardNumber: {
            color: Colors?.constantWhite,
            fontSize: 14,
            fontWeight: 700,
            marginTop: 10,
            fontFamily: Fonts?.font17,
            letterSpacing: 1.25
        },
        cardFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        VisaPNG: {
            height: 12,
            width: 40,
            tintColor: Colors?.constantWhite,
        },
        cardType: {
            color: Colors?.constantWhite,
            fontSize: 10,
            fontWeight: 600,
            backgroundColor: Colors?.HyperTransparent2,
            padding: 8,
        },
        otherMethodLabel: {
            marginTop: 10,
            marginBottom: 10,
            fontSize: 13,
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.font17,
            fontWeight: 700
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
            height: 40,
            width: 40,
            marginRight: 20
        },
        methodText: {
            fontSize: 17,
            color: Colors?.textBlack,
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            letterSpacing: .5,
        },
        methodOffer: {
            fontSize: 12,
            color: Colors?.orangeColorText,
            marginTop: 2
        },
        tc: {
            color: Colors?.ButtonTextBlueColor,
            fontSize: 10
        },
        radioBlackOuter: {
            margin: 2,
            height: 20,
            width: 20,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: Colors?.textFadeBlack2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        radioBlackInner: {
            height: 10,
            width: 10,
            backgroundColor: Colors?.textFadeBlack2,
            borderRadius: 10
        },
        radioOuter: {
            height: 20,
            width: 20,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: Colors?.fadeWhiteText2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        radioInner: {
            height: 10,
            width: 10,
            backgroundColor: Colors?.KFC_red,
            borderRadius: 10
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15
        },
        checkboxOuter: {
            height: 15,
            width: 15,
            borderWidth: 2,
            borderRadius: 1,
            borderColor: Colors?.fadeWhiteText2,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        checkboxSelected: {
            borderColor: Colors?.KFC_red,
            backgroundColor: Colors?.KFC_red,
        },
        tickMark: {
            height: 10,
            width: 10,
            tintColor: Colors?.constantWhite
        },
        preferredText: {
            color: Colors?.textFadeBlack2,
            fontSize: 12,
            fontWeight: 600
        },
        buttonsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
        },
        cancelBtn: {
            borderWidth: 1,
            borderColor: Colors?.fadeWhiteText2,
            width: '45%',
            paddingVertical: 14,
            borderRadius: 6
        },
        cancelText: {
            color: Colors?.textBlack,
            textAlign: 'center',
            fontWeight: 700
        },
        payBtn: {
            width: '45%',
            backgroundColor: Colors?.KFC_red,
            paddingVertical: 14,
            borderRadius: 6
        },
        payText: {
            color: Colors?.constantWhite,
            textAlign: 'center',
            fontWeight: 700
        }
    });
};

