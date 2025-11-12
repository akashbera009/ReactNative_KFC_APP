import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import { useStrings } from '../../utils/Strings';
import { useLanguage } from '../../context/LanguageContex';
import Images from '../../utils/LocalImages';

export default function LanguagePopUp() { 
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors, Fonts)
    const inset = useSafeAreaInsets();
    const { language, setLanguage } = useLanguage()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={Styles.backDrop}>
            <TouchableWithoutFeedback onPress={() => navigation.pop()} accessible={false}>
                <View style={[Styles.Wrapper, { marginTop: inset.top }]}>
                    <TouchableWithoutFeedback>

                        <View style={Styles.PopUpContainer}>
                            <Text style={Styles.selectionLanguageHeader}>{Strings?.pleaseSelectlanguage} </Text>
                            <View style={[Styles.LanguageChangeContainer,]}>
                                < TouchableOpacity
                                    activeOpacity={.7}
                                    onPress={() => setLanguage('en')}
                                    style={[Styles.languageContainer]}>
                                    <Text style={Styles.changeText}>{Strings?.english}</Text>
                                    <View
                                        style={[Styles.checkBox]}
                                    >
                                        {language == 'en' && (
                                            <View style={Styles.TickMarkImageContainer}>
                                                <Image source={Images?.Tick_Mark} style={[Styles.tickMark]} />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setLanguage('ar')}
                                    style={[Styles.languageContainer,]}>
                                    <Text style={Styles.changeText}>{Strings?.arabic}</Text>
                                    <View
                                        style={[Styles.checkBox]}
                                    >
                                        {language == 'ar' && (
                                            <View style={Styles.TickMarkImageContainer}>
                                                <Image source={Images?.Tick_Mark} style={[Styles.tickMark]} />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                activeOpacity={.5}
                                style={[Styles.loginButton, {}]}
                                onPress={() => navigation.pop()}>
                                <Text style={[Styles.LoginButtonText]}>{Strings?.done}</Text>
                            </TouchableOpacity>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </View>
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
        Wrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        PopUpContainer: {
            height: 250,
            width: 350,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: Colors?.bodyColor,
        },
        selectionLanguageHeader: {
            fontSize: 20,
            fontWeight: 600,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textBlack,
            alignSelf: 'center',
            marginVertical: 20,
        },
        LanguageChangeContainer: {
            width: '90%',
            height: 45,
            marginHorizontal: 'auto',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 20
        },
        languageContainer: {
            width: '45%',
            height: 45,
            backgroundColor: Colors?.bodyShadeColor,
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors?.fadeBorder
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
            borderColor: Colors?.textFadeBlack
        },
        tickMark: {
            height: 15,
            width: 15,
        },
        TickMarkImageContainer: {
            borderRadius: 50,
            padding: 6,
            tintColor: Colors?.constantWhite,
            backgroundColor: Colors?.KFC_red
        },
        changeText: {
            marginRight: 10,
            marginLeft: 15,
            fontWeight: 700,
            fontFamily: Fonts?.subHeader,
            color: Colors?.textBlack
        },
        loginButton: {
            position: 'absolute',
            left: '5%',
            bottom: '10%',
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
    })
    return Styles
}