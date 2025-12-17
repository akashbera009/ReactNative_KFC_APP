import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data imports 
import DealsAndOffersData from '../../data/DealsAndOffersData';
//redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function DealsAndOffer() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors, Fonts);
    const cartData  = useSelector((state: RootState)=> state.cart)
    const cartItem = cartData.cartItems
    const handleApplyOffer = (discount: number, discountPercentage: number , offerCode: string) => {
        navigation.navigate(Strings.OfferAppliedScreen)
        if(cartItem.length  !== 0 ){
            setTimeout(() => {
                navigation.pop(1)
                navigation.replace(Strings.CartScreen, {
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
                    <Text style={Styles.headerText}>{Strings.dealsAndOffer}</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={Styles.sectionTitle}>{Strings.allOffers}</Text>
                {DealsAndOffersData.map((item, index) => (
                    <View key={index} style={Styles.offerCard}>
                        <View style={Styles.HeaderContainer}>
                            <Text style={Styles.offerTitle}>{item.title}</Text>
                            <Text style={Styles.offerDesc}>{item.desc}</Text>
                        </View>
                        <View style={Styles.downBlock}>
                            <TouchableOpacity>
                                <Text style={Styles.tncText}>{Strings.termsCondition}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleApplyOffer(item?.discount, item?.discountPercentage , item?.offerCode)}>
                                <Text style={Styles.applyText}>{Strings.apply.toUpperCase()}</Text>
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
            fontSize:  normalize(20),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
        },
        sectionTitle: {
            fontSize: normalize(16),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
            marginTop: vh(10),
            marginLeft: vw(20),
        },
        offerCard: {
            width: '92%',
            alignSelf: 'center',
            backgroundColor: Colors.bodyColor,
            paddingVertical: vh(18),
            paddingHorizontal: vw(15),
            borderRadius: normalize(10),
            marginVertical: vh(8),
            shadowColor: Colors.blueShadows,
            shadowOpacity: 0.06,
            shadowOffset: { width: vw(0), height: vh(3) },
            shadowRadius: normalize(4),
            elevation: 2,
        },
        HeaderContainer: {
            marginLeft: vw(5),
        },
        offerTitle: {
            fontSize: normalize(17),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
            marginBottom: vh(4),
        },
        offerDesc: {
            fontSize: normalize(15),
            fontFamily: Fonts.font17,
            color: Colors.timerFadeText,
            marginTop: vh(10),
            lineHeight: vh(22),
        },
        downBlock: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: vh(30),
            marginLeft: vw(5)
        },
        tncText: {
            fontSize: normalize(13),
            letterSpacing: normalize(1),
            fontFamily: Fonts.font17,
            color: Colors.ButtonTextBlueColor,
        },
        applyText: {
            fontSize: normalize(15),
            fontFamily: Fonts.font17,
            color: Colors.KFC_red,
        },
    })
    return Styles
}