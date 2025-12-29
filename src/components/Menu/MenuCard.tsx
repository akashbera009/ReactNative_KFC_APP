import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// redux 
import { RootState, useAppDispatch } from '../../store/store';
import { toggleFavourite } from '../../features/favoriteSlice';
import { useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from '../../features/cartSlice';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function MenuCard({ foodItem }: { foodItem: menuDataType }) {
    const Colors = useThemeColors();
    const country = useCountry()
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const cartItem = useSelector((state: RootState) => state.cart)
    const itemInCart: CartItemType | undefined = cartItem?.cartItems?.find((item: CartItemType) => item?.menuItemUid === foodItem?.uid)
    const quantity: number = itemInCart ? itemInCart?.quantity : 0;
    const dispatch = useAppDispatch()
    const favouritelist = useSelector((state: RootState) => state.favourite)
    const handleCartAdding = () => {
        if (cartItem?.cartItems?.find((item: CartItemType) => item?.menuItemUid === foodItem?.uid)) return;
        const newItem: CartItemType = {
            cartUid: Date.now(),
            menuItemUid: foodItem?.uid,
            name: foodItem?.name,
            description: foodItem?.description,
            price: foodItem?.price,
            oldPrice: foodItem?.oldPrice,
            image: foodItem?.image,
            categories: foodItem?.categories,
            quantity: 1,
        }
        dispatch(addToCart(newItem))
    }
    const handleIncreaseQunatity = (uid: string): void => {
        if (quantity < 10) {
            dispatch(increaseQuantity(uid))
        } else return;
    }
    const handleDecreaseQuantity = (uid: string): void => {
        if (quantity >= 1) {
            dispatch(decreaseQuantity(uid))
        } else return;
    }
    const handleRemoveItem = (uid: string): void => {
        if (quantity === 1) {
            dispatch(removeFromCart(uid))
        } else return;
    }
    const handleToggleFavourite = (uid: string): void => {
        dispatch(toggleFavourite(uid))
    }
    const formattedQuantity: string = quantity <= 9 ? `0${quantity}` : `${quantity}`;

    return (
        <View style={Styles.CardContainer}>
            <View style={Styles.UpperContainer}>
                {foodItem?.tag && (
                    <View style={Styles.Tags}>
                        <Text style={Styles.TagText}>{foodItem?.tag} </Text>
                        <View style={Styles.ribbonTriangle} />
                    </View>
                )}
                <Image src={foodItem?.image} style={Styles.LeftfoodImage} />
                <View style={Styles.RightContainer}>
                    <View style={Styles.nameAndFavButton}>
                        <Text style={Styles.FoodName}>{foodItem?.name}</Text>
                        <TouchableOpacity
                            style={Styles.favIconContainer}
                            onPress={() => { handleToggleFavourite(foodItem?.uid) }}
                        >
                            {favouritelist?.favorites?.includes(foodItem?.uid) ? (
                                <Image source={Images.Favourite_Icon} style={Styles.Favourite_Icon} />
                            ) : (
                                <Image source={Images.Favourite_Icon_Empty} style={Styles.Favourite_Icon} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.DescriptionContainer}>
                        {foodItem?.description.map((item, idx) => (
                            <View key={idx} style={Styles.DotAndDescription}>
                                <View style={Styles.dot} />
                                <Text style={Styles.DescriptioText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                    {foodItem?.customizable && (
                        <TouchableOpacity
                            style={Styles.CustomizeContainer}
                            onPress={() => navigation.navigate(Strings.FoodCustomizationScreen, {
                                foodItem: foodItem
                            })}
                        >
                            <Text style={Styles.customizeText}>{Strings.customize.toUpperCase()} </Text>
                            <Image source={Images.back_arrow} style={Styles.backArrow} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={Styles.LowerContainer}>
                <View style={Styles.LowerLeftPriceContainer}>
                    <Text style={Styles.Price}>{foodItem?.price.toFixed(2)}</Text>
                    <Text style={Styles.Price}>{country?.countrySelected.currencyCode}</Text>
                    <View style={Styles.OldPriceContainer}>
                        <Text style={Styles.OldPrice}>{foodItem?.oldPrice.toFixed(2)}</Text>
                        <Text style={Styles.OldPrice}>{country?.countrySelected.currencyCode}</Text>
                        <View style={Styles.CrossBorder} />
                    </View>
                </View>
                {quantity === 0 ? (
                    <TouchableOpacity
                        onPress={() => handleCartAdding()}
                        style={Styles.AddToCartButton}
                    >
                        <Text style={Styles.AddToCartButtonText}>{Strings.AddToCart.toUpperCase()} </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={Styles.AddedCartButtonContainer}>
                        {(quantity > 1) ?
                            <TouchableOpacity
                                style={Styles.deleteButtonContainer}
                                onPress={() => { handleDecreaseQuantity(foodItem?.uid) }}
                            >
                                <Image source={Images.Minus} style={Styles.deleteIcon} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={Styles.deleteButtonContainer}
                                onPress={() => { handleRemoveItem(foodItem?.uid) }}
                            >
                                <Image source={Images.Delete_Icon} style={Styles.deleteIcon} />
                            </TouchableOpacity>
                        }
                        <Text style={Styles.counter}>{formattedQuantity} </Text>
                        <TouchableOpacity
                            style={quantity < 10 ? Styles.AddCounterButton : Styles.AddCounterButtonFade}
                            onPress={() => handleIncreaseQunatity(foodItem?.uid)}
                        >
                            <Image source={Images.AddButton} style={Styles.AddButtonImage} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        CardContainer: {
            width: '100%',
            alignSelf: 'center',
            backgroundColor: Colors.bodyColor,
            marginVertical: vh(6),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: .4,
            shadowRadius: normalize(5),
            elevation: 5,
        },
        Tags: {
            position: 'absolute',
            top: vh(5),
            left: vw(5),
            backgroundColor: Colors.activeBorder,
            borderTopLeftRadius: normalize(2),
            borderTopRightRadius: normalize(2),
        },
        TagText: {
            fontSize: normalize(9),
            marginLeft: vw(5),
            marginRight: vw(14),
            marginVertical: vh(3),
            color: Colors.constantWhite,
            fontFamily: Fonts.helveticaMedium
        },
        ribbonTriangle: {
            position: 'absolute',
            top: vh(0),
            right: vw(0),
            width: vw(0),
            height: vh(0),
            borderTopWidth: normalize(10),
            borderBottomWidth: normalize(10),
            borderLeftWidth: normalize(8),
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: Colors.bodyColor,
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
            height: vh(120),
            width: vw(120),
            marginVertical: vh(15),
            marginTop: vh(25),
            marginLeft: vw(15)
        },
        RightContainer: {
            width: '60%',
            paddingTop: vh(5),
            marginLeft: vw(10),
        },
        nameAndFavButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        FoodName: {
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaBold,
            marginVertical: vh(10),
            color: Colors.textBlack
        },
        DescriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            marginLeft: vw(1)
        },
        DotAndDescription: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: vh(4)
        },
        dot: {
            margin: normalize(5),
            height: vh(4),
            width: vw(4),
            borderRadius: normalize(20),
            backgroundColor: Colors.textFadeBlack,
        },
        DescriptioText: {
            fontFamily: Fonts.helveticaMedium,
            color: Colors.timerFadeText,
            fontSize: normalize(11),
            marginRight: vw(5),
        },
        CustomizeContainer: {
            position: 'relative',
            top: vh(10),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: vh(10)
        },
        customizeText: {
            fontSize: normalize(13),
            fontFamily: Fonts.helveticaBold,
            color: Colors.ButtonBlueColor,
        },
        backArrow: {
            height: vh(12),
            width: vw(12),
            marginLeft: vw(2),
            transform: [{ rotate: '180deg' }],
            tintColor: Colors.ButtonBlueColor,
        },
        LowerContainer: {
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
            marginHorizontal: vw(20)
        },
        Price: {
            fontSize: normalize(15),
            fontFamily: Fonts.helveticaBold,
            marginHorizontal: vw(2),
            color: Colors.textBlack,
        },
        OldPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: vw(4)
        },
        OldPrice: {
            fontSize: normalize(13),
            fontFamily: Fonts.helveticaMedium,
            marginHorizontal: vw(2),
            color: Colors.textFadeBlack,
        },
        CrossBorder: {
            width: '100%',
            borderBottomColor: Colors.textFadeBlack,
            borderBottomWidth: normalize(2),
            position: 'absolute',
            top: vh(8),
            left: vw(0),
        },
        AddedCartButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: vw(20),
            marginVertical: vh(15),
        },
        deleteButtonContainer: {
            borderWidth: normalize(1),
            borderColor: Colors.fadeBorder,
            borderRadius: normalize(4),
            padding: normalize(4)
        },
        deleteIcon: {
            height: vh(20),
            width: vw(20),
            tintColor: Colors.textBlack
        },
        counter: {
            marginHorizontal: vw(8),
            fontFamily: Fonts.helveticaBold,
            fontSize: normalize(16),
            color: Colors.textBlack
        },
        AddCounterButton: {
            height: vh(30),
            width: vw(30),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(4),
            backgroundColor: Colors.KFC_red,
        },
        AddCounterButtonFade: {
            height: vh(30),
            width: vw(30),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(4),
            backgroundColor: Colors.KFC_red_Fade,
        },
        AddButtonImage: {
            height: vh(15),
            width: vw(15),
            tintColor: Colors.constantWhite,
        },
        AddToCartButton: {
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(4),
            marginHorizontal: vw(14),
            marginVertical: vh(14)
        },
        AddToCartButtonText: {
            color: Colors.constantWhite,
            fontSize: normalize(10),
            marginHorizontal: vw(14),
            marginVertical: vh(10),
            fontFamily: Fonts.helveticaBold,
        },
        Favourite_Icon: {
            height: vh(20),
            width: vw(20),
            tintColor: Colors.KFC_red
        },
        favIconContainer: {
            marginRight: vw(15)
        }
    });
    return Styles;
};