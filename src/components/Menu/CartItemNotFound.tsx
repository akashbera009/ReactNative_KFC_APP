import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//redux
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
// data imports 
import { normalize, vh, vw } from '../../utils/Dimensions';

export const CartItemNotFound = () => {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={Styles.NotFoundContainer}>
            <View style={Styles.imageContaienr}>
                <Image source={Images?.CartEmptyDustbin} style={Styles.ConfeeCupImage} />
                <Text style={Styles.questionMark}>? </Text>
            </View>
            <Text style={Styles.Opps}>{Strings.cartIsEmpty} </Text>
            <Text style={Styles.NotFoundRes}>{Strings.addSomeItem} </Text>
            <TouchableOpacity
                style={Styles.ExploreMoreButton}
                onPress={() => {
                    navigation.navigate(Strings.ExploreMenuScreen, {
                        categoryType: Strings.dealsString
                    })
                }}
            >
                <Text style={Styles.ExploreMoreButtonTxt}>{Strings.exploreKFCMenu.toUpperCase()} </Text>
            </TouchableOpacity>
        </View>
    )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        NotFoundContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageContaienr: {
            height: vh(220),
            width: vw(220),
            borderRadius: normalize(200),
            backgroundColor: Colors.blueLightBG,
            marginHorizontal: 'auto',
            marginTop: vh(120),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        ConfeeCupImage: {
            height: vh(120),
            width: vw(120),
            transform: [{ rotate: '-20deg' }],
            zIndex: 5,
        },
        questionMark: {
            fontSize: normalize(50),
            fontFamily: Fonts.expHead,
            position: 'absolute',
            top: vh(30),
            right: vw(50),
            color: Colors.constantBlack
        },
        Opps: {
            marginTop: vh(50),
            alignSelf: 'center',
            fontSize: normalize(20),
            fontWeight: 700,
            color: Colors.textBlack,
            fontFamily: Fonts.font17
        },
        NotFoundRes: {
            alignSelf: 'center',
            marginVertical: vh(10),
            fontSize: normalize(14),
            fontWeight: 600,
            marginTop: vh(20),
            color: Colors.resendOtpText,
            fontFamily: Fonts.subHeader
        },
        ExploreMoreButton: {
            backgroundColor: Colors.KFC_red,
            marginHorizontal: 'auto',
            marginTop: vh(20),
            borderRadius: normalize(2),
        },
        ExploreMoreButtonTxt: {
            color: Colors.constantWhite,
            fontWeight: 600,
            fontSize: normalize(15),
            marginHorizontal: vw(35),
            marginVertical: vh(16),
            fontFamily: Fonts.font17
        },
    })
    return Styles;
};