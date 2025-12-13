import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//redux
import { RootState, useAppDispatch } from '../../store/store';
import { decreaseQuantity, increaseQuantity } from '../../features/cartSlice';
import { useSelector } from 'react-redux';
// custom component 
import BottomCart from './BottomCart';
import { CartItemNotFound } from './CartItemNotFound';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
// data imports 
import { DeliveryDetails } from '../../data/DeliveryDetails';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function CartPage({ discount, discountPercentage, offerCode }: CartScreenScreenProps) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const cartData = useSelector((state: RootState) => state.cart)
    const cartItem = cartData?.cartItems
    const { countrySelected } = useCountry();
    const isOfferApplied = discount != 0 || discountPercentage != 0;
    const [topOfferAppliedIndicator, setTopOfferAppliedIndicator] = useState(false);
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isOfferApplied)
            setTopOfferAppliedIndicator(true)
    }, [isOfferApplied])
    const handleIncreaseQuantity = (uid: string) => {
        dispatch(increaseQuantity(uid))
    }
    const handleDelete = (uid: string, image: string) => {
        navigation.push(Strings?.RemoveCartItemBottomSheetScreen, {
            imageLink: image,
            uid: uid,
        })
    }
    const handleDecreaseQuantity = (uid: string) => {
        dispatch(decreaseQuantity(uid))
    }
    const [editingMode, seteditingMode] = useState(false)
    const handleOfferApply = () => {
        navigation.navigate(Strings?.DealsAndOfferScreen)
        let success = 0
        if (success)
            navigation.navigate(Strings?.OfferAppliedScreen)
    }
    let totalAmount = cartItem.reduce((acc, item) => acc + item.price * item?.quantity, 0)
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
                        {cartItem?.length != 0 && (
                            <Text style={Styles.noOfItemsText} >({cartItem?.length} {Strings?.items.toUpperCase()})</Text>
                        )}
                    </View>
                </View>
                {cartItem?.length != 0 && (

                    <TouchableOpacity
                        onPress={() => seteditingMode(!editingMode)}
                        style={Styles.editButton}
                    >
                        <Text style={editingMode ? Styles.editbuttonFadeText : Styles.editbuttonText}>{editingMode ? Strings?.done.toUpperCase() : Strings?.edit.toUpperCase()} </Text>
                    </TouchableOpacity>
                )}
            </View>
            {editingMode ? (
                <View style={Styles.EditingScrollView}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {cartItem.map((item, idx) => (
                            <View key={idx}
                                style={[Styles.EditingCardContainer]}>
                                <View style={Styles.EditingButtons}>
                                    <View style={Styles.EditingButtonContainerWrapper}>
                                        <TouchableOpacity
                                            style={Styles.EditingButtonWrapper}>
                                            <Image source={Images?.Edit_Icon} style={Styles.EditingIcons} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item?.menuItemUid, item?.image)}
                                            style={Styles.EditingButtonWrapper}>
                                            <Image source={Images?.delete_Icon} style={Styles.EditingIcons} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={Styles.EditingRightMainContainer}>
                                    <View style={Styles.EditUpperContainer}>
                                        <Image src={item?.image} style={Styles.EditLeftfoodImage} />
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
                                                    onPress={() => { handleDelete(item?.menuItemUid, item?.image) }}
                                                >
                                                    <Image source={Images?.Delete_Icon} style={Styles.deleteIcon} />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    style={Styles.deleteButtonContainer}
                                                    onPress={() => { handleDecreaseQuantity(item?.menuItemUid) }}
                                                >
                                                    <Image source={Images?.Minus} style={Styles.deleteIcon} />
                                                </TouchableOpacity>
                                            }

                                            <Text style={Styles.counter}>{item?.quantity <= 9 ? `0${item?.quantity}` : item?.quantity} </Text>
                                            <TouchableOpacity
                                                style={item?.quantity < 10 ? Styles.AddCounterButton : Styles.AddCounterButtonFade}
                                                onPress={() => { handleIncreaseQuantity(item?.menuItemUid) }}
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
            ) : (<>
                {cartItem?.length != 0 ?
                    (<>
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
                                {cartItem.map((item, idx) => (
                                    <View key={idx} style={Styles.CardContainer}>
                                        <View style={Styles.UpperContainer}>
                                            <Image src={item?.image} style={Styles.LeftfoodImage} />
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
                                                        onPress={() => { handleDelete(item?.menuItemUid, item?.image) }}
                                                    >
                                                        <Image source={Images?.Delete_Icon} style={Styles.deleteIcon} />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                        style={Styles.deleteButtonContainer}
                                                        onPress={() => { handleDecreaseQuantity(item?.menuItemUid) }}
                                                    >
                                                        <Image source={Images?.Minus} style={Styles.deleteIcon} />
                                                    </TouchableOpacity>
                                                }

                                                <Text style={Styles.counter}>{item?.quantity <= 9 ? `0${item?.quantity}` : item?.quantity} </Text>
                                                <TouchableOpacity
                                                    style={item?.quantity < 10 ? Styles.AddCounterButton : Styles.AddCounterButtonFade}
                                                    onPress={() => { handleIncreaseQuantity(item?.menuItemUid) }}
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
                    </>
                    ) : (
                        <CartItemNotFound />
                    )}
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
            paddingBottom: vh(15),
        },
        headerText: {
            fontSize: normalize(20),
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
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
            marginHorizontal: vw(18),
        },
        HeaderTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'center',
        },
        navHeaderText: {
            fontSize: normalize(20),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack
        },
        noOfItemsText: {
            color: Colors?.textBlack,
            fontSize: normalize(12),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            marginHorizontal: vw(10),
            marginVertical: vh(2)
        },
        editButton: {
            borderWidth: normalize(1),
            borderColor: Colors?.fadeBorder,
            borderRadius: normalize(2),
            marginHorizontal: vw(10),
        },
        editbuttonText: {
            fontFamily: Fonts?.subHeader,
            fontSize: normalize(12),
            fontWeight: 700,
            color: Colors?.KFC_red,
            marginHorizontal: vw(15),
            marginVertical: vh(5),
        },
        editbuttonFadeText: {
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader,
            fontSize: normalize(12),
            fontWeight: 700,
            marginHorizontal: vw(15),
            marginVertical: vh(5),
        },
        ExploreMenuContainer: {
            height: vh(65),
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: vh(10),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: normalize(2),
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(2), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        CouponMenuContainer: {
            paddingVertical: vh(10),
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: vh(10),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: normalize(2),
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(2), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        GreenBorder: {
            borderWidth: normalize(1),
            borderRadius: normalize(4),
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
            marginTop: vh(5),
        },
        LeftExploreCOntaienr: {
            marginHorizontal: vw(20),
            height: '90%',
        },
        ExploreMenu: {
            marginVertical: vh(5),
            fontSize: normalize(18),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        moreItemsCart: {
            fontSize: normalize(14),
            fontFamily: Fonts?.subHeader,
            fontWeight: 600,
            color: Colors?.textFadeBlack,
        },
        GotoMoreMenu: {
            height: vh(16),
            width: vw(16),
            tintColor: Colors?.textBlack,
            marginHorizontal: vw(25),
            transform: [{ scaleX: -1 }]
        },
        LeftCouponCOntaienr: {
            marginHorizontal: vw(20),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        TopCouponCOntaienr: {
            marginHorizontal: vw(20),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        discountImage: {
            height: vh(30),
            width: vw(30),
            tintColor: Colors?.KFC_red,
        },
        applyCoupon: {
            marginHorizontal: vw(15),
            fontSize: normalize(18),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        CouponAppliedText: {
            marginHorizontal: vw(12),
            fontSize: normalize(18),
            fontFamily: Fonts?.font17,
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        changeButton: {
            marginHorizontal: vw(20)
        },
        changeButtonText: {
            fontSize: normalize(14),
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.KFC_red,
        },
        AppliedOfferDetail: {
            width: '90%',
            marginVertical: vh(10),
            marginHorizontal: vw(10),
            display: 'flex',
            flexDirection: 'row',
        },
        offerAppliedGreenText: {
            fontSize: normalize(14),
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.greenOk,
            letterSpacing: normalize(.5),
        },
        offerAppliedGreenTextCurrency: {
            fontWeight: 700,
        },
        PricingTotalContainer: {
            paddingVertical: vh(20),
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginTop: vh(10),
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(2), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
            display: 'flex',
            justifyContent: 'center',
        },
        PriceEntries: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: vh(10),
            marginHorizontal: vw(15),
        },
        PriceEntriesLeft: {
            fontSize: normalize(16),
            fontFamily: Fonts?.subHeader,
            color: Colors?.textFadeBlack,
            fontWeight: 500,
        },
        PriceEntriesRight: {
            fontSize: normalize(16),
            fontFamily: Fonts?.subHeader,
            color: Colors?.textBlack,
            fontWeight: 500,
            marginLeft: 'auto'
        },
        discountAmount: {
            fontSize: normalize(16),
            fontFamily: Fonts?.subHeader,
            fontWeight: 500,
            color: Colors?.greenOk,
        },
        BottomCartContainer: {
            width: '100%',
            height: vh(110),
            backgroundColor: Colors?.bodyColor,
            position: 'absolute',
            left: 0,
            zIndex: 2,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(0), height: vh(0) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(5),
            elevation: 5,
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
            marginTop: vh(20),
            borderRadius: normalize(2),
            width: '95%',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        discountImageContainer: {
            backgroundColor: Colors?.greenOk,
            width: vw(60),
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        GreenTextContainer: {
            marginLeft: vw(10),
            marginRight: vw(5),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        deleteButton: {
            marginLeft: 'auto',
            marginRight: vw(10),
        },
        deleteButtonText: {
            fontSize: normalize(14),
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.KFC_red,
        },
        discountImageTop: {
            tintColor: Colors?.constantWhite,
            height: vh(25),
            width: vw(25),
            marginVertical: vh(10)
        },
        InfoButton: {
            tintColor: Colors?.textBlack,
            height: vh(16),
            width: vw(16),
        },
        CardContainer: {
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors?.bodyColor,
            marginVertical: vh(6),
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: .4,
            shadowRadius: normalize(5),
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
            marginVertical: vh(6),
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(2), height: vh(2) },
            shadowOpacity: .4,
            shadowRadius: normalize(10),
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
            borderRadius: normalize(2),
            marginHorizontal: 'auto',
            padding: normalize(10),
        },
        EditingIcons: {
            height: vh(18),
            width: vw(18),
            tintColor: Colors?.textBlack
        },
        EditingRightMainContainer: {
            width: '80%',
        },
        Tags: {
            position: 'absolute',
            top: vh(5),
            left: vw(5),
            backgroundColor: Colors?.activeBorder,
            borderTopLeftRadius: normalize(2),
            borderTopRightRadius: normalize(2),
        },
        TagText: {
            fontSize: normalize(9),
            marginLeft: vw(5),
            marginRight: vw(14),
            marginVertical: vh(3),
            color: Colors?.constantWhite,
            fontWeight: 600
        },
        ribbonTriangle: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: vw(0),
            height: vh(0),
            borderTopWidth: normalize(10),
            borderBottomWidth: normalize(10),
            borderLeftWidth: normalize(8),
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
            height: vh(120),
            width: vw(120),
            marginTop: vh(25),
            marginLeft: vw(15),
        },
        EditLeftfoodImage: {
            height: vh(100),
            width: vw(100),
            marginTop: vh(35),
            marginLeft: vw(15),
        },
        RightContainer: {
            width: '60%',
            height: '90%',
            paddingTop: vh(5),
            marginLeft: vw(10),
        },
        EditRightContainer: {
            width: '50%',
            paddingTop: vh(5),
            marginLeft: vw(10),
        },
        FoodName: {
            fontSize: normalize(15),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            marginVertical: vh(10),
            color: Colors?.textBlack
        },
        DescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            marginLeft: vw(1),
            marginBottom: vh(10),
        },
        EditModeDescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '85%',
            marginLeft: vw(1),
        },
        DotAndDescription: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: vh(4)
        },
        dot: {
            margin: 5,
            height: vh(4),
            width: vw(4),
            borderRadius: normalize(20),
            backgroundColor: Colors?.textFadeBlack,
        },
        DescriptioText: {
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.timerFadeText,
            fontSize: normalize(11),
            marginRight: vw(5),
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
            marginBottom: vh(10),
        },
        LowerLeftPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: vw(20)
        },
        EditLowerLeftPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: vw(20)
        },
        Price: {
            fontSize: normalize(15),
            fontWeight: 700,
            marginHorizontal: vw(2),
            color: Colors?.textBlack,
        },
        OldPrice: {
            fontSize: normalize(13),
            fontWeight: 700,
            marginHorizontal: vw(2),
            color: Colors?.textFadeBlack,
        },
        CrossBorder: {
            width: '100%',
            borderBottomColor: Colors?.textFadeBlack,
            borderBottomWidth: normalize(2),
            position: 'absolute',
            top: vh(8),
            left: 0,
        },
        OldPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: vw(4)
        },
        AddedCartButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: vw(20),
            marginVertical: vh(10),
        },
        EditModeAddedCartButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: vw(10),
            marginVertical: vh(10),
        },
        deleteButtonContainer: {
            borderWidth: normalize(1),
            borderColor: Colors?.fadeBorder,
            borderRadius: normalize(4),
            padding: normalize(4)
        },
        deleteIcon: {
            height: vh(20),
            width: vw(20),
            tintColor: Colors?.textBlack
        },
        counter: {
            marginHorizontal: vw(8),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            fontSize: normalize(16),
            color: Colors?.textBlack
        },
        AddCounterButton: {
            height: vh(30),
            width: vw(30),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(4),
            backgroundColor: Colors?.KFC_red,
        },
        AddCounterButtonFade: {
            height: vh(30),
            width: vw(30),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(4),
            backgroundColor: Colors?.KFC_red_Fade,
        },
        AddButtonImage: {
            height: vh(15),
            width: vw(15),
            tintColor: Colors?.constantWhite,
        },
        AddToCartButton: {
            backgroundColor: Colors?.KFC_red,
            borderRadius: normalize(4),
            marginHorizontal: vw(14),
            marginVertical: vh(14)
        },
        AddToCartButtonText: {
            color: Colors?.constantWhite,
            fontSize: normalize(10),
            marginHorizontal: vw(14),
            marginVertical: vh(10),
            fontFamily: Fonts?.headerRegular,
            fontWeight: 700
        },
        Favourite_Icon: {
            height: vh(20),
            width: vw(20),
            position: 'absolute',
            right: vw(15),
            top: vh(20),
            tintColor: Colors?.KFC_red
        },
    });
    return Styles;
};