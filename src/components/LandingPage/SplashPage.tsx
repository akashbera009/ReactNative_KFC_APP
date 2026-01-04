import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
//util files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useStrings } from '../../utils/Strings'
import { useThemeColors } from '../../utils/Colors'
import { normalize, vh, vw } from '../../utils/Dimensions'
export default function SplashPage() {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const inset = useSafeAreaInsets()
    const Styles = createDynamicStyles(Colors)
    return (
        <View style={Styles.HomeScreen}>
            <View style={Styles.backGroundContainer}>
                <View style={Styles.ThreeColumnStyle}>
                    <View style={Styles.singleCOlumnStyle} />
                    <View style={Styles.singleCOlumnStyle} />
                    <View style={Styles.singleCOlumnStyle} />
                </View>
                <View style={[Styles.LowerContainer, { marginBottom: inset.bottom + 80 }]}>
                    <Text numberOfLines={2} style={Styles.mainText}>
                        "{Strings.lickingGood}"
                    </Text>
                </View>
            </View>
            <View style={Styles.logoImageContainer}>
                <Image source={Images.KFC_logo_image} style={Styles.LogoImage} />
            </View>
        </View>
    )
}
const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        HomeScreen: {
            width: '100%',
            height: '100%',
            backgroundColor: Colors.KFC_red
        },
        backGroundContainer: {
            width: '100%',
            height: '100%',flexDirection: 'column',
            justifyContent: 'space-between',
        },
        ThreeColumnStyle: {
            marginHorizontal: "auto",
            width: '50%',
            height: vh(180),flexDirection: 'row',
            justifyContent: 'space-around',
        },
        singleCOlumnStyle: {
            height: vh(120),
            width: vw(40),
            backgroundColor: Colors.constantWhite
        },
        LowerContainer: {flexDirection: 'column',
            justifyContent: 'flex-end',
            transform: [{ rotate: '-8deg' }],
        },
        logoImageContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',justifyContent: 'center',
            alignItems: 'center',
        },
        LogoImage: {
            height: vh(220),
            width: (220),
            marginHorizontal: 'auto',
        },
        mainText: {
            fontFamily: Fonts.firstPageCUrsuve,
            color: Colors.constantWhite,
            fontSize: normalize(65),
            maxWidth: '90%',
            marginHorizontal: 'auto',
            textAlign: 'center'
        }
    })
    return Styles
}