import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Platform, Animated, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { Polygon } from 'react-native-svg';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
// external imports 
import { RadialGradient } from 'react-native-gradients';
// custom component imports 
import CurrentOrder from './CurrentOrder';
import BestSeller from './BestSeller';
//redux 
import { fetchMenu } from '../../features/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchOrders } from '../../features/orderSlice';
// util imports
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { DeliveryDetails } from '../../data/DeliveryDetails';
import { useCountry } from '../../context/CountryContext';
import VideoPlayerComponent from './VideoPlayer';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function HomePage() {
  const [refreshing, setRefreshing] = React.useState(false);
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const drawerNavigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchMenu())
    dispatch(fetchOrders())
  }, [dispatch])
  const menuData = useSelector((state: RootState) => state.menuData)
  const { countrySelected } = useCountry()
  const colorList: { offset: string, color: string, opacity: string }[] = [
    { offset: '0%', color: Colors?.orangeColorText, opacity: '1' },
    { offset: '40%', color: Colors?.orangeColorText, opacity: '1' },
    { offset: '100%', color: Colors?.KFC_red, opacity: '1' },
  ]
  // fade animation 
  const fadeAnimation = useRef(new Animated.Value(0)).current
  const FadeIn = () => {
    fadeAnimation.setValue(0);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start()
  }
  const [imageIndex, setImageIndex] = useState(0);
  const imageSet = [Images?.Home_Page_Main_Image, Images?.ChickenBox, Images?.ChickenNuget, Images?.BurgerPNG]
  useEffect(() => {
    const interval = setTimeout(() => {
      setImageIndex(prev => prev < 3 ? prev + 1 : 0)
    }, 2500);
    FadeIn()
    return () => {
      clearTimeout(interval)
    }
  }, [imageIndex])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchMenu())
    dispatch(fetchOrders())
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false} >
        <View style={Styles.BlankCover} />
        <View style={Styles.gradientBg}>
          <RadialGradient x="50%" y="50%" rx="50%" ry="50%" colorList={colorList} />
        </View>
        <View style={[Styles.ImagesAndAddressContainer, Platform.OS == 'android' && Styles.AndroidHeight]}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Strings?.SplashScreen)}
          >
            <Image source={Images?.KfcTextLogo} style={[Styles.HeaderKFC, { marginTop: inset.top }]} />
          </TouchableOpacity>
          <Animated.View style={{ opacity: fadeAnimation }}>
            <View style={Styles.SVGContainerLeft}>
              <Svg width={200} height={200}>
                <Polygon
                  points="99,30 100,50 100,55 0,72 11,49 0,24"
                  fill="white"
                  transform="scale(2, 2)"
                />
                <View style={Styles.SvgTextContainer1}>
                  <Text style={Styles.svgcashbackTextTop1}>{DeliveryDetails?.homePagediscountRate}% </Text>
                  <View style={Styles.svgcashbackTextTop2Container}>
                    <Text style={Styles.svgcashbackTextTop2}>{Strings?.cashback.toUpperCase()} </Text>
                  </View>
                </View>
              </Svg>
            </View>
            <Image source={imageSet[imageIndex]} style={[Styles.HomePageMainImage]} />
            <View style={Styles.SVGContainerRight}>
              <Svg width={200} height={200}>
                <Polygon
                  points="100,25 90,45 100,70 0,65 0,45 0,33"
                  fill="white"
                  transform="scale(2, 2)"
                />
                <View style={Styles.SvgOrderContainer3}>
                  <View style={Styles.SvgOrderContainer3Upper}>
                    <Text style={Styles.svgcashbackTextTop3} numberOfLines={2}>{Strings?.onTheAbove.toUpperCase()} </Text>
                    <View style={Styles.svgcashbackTextTop4Container}>
                      <Text style={Styles.svgcashbackTextTop4}>{DeliveryDetails?.homePagediscountPrice} </Text>
                    </View>
                  </View>
                  <View style={Styles.SvgOrderContainer3Lower}>
                    <Text style={Styles.svgcashbackTextTop5}>{Strings?.order.toUpperCase()} </Text>
                    <Text style={Styles.svgcashbackTextTop6}>{countrySelected?.currencyCode.toUpperCase()} </Text>
                  </View>
                </View>
              </Svg>
            </View>
          </Animated.View>
          <View style={Styles.IndexContainer}>
            {imageSet.map((_, idx) => (
              <View key={idx}
                style={[Styles.Index, idx == imageIndex && Styles.fillIndex]} />
            ))}
          </View>
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
                onPress={() => navigation.navigate(Strings?.ExploreMenuScreen, {
                  categoryType: Strings?.dealsString
                })}
              >
                <Text style={Styles.ExploreHeaderViewAll}>{Strings?.viewAll.toUpperCase()} </Text>
              </TouchableOpacity>
            </View>
            <View style={Styles.ExploreCardsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate(Strings?.ExploreMenuScreen, {
                  categoryType: Strings?.dealsString
                })}
                style={Styles.FirstCard}>
                <Text style={[Styles.ExploreCardText, Styles.FirstCardtext]}>{Strings?.deals.toUpperCase()} </Text>
                <Image source={Images?.Chicken_Bucket} style={Styles.FirstCardImage} />
              </TouchableOpacity>
              <View style={Styles.SecondCardGroup}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Strings?.ExploreMenuScreen, {
                    categoryType: Strings?.fonOneString
                  })}
                  style={Styles.SecondCardTop}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2}>{Strings?.forOne.toUpperCase()} </Text>
                  <Image source={Images?.Chicken_Nugedts} style={[Styles.SecondCardImage, Styles.RotateImage]} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Strings?.ExploreMenuScreen, {
                    categoryType: Strings?.slideDesertString
                  })}
                  style={Styles.SecondCardDown}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2} >{Strings?.sideDeserts.toUpperCase()} </Text>
                  <Image source={Images?.French_Fries_Coke} style={Styles.SecondCardImage} />
                </TouchableOpacity>
              </View>
              <View
                style={Styles.ThirdCardGroup}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Strings?.ExploreMenuScreen, {
                    categoryType: Strings?.forSharingString
                  })}
                  style={Styles.ThirdCardTop}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2} >{Strings?.forSharing.toUpperCase()} </Text>
                  <Image source={Images?.Chicken_Roll} style={[Styles.ThirdCardImage, Styles.ThirdCardTopExtra]} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Strings?.ExploreMenuScreen, {
                    categoryType: Strings.sandwichString
                  })}
                  style={Styles.ThirdCardDown}>
                  <Text style={Styles.ExploreCardText} numberOfLines={2}>{Strings?.beverages.toUpperCase()} </Text>
                  <Image source={Images?.Pepsi_Double_Can} style={Styles.ThirdCardImage} />
                </TouchableOpacity>
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
          <View style={Styles.ParentWhatsNewContainer}>
            <View style={Styles.headerExplore}>
              <Text style={Styles.WhatsNewHeader}>{Strings?.WhatsNew.toUpperCase()} </Text>
              <Text style={Styles.ExploreHeaderViewAll}>{Strings?.viewAll.toUpperCase()} </Text>
            </View>
            <ScrollView style={Styles.CardsContainer} horizontal showsHorizontalScrollIndicator={false}>
              {menuData?.loading != 'Success' ? (
                <Text>{Strings?.loading}</Text>
              ) : (
                <>
                  {menuData?.menuData?.map((item, idx) => (
                    <View key={idx} style={Styles.Cards}>
                      <View style={Styles.TopContainer}>
                        <Image src={item?.image} style={Styles.cardImage} />
                        <View style={Styles.RightContainer}>
                          <View style={Styles.TextContainer}>
                            <Text style={Styles.title} numberOfLines={2}>{item?.name} </Text>
                          </View>
                          <TouchableOpacity
                            style={Styles.OrderButton}
                            onPress={() => { }}
                          >
                            <Text style={Styles.OrderText}>{Strings?.order.toUpperCase()} </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
          </View>
          <View style={Styles.BottomView}>
            <View style={Styles.laurel_Container}>
              <View style={Styles.container}>
                <View style={Styles.LeftlinesContainer}>
                  <View style={Styles.line1} />
                  <View style={Styles.line2} />
                  <View style={Styles.line1} />
                </View>
                <Image
                  source={Images?.laurel_leaves_Left}
                  style={[Styles.laurel, Styles.leftLaurel]}
                  resizeMode="contain"
                />
                <Image source={Images?.KfcTextLogo} style={[Styles.HeaderKFC2]} />
                <Image
                  source={Images?.laurel_leaves_Left}
                  style={[Styles.laurel, Styles.rightLaurel]}
                  resizeMode="contain"
                />
                <View style={Styles.linesContainer}>
                  <View style={Styles.line1} />
                  <View style={Styles.line2} />
                  <View style={Styles.line1} />
                </View>
              </View>
              <Text style={Styles.bottomKFCDescription}>{Strings?.bottomKFCDescription.toUpperCase()} </Text>
            </View>
            <VideoPlayerComponent uri={''} />
          </View>
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
      height: vh(440),
    },
    menuButtonContainer: {
      position: 'absolute',
      left: vh(20),
      zIndex: 999
    },
    menuIcon: {
      height: vh(25),
      width: vw(25),
      tintColor: Colors?.constantWhite,
    },
    gradientBg: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: vh(440),
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
      marginTop: vh(30)
    },
    HeaderKFC: {
      height: vh(30),
      width: vw(100),
      tintColor: Colors?.constantWhite
    },
    HeaderKFC2: {
      height: vh(18),
      width: vw(60),
      tintColor: Colors?.textBlack,
      marginHorizontal: vw(5)
    },

    svgcashbackTextTop1: {
      fontSize: normalize(60),
      fontWeight: 600,
      position: 'relative',
      left: vw(2),
      top: vh(-25),
      fontFamily: Fonts?.expHead,
    },
    svgcashbackTextTop2Container: {
      transform: [{ rotate: '-10deg' }],
      position: 'relative',
      left: vw(-8),
      top: vh(-30),
    },
    svgcashbackTextTop2: {
      fontSize: normalize(18),
      fontWeight: 600,
      fontFamily: Fonts?.expHead,
    },
    SvgOrderContainer3: {
      position: 'absolute',
      right: 0,
      top: vh(80),
    },
    svgcashbackTextTop3: {
      fontSize: normalize(16),
      fontWeight: 600,
      fontFamily: Fonts?.expHead,
      width: vw(80)
    },
    SvgOrderContainer3Upper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'relative',
      top: vh(-20),
      right: vw(10),
      width: vw(100),
      transform: [{ rotate: '-5deg' }]
    },
    SvgOrderContainer3Lower: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      position: 'relative',
      top: vh(-20),
      right: vw(5),
    },
    svgcashbackTextTop4Container: {
      transform: [{ rotate: '5deg' }]
    },
    svgcashbackTextTop4: {
      fontSize: normalize(45),
      fontWeight: 600,
      fontFamily: Fonts?.expHead,
      position: 'relative',
      left: vw(-40)
    },
    svgcashbackTextTop5: {
      fontSize: normalize(25),
      fontWeight: 600,
      fontFamily: Fonts?.expHead
    },
    svgcashbackTextTop6: {
      fontSize: normalize(18),
      fontWeight: 600,
      fontFamily: Fonts?.expHead
    },
    SVGContainerLeft: {
      transform: [{ rotate: '-12deg' }],
      position: 'absolute',
      bottom: vh(-30),
      left: vw(-78),
    },
    SVGContainerRight: {
      transform: [{ rotate: '-10deg' }],
      position: 'absolute',
      zIndex: 2,
      right: vw(-80),
      top: vh(-30),
    },
    SvgTextContainer1: {
      position: 'absolute',
      top: vh(80),
      left: vw(20)
    },
    SvgTextContainer2: {
      position: 'absolute',
      top: vh(60),
      right: vw(20)
    },
    HomePageMainImage: {
      height: vh(220),
      width: vw(220),
      alignSelf: 'center',
      position: 'relative',
      zIndex: 5
    },
    IndexContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: normalize(8),
      marginTop: vh(5),
    },
    Index: {
      height: vh(8),
      width: vw(8),
      borderWidth: normalize(1),
      borderColor: Colors?.constantWhite,
      borderRadius: normalize(10),
    },
    fillIndex: {
      backgroundColor: Colors?.constantWhite,
    },
    AddressContainer: {
      height: vh(60),
      width: '93%',
      marginTop: vh(20),
      alignSelf: 'center',
      backgroundColor: Colors?.bodyColor,
      borderRadius: normalize(2),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      height: vh(22),
      width: vw(22),
      margin: normalize(10),
      marginLeft: vw(15),
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
      width: vw(230),
      overflow: 'hidden',
      marginRight: vw(15),
      fontWeight: 600,
      color: Colors?.textFadeBlack,
    },
    RightSideButton: {
      borderWidth: 1,
      borderColor: Colors?.timerText,
      borderRadius: 4,
      position: 'absolute',
      right: 15
    },
    changeText: {
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: normalize(11),
      paddingHorizontal: vw(6),
      paddingVertical: vh(4),
      color: Colors?.textBlack,
    },
    LowerScrollContainer: {
      position: 'relative',
      zIndex: 3,
      backgroundColor: Colors?.bodyLigheterColor,
    },
    ExploreContainer: {
      width: '93%',
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
      fontSize: normalize(14)
    },
    ExploreHeaderViewAll: {
      color: Colors?.textFadeBlack,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: normalize(12)
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
      height: vh(260),
      width: vw(110),
      backgroundColor: Colors?.bodyColor,
      margin: normalize(6),
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(0) },
      shadowOpacity: 1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    FirstCardtext: {
      textAlign: 'left',
      marginLeft: vw(15),
      marginTop: vh(10)
    },
    FirstCardImage: {
      height: vh(160),
      width: vw(110),
      transform: [{ scaleX: -1 }],
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
      position: 'absolute',
      zIndex: 1,
      bottom: vh(5),
    },
    SecondCardGroup: {
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: .1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    SecondCardTop: {
      height: vh(125),
      width: vw(115),
      backgroundColor: Colors?.bodyColor,
      margin: normalize(6),
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(0) },
      shadowOpacity: 1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    SecondCardDown: {
      height: vh(125),
      width: vw(115),
      backgroundColor: Colors?.bodyColor,
      margin: normalize(6),
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(0) },
      shadowOpacity: 1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    ThirdCardGroup: {
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: .1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    ThirdCardTop: {
      height: vh(125),
      width: vw(115),
      backgroundColor: Colors?.bodyColor,
      margin: normalize(6),
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(0) },
      shadowOpacity: 1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    ThirdCardDown: {
      height: vh(125),
      width: vw(115),
      backgroundColor: Colors?.bodyColor,
      margin: normalize(6),
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(0), height: vh(0) },
      shadowOpacity: 1,
      shadowRadius: normalize(5),
      elevation: 5,
    },
    ExploreCardText: {
      fontFamily: Fonts?.font9,
      color: Colors?.textFadeBlack2,
      fontSize: normalize(19),
      fontWeight: 600,
      textAlign: 'right',
      margin: normalize(5),
    },
    SecondCardImage: {
      height: vh(80),
      width: vw(80),
      position: 'absolute',
      alignSelf: 'flex-end',
      zIndex: 1,
      bottom: vh(-10),
      left: 0,
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
    },
    RotateImage: {
      transform: [{ scaleX: -1 }],
    },
    ThirdCardImage: {
      height: vh(100),
      width: vw(100),
      position: 'absolute',
      zIndex: 1,
      bottom: vh(-10),
      left: vw(5),
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
    },
    ThirdCardTopExtra: {
      left: vw(-10),
      bottom: vh(-20)
    },
    FavouriteContainer: {
      backgroundColor: Colors?.KFC_red,
      width: '93%',
      height: vh(140),
      alignSelf: 'center',
      borderRadius: normalize(4),
      overflow: 'hidden',
      marginBottom: vh(20),
    },
    ThreeColumnStyle: {
      marginHorizontal: "auto",
      width: vw(80),
      height: vh(20),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      right: vw(35)
    },
    singleCOlumnStyle: {
      height: vh(18),
      width: vw(20),
    },
    LefttextContainer: {
      margin: normalize(15),
      marginLeft: vw(20)
    },
    favourites: {
      fontFamily: Fonts?.font2,
      color: Colors?.constantWhite,
      fontSize: normalize(28),
      textShadowColor: Colors?.textFadeBlack2,
      textShadowOffset: { width: vw(1), height: vh(2) },
      textShadowRadius: normalize(2),
    },
    OrderFromList: {
      color: Colors?.constantWhite,
      width: '55%',
      fontFamily: Fonts?.subHeader,
      fontSize: normalize(14),
      fontWeight: 700
    },
    OrderNowButton: {
      borderWidth: normalize(2),
      borderColor: Colors?.fadeWhiteText,
      borderRadius: normalize(1),
      marginHorizontal: 'auto',
      marginLeft: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: normalize(5),
      margin: normalize(12)
    },
    orderNowButtonText: {
      fontFamily: Fonts?.subHeader,
      color: Colors?.constantWhite,
      fontSize: normalize(10),
      fontWeight: 800,
    },
    BackArrow: {
      height: vh(10),
      width: vw(10),
      transform: [{ scaleX: -1 }],
      tintColor: Colors?.constantWhite,
      margin: normalize(2)
    },
    Favourite_Combo_Pack: {
      height: vh(160),
      width: vw(150),
      alignSelf: 'flex-end',
      marginHorizontal: vw(10),
      position: 'absolute',
      right: 0,
      top: 0,
    },
    ParentWhatsNewContainer: {
      width: '93%',
      alignSelf: 'center',
    },
    WhatsNewHeader: {
      color: Colors?.textBlack,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      fontSize: normalize(14)
    },
    CardsContainer: {
      marginBottom: vw(5)
    },
    Cards: {
      height: vh(120),
      width: vw(250),
      backgroundColor: Colors?.bodyColor,
      marginRight: vw(10),
      marginVertical: vh(10),
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: vw(2), height: vh(2) },
      shadowOpacity: .3,
      borderRadius: normalize(2),
      shadowRadius: normalize(5),
      elevation: 5,
    },
    TopContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    cardImage: {
      height: vh(80),
      width: vw(80),
      marginLeft: 20,
      shadowColor: Colors?.constantBlack,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
    },
    RightContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '60%',
      height: '80%',
    },
    TextContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '60%',
    },
    title: {
      margin: normalize(10),
      marginLeft: vw(10),
      fontSize: normalize(14),
      fontWeight: 600,
      marginHorizontal: vw(4),
      color: Colors?.textBlack,
      width: '80%',
      overflow: 'hidden'
    },
    OrderButton: {
      position: 'absolute',
      left: 0,
      bottom: vh(10),
      borderWidth: normalize(2),
      borderColor: Colors?.fadeBorder,
      borderRadius: normalize(3),
      marginLeft: vw(10),
      marginRight: 'auto'
    },
    OrderText: {
      color: Colors?.KFC_red,
      fontFamily: Fonts?.subHeader,
      fontSize: normalize(11),
      marginHorizontal: vw(15),
      marginVertical: vh(5),
      fontWeight: 800
    },
    BottomView: {
      backgroundColor: Colors?.bodyColor
    },
    laurel_Container: {
      marginVertical: vh(10),
      marginBottom: vh(20),
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vh(10),
    },
    laurel: {
      width: vw(40),
      height: vh(80),
      tintColor: Colors?.textBlack
    },
    rightLaurel: {
      position: 'relative',
      right: vw(18),
    },
    leftLaurel: {
      transform: [{ scaleX: -1 }],
      position: 'relative',
      left: vw(18),
    },
    centerText: {
      fontSize: normalize(28),
      fontFamily: Fonts?.exp,
      marginHorizontal: vw(8),
      color: Colors?.textBlack
    },
    linesContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: vw(6),
      position: 'relative',
      right: vw(15),
    },
    LeftlinesContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginHorizontal: vw(6),
      position: 'relative',
      left: vw(15),
    },
    line1: {
      width: vw(15),
      height: vh(1.2),
      backgroundColor: Colors?.textBlack,
      marginVertical: vh(3),
    },
    line2: {
      width: vw(25),
      height: vh(1.5),
      backgroundColor: Colors?.textBlack,
      marginVertical: vh(2),
    },
    bottomKFCDescription: {
      fontFamily: Fonts?.subHeader,
      fontSize: normalize(11),
      color: Colors?.textBlack,
      fontWeight: 700,
      alignSelf: 'center',
      position: 'relative',
      bottom: vh(10),
    }
  })
  return Styles
}