import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useRef, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import { useStrings } from '../../utils/Strings';
import { CountryInfo } from '../../data/CountryInfo';
import { useCountry } from '../../context/CountryContext';
import { normalize, vh, vw } from '../../utils/Dimensions'

export default function CountrySelectionBottomSheet() {
  const slide = useRef<Animated.Value>(new Animated.Value(500)).current;
  const fade = useRef<Animated.Value>(new Animated.Value(0)).current;
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors)
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList2>>();
  const { countrySelected, setCountrySelected } = useCountry();
  const slideUp = useCallback((): void => {
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [slide, fade])
  const slideDown = (): void => {
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };
  const closeModal = (): void => {
    slideDown();
    setTimeout(() => {
      navigation.pop();
    }, 400);
  };
  useEffect(() => {
    slideUp();
  }, [slideUp]);
  return (
    <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>
      <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
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
      display: 'flex',
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomSheeetContentContainer: {
      height: '100%',
    },
    WelcomeHeader: {
      fontSize: normalize(22),
      fontFamily: Fonts.font17,
      alignSelf: 'center',
      letterSpacing: normalize(1),
      marginTop: vh(40),
      color: Colors.textBlack
    },
    countryDescription: {
      width: "90%",
      alignSelf: 'center',
      fontFamily: Fonts.font16,
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
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: vh(10)
    },
    CountryEntries: {
      display: 'flex',
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    CountryEntriesRight: {
      display: 'flex',
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
      fontFamily: Fonts.font17,
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
      display: 'flex',
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
      display: 'flex',
      alignItems: 'center'
    },
    DoneButtonText: {
      fontSize: normalize(18),
      fontFamily: Fonts.font18,
      color: Colors.constantWhite
    }
  })
  return Styles
}