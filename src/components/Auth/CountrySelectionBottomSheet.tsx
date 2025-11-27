import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useRef, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import { useStrings } from '../../utils/Strings';
import { CountryInfo } from '../../data/CountryInfo';
import { useCountry } from '../../context/CountryContext';


export default function CountrySelectionBottomSheet() {
  const slide = useRef(new Animated.Value(500)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts)
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { countrySelected, setCountrySelected } = useCountry();

  const slideUp = () => {
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
  };

  const slideDown = () => {
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

  const closeModal = () => {
    slideDown();
    setTimeout(() => {
      navigation.pop();
    }, 400);
  };

  useEffect(() => {
    slideUp();
  }, []);
  return (
    <Animated.View style={[Styles.backDrop, { opacity: fade }]}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>
      <Animated.View style={[Styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
        <View style={Styles.OuterContainer}>
          <View style={Styles.InnerContainer}>
            <View style={Styles.ThreeColumnStyle}>
              <View style={[Styles.singleCOlumnStyle,]} />
              <View style={[Styles.singleCOlumnStyle,]} />
              <View style={[Styles.singleCOlumnStyle,]} />
            </View>
            <View style={Styles.bottomSheeetContentContainer}>
              <Text style={Styles.WelcomeHeader}>{Strings?.welcome}</Text>
              <Text style={Styles.countryDescription} numberOfLines={3} >{Strings?.countryDescription}</Text>
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
                        {countrySelected?.code == country?.code && (
                          <Text style={Styles.needToHaveLocalNumber}>{Strings?.needToHaveLocalNumber}</Text>
                        )}
                      </View>
                    </View>
                    <View

                      style={Styles.CheckBox}
                    >
                      {countrySelected?.code == country?.code && (
                        <View
                          style={Styles.CheckBoxSelected}
                        />
                      )
                      }
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[Styles.DoneButtonContainer, { bottom: inset.bottom + 30 }]}
                onPress={() => navigation.pop()}>
                <Text style={Styles.DoneButtonText}>{Strings?.done.toLocaleUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View >
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {

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
      height: 500,
    },
    OuterContainer: {

    },
    InnerContainer: {
      height: '100%',
      backgroundColor: Colors.bodyColor,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      position: 'relative',
    },
    ThreeColumnStyle: {
      alignSelf: 'center',
      width: '22%',
      height: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    singleCOlumnStyle: {
      height: 28,
      width: 18,
      backgroundColor: Colors?.KFC_red,
    },

    closeButton: {
      marginVertical: 8,
      marginHorizontal: 'auto',
      height: 40,
      width: 40,
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
      fontSize: 22,
      fontFamily: Fonts?.subHeader,
      fontWeight: 700,
      alignSelf: 'center',
      letterSpacing: 1,
      marginTop: 40
    },
    countryDescription: {
      width: "90%",
      alignSelf: 'center',
      fontFamily: Fonts?.fon17,
      fontSize: 17,
      fontWeight: 500,
      textAlign: 'center',
      color: Colors?.textFadeBlack,
      marginTop: 15,
      lineHeight: 27 ,
    },
    CountryContainer: {
      maxHeight: 230,
      marginTop: 10 , 
      width: '100%',
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    CountryEntries: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 70,
      width: '85%',
      alignSelf: 'center',
      backgroundColor: Colors?.bodyColor,
      marginVertical: 10,
      borderRadius: 1,
      shadowColor: Colors?.blueShadows,
      shadowOffset: { height: 5, width: 2 },
      shadowOpacity: .2,
      shadowRadius: 8
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
      marginLeft: 20,
      height: 40,
    },
    FlagIcon: {
      height: 25,
      width: 40
    },
    CountryName: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: Fonts?.subHeader
    },
    needToHaveLocalNumber: {
      fontSize: 12,
      color: Colors?.timerFadeText,
      fontFamily: Fonts?.subHeader,
      marginTop: 6
    },
    CheckBox: {
      height: 20,
      width: 20,
      borderWidth: 2,
      borderColor: Colors?.fadeBorder,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15
    },
    CheckBoxSelected: {
      height: 10,
      width: 10,
      backgroundColor: Colors?.KFC_red,
      borderRadius: 10,
    },

    DoneButtonContainer: {
      position: 'absolute',
      left: '5%',
      width: '90%',
      alignSelf: 'center',
      backgroundColor: Colors?.KFC_red,
      borderRadius: 2,
      paddingVertical: 10,
      display: 'flex',
      alignItems: 'center'
    },
    DoneButtonText: {
      fontSize: 18,
      fontFamily: Fonts?.subHeader,
      fontWeight: 800,
      color: Colors?.constantWhite
    }
  })
  return Styles
}