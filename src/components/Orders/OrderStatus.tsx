import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// data imports 
import DeliveryDetails from '../../data/DeliveryDetails';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';

export default function OrderStatus() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
const {countrySelected} = useCountry()
    return (
        <View style={[Styles.Parent, { paddingTop: inset.top }]}>
            <View style={Styles.NavWrapper}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
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
                            <Image source={Images?.Chicken_Nugedts} style={Styles.BucketImg} />
                            <View>
                                <Text style={Styles.OrderConfirmed}>Order Confirmed</Text>
                                <Text style={Styles.OrderNumber}>ORDER NO. UAE - 4682743</Text>
                            </View>
                        </View>

                        <View style={Styles.DateRow}>
                            <Text style={Styles.DateText}>31 Oct, 2019</Text>
                            <Text style={Styles.DateText}>18:30:31</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={Styles.TrackBox}>
                        <View style={Styles.TrackLeft}>
                            <Image source={Images.Track_Order} style={Styles.TrackIcon} />
                            <Text style={Styles.TrackText}>Track Order</Text>
                        </View>
                        <Image source={Images.Arrow_down} style={Styles.TrackArrow} />
                    </TouchableOpacity>
                    <View style={Styles.SummaryBox}>
                        <View style={Styles.SummaryHeaderRow}>
                            <Text style={Styles.SummaryHeader}>Order Summary</Text>
                            <Image source={Images.DownloadIcon} style={Styles.DownloadIcon} />
                        </View>

                        <Text style={Styles.SectionTitle}>Delivery Address</Text>
                        <Text style={Styles.InfoText}>
                            Beside Shamal Waves - JVC - Dubai - United Arab Emirates
                        </Text>

                        <Text style={[Styles.SectionTitle, { marginTop: 20 }]}>Payment Mode :</Text>
                        <Text style={Styles.InfoBold}>Credit Card</Text>

                        <Text style={[Styles.SectionTitle, { marginTop: 20 }]}>{Strings?.items}</Text>

                        <View style={Styles.ItemRow}>
                            <Text style={Styles.ItemName}>Twister BBQ Box</Text>
                            <Text style={Styles.ItemQty}>1</Text>
                            <Text style={Styles.ItemPrice}>17.20 {countrySelected?.currencyCode}</Text>
                        </View>

                        <View style={Styles.ItemRow}>
                            <Text style={Styles.ItemName}>9 PCS Bucket</Text>
                            <Text style={Styles.ItemQty}>2</Text>
                            <Text style={Styles.ItemPrice}>8.40 {countrySelected?.currencyCode}</Text>
                        </View>

                        <View style={Styles.ItemRow}>
                            <Text style={Styles.ItemName}>14 PCS Bucket</Text>
                            <Text style={Styles.ItemQty}>1</Text>
                            <Text style={Styles.ItemPrice}>12.00 {countrySelected?.currencyCode}</Text>
                        </View>
                        <View style={Styles.TotalRow}>
                            <Text style={Styles.TotalLabel}>Grand Total</Text>
                            <Text style={Styles.TotalAmount}>39.33 {countrySelected?.currencyCode}</Text>
                        </View>

                        <Text style={Styles.BillRow}>{Strings?.SubTotal} 37.60 {countrySelected?.currencyCode}</Text>
                        <Text style={Styles.BillRow}>{Strings?.vat} @ {DeliveryDetails?.vatCharge}% ............................ 1.73 {countrySelected?.currencyCode}</Text>
                        <Text style={Styles.BillRow}>{Strings?.deliveriCharge}  ............... 0.00 {countrySelected?.currencyCode}</Text>
                    </View>
                    <View style={Styles.RestaurantBox}>
                        <Text style={Styles.RestaurantTitle}>{Strings?.KFC_restaurant}</Text>
                        <Text style={Styles.RestaurantAddress}>{DeliveryDetails?.restaurantName}</Text>

                        <View style={Styles.CallButton}>
                            <Image source={Images.call} style={Styles.CallIcon} />
                        </View>
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
            fontWeight: '700',
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
        OrderConfirmed: {
            fontSize: 20,
            fontFamily: Fonts.subHeader,
            fontWeight: '700',
            color: Colors.textBlack,
        },
        OrderNumber: {
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: Colors.textGrey,
            marginTop: 3,
        },
        DateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
        },
        DateText: {
            fontSize: 14,
            color: Colors.textGrey,
            fontFamily: Fonts.regular,
        },
        TrackBox: {
            marginTop: 15,
            marginHorizontal: 15,
            backgroundColor: Colors.bodyColor,
            padding: 18,
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
            height: 20,
            width: 20,
            tintColor: Colors.textBlack
        },
        TrackText: {
            fontSize: 18,
            fontFamily: Fonts.subHeader,
            marginLeft: 10,
            color: Colors.textBlack,
        },
        TrackArrow: {
            height: 20,
            width: 20,
            tintColor: Colors.textBlack,
        },
        SummaryBox: {
            marginTop: 20,
            marginHorizontal: 15,
            backgroundColor: Colors.bodyColor,
            padding: 20,
             borderRadius: 2, 
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        SummaryHeaderRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            backgroundColor: Colors?.bodyLigheterColor
        },
        SummaryHeader: {
            fontSize: 18,
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
            marginVertical: 20 , 
        },
        DownloadIcon: {
            height: 20,
            width: 20
        },

        SectionTitle: {
            fontSize: 15,
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
            marginBottom: 5,
        },
        InfoText: {
            fontFamily: Fonts.regular,
            color: Colors.textGrey,
            lineHeight: 20,
        },
        InfoBold: {
            fontFamily: Fonts.subHeader,
            fontSize: 15,
            color: Colors.textBlack,
        },

        ItemRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
        },
        ItemName: {
            flex: 1,
            fontFamily: Fonts.regular,
            color: Colors.textBlack,
        },
        ItemQty: {
            width: 30,
            textAlign: 'center',
            fontFamily: Fonts.regular,
            color: Colors.textGrey,
        },
        ItemPrice: {
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
        },

        TotalRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
        },
        TotalLabel: {
            fontFamily: Fonts.subHeader,
            fontSize: 17,
        },
        TotalAmount: {
            fontFamily: Fonts.subHeader,
            fontSize: 17,
            color: Colors.textBlack,
        },
        BillRow: {
            marginTop: 12,
            fontFamily: Fonts.regular,
            color: Colors.textGrey,
        },
        RestaurantBox: {
            marginTop: 20,
            marginHorizontal: 15,
            backgroundColor: Colors.cardBg,
            padding: 20,
             borderRadius: 2, 
            marginBottom: 40,
        },
        RestaurantTitle: {
            fontSize: 18,
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
        },
        RestaurantAddress: {
            marginTop: 10,
            fontFamily: Fonts.regular,
            color: Colors.textGrey,
            lineHeight: 20,
        },
        CallButton: {
            position: 'absolute',
            right: 20,
            top: 25,
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        CallIcon: {
            height: 22,
            width: 22,
            tintColor: '#fff'
        },
    });
