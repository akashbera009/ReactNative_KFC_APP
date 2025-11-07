import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

// navigation 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../../context/LanguageContex'
import LinearGradient from 'react-native-linear-gradient';

// util file 
import { useStrings } from '../../../utils/Strings'
import { useThemeColors } from '../../../utils/Colors'
import Fonts from '../../../utils/Fonts'
import Images from '../../../utils/LocalImages'
import { useCountry } from '../../../context/CountryContext';

export default function LoginPage() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const Styles = createDynamicStyles(Colors, Fonts);
  const { language, setLanguage } = useLanguage()
  const { countrySelected } = useCountry();
  return (
    <View style={[Styles.parentBackground, { backgroundColor: Colors?.constantBlack }]}>
      <View style={Styles.backgroundThreeScreen}>
        <View style={Styles.TopImageLayer}>
          <Image source={Images?.FoodImage1} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage2} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage3} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage4} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage5} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage6} style={Styles.TopImageGridElement} />
        </View>
        <View style={Styles.middleColorLayer}>
        </View>
        <View style={Styles.TopImageLayer}>
          <Image source={Images?.FoodImage1} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage2} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage3} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage4} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage5} style={Styles.TopImageGridElement} />
          <Image source={Images?.FoodImage6} style={Styles.TopImageGridElement} />
        </View>
      </View>
      <View style={[Styles.GradientOverlayBG,]}>
        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.25)', '#000000f3', '#000000ff']} style={[Styles.GradientOverlayBG,]} >
          <View style={Styles.MiddleContainer}>
            <Text style={Styles.HeaderKFC}> {Strings?.KFC}</Text>
            <Text style={Styles.LoginDescriptionText}> {Strings?.loginToUlock}</Text>
            <Text style={Styles.LoginDescriptionText}> {Strings?.awesomeNewFeature}</Text>
          </View>

          <View style={Styles.DealsAndOffersContainer}>
            <View style={Styles.DealsAndOffersInnerContainer} >
              <Image source={Images?.burger_and_coke} style={Styles.middleSectionImagesIcon} />
              <Text style={Styles.OfferDealsText} >{Strings?.fingerLicking}</Text>
            </View>
            <View style={Styles.DealsAndOffersInnerContainer} >
              <Image source={Images?.discount} style={Styles.middleSectionImagesIcon} />
              <Text style={Styles.OfferDealsText} numberOfLines={2}>{Strings?.dealAndOfferTxt}</Text>
            </View>
            <View style={Styles.DealsAndOffersInnerContainer} >
              <Image source={Images?.Easy_Order} style={Styles.middleSectionImagesIcon} />
              <Text style={Styles.OfferDealsText} numberOfLines={2} >{Strings?.easyOrdering}</Text>
            </View>
          </View>
          <Text style={[Styles.ChooseLangageText]}>{Strings?.chooseLanguage}</Text>
          <View style={[Styles.LanguageChangeContainer,]}>
            <View
              style={[Styles.languageContainer]}>
              <Text style={Styles.changeText}>{Strings?.english}</Text>
              <TouchableOpacity
                onPress={() => setLanguage('en')}
                style={[Styles.checkBox]}
              >
                {language == 'en' && (
                  <Image source={Images?.Tick_Mark} style={[Styles.tickMark]} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={[Styles.languageContainer,]}>
              <Text style={Styles.changeText}>{Strings?.arabic}</Text>
              <TouchableOpacity
                onPress={() => setLanguage('ar')}
                style={[Styles.checkBox]}
              >
                {language == 'ar' && (
                  <Image source={Images?.Tick_Mark} style={[Styles.tickMark]} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={[Styles.CountryChangeContainer]}>
            <View style={Styles.flagAndNameContainer}>
              <Image source={countrySelected?.flag} style={Styles.flagImage} />
              <Text style={[Styles.CountryName,]}>{countrySelected?.name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(Strings?.LoginPageCountryBottomSheetScreen)}>
              <Text style={[Styles.changeText, { fontFamily: Fonts?.subHeader, color: Colors?.ButtonBlueColor }]}>{Strings?.change}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={.5}
            style={[Styles.loginButton, {}]}
            onPress={() => navigation.navigate(Strings?.LoginScreen2)}>
            <Text style={[Styles.LoginButtonText]}>{Strings?.login}</Text>
          </TouchableOpacity>
          <View style={[Styles.BottomTermsContainer, { marginBottom: inset.bottom + 10 }]}>
            <TouchableOpacity >
              <Text style={[{ fontFamily: Fonts?.subHeader, color: Colors?.fadeWhiteText }]}>{Strings?.termsCondition}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(Strings?.HomeScreen)}>
              <Text style={[{ fontFamily: Fonts?.subHeader, color: Colors?.fadeWhiteText }]}>{Strings?.skipLogin}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View >
    </View >
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
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
      height: 130,
      width: '33.33%',
      borderWidth: .5,
      borderColor: Colors?.constantWhite
    },
    middleColorLayer: {
      height: 260,
      width: '100%',
      backgroundColor: Colors?.KFC_red,
      borderWidth: 1,
      borderColor: Colors?.constantWhite
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
      fontSize: 80,
      fontWeight: 900,
      color: Colors?.constantWhite,
      fontFamily: Fonts?.kfcLogoTextFont,
    },
    LoginDescriptionText: {
      fontSize: 22,
      fontWeight: 700,
      color: Colors?.constantWhite,
      fontFamily: Fonts?.headerRegular
    },
    MiddleContainer: {
      marginTop: 100,
      marginHorizontal: 'auto',
      display: 'flex',
      alignItems: 'center'
    },

    DealsAndOffersContainer: {
      height: 50,
      width: '90%',
      marginVertical: 10,
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
      height: 28,
      width: 28,
      tintColor: Colors?.constantWhite
    },
    OfferDealsText: {
      fontWeight: 800,
      marginBottom: 10,
      marginLeft: 8,
      fontSize: 12,
      marginHorizontal: 'auto',
      fontFamily: Fonts?.headerRegular,
      color: Colors?.constantWhite
    },
    ChooseLangageText: {
      color: Colors?.fadeWhiteText,
      width: '90%',
      marginVertical: 10,
      marginHorizontal: 'auto'
    },
    LanguageChangeContainer: {
      width: '90%',
      height: 45,
      marginHorizontal: 'auto',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    languageContainer: {
      width: '48%',
      height: 45,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors?.constantWhite
    },
    checkBox: {
      height: 25,
      width: 25,
      borderRadius: '50%',
      borderWidth: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      borderColor: Colors?.fadeborder
    },
    tickMark: {
      height: 25,
      width: 25,
      borderRadius: 50,
      padding: 6,
      tintColor: Colors?.constantWhite, backgroundColor: Colors?.KFC_red
    },
    CountryChangeContainer: {
      width: '90%',
      height: 50,
      marginHorizontal: 'auto',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 20,
      backgroundColor: Colors?.constantWhite
    },
    flagAndNameContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flagImage: {
      height: 25,
      width: 40,
      marginHorizontal: 10,
      marginVertical: 'auto'
    },
    CountryName: {
      fontWeight: 500,
      fontFamily: Fonts?.subHeader
    },
    changeText: {
      marginRight: 10,
      marginLeft: 15,
      fontWeight: 700,
      fontFamily: Fonts?.subHeader, color: Colors?.constantBlack
    },
    loginButton: {
      height: 50,
      width: '90%',
      marginHorizontal: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 2,
      backgroundColor: Colors?.KFC_red
    },
    LoginButtonText: {
      fontSize: 16,
      fontWeight: 800,
      fontFamily: Fonts?.subHeader,
      color: Colors?.constantWhite
    },
    BottomTermsContainer: {
      width: '90%',
      marginVertical: 20,
      marginHorizontal: 'auto'
      , display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  })
  return Styles
}