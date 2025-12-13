import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom component imports 
import OrderCards from './OrderCards';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
// redux 
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/orderSlice';
import { AppDispatch, RootState } from '../../store/store';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function Index() {
  const Colors = useThemeColors();
  const Strings = useStrings();
  const inset = useSafeAreaInsets();
  const Styles = createDynamicStyles(Colors, Fonts);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])
  const ordersArray = useSelector((state: RootState) => state.orders);
  const previousOrders: OrderHistory[] = ordersArray?.orders?.filter(item => item?.status === Strings?.deliveredString || item?.status === Strings?.cancelledString)
  const currentOrders: OrderHistory[] = ordersArray?.orders?.filter(item => item?.status !== Strings?.deliveredString && item?.status !== Strings?.cancelledString)
  const sortedCrrentOrder = currentOrders.sort((a, b) => Number(b?.id) - Number(a?.id))
  const sortedPreviousOrder = previousOrders.sort((a, b) => Number(b?.id) - Number(a?.id))
  return (
    <View style={Styles?.Parent}>
      <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
        <View style={Styles.BackIconAndHeaderText}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
          >
            <Image source={Images?.back_arrow} style={Styles.BackIcon} />
          </TouchableOpacity>
          <Text style={Styles.headerText}>{Strings?.orderHistory} </Text>
        </View>
      </View>
      <View style={Styles.ScrollContainer}>
        <ScrollView
          style={Styles.ScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={Styles?.CardContainer}>
            {sortedCrrentOrder?.length > 0 && (
              <>
                <Text style={Styles.sectionTitle}>{Strings?.currentOrders}</Text>
                {sortedCrrentOrder?.map((order, index) => (
                  <OrderCards order={order} key={index} />
                ))}
              </>
            )}
            <View style={Styles.Divider} />
            {sortedPreviousOrder?.length > 0 && (
              <>
                <Text style={Styles.sectionTitle}>{Strings?.previousOrders}</Text>
                {sortedPreviousOrder?.map((order, index) => (
                  <OrderCards order={order} key={index} />
                ))}
              </>
            )}
            {(sortedCrrentOrder?.length == 0 && sortedPreviousOrder?.length == 0) && (
              <View style={Styles.EmptyCartContainer}>
                <View style={Styles.ImageContainer}>
                  <Image source={Images?.EmptyBox} style={Styles.EmptyBox} />
                </View>
                <Text style={Styles.NoOrdersYet}>{Strings.NoOrdersYet} </Text>
                <Text style={Styles.makeAorder}>{Strings?.makeAOrder} </Text>
                <TouchableOpacity
                  style={Styles.ExploreMenuButton}
                  onPress={() => {
                    navigation.replace(Strings?.ExploreMenuScreen, {
                      categoryType: ''
                    })
                  }}
                >
                  <Text style={Styles.ExploreMenu}>{Strings?.exploreMenu.toUpperCase()} </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
    Parent: {
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
    CardContainer: {
      paddingHorizontal: vw(18),
      marginTop: vh(10)
    },
    Divider: {
      marginTop: vh(5),
    },
    sectionTitle: {
      marginTop: vh(0),
      fontSize: normalize(17),
      fontFamily: Fonts.subHeader,
      fontWeight: 600,
      color: Colors.textBlack,
      marginBottom: vh(8),
    },
    ScrollContainer: {
      height: '90%',
      backgroundColor: Colors?.bodyLigheterColor,
      paddingBottom: vh(40)
    },
    ScrollView: {
    },
    EmptyCartContainer: {
      height: vh(700),
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ImageContainer: {
      height: vh(200),
      width: vw(200),
      borderRadius: normalize(400),
      backgroundColor: Colors?.ButtonTextBlueColor,
      opacity: .3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    EmptyBox: {
      height: vh(150),
      width: vw(150),
      opacity: 1,
      position: 'relative',
      top: vh(20)
    },
    NoOrdersYet: {
      fontSize: normalize(24),
      fontFamily: Fonts?.subHeader,
      color: Colors?.textBlack,
      fontWeight: 700,
      marginTop: vh(30)
    },
    makeAorder: {
      fontSize: normalize(14),
      color: Colors?.timerFadeText,
      fontFamily: Fonts?.font17,
      letterSpacing: normalize(1),
      fontWeight: 500,
      marginTop: vh(20),
      marginBottom: vh(10)
    },
    ExploreMenuButton: {
      backgroundColor: Colors?.KFC_red,
      borderRadius: normalize(2),
      marginVertical: vh(10)
    },
    ExploreMenu: {
      color: Colors?.constantWhite,
      fontSize: normalize(16),
      fontFamily: Fonts?.font17,
      fontWeight: 700,
      marginHorizontal: vw(50),
      marginVertical: vh(15)
    },
  });
  return Styles;
};