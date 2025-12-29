import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data imports 
import { BestSellerMenu } from '../../data/BestSellerMenu'
// util imports
import Fonts from '../../utils/Fonts'
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh , vw} from '../../utils/Dimensions';


export default function BestSeller() {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors);
    const Country = useCountry()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
    return (
        <View style={Styles.ParentBestSellerContainer}>
            <View style={Styles.headerExplore}>
                <Text style={Styles.BestSellerHeader}>{Strings.bestSeller.toUpperCase()} </Text>
                <Text style={Styles.ExploreHeaderViewAll}>{Strings.viewAll.toUpperCase()} </Text>
            </View>
            <ScrollView style={Styles.CardsContainer} horizontal showsHorizontalScrollIndicator={false}>
                {BestSellerMenu.map((item, idx) => (
                    <View key={idx} style={Styles.Cards}>
                        <View style={Styles.TopContainer}>
                            <Image source={item?.image} style={Styles.cardImage} />
                            <View style={Styles.RightContainer}>
                                <Text style={Styles.title} numberOfLines={1}>{item?.title} </Text>
                                <Text style={Styles.description} numberOfLines={3}>{item?.description} </Text>
                            </View>
                        </View>
                        <View style={Styles.LowerContainer}>
                            <View style={Styles.PriceaContainer}>
                                <Text style={Styles.price}>{item?.price} </Text>
                                <Text style={Styles.price}>{Country?.countrySelected?.currencyCode} </Text>
                            </View>
                            <TouchableOpacity
                                style={Styles.OrderButton}
                                onPress={() => {navigation.navigate(Strings.ExploreMenuScreen,{
                                    categoryType : Strings.dealsString
                                })}}
                            >
                                <Text style={Styles.OrderText}>{Strings.order.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        ParentBestSellerContainer: {
            width: '93%',
            alignSelf: 'center',
            marginVertical: vh(10)
        },
        headerExplore: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        BestSellerHeader: {
            color: Colors.textBlack,
            fontFamily: Fonts.subHeader,
            fontSize: normalize(14)
        },
        ExploreHeaderViewAll: {
            color: Colors.textFadeBlack,
            fontFamily: Fonts.subHeader,
            fontSize: normalize(12)
        },
        CardsContainer: {
            height: vh(180),
            marginBottom: vh(5)
        },
        Cards: {
            height: vh(150),
            width: vw(250),
            backgroundColor: Colors.bodyColor,
            marginRight: vw(10),
            marginVertical: vh(10),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: 0, height: vh(2) },
            shadowOpacity: .1,
            borderRadius: normalize(2),
            shadowRadius: normalize(5),
            elevation: normalize(5),
        },
        TopContainer: {
            height: '80%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        cardImage: {
            height: vh(80),
            width: vw(80),
            marginLeft: vw(20),
            shadowColor: Colors.constantBlack,
            shadowOffset: { width: 0, height: vh(2) },
            shadowOpacity: normalize(0.25),
            shadowRadius: normalize(3.84),
            elevation: normalize(5),
        },
        RightContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '63%',
            justifyContent: 'center',
            position: 'relative',
            left: vw(10),
        },
        title: {
            fontSize: normalize(14),
            marginHorizontal: vw(4),
            color: Colors.textBlack,
            fontFamily: Fonts.font17 , 
            width: '85%',
            overflow: 'hidden'
        },
        description: {
            width: '85%',
            height: '40%',
            fontSize: normalize(11),
            color: Colors.timerFadeText,
            fontFamily: Fonts.font17,
            margin: normalize(4),
        },
        LowerContainer: {
            borderTopWidth: normalize(1),
            borderTopColor: Colors.fadeWhiteText2,
            width: '100%',
            height: vh(45),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            bottom: normalize(0),
            left: normalize(0),
        },
        PriceaContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: vw(20)
        },
        price: {
            fontSize: normalize(13),
            color: Colors.textBlack,
            fontFamily: Fonts.font17
        },
        OrderButton: {
            borderWidth: normalize(2),
            borderColor: Colors.fadeBorder,
            borderRadius: normalize(3),
            marginHorizontal: vw(15),
        },
        OrderText: {
            color: Colors.KFC_red,
            fontFamily: Fonts.subHeader,
            fontSize: normalize(11),
            marginHorizontal: vw(15),
            marginVertical: vh(5),
        }

    })
    return Styles
}