import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data imports 
import DealsAndOffersData from '../../data/DealsAndOffersData';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCart } from '../../context/CartContext';
export default function DealsAndOffer() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors, Fonts);
    const {CartItem} = useCart()
    const handleApplyOffer = (discount: number, discountPercentage: number , offerCode: string) => {
        navigation.navigate(Strings?.OfferAppliedScreen)
        if(CartItem.length  !== 0 ){
            setTimeout(() => {
                navigation.pop(1)
                navigation.replace(Strings?.CartScreen, {
                    discount: discount,
                    discountPercentage: discountPercentage,
                    offerCode: offerCode
                })
            }, 2000);
        }
    }
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.rowCenter}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings?.dealsAndOffer}</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={Styles.sectionTitle}>{Strings?.allOffers}</Text>
                {DealsAndOffersData.map((item, index) => (
                    <View key={index} style={Styles.offerCard}>
                        <View style={Styles.HeaderContainer}>
                            <Text style={Styles.offerTitle}>{item.title}</Text>
                            <Text style={Styles.offerDesc}>{item.desc}</Text>
                        </View>
                        <View style={Styles.downBlock}>
                            <TouchableOpacity>
                                <Text style={Styles.tncText}>{Strings?.termsCondition}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleApplyOffer(item?.discount, item?.discountPercentage , item?.offerCode)}>
                                <Text style={Styles.applyText}>{Strings?.apply.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1,
            backgroundColor: Colors?.bodyLigheterColor,
        },
        NavWrapper: {
            width: '100%',
            paddingBottom: 15,
            backgroundColor: Colors?.bodyColor,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        BackIcon: {
            tintColor: Colors?.textBlack,
            height: 20,
            width: 20,
            marginRight: 18,
        },
        headerText: {
            fontSize: 20,
            fontFamily: Fonts?.subHeader,
            fontWeight: '700',
            color: Colors?.textBlack,
        },
        sectionTitle: {
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            fontWeight: '700',
            color: Colors?.textBlack,
            marginTop: 10,
            marginLeft: 20,
        },

        offerCard: {
            width: '92%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            paddingVertical: 18,
            paddingHorizontal: 15,
            borderRadius: 10,
            marginVertical: 8,
            shadowColor: Colors?.blueShadows,
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 4,
            elevation: 2,
        },
        HeaderContainer: {
            width: '80%',
            marginLeft: 5,
        },
        offerTitle: {
            fontSize: 17,
            fontFamily: Fonts?.font17,
            fontWeight: '700',
            color: Colors?.textBlack,
            marginBottom: 4,
        },
        offerDesc: {
            fontSize: 15,
            fontFamily: Fonts?.font17,
            color: Colors?.timerFadeText,
            marginTop: 10,
            lineHeight: 22,
        },

        downBlock: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
            marginLeft: 5
        },
        tncText: {
            fontSize: 13,
            letterSpacing: 1,
            fontFamily: Fonts?.font17,
            color: Colors?.ButtonTextBlueColor,
        },
        applyText: {
            fontSize: 15,
            fontFamily: Fonts?.font17,
            color: Colors?.KFC_red,
            fontWeight: 500,
        },
    })
    return Styles
}