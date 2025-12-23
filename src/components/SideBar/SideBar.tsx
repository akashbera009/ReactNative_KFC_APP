import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image, TouchableWithoutFeedback, Linking, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//redux
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../../features/getCurrentOrder';
import { fetctUserDeatails } from '../../features/userSlice';
import { RootState, useAppDispatch } from '../../store/store';

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
import { normalize, vh, vw } from '../../utils/Dimensions';
const SideBar = () => {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors);
  const inset = useSafeAreaInsets();
  const languae = useLanguage()
  const { countrySelected, setCountrySelected } = useCountry()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryMenuOpen, setCountryMenuOpen] = useState<boolean>(false)
  const { isDarkMode, setIsDarkMode } = useTheme()
  const [isSettingsMenunOpen, setIsSettingsMenuOpen] = useState<boolean>(false)
  const currentOrder: OrderHistory | null = useSelector(selectCurrentOrder)
  // customer support linking 
  const handleOpenDialer = (): void => {
    const phone = DeliveryDetails?.supprotMobile;
    let phoneNumber = phone;
    if (Platform.OS === 'ios') {
      phoneNumber = `tel:${phone}`;
    } else if (Platform.OS === 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
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
  const dispatch = useAppDispatch();
  useEffect((): void => {
    dispatch(fetctUserDeatails())
  }, [dispatch])
  const userdata = useSelector((state: RootState) => state?.users)
  const currentUser = userdata?.userData?.find((item) => item?.mobileNo === '9876543210')
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
              {userdata?.loading === 'success' ? (
                <Image source={{ uri: currentUser?.avatar }}
                  style={Styles.avatarImage} />
              ) : (
                <Text style={Styles.NameLetter}>{currentUser?.name?.charAt(0)} </Text>
              )}
            </View>
            <Text style={Styles.Name}>{currentUser?.name} </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsSettingsMenuOpen(!isSettingsMenunOpen)}
          >
            <Image source={Images.setting} style={Styles.SettingsIcon} />
          </TouchableOpacity>
          {isSettingsMenunOpen && (
            <View style={Styles.SettingOptionMenu}>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  navigation.navigate(Strings.CreateProfileScreen, {
                    phoneNo: '9876543210'
                  })
                  setIsSettingsMenuOpen(false)
                }}>
                <Image source={Images.UserIcon} style={Styles.ThemeIcon} />
                <Text style={Styles.countryEntriesText}>{Strings.profileSettings}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  setIsDarkMode(!isDarkMode)
                  setIsSettingsMenuOpen(false)
                }}>
                <Image source={Images.Theme_Icon} style={Styles.ThemeIcon} />
                <Text style={Styles.countryEntriesText}>{Strings.ChangeTheme}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  navigation.navigate(Strings.SplashScreen)
                  setIsSettingsMenuOpen(false)
                }}>
                <Image source={Images.Logout_Icon} style={Styles.ThemeIcon} />
                <Text style={Styles.countryEntriesText}>{Strings.logout}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  navigation.navigate(Strings.FontsScreen)
                  setIsSettingsMenuOpen(false)
                }}>
                <Text>{Strings.FontsScreen}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.SettingsMenuEntries}
                activeOpacity={.7}
                onPress={() => {
                  navigation.navigate(Strings.ReAnimatedScreen)
                  setIsSettingsMenuOpen(false)
                }}>
                <Text>{Strings.ReAnimatedScreen}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={Styles.LanguageCountryContainer}>
          <View style={Styles.LanguageContainer}>
            <Text style={Styles.Language}>{Strings.language} / {Strings.languageToggle}</Text>
            <TouchableOpacity
              style={Styles.LanguageChangeButton}
              onPress={() => {
                navigation.navigate(Strings.PopUpScreens);
                setIsSettingsMenuOpen(false)
              }}
            >
              <Text style={Styles.LanguageText}>{languae?.language === 'en' ? Strings.english : Strings.arabic} </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.CountryContainer}>
            <Text style={Styles.Language}>{Strings.country} </Text>
            <TouchableOpacity
              style={Styles.CountryChangeButton}
              activeOpacity={.7}
              onPress={() => setCountryMenuOpen(!countryMenuOpen)}
            >
              <Image source={countrySelected?.flag} style={Styles.Flag} />
              <Text style={Styles.countryName}>{countrySelected?.name.toUpperCase()}</Text>
              <Image source={Images.Down_Arrow_Thick} style={Styles.Arrow} />
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
            onPress={() => {
              navigation.navigate(Strings.OrderDetailsScreen, {
                order: currentOrder
              });
              setIsSettingsMenuOpen(false)
            }}
            style={Styles.SingleEntry}>
            <Image source={Images.Track_Order} style={[Styles.SideImageIcon, Styles.TrackOrderIcon]} />
            <Text style={Styles.singleEntryText}>{Strings.trackOrder} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Strings.OrderHistoryScreens)
              setIsSettingsMenuOpen(false)
            }}
            style={Styles.SingleEntry}>
            <Image source={Images.menu} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings.orderHistory} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Strings.DealsAndOfferScreen)
              setIsSettingsMenuOpen(false)
            }}
            style={Styles.SingleEntry}>
            <Image source={Images.discount} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings.dealsAndOffer} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Strings.ExploreMenuScreen, {
                categoryType: Strings.dealsString
              })
              setIsSettingsMenuOpen(false)
            }}
            style={Styles.SingleEntry}>
            <Image source={Images.Great_Menu} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings.greatMenu} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Strings.CartScreen, {
                discount: 0,
                discountPercentage: 0,
                offerCode: ''
              })
              setIsSettingsMenuOpen(false)
            }
            }
            style={Styles.SingleEntry}>
            <Image source={Images.MyCart} style={Styles.SideImageIcon} />
            <Text style={Styles.singleEntryText}>{Strings.myCart} </Text>
          </TouchableOpacity>
        </View>

        <View style={[Styles.LowerCallSupportContainer, { bottom: inset.bottom + 10 }]}>
          <View style={Styles.LowerFAQSection}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Strings.FAQPageScreen)
                setIsSettingsMenuOpen(false)
              }}
            >
              <Text style={Styles.BottomViewText}>{Strings.faq.toUpperCase()} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Strings.TermsAndConditionsScreen)
                setIsSettingsMenuOpen(false)
              }}
            >
              <Text style={Styles.BottomViewText}>{Strings.termsCondition} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Strings.HelpScreen)
                setIsSettingsMenuOpen(false)
              }}>
              <Text style={Styles.BottomViewText}>{Strings.userInfoHeader} </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleOpenDialer}
            style={Styles.LowerCallWrappper}>
            <View style={Styles.CallImageContainer}>
              <Image source={Images.Fill_Call} style={Styles.CallImageContainerImage} />
            </View>
            <Text style={Styles.CallSupport}>{Strings.callSupport.toUpperCase()} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const createDynamicStyles = (Colors: ColorType) => {
  const Styles = StyleSheet.create({
    ParentContainer: {
      height: '100%',
      backgroundColor: Colors.bodyColor
    },
    TopNameContainer: {
      height: vh(80),
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
      height: vh(70),
      width: vw(70),
      borderRadius: normalize(100),
      marginLeft: vw(10),
      objectFit: 'contain',
      overflow: 'hidden',
      backgroundColor: Colors.KFC_red,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarImage: {
      height: vh(100),
      width: vw(100)
    },
    NameLetter: {
      fontFamily: Fonts.headerRegular,
      fontSize: normalize(30),
      color: Colors.constantWhite,
      textAlign: 'center',
    },
    Name: {
      fontFamily: Fonts.font18,
      fontSize: normalize(22),
      color: Colors.textBlack,
      textAlign: 'center',
      margin: normalize(15)
    },
    SettingsIcon: {
      height: vh(20),
      width: vw(20),
      tintColor: Colors.textBlack,
    },
    SettingOptionMenu: {
      minHeight: vh(60),
      width: vw(190),
      borderWidth: normalize(1),
      borderColor: Colors.fadeBorder,
      backgroundColor: Colors.bodyColor,
      position: 'absolute',
      zIndex: 5,
      right: vw(35),
      top: vh(55),
      borderRadius: normalize(5),
      shadowColor: Colors.blueShadows,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
    },
    SettingsMenuEntries: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: vw(10),
      alignItems: 'center',
      marginVertical: vh(10),
    },
    ThemeIcon: {
      height: vh(25),
      width: vw(25),
      tintColor: Colors.textBlack,
      margin: normalize(5)
    },
    LanguageCountryContainer: {
      height: vh(100),
      marginLeft: vw(20)
    },
    LanguageContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: vh(10),
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    Language: {
      fontSize: normalize(15),
      color: Colors.textBlack,
      fontFamily: Fonts.font17
    },
    LanguageChangeButton: {
      borderWidth: normalize(1),
      borderColor: Colors.KFC_red,
      borderRadius: normalize(2),
      marginHorizontal: vw(10)
    },
    LanguageText: {
      marginHorizontal: vw(12),
      color: Colors.textBlack,
      marginVertical: vh(8),
      fontFamily: Fonts.font17
    },
    CountryContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: vh(10),
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    CountryChangeButton: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: vw(10),
      alignItems: 'center'
    },
    Flag: {
      height: vh(20),
      width: vw(30),
      marginHorizontal: vw(10)
    },
    countryName: {
      fontSize: normalize(16),
      fontFamily: Fonts.font17,
      color: Colors.textBlack,
    },
    Arrow: {
      height: vh(10),
      width: vw(10),
      marginHorizontal: vw(8),
      tintColor: Colors.textBlack,
    },
    countrySelectorOption: {
      minHeight: vh(100),
      width: vw(120),
      borderWidth: normalize(1),
      borderColor: Colors.fadeBorder,
      backgroundColor: Colors.bodyColor,
      position: 'absolute',
      right: vw(0),
      top: vh(30),
      zIndex: 1000,
      borderRadius: normalize(5),
      shadowColor: Colors.blueShadows,
      shadowOffset: { width: vw(0), height: vh(2) },
      shadowOpacity: 0.25,
      shadowRadius: normalize(3.84),
      elevation: 5,
    },
    countryEntries: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: vh(40)
    },
    ActiveCountry: {
      backgroundColor: Colors.blueLightBG,
    },
    countryEntriesText: {
      marginBottom: vh(4),
      fontFamily: Fonts.font18,
      fontSize: normalize(16),
      color: Colors.textBlack,
      marginLeft: vw(4)
    },
    CustomBottomBorder: {
      width: '100%',
      height: vh(40),
      position: 'absolute',
      borderBottomColor: Colors.fadeBorder,
      borderBottomWidth: normalize(1),
    },
    MenuListContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: vh(30)
    },
    SingleEntry: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: normalize(5),
      marginLeft: vw(20),

    },
    SideImageIcon: {
      height: vh(28),
      width: vw(28),
      margin: normalize(12),
      tintColor: Colors.textBlack,
    },
    TrackOrderIcon: {
      height: vh(35),
      width: vw(35),
      margin: normalize(8)
    },
    singleEntryText: {
      fontFamily: Fonts.font18,
      fontSize: normalize(17),
      margin: normalize(5),
      color: Colors.textBlack,
    },
    LowerFAQSection: {

      height: vh(150),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginLeft: vw(40),
      marginTop: vh(30),
      marginBottom: vh(25),
    },
    BottomViewText: {
      fontFamily: Fonts.font17,
      fontSize: normalize(17),
      color: Colors.textBlack,
    },
    LowerCallSupportContainer: {
      position: 'absolute',
      left: vw(10),
    },
    LowerCallWrappper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginLeft: vw(20)
    },
    CallImageContainer: {
      backgroundColor: Colors.KFC_red,
      height: vh(30),
      width: vw(30),
      borderRadius: normalize(50),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: normalize(10),
    },
    CallImageContainerImage: {
      height: vh(18),
      width: vw(18),
      tintColor: Colors.constantWhite,
    },
    CallSupport: {
      fontFamily: Fonts.font9,
      fontSize: normalize(26),
      color: Colors.textBlack,
    }
  })
  return Styles
}
export default SideBar