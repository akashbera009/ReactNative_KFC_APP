import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function FAQPage() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors);
    const [selectedTab, setSelectedTab] = useState<'online' | 'restaurants' | 'employment'>('online');
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggleFAQ = (index: number): void => {
        setOpenIndex(prev => (prev === index ? null : index));
    };
    const OnlineFAQ: FaqItem[] = [
        { question: Strings.resetPassword, answer: Strings.resetPasswordA },
        { question: Strings.restaurantReceive, answer: Strings.restaurantReceiveA },
        { question: Strings.paymentOptions, answer: Strings.paymentOptionsA },
        { question: Strings.saveCreditCard, answer: Strings.saveCreditCardA },
        { question: Strings.changeAccountInfo, answer: Strings.changeAccountInfoA },
        { question: Strings.deliveryChargesHigher, answer: Strings.deliveryChargesHigherA },
        { question: Strings.deliveryServiceCharge, answer: Strings.deliveryServiceChargeA },
    ];
    const RestaurantFAQ = [
        { question: Strings.faqQ1, answer: Strings.faqA1 },
        { question: Strings.faqQ2, answer: Strings.faqA2 },
        { question: Strings.faqQ3, answer: Strings.faqA3 },
    ];
    const EmploymentFAQ = [
        { question: Strings.faqQ4, answer: Strings.faqA4 },
        { question: Strings.faqQ9, answer: Strings.faqA9 },
        { question: Strings.faqQ10, answer: Strings.faqA10 },
        { question: Strings.faqQ11, answer: Strings.faqA11 },
    ];
    const getFaqData = (): FaqItem[] => {
        switch (selectedTab) {
            case 'online': return OnlineFAQ;
            case 'restaurants': return RestaurantFAQ;
            case 'employment': return EmploymentFAQ;
            default: return [];
        }
    };
    const faqItems = getFaqData();
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.rowCenter}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.faqs}</Text>
                </View>
            </View>
            <View style={Styles.tabWrapper}>
                <TouchableOpacity onPress={() => setSelectedTab('online')}>
                    <Text style={selectedTab === 'online' ? Styles.activeTab : Styles.inactiveTab}>
                        {Strings.onlineOrdering}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTab('restaurants')}>
                    <Text style={selectedTab === 'restaurants' ? Styles.activeTab : Styles.inactiveTab}>
                        {Strings.restaurants}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTab('employment')}>
                    <Text style={selectedTab === 'employment' ? Styles.activeTab : Styles.inactiveTab}>
                        {Strings.employment}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={Styles.listContainer}>
                {faqItems.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <View key={index}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => toggleFAQ(index)}
                                style={Styles.card}
                            >
                                <Text style={Styles.cardText}>{item.question}</Text>
                                <Image
                                    source={Images.back_arrow}
                                    style={[
                                        Styles.rightArrow,
                                        { transform: [{ rotate: isOpen ? '-90deg' : '180deg' }] }
                                    ]}
                                />
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={Styles.answerBox}>
                                    <Text style={Styles.answerText}>{item.answer}</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1,
            backgroundColor: Colors.bodyLigheterColor,
        },
        NavWrapper: {
            width: '100%',
            paddingBottom: vh(15),
            backgroundColor: Colors.bodyColor,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: vw(10),
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(20),
            width: vw(20),
            marginRight: vw(18),
        },
        headerText: {
            fontSize: normalize(22),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
        },
        tabWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: vw(20),
            paddingTop: vh(15),
            backgroundColor: Colors.bodyColor,
        },
        activeTab: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
            borderBottomColor: Colors.KFC_red,
            borderBottomWidth: normalize(2),
            paddingBottom: vh(8),
            marginRight: vw(20),
        },
        inactiveTab: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.timerFadeText,
            marginRight: vw(20),
            paddingBottom: vh(6),
        },
        listContainer: {
            marginTop: vh(10),
        },
        card: {
            width: '92%',
            alignSelf: 'center',
            backgroundColor: Colors.bodyColor,
            paddingVertical: vh(18),
            paddingHorizontal: vw(15),
            borderRadius: normalize(6),
            marginVertical: vh(6),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        cardText: {
            width: '80%',
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textBlack,
            lineHeight: vh(25),
        },
        rightArrow: {
            width: vw(15),
            height: vh(15),
            transform: [{ scaleX: -1 }],
            tintColor: Colors.textBlack,
            marginRight: vw(10)
        },
        answerBox: {
            marginHorizontal: vw(15),
            paddingHorizontal: vw(20),
            alignSelf: 'center',
            backgroundColor: Colors.bodyColor,
            marginTop: vh(-6),
            paddingBottom: vh(15),
            borderBottomLeftRadius: normalize(6),
            borderBottomRightRadius: normalize(6),
        },
        answerText: {
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textFadeBlack,
            lineHeight: vh(22),
            marginTop: vh(8),
        },
    })
    return Styles
}