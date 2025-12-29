import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import React, { useRef, useEffect, useState, useCallback } from 'react';
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
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function PaymentOptionsBottomSheet({ amount}: PaymentModalScreenProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    const Styles = createDynamicStyles(Colors);
    const slide = useRef(new Animated.Value(500)).current;
    const fade = useRef(new Animated.Value(0)).current;
    const [selectedCard, setSelectedCard] = useState<number | null>(0);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [preferred, setPreferred] = useState<boolean>(false);
    const { handlePayment } = useRazorpayPayment();
    const initiatePayment = async (): Promise<void> => {
        const result: PaymentResult = await handlePayment(amount);
        openResponseModal(result.success, result.payment_id)
    };
    const openResponseModal = (
        success: boolean,
        payment_id: string | undefined
    ): void => {
        // onSuccess?.(payment_id, success);
    }
    const slideUp = useCallback((): void => {
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
    },[slide , fade])
    const slideDown = (): void => {
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
    const closeModal = (): () => void | void => {
        slideDown();
        const timeoutId: number = setTimeout(() => {
            navigation.pop();
        }, 350);
        return () => clearTimeout(timeoutId)
    };
    useEffect((): void => {
        slideUp();
    }, [slideUp]);

    return (
        <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>
            <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <View style={Styles.InnerContainer}>
                    <View style={Styles.ThreeColumnStyle}>
                        <View style={[Styles.singleCOlumnStyle,]} />
                        <View style={[Styles.singleCOlumnStyle,]} />
                        <View style={[Styles.singleCOlumnStyle,]} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={Styles.title}>{Strings.otherPaymentOptions}</Text>
                        <Text style={Styles.savedCardsLabel}>{savedCards.length} {Strings.savedCards.toUpperCase()}</Text>
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
                                    <Image source={Images.VisaPNG} style={Styles.VisaPNGFade} />
                                    <View style={Styles.HeaderAndButton}>
                                        <View >
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
                                        <Image source={Images.VisaPNG} style={Styles.VisaPNG} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={Styles.otherMethodLabel}>
                            {Strings.otherPaymentMethod.toUpperCase()}
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
                                    <Image source={item?.icon} style={Styles.methodIcon} />
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
                                {preferred && <Image source={Images.Tick_Mark} style={Styles.tickMark} />}
                            </View>
                            <Text style={Styles.preferredText}>
                                {Strings.makePreferredMode}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={[Styles.buttonsRow, { marginBottom: inset.bottom + 10 }]}>
                        <TouchableOpacity style={Styles.cancelBtn} onPress={closeModal}>
                            <Text style={Styles.cancelText}>{Strings.cancel.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Styles.payBtn}
                            onPress={initiatePayment}>
                            <Text style={Styles.payText}>{Strings.makePayment.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
}
const createDynamicStyles = (Colors: ColorType) => {
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
            borderTopLeftRadius: normalize(28),
            borderTopRightRadius: normalize(28),
            paddingHorizontal: vw(20),
            height: '100%'
        },
        ThreeColumnStyle: {
            alignSelf: 'center',
            width: '34%',
            height: vh(30),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        singleCOlumnStyle: {
            height: vh(25),
            width: vw(24),
            backgroundColor: Colors.KFC_red,
        },
        title: {
            fontSize: normalize(20),
            fontFamily: Fonts.font18,
            textAlign: 'center',
            marginBottom: vh(25),
            marginTop: vh(10),
            color: Colors.textBlack
        },
        savedCardsLabel: {
            fontSize: normalize(13),
            color: Colors.textFadeBlack,
            marginBottom: vh(15),
            fontFamily: Fonts.font18,
        },
        cardsScroll: {
            paddingBottom: vh(20)
        },
        cardBox: {
            width: vw(260),
            height: vh(120),
            borderRadius: normalize(2),
            padding: normalize(15),
            marginRight: vw(12),
            justifyContent: 'space-between',
            borderWidth: normalize(1),
            borderColor: Colors.ButtonTextBlueColor,
            borderStyle: 'dotted'
        },
        VisaPNGFade: {
            tintColor: Colors.HyperFadeWhiteText,
            height: vh(60),
            width: vw(200),
            position: 'absolute',
            right: vw(5),
            top: vh(30)
        },
        HeaderAndButton: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
        },
        cardSelected: {
            borderColor: Colors.ButtonTextBlueColor,
            borderWidth: normalize(2),
        },
        bankName: {
            color: Colors.constantWhite,
            fontSize: normalize(14),
            fontFamily: Fonts.font17
        },
        cardNumber: {
            color: Colors.constantWhite,
            fontSize: normalize(14),
            marginTop: vh(10),
            fontFamily: Fonts.font18,
            letterSpacing: normalize(1.25)
        },
        cardFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        VisaPNG: {
            height: vh(12),
            width: vw(40),
            tintColor: Colors.constantWhite,
        },
        cardType: {
            color: Colors.constantWhite,
            fontSize: normalize(10),
            backgroundColor: Colors.HyperTransparent2,
            padding: normalize(8),
            fontFamily: Fonts.font18
        },
        otherMethodLabel: {
            marginTop: vh(10),
            marginBottom: vh(10),
            fontSize: normalize(13),
            color: Colors.textFadeBlack,
            fontFamily: Fonts.font18,
        },
        methodRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: vh(16),
            alignItems: 'center'
        },
        methodLeft: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        methodIcon: {
            height: vh(40),
            width: vw(40),
            marginRight: vw(20)
        },
        methodText: {
            fontSize: normalize(17),
            color: Colors.textBlack,
            fontFamily: Fonts.font17,
            letterSpacing: normalize(.5),
        },
        methodOffer: {
            fontSize: normalize(12),
            color: Colors.orangeColorText,
            marginTop: vh(2),
            fontFamily: Fonts.font17
        },
        tc: {
            color: Colors.ButtonTextBlueColor,
            fontSize: normalize(10)
        },
        radioBlackOuter: {
            margin: normalize(2),
            height: vh(20),
            width: vw(20),
            borderRadius: normalize(20),
            borderWidth: normalize(2),
            borderColor: Colors.textFadeBlack2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        radioBlackInner: {
            height: vh(10),
            width: vw(10),
            backgroundColor: Colors.textFadeBlack2,
            borderRadius: normalize(10)
        },
        radioOuter: {
            height: vh(20),
            width: vw(20),
            borderRadius: normalize(20),
            borderWidth: normalize(2),
            borderColor: Colors.fadeWhiteText2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        radioInner: {
            height: vh(10),
            width: vw(10),
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(10)
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: vh(15)
        },
        checkboxOuter: {
            height: vh(15),
            width: vw(15),
            borderWidth: normalize(2),
            borderRadius: normalize(1),
            borderColor: Colors.fadeWhiteText2,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: vw(10)
        },
        checkboxSelected: {
            borderColor: Colors.KFC_red,
            backgroundColor: Colors.KFC_red,
        },
        tickMark: {
            height: vh(10),
            width: vw(10),
            tintColor: Colors.constantWhite
        },
        preferredText: {
            color: Colors.textFadeBlack2,
            fontSize: normalize(12),
            fontFamily: Fonts.font17
        },
        buttonsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(20)
        },
        cancelBtn: {
            borderWidth: normalize(1),
            borderColor: Colors.fadeWhiteText2,
            width: '45%',
            paddingVertical: vh(14),
            borderRadius: normalize(6)
        },
        cancelText: {
            color: Colors.textBlack,
            textAlign: 'center',
            fontFamily: Fonts.font18
        },
        payBtn: {
            width: '45%',
            backgroundColor: Colors.KFC_red,
            paddingVertical: vh(14),
            borderRadius: normalize(6)
        },
        payText: {
            color: Colors.constantWhite,
            textAlign: 'center',
            fontFamily: Fonts.font18
        }
    });
};

