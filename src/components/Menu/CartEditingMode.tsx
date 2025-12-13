// import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// //redux
// import { RootState, useAppDispatch } from '../../store/store';
// import { useSelector } from 'react-redux';
// import { decreaseQuantity, increaseQuantity } from '../../features/cartSlice';
// // utils
// import Fonts from '../../utils/Fonts';
// import Images from '../../utils/LocalImages';
// import { useStrings } from '../../utils/Strings';
// import { useThemeColors } from '../../utils/Colors';
// // data imports 
// import { normalize, vh, vw } from '../../utils/Dimensions';
// import { useCountry } from '../../context/CountryContext';

// export const CartItemNotFound = ({discount, discountPercentage, offerCode}: CartScreenScreenProps) => {
//     const Colors = useThemeColors();
//     const Strings = useStrings();
//     const Styles = createDynamicStyles(Colors, Fonts);
//       const cartData = useSelector((state: RootState) => state.cart)
//  const cartItem = cartData?.cartItems
//     const { countrySelected } = useCountry();
//     const isOfferApplied = discount != 0 || discountPercentage != 0;
//     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//         const cartData = useSelector((state: RootState) => state.cart)
//     const [topOfferAppliedIndicator, setTopOfferAppliedIndicator] = useState(false);
//     const dispatch = useAppDispatch()
//     useEffect(() => {
//         if (isOfferApplied)
//             setTopOfferAppliedIndicator(true)
//     }, [isOfferApplied])
//     const handleIncreaseQuantity = (uid: string) => {
//         dispatch(increaseQuantity(uid))
//     }
//     const handleDelete = (uid: string, image: string) => {
//         navigation.push(Strings?.RemoveCartItemBottomSheetScreen, {
//             imageLink: image,
//             uid: uid,
//         })
//     }
//     const handleDecreaseQuantity = (uid: string) => {
//         dispatch(decreaseQuantity(uid))
//     }
//     return (
//                        <View style={Styles.EditingScrollView}>
//                     <ScrollView showsVerticalScrollIndicator={false} >
//                         {cartItem.map((item, idx) => (
//                             <View key={idx}
//                                 style={[Styles.EditingCardContainer]}>
//                                 <View style={Styles.EditingButtons}>
//                                     <View style={Styles.EditingButtonContainerWrapper}>
//                                         <TouchableOpacity
//                                             style={Styles.EditingButtonWrapper}>
//                                             <Image source={Images?.Edit_Icon} style={Styles.EditingIcons} />
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             onPress={() => handleDelete(item?.menuItemUid, item?.image)}
//                                             style={Styles.EditingButtonWrapper}>
//                                             <Image source={Images?.delete_Icon} style={Styles.EditingIcons} />
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                                 <View style={Styles.EditingRightMainContainer}>
//                                     <View style={Styles.EditUpperContainer}>
//                                         <Image src={item?.image} style={Styles.EditLeftfoodImage} />
//                                         <View style={Styles.EditRightContainer}>
//                                             <Text style={Styles.FoodName}>{item?.name}</Text>
//                                             <View style={Styles.EditModeDescriptionContainer}>
//                                                 {item?.description.map((item1, idx) => (
//                                                     <View key={idx} style={Styles.DotAndDescription}>
//                                                         <View style={Styles.dot} />
//                                                         <Text style={Styles.DescriptioText}>{item1}</Text>
//                                                     </View>
//                                                 ))}
//                                             </View>
//                                         </View>
//                                     </View>
//                                     <View style={Styles.EditLowerContainer}>
//                                         <View style={Styles.EditLowerLeftPriceContainer}>
//                                             <Text style={Styles.Price}>{item.price.toFixed(2)}</Text>
//                                             <Text style={Styles.Price}>{countrySelected.currencyCode}</Text>
//                                             <View style={Styles.OldPriceContainer}>
//                                                 <Text style={Styles.OldPrice}>{item?.oldPrice.toFixed(2)}</Text>
//                                                 <Text style={Styles.OldPrice}>{countrySelected.currencyCode}</Text>
//                                                 <View style={Styles.CrossBorder} />
//                                             </View>
//                                         </View>
//                                         <View style={Styles.EditModeAddedCartButtonContainer}>
//                                             {(item?.quantity == 1) ?
//                                                 <TouchableOpacity
//                                                     style={Styles.deleteButtonContainer}
//                                                     onPress={() => { handleDelete(item?.menuItemUid, item?.image) }}
//                                                 >
//                                                     <Image source={Images?.Delete_Icon} style={Styles.deleteIcon} />
//                                                 </TouchableOpacity>
//                                                 :
//                                                 <TouchableOpacity
//                                                     style={Styles.deleteButtonContainer}
//                                                     onPress={() => { handleDecreaseQuantity(item?.menuItemUid) }}
//                                                 >
//                                                     <Image source={Images?.Minus} style={Styles.deleteIcon} />
//                                                 </TouchableOpacity>
//                                             }

//                                             <Text style={Styles.counter}>{item?.quantity <= 9 ? `0${item?.quantity}` : item?.quantity} </Text>
//                                             <TouchableOpacity
//                                                 style={item?.quantity < 10 ? Styles.AddCounterButton : Styles.AddCounterButtonFade}
//                                                 onPress={() => { handleIncreaseQuantity(item?.menuItemUid) }}
//                                             >
//                                                 <Image source={Images?.AddButton} style={Styles.AddButtonImage} />
//                                             </TouchableOpacity>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         ))}
//                     </ScrollView>
//                 </View>
//     )
// }
// const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
//     const Styles = StyleSheet.create({
//           EditingScrollView: {
//             backgroundColor: Colors?.bodyLigheterColor,
//             height: '88%'
//         },
//         EditingCardContainer: {
//             width: '93%',
//             alignSelf: 'center',
//             backgroundColor: Colors?.bodyColor,
//             marginVertical: vh(6),
//             shadowColor: Colors?.blueShadows,
//             shadowOffset: { width: vw(2), height: vh(2) },
//             shadowOpacity: .4,
//             shadowRadius: normalize(10),
//             elevation: 5,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//         },
//         EditingButtons: {
//             height: '100%',
//             width: '20%',
//             backgroundColor: Colors?.bodyShadeColor,
//         },
//         EditingButtonContainerWrapper: {
//             position: 'absolute',
//             height: '100%',
//             width: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: 'column',
//             justifyContent: 'space-around',
//         },
//         EditingButtonWrapper: {
//             backgroundColor: Colors?.bodyColor,
//             borderRadius: normalize(2),
//             marginHorizontal: 'auto',
//             padding: normalize(10),
//         },
//         EditingIcons: {
//             height: vh(18),
//             width: vw(18),
//             tintColor: Colors?.textBlack
//         },
//         EditingRightMainContainer: {
//             width: '80%',
//         },
//     })
//     return Styles;
// };