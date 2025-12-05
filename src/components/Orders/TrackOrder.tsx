import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';

// data imports
import { stores } from '../../data/StoresData';
// util imports 
import Fonts from '../../utils/Fonts'
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';
import Images from '../../utils/LocalImages';
export default function TrackOrder({ currentOrder, orderId, grandTotal }: TrackOrderScreenProps) {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inset = useSafeAreaInsets()
  const { countrySelected } = useCountry()
  // maps 
  const [location, setLocation] = useState(
    {
      latitude: 26.849658837614005,
      longitude: 75.80045046009853,
    });
  const initialRegion = {
    latitude: (location.latitude + stores[0].latitude) / 2,
    longitude: (location.longitude + stores[0].longitude) / 2,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const getArcCoordinates = (start: any, end: any) => {
    const curveHeight = 0.015;
    const control = {
      latitude: (start.latitude + end.latitude) / 2 + curveHeight,
      longitude: (start.longitude + end.longitude) / 2,
    };
    const points = [];
    const numPoints = 50;
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const lat =
        (1 - t) * (1 - t) * start.latitude +
        2 * (1 - t) * t * control.latitude +
        t * t * end.latitude;
      const lng =
        (1 - t) * (1 - t) * start.longitude +
        2 * (1 - t) * t * control.longitude +
        t * t * end.longitude;
      points.push({ latitude: lat, longitude: lng });
    }
    return points;
  };

  const curvePoints = getArcCoordinates(
    { latitude: stores[0].latitude, longitude: stores[0].longitude },
    { latitude: location.latitude, longitude: location.longitude }
  );
const handleRefresh=()=>{
  
}
  return (
    <View style={Styles?.Parent}>
      <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
        <View style={Styles.BackIconAndHeaderText}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
          >
            <Image source={Images?.back_arrow} style={Styles.BackIcon} />
          </TouchableOpacity>
          <Text style={Styles.headerText}>{Strings?.trackOrder} </Text>
        </View>
        <TouchableOpacity
        onPress={handleRefresh}
          style={Styles.editButton}
        >
          <Text style={Styles.editbuttonFadeText}>{Strings?.refresh.toUpperCase()} </Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.ScrollWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={Styles.MapContainer}>
            <MapView
              style={Styles.map}
              initialRegion={initialRegion}>
              <Marker coordinate={location} title='You are here' />
              <Marker
                coordinate={{
                  latitude: stores[0].latitude,
                  longitude: stores[0].longitude
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={Images.KFC_logo_image}
                    style={{ width: 40, height: 40, resizeMode: "contain" }}
                  />
                </View>
              </Marker>
              <Polyline
                coordinates={curvePoints}
                strokeColor={Colors?.KFC_red}
                strokeWidth={3}
                lineCap="round"
                lineJoin="round"
              />

            </MapView>
          </View>
          <View style={Styles.OrderCard}>
            <View style={Styles.OrderLeft}>
              <Image source={Images.KFC_logo_image} style={Styles.orderLogo} />
              <View>
                <Text style={Styles.orderIdText}>
                  {Strings.orderNo.toUpperCase()}. {orderId}
                </Text>
                <Text style={Styles.codText}>
                  {Strings.cod.toUpperCase()} :  {grandTotal} {countrySelected?.currencyCode}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={Styles.detailsButton}>
              <Text style={Styles.detailsButtonText}>{Strings.details.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <Text style={Styles.currentStatusHeading}>{Strings.currentStatus.toUpperCase()}</Text>
          <View style={Styles.statusRow}>
            <Image source={Images.PopCornCup} style={Styles.statusIcon} />
            <View style={Styles.statusTextWrapper}>
              <Text style={Styles.statusTitle}>{Strings?.orderConfired}</Text>
              <View style={Styles.statusBadgeDone}>
                <Text style={Styles.statusBadgeText}>{Strings?.done.toUpperCase()}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.statusRow}>
            <Image source={Images.OvenIcon} style={Styles.statusIcon} />
            <View style={Styles.statusTextWrapper}>
              <Text style={Styles.statusTitle}>{Strings?.beingPrepared}</Text>
              <Text style={Styles.statusSubtitle}>{Strings?.foodPrepared}</Text>
            </View>
          </View>
          <View style={Styles.statusRow}>
            <Image source={Images.DeliveryBike} style={[Styles.statusIcon, Styles.fadeImage]} />
            <View style={Styles.statusTextWrapper}>
              <Text style={[Styles.statusTitle, Styles.fadeText]}>{Strings?.onTheWay}</Text>
              <View style={Styles.statusBadgeNext}>
                <Text style={Styles.statusBadgeNextText}>{Strings?.next.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
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
    editButton: {
      borderWidth: 1,
      borderColor: Colors?.textBlack,
      borderRadius: 2,
      marginHorizontal: 16,
    },
    editbuttonFadeText: {
      color: Colors?.textBlack,
      fontFamily: Fonts?.font17,
      fontSize: 12,
      fontWeight: 700,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    ScrollWrapper: {
      height: '88%',
      backgroundColor: Colors?.bodyLigheterColor
    },
    MapContainer: {
    },
    map: {
      height: 350,
    },
    image: {
      height: 20,
      width: 20,
    },
    OrderCard: {
      backgroundColor: Colors.bodyShadeColor,
      marginTop: 10,
      marginHorizontal: 16,
      borderRadius: 8,
      padding: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    OrderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderLogo: {
      width: 45,
      height: 45,
      resizeMode: 'contain',
      marginRight: 12,
    },
    orderIdText: {
      fontFamily: Fonts.subHeader,
      fontSize: 14,
      color: Colors.textBlack,
      fontWeight: 700,
    },
    codText: {
      fontFamily: Fonts.font17,
      fontSize: 14,
      marginTop: 4,
      color: Colors.textBlack,
    },
    detailsButton: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: Colors.KFC_red,
      borderRadius: 4,
    },
    detailsButtonText: {
      color: Colors?.textBlack,
      fontWeight: 600,
      fontFamily: Fonts?.font17,
      fontSize: 10,
    },
    currentStatusHeading: {
      marginTop: 20,
      marginLeft: 20,
      fontFamily: Fonts.subHeader,
      fontSize: 10,
      fontWeight: 700,
      color: Colors.KFC_red,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18,
      marginHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.fadeBorder,
    },
    statusIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginRight: 18,
    },
    fadeImage: {
      opacity: .5
    },
    fadeText: {
      color: Colors?.timerFadeText
    },
    statusTextWrapper: {
      flex: 1,
    },
    statusTitle: {
      fontFamily: Fonts.subHeader,
      fontSize: 16,
      color: Colors.textBlack,
      fontWeight: 700,
    },
    statusSubtitle: {
      fontFamily: Fonts.font17,
      marginTop: 4,
      fontSize: 14,
      color: Colors.timerFadeText,
    },
    statusBadgeDone: {
      backgroundColor: Colors.KFC_red,
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 2,
      alignSelf: 'flex-start',
      marginTop: 4,
    },
    statusBadgeText: {
      color: Colors.constantWhite,
      fontSize: 12,
      fontFamily: Fonts.font17,
      fontWeight: 700,
    },
    statusBadgeNext: {
      backgroundColor: Colors?.blueShadows,
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 2,
      alignSelf: 'flex-start',
      marginTop: 4,
    },
    statusBadgeNextText: {
      fontSize: 12,
      fontWeight: 700,
      color: Colors.constantWhite,
    },

  })
  return Styles
}