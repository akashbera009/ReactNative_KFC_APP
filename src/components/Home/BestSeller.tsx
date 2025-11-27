import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// data imports 
import { BestSellerMenu } from '../../data/BestSellerMenu'
// util imports
import Fonts from '../../utils/Fonts'
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';

export default function BestSeller() {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors, Fonts);
    const Country = useCountry()
    return (
        <View style={Styles.ParentBestSellerContainer}>
            <View style={Styles.headerExplore}>
                <Text style={Styles.BestSellerHeader}>{Strings?.bestSeller.toUpperCase()} </Text>
                <Text style={Styles.ExploreHeaderViewAll}>{Strings?.viewAll.toUpperCase()} </Text>
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
                                onPress={() => { }}
                            >
                                <Text style={Styles.OrderText}>{Strings?.order.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        ParentBestSellerContainer: {
            width: '93%',
            alignSelf: 'center',
            marginVertical: 10
        },
        headerExplore: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        BestSellerHeader: {
            color: Colors?.textBlack,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: 14
        },
        ExploreHeaderViewAll: {
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: 12
        },
        CardsContainer: {
            height: 180,
            marginBottom: 5
        },
        Cards: {
            height: 150,
            width: 250,
            backgroundColor: Colors?.bodyColor, 
            marginRight: 10 , 
            marginVertical: 10,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: .1,
            borderRadius: 2,
            shadowRadius: 5,
            elevation: 5, 
        },
        TopContainer:{
            height: '80%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        cardImage: {
            height: 80,
            width: 80,
            marginLeft:20,
            shadowColor: Colors?.constantBlack,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        RightContainer:{
            display: 'flex',
            flexDirection: 'column', 
            width: '63%',
            justifyContent: 'center', 
            position:'relative',
            left: 10 , 
        },
        title: {
            fontSize: 14,
            fontWeight: 600,
            marginHorizontal: 4,
            color: Colors?.textBlack,
            width: '85%', 
            overflow: 'hidden'
        },
        description: {
            width: '85%',
            height: '40%',
            fontSize:11, 
            color: Colors?.timerFadeText,
            margin: 4 ,
            fontWeight: 600
        },
        LowerContainer: {
            borderTopWidth: 1,
            borderTopColor: Colors?.fadeWhiteText2,
            width: '100%',
            height: 45,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            position:'absolute',
            bottom: 0 ,
            left: 0 ,  
        },
        PriceaContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: 20 
        },
        price: {
            fontWeight: 800,
            fontSize: 13 ,

      color: Colors?.textBlack
        },
        OrderButton: {
            borderWidth: 2,
            borderColor: Colors?.fadeBorder,
            borderRadius: 3,
            marginHorizontal:15 , 
        },
        OrderText: {
            color:Colors?.KFC_red,
            fontFamily:Fonts?.subHeader,
            fontSize: 11,
            marginHorizontal: 15, 
            marginVertical: 5 , 
            fontWeight: 800
        }

    })
    return Styles
}