import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//maps
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// data imports
import { stores } from '../../data/StoresData';
// util imports 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function TrackOrder({ currentOrder, orderId, grandTotal }: TrackOrderScreenProps) {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inset = useSafeAreaInsets()
  const { countrySelected } = useCountry()
  // maps 
  const [location, setLocation] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  const getCurrentLocation = async (): Promise<void> => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude
        })
      },
      error => console.log('error', error),
      {
        enableHighAccuracy: true,
        timeout: 15000
      }
    )
  };
  useEffect((): void => {
    getCurrentLocation()
  }, [])

  const initialRegion: Coordinate & {
    latitudeDelta: number;
    longitudeDelta: number;
  } = {
    latitude: (location.latitude + stores[0].latitude) / 2,
    longitude: (location.longitude + stores[0].longitude) / 2,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const getArcCoordinates = (start: Coordinate, end: Coordinate): Coordinate[] => {
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

  const curvePoints: Coordinate[] = getArcCoordinates(
    { latitude: stores[0].latitude, longitude: stores[0].longitude },
    { latitude: location.latitude, longitude: location.longitude }
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCurrentLocation();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={Styles?.Parent}>
      <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
        <View style={Styles.BackIconAndHeaderText}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
          >
            <Image source={Images.back_arrow} style={Styles.BackIcon} />
          </TouchableOpacity>
          <Text style={Styles.headerText}>{Strings.trackOrder} </Text>
        </View>
        <TouchableOpacity
          onPress={onRefresh}
          style={Styles.editButton}
        >
          <Text style={Styles.editbuttonFadeText}>{Strings.refresh.toUpperCase()} </Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.ScrollWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={Styles.MapContainer}>
            <MapView
              style={Styles.map}
              initialRegion={initialRegion}
              provider={PROVIDER_GOOGLE} >
              <Marker
                coordinate={location}
                title={Strings.youreHere} />
              <Marker
                coordinate={{
                  latitude: stores[0].latitude,
                  longitude: stores[0].longitude
                }}
                description={Strings.partnerComing}
              >
                <View style={Styles.kfcImageContainer}>
                  <Image
                    source={Images.KFC_logo_image}
                    style={Styles.kfcImage}
                  />
                </View>
              </Marker>
              <Polyline
                coordinates={curvePoints}
                strokeColor={Colors.KFC_red}
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
              onPress={() => navigation.push(Strings.OrderDetailsScreen,
                { order: currentOrder }
              )
              }
              style={Styles.detailsButton}>
              <Text style={Styles.detailsButtonText}>{Strings.details.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <Text style={Styles.currentStatusHeading}>{Strings.currentStatus.toUpperCase()}</Text>
          <View style={Styles.statusRow}>
            <Image source={Images.PopCornCup} style={Styles.statusIcon} />
            <View style={Styles.statusTextWrapper}>
              <Text style={Styles.statusTitle}>{Strings.orderConfired}</Text>
              <View style={Styles.statusBadgeDone}>
                <Text style={Styles.statusBadgeText}>{Strings.done.toUpperCase()}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.statusRow}>
            <Image source={Images.OvenIcon} style={Styles.statusIcon} />
            <View style={Styles.statusTextWrapper}>
              <Text style={Styles.statusTitle}>{Strings.beingPrepared}</Text>
              <Text style={Styles.statusSubtitle}>{Strings.foodPrepared}</Text>
            </View>
          </View>
          <View style={Styles.statusRow}>
            <Image source={Images.DeliveryBike} style={[Styles.statusIcon, Styles.fadeImage]} />
            <View style={Styles.statusTextWrapper}>
              <Text style={[Styles.statusTitle, Styles.fadeText]}>{Strings.onTheWay}</Text>
              <View style={Styles.statusBadgeNext}>
                <Text style={Styles.statusBadgeNextText}>{Strings.next.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View >
    </View >
  )
}
const createDynamicStyles = (Colors: ColorType) => {
  const Styles = StyleSheet.create({
    Parent: {
      backgroundColor: Colors.bodyColor,
    },
    NavWrapper: {
      width: '100%',
      backgroundColor: Colors.bodyColor,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      paddingBottom: vh(15),
    },
    headerText: {
      fontSize: normalize(20),
      fontFamily: Fonts.helveticaBold,
      color: Colors.textBlack
    },
    BackIconAndHeaderText: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    BackIcon: {
      tintColor: Colors.textBlack,
      height: vh(18),
      width: vw(18),
      alignSelf: 'flex-start',
      marginHorizontal: vw(18),
    },
    editButton: {
      borderWidth: normalize(1),
      borderColor: Colors.textBlack,
      borderRadius: normalize(2),
      marginHorizontal: vw(16),
    },
    editbuttonFadeText: {
      color: Colors.textBlack,
      fontFamily: Fonts.helveticaBold,
      fontSize: normalize(12),
      marginHorizontal: vw(10),
      marginVertical: vh(5),
    },
    ScrollWrapper: {
      height: '88%',
      backgroundColor: Colors.bodyLigheterColor
    },
    MapContainer: {
    },
    map: {
      height: vh(350),
    },
    kfcImageContainer: {
      alignItems: "center"
    },
    kfcImage: {
      width: vw(40),
      height: vh(40),
      resizeMode: "contain"
    },
    image: {
      height: vh(20),
      width: vw(20),
    },
    OrderCard: {
      backgroundColor: Colors.bodyShadeColor,
      marginTop: vh(10),
      marginHorizontal: vw(16),
      borderRadius: normalize(8),
      padding: normalize(14),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    OrderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderLogo: {
      width: vw(45),
      height: vh(45),
      resizeMode: 'contain',
      marginRight: vw(12),
    },
    orderIdText: {
      fontFamily: Fonts.helveticaMedium,
      fontSize: normalize(14),
      color: Colors.textBlack,
    },
    codText: {
      fontFamily: Fonts.helveticaMedium,
      fontSize: normalize(14),
      marginTop: vh(4),
      color: Colors.textBlack,
    },
    detailsButton: {
      paddingHorizontal: vw(16),
      paddingVertical: vh(6),
      borderWidth: normalize(1),
      borderColor: Colors.KFC_red,
      borderRadius: normalize(4),
    },
    detailsButtonText: {
      color: Colors.textBlack,
      fontFamily: Fonts.helveticaMedium,
      fontSize: normalize(10),
    },
    currentStatusHeading: {
      marginTop: vh(20),
      marginLeft: vw(20),
      fontFamily: Fonts.helveticaBold,
      fontSize: normalize(10),
      color: Colors.KFC_red,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: vh(18),
      marginHorizontal: vw(16),
      borderBottomWidth: normalize(1),
      borderBottomColor: Colors.fadeBorder,
    },
    statusIcon: {
      width: vw(40),
      height: vh(40),
      resizeMode: 'contain',
      marginRight: vw(18),
    },
    fadeImage: {
      opacity: .5
    },
    fadeText: {
      color: Colors.timerFadeText
    },
    statusTextWrapper: {
      flex: 1,
    },
    statusTitle: {
      fontFamily: Fonts.helveticaBold,
      fontSize: normalize(16),
      color: Colors.textBlack,
    },
    statusSubtitle: {
      fontFamily: Fonts.helveticaMedium,
      marginTop: vh(4),
      fontSize: normalize(14),
      color: Colors.timerFadeText,
    },
    statusBadgeDone: {
      backgroundColor: Colors.KFC_red,
      borderRadius: normalize(4),
      paddingHorizontal: vw(10),
      paddingVertical: vh(2),
      alignSelf: 'flex-start',
      marginTop: vh(4),
    },
    statusBadgeText: {
      color: Colors.constantWhite,
      fontSize: normalize(12),
      fontFamily: Fonts.helveticaMedium,
    },
    statusBadgeNext: {
      backgroundColor: Colors.blueShadows,
      borderRadius: normalize(4),
      paddingHorizontal: vw(10),
      paddingVertical: vh(2),
      alignSelf: 'flex-start',
      marginTop: vh(4),
    },
    statusBadgeNextText: {
      fontSize: normalize(12),
      fontFamily: Fonts.helveticaBold,
      color: Colors.constantWhite,
    },
  })
  return Styles
}