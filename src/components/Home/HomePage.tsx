import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Platform } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// external imports 
import { RadialGradient } from 'react-native-gradients';
// custom component imports 
import CurrentOrder from './CurrentOrder';
import BestSeller from './BestSeller';
// util imports
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import DeliveryDetails from '../../data/DeliveryDetails';
import VideoPlayerComponent from './VideoPlayer';

// player imports 
export default function HomePage() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
 
  const colorList: { offset: string, color: string, opacity: string }[] = [
    { offset: '0%', color: Colors?.orangeColorText, opacity: '1' },
    { offset: '40%', color: Colors?.orangeColorText, opacity: '1' },
    { offset: '100%', color: Colors?.KFC_red, opacity: '1' },
  ]
  return (
    <View style={Styles.ParentContaine}>
      <View style={Styles.menuButtonContainer}>
        <TouchableOpacity
          activeOpacity={.5}
          onPress={() => { drawerNavigation.toggleDrawer() }}
        >
          <Image source={Images?.Menu} style={[Styles.menuIcon, { top: inset.top }, Platform.OS == 'android' && Styles.AndroidHeight]} />
        </TouchableOpacity>
      </View>
      <ScrollView >
        <View style={Styles.BlankCover} />
        <View style={Styles.gradientBg}>
          <RadialGradient x="50%" y="50%" rx="50%" ry="50%" colorList={colorList} />
        </View>
        <View style={[Styles.ImagesAndAddressContainer, Platform.OS == 'android' && Styles.AndroidHeight]}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Strings?.SplashScreen)}
          >
            <Text style={[Styles.HeaderKFC, { marginTop: inset.top - 15 }]}> {Strings?.KFC}</Text>
          </TouchableOpacity>
          <Image source={Images?.Home_Page_Main_Image} style={Styles.HomePageMainImage} />
          <View style={Styles.AddressContainer}>
            <Image source={Images.Location} style={Styles.locationIcon} />
            <View style={Styles.DeliveryTextContainer}>
              <View style={Styles.upperDeliveryContainer}>
                <Text style={Styles.DeliveryTo}>{Strings?.deliveryTo.toUpperCase()} - </Text>
                <Text style={Styles.DeliveryType}>{DeliveryDetails?.type.toUpperCase()} </Text>
              </View>
              <Text style={Styles.DeliveryAddress} numberOfLines={1}>{DeliveryDetails?.address} </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Strings?.ChangeLocationBottomSheetScreen)}
              style={Styles.RightSideButton}>
              <Text style={Styles.changeText}>{Strings?.change} </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[Styles.LowerScrollContainer, { marginBottom: inset.bottom + 10 }]}>
          <View style={Styles.ExploreContainer}>
            <View style={Styles.headerExplore}>
              <Text style={Styles.ExploreHeader}>{Strings?.exploreMore.toUpperCase()} </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExploreMenuScreen')}
              >
                <Text style={Styles.ExploreHeaderViewAll}>{Strings?.viewAll.toUpperCase()} </Text>
              </TouchableOpacity>
            </View>
            <View style={Styles.ExploreCardsContainer}>
              <View style={Styles.FirstCard}>
                <Text style={[Styles.ExploreCardText, Styles.FirstCardtext]}>{Strings?.deals.toUpperCase()} </Text>
                <Image source={Images?.Chicken_Bucket} style={Styles.FirstCardImage} />
              </View>
              <View style={Styles.SecondCardGroup}>
                <View style={Styles.SecondCardTop}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2}>{Strings?.forOne.toUpperCase()} </Text>
                  <Image source={Images?.Chicken_Nugedts} style={[Styles.SecondCardImage, Styles.RotateImage]} />
                </View>
                <View style={Styles.SecondCardDown}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2} >{Strings?.sideDeserts.toUpperCase()} </Text>
                  <Image source={Images?.French_Fries_Coke} style={Styles.SecondCardImage} />
                </View>
              </View>
              <View style={Styles.ThirdCardGroup}>
                <View style={Styles.ThirdCardTop}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2} >{Strings?.forSharing.toUpperCase()} </Text>
                  <Image source={Images?.Chicken_Roll} style={[Styles.ThirdCardImage, Styles.ThirdCardTopExtra]} />
                </View>
                <View style={Styles.ThirdCardDown}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2}>{Strings?.beverages.toUpperCase()} </Text>
                  <Image source={Images?.Pepsi_Double_Can} style={Styles.ThirdCardImage} />
                </View>
              </View>
            </View>
          </View>
          <CurrentOrder />
          <BestSeller />
          <View style={Styles.FavouriteContainer}>
            <View style={Styles.ThreeColumnStyle}>
              <View style={[Styles.singleCOlumnStyle, { backgroundColor: Colors?.constantWhite }]} />
              <View style={[Styles.singleCOlumnStyle, { backgroundColor: Colors?.constantWhite }]} />
              <View style={[Styles.singleCOlumnStyle, { backgroundColor: Colors?.constantWhite }]} />
            </View>
            <View style={Styles.LefttextContainer}>
              <Text style={Styles.favourites}>{Strings?.favourites.toUpperCase()} </Text>
              <Text style={Styles.OrderFromList} numberOfLines={2}>{Strings?.orderFromList} </Text>
              <TouchableOpacity
                style={Styles.OrderNowButton}
                onPress={() => { }}
              >
                <Text style={Styles.orderNowButtonText}>{Strings?.orderNow.toUpperCase()} </Text>
                <Image source={Images?.back_arrow} style={Styles.BackArrow} />
              </TouchableOpacity>
            </View>
            <Image source={Images?.Favourite_Combo_Pack} style={Styles.Favourite_Combo_Pack} />
          </View>
