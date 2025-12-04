import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// data import 
import DeliveryDetails from '../../data/DeliveryDetails'
// util imports 
import Fonts from '../../utils/Fonts'
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useOrderQueue } from '../../context/OrderQueueContext';

export default function orderQueueItem() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { orderQueueItem } = useOrderQueue()
  const currentOrder = orderQueueItem.filter((item) => item?.status == 'Being Prepared')[0]
  const ItemNames = currentOrder?.Items.map((item) => item?.name).join(',')

  return (
    <View style={Styles.ParentDeliveryContainer} >
      <Text style={Styles.Header}>{Strings?.CurrentOrder.toUpperCase()} </Text>
      <View style={Styles.WrapperContainer} >
        <View style={Styles.LeftTextContainer}>
          <View style={Styles.LeftTopContainer}>
            <Text style={Styles.orderIdText}>{Strings?.orderIdText}: </Text>
            <Text style={Styles.orderId}>{currentOrder?.orderId}</Text>
            <View style={Styles.VerticalBorder} />
            <Text style={Styles.date}>{currentOrder?.date}</Text>
          </View>
          <Text style={Styles.orderItem} numberOfLines={1}>{ItemNames}</Text>
          <Text style={Styles.beverages}>{DeliveryDetails?.beverages}</Text>
        </View>
        <TouchableOpacity
          style={Styles.trackButton}
          onPress={() => navigation.push(Strings?.OrderDetailsScreen, {
            order: currentOrder
          })}
        >
          <Text style={Styles.TrackOrderText}>{Strings?.trackOrder} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
    ParentDeliveryContainer: {
      width: '93%',
      alignSelf: 'center',
    },
    WrapperContainer: {
      width: '100%',
      height: 100,
      alignSelf: 'center',
      backgroundColor: Colors?.bodyColor,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: .25,
      shadowRadius: 5,
      elevation: 5,
    },
    LeftTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 15,
      width: '60%',
      height: '65%',
      marginTop: 10,
      justifyContent: 'space-around'
    },
    LeftTopContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    orderIdText: {
      color: Colors?.textFadeBlack2,
      fontFamily: Fonts?.subHeader,
      fontWeight: 600,
      fontSize: 13,
    },
    Header: {
      color: Colors?.textBlack,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: 14,
      marginVertical: 10
    },
    orderId: {
      fontSize: 13,
      color: Colors?.textBlack,
      fontWeight: 700,
      fontFamily: Fonts?.subHeader
    },
    date: {
      fontSize: 13,
      color: Colors?.textBlack,
      fontWeight: 600,
      fontFamily: Fonts?.subHeader
    },
    VerticalBorder: {
      height: '80%',
      width: 2,
      borderRightColor: Colors?.fadeBorder,
      borderRightWidth: 2,
      marginHorizontal: 4,
      marginVertical: 'auto'
    },
    orderItem: {
      fontSize: 12,
      color: Colors?.timerFadeText,
      fontWeight: 600,
    },
    beverages: {
      fontSize: 12,
      fontWeight: 600,
      color: Colors?.timerFadeText
    },
    trackButton: {
      backgroundColor: Colors?.KFC_red,
      marginHorizontal: 'auto',
      borderRadius: 4,
      marginRight: 15,
      fontSize: 12
    },
    TrackOrderText: {
      color: Colors?.constantWhite,
      paddingHorizontal: 8,
      paddingVertical: 6,
      fontWeight: 700,
      fontSize: 13,
      fontFamily: Fonts?.subHeader
    }
  })
  return Styles
}