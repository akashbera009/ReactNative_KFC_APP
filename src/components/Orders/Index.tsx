import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
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
import { useOrderQueue } from '../../context/OrderQueueContext';

export default function Index() {
  const Colors = useThemeColors();
  const Strings = useStrings();
  const inset = useSafeAreaInsets();
  const Styles = createDynamicStyles(Colors, Fonts);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { orderQueueItem} = useOrderQueue()
  const currentOrders = orderQueueItem.filter(item => item.status != "Delivered" && item.status != "Cancelled");
  const previousOrders = orderQueueItem.filter(item => item.status === "Delivered" || item.status === "Cancelled");

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
            {currentOrders.length > 0 && (
              <>
                <Text style={Styles.sectionTitle}>{Strings?.currentOrders}</Text>
                {currentOrders.map((order, index) => (
                  <OrderCards order={order} key={index} />
                ))}
              </>
            )}
            <View style={Styles.Divider} />
            {previousOrders.length > 0 && (
              <>
                <Text style={Styles.sectionTitle}>{Strings?.previousOrders}</Text>
                {previousOrders.map((order, index) => (
                  <OrderCards order={order} key={index} />
                ))}
              </>
            )}
            {(currentOrders.length == 0 && previousOrders.length == 0) && (
              <View style={Styles.EmptyCartContainer}>
                <View style={Styles.ImageContainer}>
                  <Image source={Images?.EmptyBox} style={Styles.EmptyBox} />
                </View>
                <Text style={Styles.NoOrdersYet}>{Strings.NoOrdersYet} </Text>
                <Text style={Styles.makeAorder}>{Strings?.makeAOrder} </Text>
                <TouchableOpacity
                  style={Styles.ExploreMenuButton}
                  onPress={() => { navigation.replace(Strings?.ExploreMenuScreen, {
                    categoryType : ''
                  }) }}
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
    CardContainer: {
      paddingHorizontal: 18,
      marginTop: 10
    },
    Divider: {
      marginTop: 5,
    },
    sectionTitle: {
      marginTop: 0,
      fontSize: 17,
      fontFamily: Fonts.subHeader,
      fontWeight: 600,
      color: Colors.textBlack,
      marginBottom: 8,
    },
    ScrollContainer: {
      height: '90%',
      backgroundColor: Colors?.bodyLigheterColor,
      paddingBottom: 40
    },
    ScrollView: {
    },
    EmptyCartContainer: {
      height: 700,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ImageContainer: {
      height: 200,
      width: 200,
      borderRadius: 400,
      backgroundColor: Colors?.ButtonTextBlueColor,
      opacity: .3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    EmptyBox: {
      height: 150,
      width: 150,
      opacity: 1,
      position: 'relative',
      top: 20
    },
    NoOrdersYet: {
      fontSize: 24,
      fontFamily: Fonts?.subHeader,
      color: Colors?.textBlack,
      fontWeight: 700,
      marginTop: 30
    },
    makeAorder: {
      fontSize: 14,
      color: Colors?.timerFadeText,
      fontFamily: Fonts?.font17,
      letterSpacing: 1,
      fontWeight: 500,
      marginTop: 20,
      marginBottom: 10
    },
    ExploreMenuButton: {
      backgroundColor: Colors?.KFC_red,
      borderRadius: 2,
      marginVertical: 10
    },
    ExploreMenu: {
      color: Colors?.constantWhite,
      fontSize: 16,
      fontFamily: Fonts?.font17,
      fontWeight: 700,
      marginHorizontal: 50,
      marginVertical: 15
    },
  });
  return Styles;
};