<VideoPlayerComponent/>
        </View>
      </ScrollView >
    </View>
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
    ParentContaine: {
      backgroundColor: Colors?.bodyColor,
    },
    BlankCover: {
      width: '100%',
      height: 440,
    },
    menuButtonContainer: {
      position: 'absolute',
      left: 20,
      zIndex: 999
    },
    menuIcon: {
      height: 25,
      width: 25,
      tintColor: Colors?.constantWhite,
    },
    gradientBg: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: 440,
    },
    ImagesAndAddressContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    AndroidHeight: {
      marginTop: 30
    },
    HeaderKFC: {
      fontSize: 50,
      fontWeight: 900,
      color: Colors?.constantWhite,
      fontFamily: Fonts?.kfcLogoTextFont,
    },
    HomePageMainImage: {
      height: 230,
      width: 230,
      alignSelf: 'center'
    },
    AddressContainer: {
      height: 60,
      width: '90%',
      marginTop: 20,
      alignSelf: 'center',
      backgroundColor: Colors?.bodyColor,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      height: 22,
      width: 22,
      margin: 10,
      marginLeft: 20,
      tintColor: Colors?.textBlack,
    },
    DeliveryTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '75%',
      justifyContent: 'space-around'
    },
    upperDeliveryContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    DeliveryTo: {
      fontWeight: 700,
      color: Colors?.textFadeBlack,
      fontFamily: Fonts?.subHeader,
    },
    DeliveryType: {
      fontWeight: 700,
      fontFamily: Fonts?.subHeader,
      color: Colors?.textBlack,
    },
    DeliveryAddress: {
      width: 210,
      overflow: 'hidden',
      marginRight: 15,
      fontWeight: 600,
      color: Colors?.textFadeBlack,
    },
    RightSideButton: {
      borderWidth: 1,
      borderColor: Colors?.timerText,
      borderRadius: 4,
    },
    changeText: {
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: 11,
      paddingHorizontal: 6,
      paddingVertical: 4,
      color: Colors?.textBlack,
    },
    LowerScrollContainer: {
      position: 'relative',
      zIndex: 3,
      backgroundColor: Colors?.bodyLigheterColor,
    },
    ExploreContainer: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 15
    },
    headerExplore: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ExploreHeader: {
      color: Colors?.textBlack,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: 14
    },
    ExploreHeaderViewAll: {
      color: Colors?.textFadeBlack,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: 12
    },
    ExploreCardsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignSelf: 'center',
      marginTop: 10,
    },
    FirstCard: {
      height: 260,
      width: 110,
      backgroundColor: Colors?.bodyColor,
      margin: 6,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
    },
    FirstCardtext: {
      textAlign: 'left',
      marginLeft: 15,
      marginTop: 10
    },
    FirstCardImage: {
      height: 160,
      width: 110,
      transform: [{ scaleX: -1 }],
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'absolute',
      zIndex: 1,
      bottom: 5,
    },
    SecondCardGroup: {

      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: .1,
      shadowRadius: 5,
      elevation: 5,
    },
    SecondCardTop: {
      height: 125,
      width: 115,
      backgroundColor: Colors?.bodyColor,
      margin: 6,
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
    },
    SecondCardDown: {
      height: 125,
      width: 115,
      backgroundColor: Colors?.bodyColor,
      margin: 6,
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
    },
    ThirdCardGroup: {
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: .1,
      shadowRadius: 5,
      elevation: 5,
    },
    ThirdCardTop: {
      height: 125,
      width: 115,
      backgroundColor: Colors?.bodyColor,
      margin: 6,
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
    },
    ThirdCardDown: {
      height: 125,
      width: 115,
      backgroundColor: Colors?.bodyColor,
      margin: 6,
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
    },
    ExploreCardText: {
      fontFamily: Fonts?.font9,
      color: Colors?.textFadeBlack2,
      fontSize: 19,
      fontWeight: 700,
      textAlign: 'right',
      margin: 5,
    },
    SecondCardImage: {
      height: 80,
      width: 80,
      position: 'absolute',
      alignSelf: 'flex-end',
      zIndex: 1,
      bottom: -10,
      left: 0,
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    RotateImage: {
      transform: [{ scaleX: -1 }],
    },
    ThirdCardImage: {
      height: 100,
      width: 100,
      position: 'absolute',
      zIndex: 1,
      bottom: -10,
      left: 5,
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    ThirdCardTopExtra: {
      left: -10,
      bottom: -20
    },
    FavouriteContainer: {
      backgroundColor: Colors?.KFC_red,
      width: '90%',
      height: 140,
      alignSelf: 'center',
      borderRadius: 4,
      overflow: 'hidden',
      marginBottom: 20,
    },
    ThreeColumnStyle: {
      marginHorizontal: "auto",
      width: 80,
      height: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      right: 35
    },
    singleCOlumnStyle: {
      height: 18,
      width: 20,
    },
    LefttextContainer: {
      margin: 15,
      marginLeft: 20
    },
    favourites: {
      fontFamily: Fonts?.font2,
      color: Colors?.constantWhite,
      fontSize: 28,
      textShadowColor: Colors?.textFadeBlack2,
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 2,
    },
    OrderFromList: {
      color: Colors?.constantWhite,
      width: '55%',
      fontFamily: Fonts?.subHeader,
      fontSize: 14,
      fontWeight: 700
    },
    OrderNowButton: {
      borderWidth: 2,
      borderColor: Colors?.fadeWhiteText,
      borderRadius: 1,
      marginHorizontal: 'auto',
      marginLeft: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      margin: 12
    },
    orderNowButtonText: {
      fontFamily: Fonts?.subHeader,
      color: Colors?.constantWhite,
      fontSize: 10,
      fontWeight: 800,
    },
    BackArrow: {
      height: 10,
      width: 10,
      transform: [{ scaleX: -1 }],
      tintColor: Colors?.constantWhite,
      margin: 2
    },
    Favourite_Combo_Pack: {
      height: 160,
      width: 150,
      alignSelf: 'flex-end',
      marginHorizontal: 10,
      position: 'absolute',
      right: 0,
      top: 0,
    }
  })
  return Styles
}