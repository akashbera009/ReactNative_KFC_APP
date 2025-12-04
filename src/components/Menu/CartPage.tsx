import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageSourcePropType } from 'react-native';
import React, { useEffect, useState } from 'react';
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

export default function CartPage({ discount, discountPercentage, offerCode }: CartScreenScreenProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { CartItem, setCartItem } = useCart();
    const { countrySelected } = useCountry();
    const isOfferApplied = discount != 0 || discountPercentage != 0;
    const [topOfferAppliedIndicator, setTopOfferAppliedIndicator] = useState(false);
    useEffect(()=>{
        if(isOfferApplied)
            setTopOfferAppliedIndicator(true)
    },[isOfferApplied])
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
    const [editingMode, seteditingMode] = useState(false)
    const handleOfferApply = () => {
        navigation.navigate(Strings?.DealsAndOfferScreen)
        let success = 0
        if (success)
            navigation.navigate(Strings?.OfferAppliedScreen)
    }
    let totalAmount = CartItem.reduce((acc, item) => acc + item.price * item?.quantity, 0)
    let discountAmount = isOfferApplied
        ? (discount > 0
            ? (discount)
            : (discountPercentage > 0
                ? totalAmount - (totalAmount * discountPercentage / 100)
                : totalAmount)
        ) :
        0;
    discountAmount = Number(discountAmount.toFixed(2))
    totalAmount = totalAmount - Math.abs(Number(discountAmount))
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
                    onPress={() => seteditingMode(!editingMode)}
                    style={Styles.editButton}
                >
                    <Text style={editingMode ? Styles.editbuttonFadeText : Styles.editbuttonText}>{editingMode ? Strings?.done.toUpperCase() : Strings?.edit.toUpperCase()} </Text>
                </TouchableOpacity>
            </View>
            {editingMode ? (
                <View style={Styles.EditingScrollView}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {CartItem.map((item, idx) => (
                            <View key={idx}
                                style={[Styles.EditingCardContainer]}>
                                <View style={Styles.EditingButtons}>
                                    <View style={Styles.EditingButtonContainerWrapper}>
                                        <TouchableOpacity
                                            style={Styles.EditingButtonWrapper}>
                                            <Image source={Images?.Edit_Icon} style={Styles.EditingIcons} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(idx, item?.image)}
                                            style={Styles.EditingButtonWrapper}>
                                            <Image source={Images?.delete_Icon} style={Styles.EditingIcons} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={Styles.EditingRightMainContainer}>
                                    <View style={Styles.EditUpperContainer}>
                                        <Image source={item?.image} style={Styles.EditLeftfoodImage} />
                                        <View style={Styles.EditRightContainer}>
                                            <Text style={Styles.FoodName}>{item?.name}</Text>
                                            <View style={Styles.EditModeDescriptionContainer}>
                                                {item?.description.map((item1, idx) => (
                                                    <View key={idx} style={Styles.DotAndDescription}>
                                                        <View style={Styles.dot} />
                                                        <Text style={Styles.DescriptioText}>{item1}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={Styles.EditLowerContainer}>
                                        <View style={Styles.EditLowerLeftPriceContainer}>
                                            <Text style={Styles.Price}>{item.price.toFixed(2)}</Text>
                                            <Text style={Styles.Price}>{countrySelected.currencyCode}</Text>
                                            <View style={Styles.OldPriceContainer}>
                                                <Text style={Styles.OldPrice}>{item?.oldPrice.toFixed(2)}</Text>
                                                <Text style={Styles.OldPrice}>{countrySelected.currencyCode}</Text>
                                                <View style={Styles.CrossBorder} />
                                            </View>
                                        </View>
                                        <View style={Styles.EditModeAddedCartButtonContainer}>
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
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <>
                    <View style={Styles.scrollContainer}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {topOfferAppliedIndicator && (
                                <View style={Styles.OfferAppliedTopIndicator}>
                                    <View style={Styles.discountImageContainer}>
                                        <Image source={Images?.discount} style={Styles.discountImageTop} />
                                    </View>
                                    <View style={Styles.GreenTextContainer}>
                                        <Text style={Styles.offerAppliedGreenText}>{Strings?.offer} </Text>
                                        <Text style={Styles.offerAppliedGreenText}>{offerCode} </Text>
                                        <Text style={Styles.offerAppliedGreenText}>{Strings?.applied} </Text>
                                    </View>
                                    <Image source={Images?.Info_Button} style={Styles.InfoButton} />
                                    <TouchableOpacity
                                        style={Styles.deleteButton}
                                        onPress={() => setTopOfferAppliedIndicator(false)}
                                    >
                                        <Text style={[Styles.deleteButtonText]}>{Strings?.delete.toUpperCase()} </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
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
                            {isOfferApplied ?
                                (
                                    <View style={[Styles.CouponMenuContainer, Styles.GreenBorder]}>
                                        <View style={Styles.AboveCouponCOntainer}>
                                            <View style={Styles.TopCouponCOntaienr}>
                                                <Image source={Images?.discount} style={Styles.discountImage} />
                                                <Text style={Styles.CouponAppliedText}>{Strings?.couponApplied} </Text>
                                            </View>
                                            <TouchableOpacity
                                                style={Styles.changeButton}
                                                onPress={handleOfferApply}
                                            >
                                                <Text style={Styles.changeButtonText}>{Strings?.change.toUpperCase()} </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={Styles.AppliedOfferDetail}>
                                            <Text style={Styles.offerAppliedGreenText}>{Strings?.offer} {offerCode} {Strings?.applied}. {Strings?.youSaved} </Text>
                                            <Text style={[Styles.offerAppliedGreenText, Styles.offerAppliedGreenTextCurrency]}>{Math.abs(Number(discountAmount))} {countrySelected?.currencyCode.toUpperCase()} </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleOfferApply}
                                        style={Styles.ExploreMenuContainer}>
                                        <View style={Styles.LeftCouponCOntaienr}>
                                            <Image source={Images?.discount} style={Styles.discountImage} />
                                            <Text style={Styles.applyCoupon}>{Strings?.applyCoupon} </Text>
                                        </View>
                                        <View>
                                            <Image source={Images?.back_arrow} style={Styles.GotoMoreMenu} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            <View style={[Styles.PricingTotalContainer, { marginBottom: inset.bottom + 30 }]}>
                                <View style={Styles.PriceEntries}>
                                    <Text style={Styles.PriceEntriesLeft}>{Strings?.SubTotal} </Text>
                                    <Text style={Styles.PriceEntriesRight}>{beforeTax} {countrySelected?.currencyCode} </Text>
                                </View>
                                {isOfferApplied && (
                                    <View style={Styles.PriceEntries}>
                                        <Text style={Styles.PriceEntriesLeft}>{Strings?.discount} </Text>
                                        <Text style={[Styles.PriceEntriesRight, Styles.discountAmount]}>-{discountAmount} {countrySelected?.currencyCode} </Text>
                                    </View>
                                )}
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
                        <BottomCart ButtonType={Strings?.placeOrder} navLink={Strings?.CheckOutScreen} totalAmount={Number(GrandAmount)} discount={discount} />
                    </View>
                </>)}
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            height: '100%',
            backgroundColor: Colors?.bodyColor,
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
            color: Colors?.textBlack
        },
        noOfItemsText: {
            color: Colors?.textBlack,
            fontSize: 12,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
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
        editbuttonFadeText: {
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
            fontSize: 12,
            fontWeight: 700,
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
        CouponMenuContainer: {
            paddingVertical: 10,
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
        GreenBorder: {
            borderWidth: 1,
            borderRadius: 4,
            borderColor: Colors?.greenOk,
            borderStyle: 'dashed',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        AboveCouponCOntainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 5,
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
        TopCouponCOntaienr: {
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
        CouponAppliedText: {
            marginHorizontal: 12,
            fontSize: 18,
            fontFamily: Fonts?.font17,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        changeButton: {
            marginHorizontal: 20
        },
        changeButtonText: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.KFC_red,
        },
        AppliedOfferDetail: {
            width: '90%',
            marginVertical: 10,
            marginHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
        },
        offerAppliedGreenText: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.greenOk,
            letterSpacing: .5,
        },
        offerAppliedGreenTextCurrency: {
            fontWeight: 700,
        },
        PricingTotalContainer: {
            paddingVertical: 20,
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
        discountAmount: {
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            fontWeight: 500,
            color: Colors?.greenOk,
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
            backgroundColor: Colors?.bodyLigheterColor,
        },
        OfferAppliedTopIndicator: {
            backgroundColor: Colors?.bodyColor,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: Colors?.greenOk,
            marginTop: 20,
            borderRadius: 2,
            width: '95%',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        discountImageContainer: {
            backgroundColor: Colors?.greenOk,
            width: 60,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        GreenTextContainer: {
            marginLeft: 10,
            marginRight: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        deleteButton: {
            marginLeft: 'auto',
            marginRight: 10,
        },
        deleteButtonText: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.KFC_red,
        },
        discountImageTop: {
            tintColor: Colors?.constantWhite,
            height: 25,
            width: 25,
            marginVertical: 10
        },
        InfoButton: {
            tintColor: Colors?.textBlack,
            height: 16,
            width: 16,
        },
        CardContainer: {
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
        EditingScrollView: {
            backgroundColor: Colors?.bodyLigheterColor,
            height: '88%'
        },
        EditingCardContainer: {
            width: '93%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: 6,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: .4,
            shadowRadius: 10,
            elevation: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        EditingButtons: {
            height: '100%',
            width: '20%',
            backgroundColor: Colors?.bodyShadeColor,
        },
        EditingButtonContainerWrapper: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        EditingButtonWrapper: {
            backgroundColor: Colors?.bodyColor,
            borderRadius: 2,
            marginHorizontal: 'auto',
            padding: 10,
        },
        EditingIcons: {
            height: 18,
            width: 18,
            tintColor: Colors?.textBlack
        },
        EditingRightMainContainer: {
            width: '80%',
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
        EditUpperContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        LeftfoodImage: {
            height: 120,
            width: 120,
            marginTop: 25,
            marginLeft: 15,
        },
        EditLeftfoodImage: {
            height: 100,
            width: 100,
            marginTop: 35,
            marginLeft: 15,
        },
        RightContainer: {
            width: '60%',
            height: '90%',
            paddingTop: 5,
            marginLeft: 10,
        },
        EditRightContainer: {
            width: '50%',
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
            marginLeft: 1,
            marginBottom: 10,
        },
        EditModeDescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '85%',
            marginLeft: 1,
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
        },
        EditLowerContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            marginBottom: 10,
        },
        LowerLeftPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 20
        },
        EditLowerLeftPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 20
        },
        Price: {
            fontSize: 15,
            fontWeight: 700,
            marginHorizontal: 2,
            color: Colors?.textBlack,
        },
        OldPrice: {
            fontSize: 13,
            fontWeight: 700,
            marginHorizontal: 2,
            color: Colors?.textFadeBlack,
        },
        CrossBorder: {
            width: '100%',
            borderBottomColor: Colors?.textFadeBlack,
            borderBottomWidth: 2,
            position: 'absolute',
            top: 8,
            left: 0,
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
        EditModeAddedCartButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
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