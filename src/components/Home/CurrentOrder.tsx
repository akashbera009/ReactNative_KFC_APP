import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// data import 
import { DeliveryDetails } from '../../data/DeliveryDetails'
// util imports 
import Fonts from '../../utils/Fonts'
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
// redux 
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// utils
import { selectCurrentOrder } from '../../features/getCurrentOrder';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function CurrentOrder() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentOrder = useSelector<RootState, OrderHistory | null>(selectCurrentOrder)
  const ItemNames = currentOrder?.Items.map((item: CartItemType) => item?.name).join(',') ?? ''
  return (
    <View style={Styles.ParentDeliveryContainer} >
      <Text style={Styles.Header}>{Strings.CurrentOrder.toUpperCase()} </Text>
      <View style={Styles.WrapperContainer} >
        <View style={Styles.LeftTextContainer}>
          <View style={Styles.LeftTopContainer}>
            <Text style={Styles.orderIdText}>{Strings.orderIdText}: </Text>
            <Text style={Styles.orderId}>{currentOrder?.orderId}</Text>
            <View style={Styles.VerticalBorder} />
            <Text style={Styles.date}>{currentOrder?.date}</Text>
          </View>
          <Text style={Styles.orderItem} numberOfLines={1}>{ItemNames}</Text>
          <Text style={Styles.beverages}>{DeliveryDetails?.beverages}</Text>
        </View>
        <TouchableOpacity
          style={Styles.trackButton}
          onPress={() => navigation.push(Strings.OrderDetailsScreen, {
            order: currentOrder
          })}>
          <Text style={Styles.TrackOrderText}>{Strings.trackOrder} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const createDynamicStyles = (Colors: ColorType) => {
  const Styles = StyleSheet.create({
    ParentDeliveryContainer: {
      marginHorizontal: vw(15),
      alignSelf: 'center',
    },
    WrapperContainer: {
      width: '100%',
      height: vh(100),
      alignSelf: 'center',
      backgroundColor: Colors.bodyColor,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(2),
      shadowColor: Colors.blueShadows,
      shadowOffset: { width: vw(0), height: vh(4) },
      shadowOpacity: normalize(.25),
      shadowRadius: normalize(5),
      elevation: normalize(5),
    },
    LeftTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: vw(15),
      width: vw(240),
      height: vh(70),
      marginTop: vh(0),
      justifyContent: 'space-around',
    },
    LeftTopContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    orderIdText: {
      color: Colors.textFadeBlack2,
      fontFamily: Fonts.font17,
      fontSize: normalize(13),
    },
    Header: {
      color: Colors.textBlack,
      fontFamily: Fonts.font18,
      fontSize: normalize(14),
      marginVertical: vw(10),
    },
    orderId: {
      fontSize: normalize(13),
      color: Colors.textBlack,
      fontFamily: Fonts.font18,
      letterSpacing: normalize(.1),
    },
    date: {
      fontSize: normalize(13),
      color: Colors.textBlack,
      fontFamily: Fonts.font17,
      letterSpacing: normalize(.1),
    },
    VerticalBorder: {
      height: '80%',
      width: vw(2),
      borderRightColor: Colors.fadeBorder,
      borderRightWidth: normalize(2),
      marginHorizontal: vw(4),
      marginVertical: 'auto'
    },
    orderItem: {
      fontSize: normalize(12),
      color: Colors.timerFadeText,
      fontFamily: Fonts.font17
    },
    beverages: {
      fontSize: normalize(12),
      color: Colors.timerFadeText,
      fontFamily: Fonts.font17
    },
    trackButton: {
      backgroundColor: Colors.KFC_red,
      marginHorizontal: 'auto',
      borderRadius: normalize(4),
      marginRight: vw(15),
      fontSize: normalize(12)
    },
    TrackOrderText: {
      color: Colors.constantWhite,
      paddingHorizontal: vw(8),
      paddingVertical: vh(6),
      fontSize: normalize(13),
      fontFamily: Fonts.font18,
    }
  })
  return Styles
}