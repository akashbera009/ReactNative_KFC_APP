import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image, TouchableWithoutFeedback, Linking, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// data imports 
import { OrderHistoryData } from '../../data/OrderHistorydata';
//util files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useTheme } from '../../context/ThemeContext';
import { useStrings } from '../../utils/Strings';
import { DeliveryDetails } from '../../data/DeliveryDetails';
import { useLanguage } from '../../context/LanguageContex';
import { useCountry } from '../../context/CountryContext';
import { CountryInfo } from '../../data/CountryInfo';
const SideBar = () => {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const inset = useSafeAreaInsets();
  const languae = useLanguage()
  const { countrySelected, setCountrySelected } = useCountry()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryMenuOpen, setCountryMenuOpen] = useState<boolean>(false)
  const { isDarkMode, setIsDarkMode } = useTheme()
  const [isSettingsMenunOpen, setIsSettingsMenuOpen] = useState<boolean>(false)
  const currentOrder: OrderHistory = OrderHistoryData.filter((item) => item?.status == Strings?.beingPreparedString)[0];

  // customer support linking 
  const handleOpenDialer = () => {
    const phone = DeliveryDetails?.supprotMobile;
    let phoneNumber = phone;
    const url = `tel:${phoneNumber}`;
    if (Platform.OS === 'ios') {
      phoneNumber = `telprompt:${phone}`;
    } else if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      Alert.alert('Calling is not supported on this platform');
      return;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone dialer not available on this device.');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCountryMenuOpen(false)
        setIsSettingsMenuOpen(false)
      }}>
      <View style={Styles.ParentContainer}>
        <View style={[Styles.TopNameContainer, { marginTop: inset.top }]}>
          <View style={Styles.NameContainer}>
            <View style={Styles.PersonImageContainer}>
              <Text style={Styles.NameLetter}>{DeliveryDetails?.personName.charAt(0)} </Text>
            </View>
            <Text style={Styles.Name}>{DeliveryDetails?.personName} </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsSettingsMenuOpen(!isSettingsMenunOpen)}
          >
            <Image source={Images?.setting} style={Styles.SettingsIcon} />
          </TouchableOpacity>
          {isSettingsMenunOpen && (
            <View style={Styles.SettingOptionMenu}>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  setIsDarkMode(!isDarkMode)
                  setIsSettingsMenuOpen(false)
                }}>
                <Image source={Images?.Theme_Icon} style={Styles.ThemeIcon} />
                <Text style={Styles.countryEntriesText}>{Strings?.ChangeTheme}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  navigation.navigate(Strings?.SplashScreen)
                  setIsSettingsMenuOpen(false)
                }}>
                <Image source={Images?.Logout_Icon} style={Styles.ThemeIcon} />
                <Text style={Styles.countryEntriesText}>{Strings?.logout}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={Styles.LanguageCountryContainer}>
          <View style={Styles.LanguageContainer}>
            <Text style={Styles.Language}>{Strings?.language} / {Strings?.languageToggle}</Text>
            <TouchableOpacity
              style={Styles.LanguageChangeButton}
              onPress={() => navigation.navigate(Strings?.PopUpScreens)}
            >
              <Text style={Styles.LanguageText}>{languae?.language == 'en' ? Strings?.english : Strings?.arabic} </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.CountryContainer}>
            <Text style={Styles.Language}>{Strings?.country} </Text>
            <TouchableOpacity
              style={Styles.CountryChangeButton}
              activeOpacity={.7}
              onPress={() => setCountryMenuOpen(!countryMenuOpen)}
            >
              <Image source={countrySelected?.flag} style={Styles.Flag} />
              <Text style={Styles.countryName}>{countrySelected?.name.toUpperCase()}</Text>
              <Image source={Images?.Down_Arrow_Thick} style={Styles.Arrow} />
            </TouchableOpacity>
            {countryMenuOpen && (
              <View style={Styles.countrySelectorOption}>
                {CountryInfo.map((country, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[Styles.countryEntries, countrySelected.name === country.name && Styles.ActiveCountry]}
                    activeOpacity={.7}
                    onPress={() => {
                      setCountrySelected(country);
                      setCountryMenuOpen(false)
                    }}>
                    <Image source={country?.flag} style={Styles.Flag} />
                    <Text style={Styles.countryEntriesText}>{country.name}</Text>
                    <View style={Styles.CustomBottomBorder} />
                  </TouchableOpacity>))}
              </View>
            )}
          </View>
        </View>
        <View style={Styles.MenuListContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Strings?.OrderDetailsScreen, {
              order: currentOrder
            })}
            style={Styles.SingleEntry}>
            <Image source={Images?.Track_Order} style={[Styles.SideImageIcon, Styles.TrackOrderIcon]} />
            <Text style={Styles.singleEntryText}>{Strings?.trackOrder} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Strings?.OrderHistoryScreens)}
            style={Styles.SingleEntry}>
            <Image source={Images?.menu} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings?.orderHistory} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Strings?.DealsAndOfferScreen)}
            style={Styles.SingleEntry}>
            <Image source={Images?.discount} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings?.dealsAndOffer} </Text>
          </TouchableOpacity>
          <View style={Styles.SingleEntry}>
            <Image source={Images?.Great_Menu} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings?.greatMenu} </Text>
          </View>
          <View style={Styles.SingleEntry}>
            <Image source={Images?.Combo_Menu} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings?.combo} </Text>
          </View>
        </View>

        <View style={[Styles.LowerCallSupportContainer, { bottom: inset.bottom + 10 }]}>
          <View style={Styles.LowerFAQSection}>
            <TouchableOpacity
              onPress={() => { navigation.navigate(Strings?.FAQPageScreen) }}
            >
              <Text style={Styles.BottomViewText}>{Strings?.faq.toUpperCase()} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { navigation.navigate(Strings?.FontsScreen) }}
            >
              <Text style={Styles.BottomViewText}>{Strings?.termsCondition} </Text>
            </TouchableOpacity>
            <Text style={Styles.BottomViewText}>{Strings?.nutritionInfo} </Text>
          </View>
          <TouchableOpacity
            onPress={handleOpenDialer}
            style={Styles.LowerCallWrappper}>
            <View style={Styles.CallImageContainer}>
              <Image source={Images?.Fill_Call} style={Styles.CallImageContainerImage} />
            </View>
            <Text style={Styles.CallSupport}>{Strings?.callSupport.toUpperCase()} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
    ParentContainer: {
      height: '100%',
      backgroundColor: Colors?.bodyColor
    },
    TopNameContainer: {
      height: 80,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    NameContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '80%',
      alignSelf: 'center',
      alignItems: 'center',
    },
    PersonImageContainer: {
      height: 60,
      width: 60,
      borderRadius: 100,
      marginLeft: 10,
      backgroundColor: Colors?.KFC_red,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    NameLetter: {
      fontFamily: Fonts?.headerRegular,
      fontSize: 30,
      color: Colors?.constantWhite,
      fontWeight: 800,
      textAlign: 'center',
    },
    Name: {
      fontFamily: Fonts?.headerRegular,
      fontSize: 22,
      color: Colors?.textBlack,
      fontWeight: 600,
      textAlign: 'center',
      margin: 15
    },
    SettingsIcon: {
      height: 20,
      width: 20,
      tintColor: Colors?.textBlack,
    },
    SettingOptionMenu: {
      minHeight: 60,
      width: 170,
      borderWidth: 1,
      borderColor: Colors?.fadeBorder,
      backgroundColor: Colors?.bodyColor,
      position: 'absolute',
      zIndex: 5,
      right: 35,
      top: 55,
      borderRadius: 5,
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    SettingsMenuEntries: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    ThemeIcon: {
      height: 25,
      width: 25,
      tintColor: Colors?.textBlack,
      margin: 5
    },
    LanguageCountryContainer: {
      height: 100,
      marginLeft: 20
    },
    LanguageContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    Language: {
      fontSize: 15,
      color: Colors?.textBlack,
      fontWeight: 600,
      fontFamily: Fonts?.font17
    },
    LanguageChangeButton: {
      borderWidth: 1,
      borderColor: Colors?.KFC_red,
      borderRadius: 2,
      marginHorizontal: 10
    },
    LanguageText: {
      marginHorizontal: 12,
      color: Colors?.textBlack,
      marginVertical: 8,
      fontWeight: 600,
      fontFamily: Fonts?.font17
    },
    CountryContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    CountryChangeButton: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 10,
      alignItems: 'center'
    },
    Flag: {
      height: 20,
      width: 30,
      marginHorizontal: 10
    },
    countryName: {
      fontSize: 16,
      fontWeight: 600,
      color: Colors?.textBlack,
    },
    Arrow: {
      height: 10,
      width: 10,
      marginHorizontal: 8,
      tintColor: Colors?.textBlack,
    },
    countrySelectorOption: {
      minHeight: 100,
      width: 120,
      borderWidth: 1,
      borderColor: Colors?.fadeBorder,
      backgroundColor: Colors?.bodyColor,
      position: 'absolute',
      right: 0,
      top: 30,
      borderRadius: 5,
      shadowColor: Colors?.blueShadows,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    countryEntries: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 40
    },
    ActiveCountry: {
      backgroundColor: Colors?.blueLightBG,
    },
    countryEntriesText: {
      marginBottom: 4,
      fontWeight: 600,
      fontSize: 16,
      color: Colors?.textBlack,
      marginLeft: 4
    },
    CustomBottomBorder: {
      width: '100%',
      height: 40,
      position: 'absolute',
      borderBottomColor: Colors?.fadeBorder,
      borderBottomWidth: 1,
    },
    MenuListContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 30
    },
    SingleEntry: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
      marginLeft: 20,

    },
    SideImageIcon: {
      height: 28,
      width: 28,
      margin: 12,
      tintColor: Colors?.textBlack,
    },
    TrackOrderIcon: {
      height: 35,
      width: 35,
      margin: 8
    },
    singleEntryText: {
      fontFamily: Fonts?.headerRegular,
      fontWeight: 600,
      fontSize: 17,
      margin: 5,
      color: Colors?.textBlack,
    },
    LowerFAQSection: {

      height: 150,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginLeft: 40,
      marginTop: 30,
      marginBottom: 25,
    },
    BottomViewText: {
      fontFamily: Fonts?.font17,
      fontWeight: 600,
      fontSize: 17,
      color: Colors?.textBlack,
    },
    LowerCallSupportContainer: {
      position: 'absolute',
      left: 10,
    },
    LowerCallWrappper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginLeft: 20
    },
    CallImageContainer: {
      backgroundColor: Colors?.KFC_red,
      height: 30,
      width: 30,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    CallImageContainerImage: {
      height: 18,
      width: 18,
      tintColor: Colors?.constantWhite,

    },
    CallSupport: {
      fontFamily: Fonts?.font9,
      fontWeight: 600,
      fontSize: 26,
      color: Colors?.textBlack,
    }
  })
  return Styles
}
export default SideBar