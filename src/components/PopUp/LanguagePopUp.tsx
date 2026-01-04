import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// util imports 
import { useThemeColors } from '../../utils/Colors';
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useLanguage } from '../../context/LanguageContex';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function LanguagePopUp() {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const Styles = createDynamicStyles(Colors)
    const inset = useSafeAreaInsets();
    const { language, setLanguage } = useLanguage()
    const [tempLang, settempLang] = useState<string>(language)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleSelectionLanguage = (lang: string): void => {
        settempLang(lang)
    }
    const handleSetLanguage = (): void => {
        setLanguage(tempLang);
        navigation.pop()
    }
    return (
        <View style={Styles.backDrop}>
            <TouchableWithoutFeedback onPress={() => navigation.pop()} accessible={false}>
                <View style={[Styles.Wrapper, { marginTop: inset.top }]}>
                    <TouchableWithoutFeedback>
                        <View style={Styles.PopUpContainer}>
                            <Text style={Styles.selectionLanguageHeader}>{Strings.pleaseSelectlanguage} </Text>
                            <View style={[Styles.LanguageChangeContainer,]}>
                                < TouchableOpacity
                                    activeOpacity={.7}
                                    onPress={() => handleSelectionLanguage('en')}
                                    style={[Styles.languageContainer]}>
                                    <Text style={Styles.changeText}>{Strings.english}</Text>
                                    <View
                                        style={[Styles.checkBox]}
                                    >
                                        {tempLang === 'en' && (
                                            <View style={Styles.TickMarkImageContainer}>
                                                <Image source={Images.Tick_Mark} style={[Styles.tickMark]} />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleSelectionLanguage('ar')}
                                    style={[Styles.languageContainer,]}>
                                    <Text style={Styles.changeText}>{Strings.arabic}</Text>
                                    <View
                                        style={[Styles.checkBox]}
                                    >
                                        {tempLang === 'ar' && (
                                            <View style={Styles.TickMarkImageContainer}>
                                                <Image source={Images.Tick_Mark} style={[Styles.tickMark]} />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                activeOpacity={.5}
                                style={[Styles.loginButton, {}]}
                                onPress={handleSetLanguage}>
                                <Text style={[Styles.LoginButtonText]}>{Strings.done}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </View>
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
        Wrapper: {
            height: '100%',
            width: '100%',flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        PopUpContainer: {
            height: vh(250),
            width: vw(350),
            borderWidth: normalize(1),
            borderRadius: normalize(15),
            backgroundColor: Colors.bodyColor,
        },
        selectionLanguageHeader: {
            fontSize: normalize(20),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
            alignSelf: 'center',
            marginVertical: vh(20),
        },
        LanguageChangeContainer: {
            width: '90%',
            height: vh(45),
            marginHorizontal: 'auto',
            borderRadius: normalize(2),flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: vh(20)
        },
        languageContainer: {
            width: '45%',
            height: vh(45),
            backgroundColor: Colors.bodyShadeColor,
            borderRadius: normalize(6),flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: normalize(1),
            borderColor: Colors.fadeBorder
        },
        checkBox: {
            height: vh(25),
            width: vw(25),
            borderRadius: '50%',
            borderWidth: normalize(2),justifyContent: 'center',
            alignItems: 'center',
            marginRight: vw(15),
            borderColor: Colors.textFadeBlack
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
        changeText: {
            marginRight: vw(10),
            marginLeft: vw(15),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        loginButton: {
            position: 'absolute',
            left: '5%',
            bottom: '10%',
            height: vh(50),
            width: '90%',
            marginHorizontal: 'auto',alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: normalize(2),
            backgroundColor: Colors.KFC_red
        },
        LoginButtonText: {
            fontSize: normalize(16),
            fontFamily: Fonts.helveticaBold,
            color: Colors.constantWhite
        },
    })
    return Styles
}