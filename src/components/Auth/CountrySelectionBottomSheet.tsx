import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated ,{ interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import { useStrings } from '../../utils/Strings';
import { CountryInfo } from '../../data/CountryInfo';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions'

export default function CountrySelectionBottomSheet() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors)
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { countrySelected, setCountrySelected } = useCountry();
  // animation
  const slideRef = useSharedValue<number>(0)
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: slideRef.value }],
  }))
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      slideRef.value,
      [0, 500],
      [1, 0]
    )
  }))
  const slideDown = () => {
    slideRef.value = withTiming(450, { duration: 500 })
  }
  const closeModal = (): void => {
    slideDown();
    setTimeout(() => {
      navigation.pop();
    }, 400);
  };
  useEffect((): void => {
    slideRef.value = withTiming(0, { duration: 500 })
  }, [slideRef]);
  return (
    <Animated.View style={[Styles.backDrop, fadeStyle]}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>
      <Animated.View style={[Styles.bottomSheet, animatedStyles ]}>
      <View style={Styles.InnerContainer}>
        <View style={Styles.ThreeColumnStyle}>
          <View style={[Styles.singleCOlumnStyle,]} />
          <View style={[Styles.singleCOlumnStyle,]} />
          <View style={[Styles.singleCOlumnStyle,]} />
        </View>
        <View style={Styles.bottomSheeetContentContainer}>
          <Text style={Styles.WelcomeHeader}>{Strings.welcome}</Text>
          <Text style={Styles.countryDescription} numberOfLines={3} >{Strings.countryDescription}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={Styles.CountryContainer}>
            {CountryInfo.map((country, idx) => (
              <TouchableOpacity
                activeOpacity={.5}
                onPress={() => {
                  setCountrySelected(country)
                }}
                key={idx} style={Styles.CountryEntries}>
                <View style={Styles.CountryEntriesLeft}>
                  <Image source={country?.flag} style={Styles.FlagIcon} />
                  <View style={Styles.CountryEntriesRight}>
                    <Text style={Styles.CountryName}>{country?.name}</Text>
                    {countrySelected?.code === country?.code && (
                      <Text style={Styles.needToHaveLocalNumber}>{Strings.needToHaveLocalNumber}</Text>
                    )}
                  </View>
                </View>
                <View style={Styles.CheckBox}>
                  {countrySelected?.code === country?.code && (
                    <View style={Styles.CheckBoxSelected} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={[Styles.DoneButtonContainer, { bottom: inset.bottom + vh(30) }]}
            onPress={() => navigation.pop()}>
            <Text style={Styles.DoneButtonText}>{Strings.done.toLocaleUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
    </Animated.View >
  )
}
const createDynamicStyles = (Colors: ColorType) => {

  const Styles = StyleSheet.create({
    backDrop: {
      backgroundColor: Colors.SemiTransparent,
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end'
    },
    CloseTouchable: {
      height: '100%'
    },
    bottomSheet: {
      width: '100%',
      height: vh(500),
    },
    InnerContainer: {
      height: '100%',
      backgroundColor: Colors.bodyColor,
      borderTopRightRadius: normalize(40),
      borderTopLeftRadius: normalize(40),
      position: 'relative',
    },
    ThreeColumnStyle: {
      alignSelf: 'center',
      width: '22%',
      height: vh(30),
       
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    singleCOlumnStyle: {
      height: vh(28),
      width: vw(18),
      backgroundColor: Colors.KFC_red,
    },
    closeButton: {
      marginVertical: vh(8),
      marginHorizontal: 'auto',
      height: vh(40),
      width: vw(40),
      borderRadius: '50%',
      backgroundColor: Colors.textBlack,
       
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomSheeetContentContainer: {
      height: '100%',
    },
    WelcomeHeader: {
      fontSize: normalize(22),
      fontFamily: Fonts.helveticaMedium,
      alignSelf: 'center',
      letterSpacing: normalize(1),
      marginTop: vh(40),
      color: Colors.textBlack
    },
    countryDescription: {
      width: "90%",
      alignSelf: 'center',
      fontFamily: Fonts.helveticaLight,
      fontSize: normalize(17),
      textAlign: 'center',
      color: Colors.textFadeBlack,
      marginTop: vh(15),
      lineHeight: vh(27),
    },
    CountryContainer: {
      maxHeight: vh(230),
      marginTop: vh(10),
      width: '100%',
      alignSelf: 'center',
       
      flexDirection: 'column',
      paddingBottom: vh(10)
    },
    CountryEntries: {
       
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: vh(70),
      width: '85%',
      alignSelf: 'center',
      backgroundColor: Colors.bodyColor,
      marginVertical: vh(10),
      borderRadius: normalize(1),
      shadowColor: Colors.blueShadows,
      shadowOffset: { height: vh(5), width: vw(2) },
      shadowOpacity: .2,
      shadowRadius: normalize(8)
    },
    CountryEntriesLeft: {
       
      flexDirection: 'row',
      alignItems: 'center'
    },
    CountryEntriesRight: {
       
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: vw(20),
      height: vh(40),
    },
    FlagIcon: {
      height: vh(25),
      width: vw(40)
    },
    CountryName: {
      fontSize: normalize(14),
      fontFamily: Fonts.helveticaMedium,
      color: Colors.textFadeBlack2
    },
    needToHaveLocalNumber: {
      fontSize: normalize(12),
      color: Colors.timerFadeText,
      fontFamily: Fonts.subHeader,
      marginTop: vh(6)
    },
    CheckBox: {
      height: vh(20),
      width: vw(20),
      borderWidth: normalize(2),
      borderColor: Colors.fadeBorder,
      borderRadius: normalize(10),
       
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: vw(15)
    },
    CheckBoxSelected: {
      height: vh(10),
      width: vw(10),
      backgroundColor: Colors.KFC_red,
      borderRadius: normalize(10),
    },

    DoneButtonContainer: {
      position: 'absolute',
      left: '5%',
      width: '90%',
      alignSelf: 'center',
      backgroundColor: Colors.KFC_red,
      borderRadius: normalize(2),
      paddingVertical: vh(10),
       
      alignItems: 'center'
    },
    DoneButtonText: {
      fontSize: normalize(18),
      fontFamily: Fonts.helveticaBold,
      color: Colors.constantWhite
    }
  })
  return Styles
}