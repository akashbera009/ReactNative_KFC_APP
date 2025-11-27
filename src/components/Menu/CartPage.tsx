import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageSourcePropType } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom component 
import BottomCart from './BottomCart';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCart } from '../../context/CartContext';
import { useCountry } from '../../context/CountryContext';
// data imports 
import DeliveryDetails from '../../data/DeliveryDetails';

export default function CartPage() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { CartItem, setCartItem } = useCart();
    const { countrySelected } = useCountry();
    const handleIncreaseQuantity = (idx: number) => {
        setCartItem((prev: CartItemType[]) =>
            prev.map((item, i) =>
                i == idx
                    ? { ...item, quantity: item?.quantity + 1 <= 10 ? item?.quantity + 1 : item?.quantity }
                    : item
            )
        )
    }
    const handleDelete = (idx: number, image: ImageSourcePropType) => {
        navigation.push(Strings?.RemoveCartItemBottomSheetScreen, {
            imageLink: image,
            idx: idx,
        })
    }
    const handleDecreaseQuantity = (idx: number) => {
        setCartItem((prev: CartItemType[]) =>
            prev.map((item, i) =>
                i == idx
                    ? { ...item, quantity: item?.quantity - 1 }
                    : item
            )
        )
    }
    let totalAmount = CartItem.reduce((acc, item) => acc + item.price * item?.quantity, 0)
    let beforeTax = (totalAmount - totalAmount * 5 / 100).toFixed(2)
    const vatAmount = (totalAmount * 5 / 100).toFixed(2);
    let GrandAmount = (totalAmount + DeliveryDetails?.charges).toFixed(2);
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <View style={Styles.HeaderTextContainer}>
                        <Text style={Styles.navHeaderText} >{Strings?.cart}</Text>
                        <Text style={Styles.noOfItemsText} >({CartItem?.length} {Strings?.items.toUpperCase()})</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={Styles.editButton}
                >
                    <Text style={Styles.editbuttonText}>{Strings?.edit.toUpperCase()} </Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.scrollContainer}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {CartItem.map((item, idx) => (
                        <View key={idx} style={Styles.CardContainer}>
                            <View style={Styles.UpperContainer}>
                                <Image source={item?.image} style={Styles.LeftfoodImage} />
                                <View style={Styles.RightContainer}>
                                    <Text style={Styles.FoodName}>{item?.name}</Text>
                                    <View style={Styles.DescriptionContainer}>
                                        {item?.description.map((item1, idx) => (
                                            <View key={idx} style={Styles.DotAndDescription}>
                                                <View style={Styles.dot} />
                                                <Text style={Styles.DescriptioText}>{item1}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View style={Styles.LowerContainer}>
                                <View style={Styles.LowerLeftPriceContainer}>
                                    <Text style={Styles.Price}>{item.price.toFixed(2)}</Text>
                                    <Text style={Styles.Price}>{countrySelected.currencyCode}</Text>
                                </View>
                                <View style={Styles.AddedCartButtonContainer}>
                                    {(item?.quantity == 1) ?
                                        <TouchableOpacity
                                            style={Styles.deleteButtonContainer}
                                            onPress={() => { handleDelete(idx, item?.image) }}
                                        >
                                            <Image source={Images?.Delete_Icon} style={Styles.deleteIcon} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            style={Styles.deleteButtonContainer}
                                            onPress={() => { handleDecreaseQuantity(idx) }}
                                        >
                                            <Image source={Images?.Minus} style={Styles.deleteIcon} />
                                        </TouchableOpacity>
                                    }

                                    <Text style={Styles.counter}>{item?.quantity <= 9 ? `0${item?.quantity}` : item?.quantity} </Text>
                                    <TouchableOpacity
                                        style={item?.quantity < 10 ? Styles.AddCounterButton : Styles.AddCounterButtonFade}
                                        onPress={() => { handleIncreaseQuantity(idx) }}
                                    >
                                        <Image source={Images?.AddButton} style={Styles.AddButtonImage} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                        style={Styles.ExploreMenuContainer}>
                        <View style={Styles.LeftExploreCOntaienr}>
                            <Text style={Styles.ExploreMenu}>{Strings?.exploreMenu} </Text>
                            <Text style={Styles.moreItemsCart}>{Strings?.addMoreItemsToCart} </Text>
                        </View>
                        <View>
                            <Image source={Images?.back_arrow} style={Styles.GotoMoreMenu} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Strings?.OfferAppliedScreen)}
                        style={Styles.ExploreMenuContainer}>
                        <View style={Styles.LeftCouponCOntaienr}>
                            <Image source={Images?.discount} style={Styles.discountImage} />
                            <Text style={Styles.applyCoupon}>{Strings?.applyCoupon} </Text>
                        </View>
                        <View>
                            <Image source={Images?.back_arrow} style={Styles.GotoMoreMenu} />
                        </View>
                    </TouchableOpacity>
                    <View style={[Styles.PricingTotalContainer, { marginBottom: inset.bottom + 30 }]}>
                        <View style={Styles.PriceEntries}>
                            <Text style={Styles.PriceEntriesLeft}>{Strings?.SubTotal} </Text>
                            <Text style={Styles.PriceEntriesRight}>{beforeTax} {countrySelected?.currencyCode} </Text>
                        </View>
                        <View style={Styles.PriceEntries}>
                            <Text style={Styles.PriceEntriesLeft}>{Strings?.vat.toUpperCase()} @ {DeliveryDetails?.vatCharge}% </Text>
                            <Text style={Styles.PriceEntriesRight}>{vatAmount} {countrySelected?.currencyCode} </Text>
                        </View>
                        <View style={Styles.PriceEntries}>
                            <Text style={Styles.PriceEntriesLeft}>{Strings?.deliveriCharge} </Text>
                            <Text style={Styles.PriceEntriesRight}>{DeliveryDetails?.charges} {countrySelected?.currencyCode} </Text>
                        </View>
                        <View style={Styles.PriceEntries}>
                            <Text style={Styles.PriceEntriesLeft}>{Strings?.grandTotal} </Text>
                            <Text style={Styles.PriceEntriesRight}>{GrandAmount} {countrySelected?.currencyCode} </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={[Styles.BottomCartContainer, { bottom: 0 }]}>
                <BottomCart ButtonType={Strings?.placeOrder} navLink={Strings?.CheckOutScreen} totalAmount={Number(GrandAmount)} />
            </View>

        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            height: '100%'
        },

        NavWrapper: {
            width: '100%',
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: 15,
        },
        headerText: {
            fontSize: 20,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors?.textBlack,
            height: 18,
            width: 18,
            alignSelf: 'flex-start',
            marginHorizontal: 18,
        },
        HeaderTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'center',
        },
        navHeaderText: {
            fontSize: 20,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
        },
        noOfItemsText: {
            fontSize: 12,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            // alignSelf:'flex-end',
            marginHorizontal: 10,
            marginVertical: 2
        },
        editButton: {
            borderWidth: 1,
            borderColor: Colors?.fadeBorder,
            borderRadius: 2,
            marginHorizontal: 10,
        },
        editbuttonText: {
            fontFamily: Fonts?.subHeader,
            fontSize: 12,
            fontWeight: 700,
            color: Colors?.KFC_red,
            marginHorizontal: 15,
            marginVertical: 5,
        },
        ExploreMenuContainer: {
            height: 65,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 2,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        LeftExploreCOntaienr: {
            marginHorizontal: 20,
            height: '90%',
        },
        ExploreMenu: {
            marginVertical: 5,
            fontSize: 18,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        moreItemsCart: {
            fontSize: 14,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600,
            color: Colors?.textFadeBlack,
        },
        GotoMoreMenu: {
            height: 16,
            width: 16,
            tintColor: Colors?.textBlack,
            marginHorizontal: 25,
            transform: [{ scaleX: -1 }]
        },
        LeftCouponCOntaienr: {
            marginHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        discountImage: {
            height: 30,
            width: 30,
            tintColor: Colors?.KFC_red,
        },
        applyCoupon: {
            marginHorizontal: 15,
            fontSize: 18,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        PricingTotalContainer: {
            height: 200,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginTop: 10,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            display: 'flex',
            justifyContent: 'center',
        },
        PriceEntries: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 15,
        },
        PriceEntriesLeft: {
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textFadeBlack,
            fontWeight: 500,
        },
        PriceEntriesRight: {
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textBlack,
            fontWeight: 500,
            marginLeft: 'auto'
        },
        BottomCartContainer: {
            width: '100%',
            height: 110,
            backgroundColor: Colors?.bodyColor,
            position: 'absolute',
            left: 0,
            zIndex: 2,
        },
        BottomCOntainerWrapper: {
        },
        scrollContainer: {
            height: '80%',
        },
        CardContainer: {
            height: 180,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: 6,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: .4,
            shadowRadius: 5,
            elevation: 5,
        },
        Tags: {
            position: 'absolute',
            top: 5,
            left: 5,
            backgroundColor: Colors?.activeBorder,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
        },
        TagText: {
            fontSize: 9,
            marginLeft: 5,
            marginRight: 14,
            marginVertical: 3,
            color: Colors?.constantWhite,
            fontWeight: 600
        },
        ribbonTriangle: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderTopWidth: 10,
            borderBottomWidth: 10,
            borderLeftWidth: 8,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: Colors?.bodyColor,
            transform: [{ scaleX: -1 }]

        },
        UpperContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        LeftfoodImage: {
            height: 120,
            width: 120,
            marginVertical: 15,
            marginTop: 25,
            marginLeft: 15
        },
        RightContainer: {
            width: '60%',
            height: '90%',
            paddingTop: 5,
            marginLeft: 10,
        },
        FoodName: {
            fontSize: 15,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            marginVertical: 10,
            color: Colors?.textBlack
        },
        DescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            marginLeft: 1
        },
        DotAndDescription: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4
        },
        dot: {
            margin: 5,
            height: 4,
            width: 4,
            borderRadius: 20,
            backgroundColor: Colors?.textFadeBlack,
        },
        DescriptioText: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.timerFadeText,
            fontSize: 11,
            marginRight: 5,
        },
        LowerContainer: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
        },
        LowerLeftPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 20
        },
        Price: {
            fontSize: 15,
            fontWeight: 700,
            marginHorizontal: 2,
            color: Colors?.textBlack,
        },
        OldPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 4
        },

        AddedCartButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 10,
        },
        deleteButtonContainer: {
            borderWidth: 1,
            borderColor: Colors?.fadeBorder,
            borderRadius: 4,
            padding: 4
        },
        deleteIcon: {
            height: 20,
            width: 20,
            tintColor: Colors?.textBlack
        },
        counter: {
            marginHorizontal: 8,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: 16,
            color: Colors?.textBlack
        },
        AddCounterButton: {
            height: 30,
            width: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            backgroundColor: Colors?.KFC_red,
        },
        AddCounterButtonFade: {
            height: 30,
            width: 30,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            backgroundColor: Colors?.KFC_red_Fade,
        },
        AddButtonImage: {
            height: 15,
            width: 15,
            tintColor: Colors?.constantWhite,
        },
        AddToCartButton: {
            backgroundColor: Colors?.KFC_red,
            borderRadius: 4,
            marginHorizontal: 14,
            marginVertical: 14
        },
        AddToCartButtonText: {
            color: Colors?.constantWhite,
            fontSize: 10,
            marginHorizontal: 14,
            marginVertical: 10,
            fontFamily: Fonts?.headerRegular,
            fontWeight: 700
        },

        Favourite_Icon: {
            height: 20,
            width: 20,
            position: 'absolute',
            right: 15,
            top: 20,
            tintColor: Colors?.KFC_red
        },
    });
    return Styles;
};