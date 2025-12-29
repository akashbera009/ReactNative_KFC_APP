import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// navigation 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContex'
import LinearGradient from 'react-native-linear-gradient';
// util file 
import { useStrings } from '../../utils/Strings'
import { useThemeColors } from '../../utils/Colors'
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function LoginPage() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
  const Styles = createDynamicStyles(Colors);
  const { language, setLanguage } = useLanguage()
  const { countrySelected } = useCountry();
  return (
    <View style={[Styles.parentBackground, { backgroundColor: Colors.constantBlack }]}>
      <View style={Styles.backgroundThreeScreen}>
        <View style={Styles.TopImageLayer}>
          <Image source={Images.FoodImage1} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage2} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage3} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage4} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage5} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage6} style={Styles.TopImageGridElement} />
        </View>
        <View style={Styles.middleColorLayer} />
        <View style={Styles.TopImageLayer}>
          <Image source={Images.FoodImage1} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage2} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage3} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage4} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage5} style={Styles.TopImageGridElement} />
          <Image source={Images.FoodImage6} style={Styles.TopImageGridElement} />
        </View>
      </View>
      <View style={[Styles.GradientOverlayBG,]}>
        <LinearGradient colors={[Colors.gradiendCol1, Colors.gradiendCol2, Colors.gradiendCol3, Colors.gradiendCol4]} style={[Styles.GradientOverlayBG,]} >
          <View style={Styles.MiddleContainer}>
            <Image source={Images.KfcTextLogo} style={Styles.kfclogoImage} />
            <Text style={Styles.LoginDescriptionText}> {Strings.loginToUlock}</Text>
            <Text style={Styles.LoginDescriptionText}> {Strings.awesomeNewFeature}</Text>
          </View>
          <View style={Styles.DealsAndOffersContainer}>
            <View style={Styles.DealsAndOffersInnerContainer} >
              <Image source={Images.burger_and_coke} style={Styles.middleSectionImagesIcon} />
              <Text style={Styles.OfferDealsText} >{Strings.fingerLicking}</Text>
            </View>
            <View style={Styles.DealsAndOffersInnerContainer} >
              <Image source={Images.discount} style={Styles.middleSectionImagesIcon} />
              <Text style={Styles.OfferDealsText} numberOfLines={2}>{Strings.dealAndOfferTxt}</Text>
            </View>
            <View style={Styles.DealsAndOffersInnerContainer} >
              <Image source={Images.Easy_Order} style={Styles.middleSectionImagesIcon} />
              <Text style={Styles.OfferDealsText} numberOfLines={2} >{Strings.easyOrdering}</Text>
            </View>
          </View>
          <Text style={[Styles.ChooseLangageText]}>{Strings.chooseLanguage}</Text>
          <View style={[Styles.LanguageChangeContainer,]}>
            <View
              style={[Styles.languageContainer]}>
              <Text style={Styles.changeText}>{Strings.english}</Text>
              <TouchableOpacity
                onPress={() => setLanguage('en')}
                style={[Styles.checkBox]}
              >
                {language === 'en' && (
                  <View style={Styles.TickMarkImageContainer}>
                    <Image source={Images.Tick_Mark} style={[Styles.tickMark]} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={[Styles.languageContainer,]}>
              <Text style={Styles.changeText}>{Strings.arabic}</Text>
              <TouchableOpacity
                onPress={() => setLanguage('ar')}
                style={[Styles.checkBox]}
              >
                {language === 'ar' && (
                  <View style={Styles.TickMarkImageContainer}>
                    <Image source={Images.Tick_Mark} style={[Styles.tickMark]} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={[Styles.CountryChangeContainer]}>
            <View style={Styles.flagAndNameContainer}>
              <Image source={countrySelected?.flag} style={Styles.flagImage} />
              <Text style={[Styles.CountryName,]}>{countrySelected?.name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Modal", {
              screen: Strings.LoginPageCountryBottomSheetScreen
            }
            )}>
              <Text style={[Styles.changeText, { fontFamily: Fonts.subHeader, color: Colors.ButtonBlueColor }]}>{Strings.change}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={.5}
            style={[Styles.loginButton, {}]}
            onPress={() => navigation.push("Auth", { screen: Strings.LoginScreen2 })}>
            <Text style={[Styles.LoginButtonText]}>{Strings.login}</Text>
          </TouchableOpacity>
          <View style={[Styles.BottomTermsContainer, { marginBottom: inset.bottom + vh(10) }]}>
            <TouchableOpacity 
              onPress={() => navigation.push("App", { screen: Strings.TermsAndConditionsScreen })}>
              <Text style={Styles.termsAndCondition}>{Strings.termsCondition.toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace("App", { screen: Strings.HomeScreen })}>
              <Text style={Styles.termsAndCondition}>{Strings.skipLogin}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View >
    </View >
  )
}
const createDynamicStyles = (Colors: ColorType) => {
  const Styles = StyleSheet.create({
    parentBackground: {
      height: '100%',
      width: '100%'
    },
    backgroundThreeScreen: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexGrow: 1
    },
    TopImageLayer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 'auto'
    },
    TopImageGridElement: {
      height: vh(130),
      width: '33.33%',
      borderWidth: normalize(.5),
      borderColor: Colors.constantWhite
    },
    middleColorLayer: {
      height: vh(260),
      width: '100%',
      backgroundColor: Colors.KFC_red,
      borderWidth: normalize(1),
      borderColor: Colors.constantWhite
    },
    GradientOverlayBG: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "flex-end"
    },
    HeaderKFC: {
      fontSize: normalize(80),
      color: Colors.constantWhite,
      fontFamily: Fonts.font18
    },
    kfclogoImage: {
      height: 50,
      width: 170,
      tintColor: Colors.constantWhite,
      marginBottom: 10,
    },
    LoginDescriptionText: {
      fontSize: normalize(22),
      color: Colors.constantWhite,
      fontFamily: Fonts.font18
    },
    MiddleContainer: {
      marginTop: vh(100),
      marginHorizontal: 'auto',
      display: 'flex',
      alignItems: 'center'
    },
    DealsAndOffersContainer: {
      height: vh(50),
      width: '90%',
      marginVertical: vh(10),
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    DealsAndOffersInnerContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    middleSectionImagesIcon: {
      height: vh(28),
      width: vw(28),
      tintColor: Colors.constantWhite
    },
    OfferDealsText: {
      marginBottom: vh(10),
      marginLeft: vw(8),
      fontSize: normalize(12),
      marginHorizontal: 'auto',
      fontFamily: Fonts.font18,
      color: Colors.constantWhite
    },
    ChooseLangageText: {
      color: Colors.fadeWhiteText,
      fontFamily: Fonts.font17,
      width: '90%',
      marginVertical: vh(10),
      marginHorizontal: 'auto'
    },
    LanguageChangeContainer: {
      width: '90%',
      height: vh(45),
      marginHorizontal: 'auto',
      borderRadius: normalize(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    languageContainer: {
      width: '48%',
      height: vh(45),
      borderRadius: normalize(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.constantWhite
    },
    checkBox: {
      height: vh(25),
      width: vw(25),
      borderRadius: '50%',
      borderWidth: normalize(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: vw(15),
      borderColor: Colors.fadeborder
    },
    tickMark: {
      height: vh(15),
      width: vw(15),
    },
    TickMarkImageContainer: {
      borderRadius: normalize(50),
      padding: normalize(6),
      tintColor: Colors.constantWhite,
      backgroundColor: Colors.KFC_red
    },
    CountryChangeContainer: {
      width: '90%',
      height: vh(50),
      marginHorizontal: 'auto',
      borderRadius: normalize(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: vh(20),
      backgroundColor: Colors.constantWhite
    },
    flagAndNameContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flagImage: {
      height: vh(25),
      width: vw(40),
      marginHorizontal: vw(10),
      marginVertical: 'auto'
    },
    CountryName: {
      fontFamily: Fonts.font17
    },
    changeText: {
      marginRight: vw(10),
      marginLeft: vw(15),
      fontFamily: Fonts.font17,
      color: Colors.constantBlack
    },
    loginButton: {
      height: vh(50),
      width: '90%',
      marginHorizontal: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vh(10),
      borderRadius: normalize(2),
      backgroundColor: Colors.KFC_red
    },
    LoginButtonText: {
      fontSize: normalize(16),
      fontFamily: Fonts.font18,
      color: Colors.constantWhite
    },
    BottomTermsContainer: {
      width: '90%',
      marginVertical: vh(20),
      marginHorizontal: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    termsAndCondition: {
      fontFamily: Fonts.subHeader,
      color: Colors.fadeWhiteText
    }
  })
  return Styles
}