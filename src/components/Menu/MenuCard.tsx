import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';
export default function MenuCard({
    id,
    name,
    description,
    price,
    oldPrice,
    tag,
    image,
    isFavorite,
    customizable,
    categories,
}: menuDataType) {
    const Colors = useThemeColors();
    const country = useCountry()
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { menuItem, setMenuItem } = useMenu();
    const { CartItem, setCartItem } = useCart();
    const itemInCart = CartItem.find((item) => item.name === name);
    const quantity = itemInCart ? itemInCart?.quantity : 0;
    const handleCartAdding = () => {
        const newItem: CartItemType = {
            id: id,
            name: name,
            description: description,
            price: price,
            oldPrice: oldPrice,
            tag: tag,
            image: image,
            isFavorite: isFavorite,
            customizable: customizable,
            categories: categories,
            quantity: quantity + 1,
        }
        if (CartItem.find((item) => item.name === newItem.name)) return;
        setCartItem((prev: CartItemType[]) => [...prev, newItem]);
    }
    const handleIncreaseQunatity = (name: string) => {
        if (quantity < 10) {
            setCartItem((prev: CartItemType[]) =>
                prev.map(item =>
                    item?.name == name
                        ? { ...item, quantity: item?.quantity + 1 }
                        : item
                )
            )
        } else return;

    }
    const handleDecreaseQuantity = () => {
        if (quantity >= 1) {
            setCartItem((prev: CartItemType[]) =>
                prev.map((item, idx) =>
                    item?.name == name
                        ? { ...item, quantity: item?.quantity - 1 }
                        : item
                )
            )
        } else return;
    }
    const handleRemoveItem = () => {
        if (quantity == 1) {
            setCartItem((prev: CartItemType[]) =>
                prev.filter(item =>
                    item?.name != name
                )
            )
        } else return;
    }
    const handleToggleFavourite = (id: number) => {
        setMenuItem((prev: menuDataType[]) =>
            prev.map(item =>
                item.id === id
                    ? { ...item, isFavorite: !item.isFavorite }
                    : item
            )
        );
    }
    let formattedQuantity = quantity <= 9 ? `0${quantity}` : quantity;
    return (
        <View style={Styles.CardContainer}>
            <View style={Styles.UpperContainer}>
                {tag && (
                    <View style={Styles.Tags}>
                        <Text style={Styles.TagText}>{tag} </Text>
                        <View style={Styles.ribbonTriangle} />
                    </View>
                )}

                <Image source={image} style={Styles.LeftfoodImage} />
                <View style={Styles.RightContainer}>
                    <View style={Styles.nameAndFavButton}>
                        <Text style={Styles.FoodName}>{name}</Text>
                        <TouchableOpacity
                            style={Styles.favIconContainer}
                            onPress={() => { handleToggleFavourite(id) }}
                        >
                            {isFavorite ? (
                                <Image source={Images?.Favourite_Icon} style={Styles.Favourite_Icon} />
                            ) : (
                                <Image source={Images?.Favourite_Icon_Empty} style={Styles.Favourite_Icon} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.DescriptionContainer}>
                        {description.map((item, idx) => (
                            <View key={idx} style={Styles.DotAndDescription}>
                                <View style={Styles.dot} />
                                <Text style={Styles.DescriptioText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                    {customizable && (
                        <TouchableOpacity
                            style={Styles.CustomizeContainer}
                            onPress={() => navigation.navigate(Strings?.FoodCustomizationScreen)}
                        >
                            <Text style={Styles.customizeText}>{Strings?.customize.toUpperCase()} </Text>
                            <Image source={Images?.back_arrow} style={Styles.backArrow} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={Styles.LowerContainer}>
                <View style={Styles.LowerLeftPriceContainer}>
                    <Text style={Styles.Price}>{price.toFixed(2)}</Text>
                    <Text style={Styles.Price}>{country?.countrySelected.currencyCode}</Text>
                    <View style={Styles.OldPriceContainer}>
                        <Text style={Styles.OldPrice}>{oldPrice.toFixed(2)}</Text>
                        <Text style={Styles.OldPrice}>{country?.countrySelected.currencyCode}</Text>
                        <View style={Styles.CrossBorder} />
                    </View>
                </View>
                {quantity === 0 ? (
                    <TouchableOpacity
                        onPress={() => handleCartAdding()}
                        style={Styles.AddToCartButton}
                    >
                        <Text style={Styles.AddToCartButtonText}>{Strings?.AddToCart.toUpperCase()} </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={Styles.AddedCartButtonContainer}>
                        {(quantity > 1) ?
                            <TouchableOpacity
                                style={Styles.deleteButtonContainer}
                                onPress={() => { handleDecreaseQuantity() }}
                            >
                                <Image source={Images?.Minus} style={Styles.deleteIcon} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={Styles.deleteButtonContainer}
                                onPress={() => { handleRemoveItem() }}
                            >
                                <Image source={Images?.Delete_Icon} style={Styles.deleteIcon} />
                            </TouchableOpacity>
                        }
                        <Text style={Styles.counter}>{formattedQuantity} </Text>
                        <TouchableOpacity
                            style={quantity < 10 ? Styles.AddCounterButton : Styles.AddCounterButtonFade}
                            onPress={() => handleIncreaseQunatity(name)}
                        >
                            <Image source={Images?.AddButton} style={Styles.AddButtonImage} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        CardContainer: {
            width: '100%',
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
            paddingTop: 5,
            marginLeft: 10,
        },
        nameAndFavButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
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
        CustomizeContainer: {
            position: 'relative',
            top: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
        },
        customizeText: {
            fontSize: 13,
            fontFamily: Fonts?.subHeader,
            color: Colors?.ButtonBlueColor,
            fontWeight: 700,
        },
        backArrow: {
            height: 12,
            width: 12,
            marginLeft: 2,
            transform: [{ rotate: '180deg' }],
            tintColor: Colors?.ButtonBlueColor,
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
        AddedCartButtonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 15,
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
            tintColor: Colors?.KFC_red
        },
        favIconContainer: { 
            marginRight: 15 
        }
    });
    return Styles;
};