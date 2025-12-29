import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import React, { } from 'react'
// util files 
import Fonts from '../utils/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
// navigation 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { normalize, vh } from '../utils/Dimensions';
const FontsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <SafeAreaView >
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.headerRegular }]}>
                Login to unlock 10 , 100 (header Regular)
            </Text> */}
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.exp }]}>
                KFC   10 , 100  (exp )
            </Text>
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.firstPageCUrsuve }]}>
                It's finger likin' good  10 , 100
            </Text>
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.subHeader }]}>
                CUSTOMIZED  10 , 100  (subHeader)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={Styles.text}>
                Twister BBQ Box  10 , 100 (no font)
            </Text>
            <View style={Styles.divider} />
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font1 }]}>
                Twister BBQ Box  10 , 100 (font1)
            </Text> */}
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.nationalBold }]}>
                Twister BBQ Box  10 , 100 (nationalBold)
            </Text>
            <View style={Styles.divider} />
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font3 }]}>
                Twister BBQ Box  10 , 100 (font3)
            </Text> */}
            <View style={Styles.divider} />
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font4 }]}>
                Twister BBQ Box  10 , 100 (font4)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.expHead }]}>
                KFC  10 , 100 (expHead)
            </Text> */}
            <View style={Styles.divider} />
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font6 }]}>
                Twister BBQ Box  10 , 100 (font6)
            </Text> */}
            <View style={Styles.divider} />
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font7 }]}>
                Twister BBQ Box  10 , 100 (font7)
            </Text> */}
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.nationalMedium, }]}>
                Finger Licling  10 , 100 (nationalMedium)
            </Text>
            <Text
                style={Styles.text}>
                Finger Licling  10 , 100 (no font)
            </Text>
            <View style={Styles.divider} />
            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font10 }]}>
                FOR SHARING  10 , 100 (font10)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.font11 }]}>
                Twister BBQ Box  10 , 100 (font11)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={[Styles.text, { fontFamily: Fonts.font8 }]}>
                Twister BBQ Box  10 , 100 (font8)
            </Text> */}
            <View style={Styles.divider} />

            <Text
                style={{}}>
                Twister BBQ Box  10 , 100 (no fonts)
            </Text>
            <Text
                style={[Styles.text, { fontFamily: Fonts.font12 }]}>
                Twister BBQ Box  10 , 100 (font12)
            </Text>
            <View style={Styles.divider} />

            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font13 }]}>
                Twister BBQ Box  10 , 100 (font13)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={[Styles.text, { fontFamily: Fonts.font14 }]}>
                Twister BBQ Box  10 , 100 (font14)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={[Styles.text, { fontFamily: Fonts.font15 }]}>
                Twister BBQ Box  10 , 100 (font15)
            </Text> */}
            <View style={Styles.divider} />

            <Text
                style={[Styles.text, { fontFamily: Fonts.helveticaLight }]}>
                Twister BBQ Box  10 , 100 (helveticaLight)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={[Styles.text, { fontFamily: Fonts.helveticaMedium }]}>
                Twister BBQ Box  10 , 100 (helveticaMedium)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={[Styles.text, { fontFamily: Fonts.helveticaBold }]}>
                Twister BBQ Box  10 , 100 (helveticaBold)
            </Text>
            <View style={Styles.divider} />

            {/* <Text
                style={[Styles.text, { fontFamily: Fonts.font19 }]}>
                Twister BBQ Box  10 , 100 (font19)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={[Styles.text, { fontFamily: Fonts.nationalBold0 }]}>
                Twister BBQ Box  10 , 100 (nationalBold0)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontFamily: Fonts.nationalBold1 }}>
                Twister BBQ Box  10 , 100 (nationalBold1)
            </Text> */}
            <View style={Styles.divider} />



            <TouchableOpacity style={[Styles.buttonContainer]}
                onPress={() => navigation.pop()}>
                <Text style={[Styles.buttonText]}>Go Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    buttonContainer: {

    },
    buttonText: {

    },
    divider: {
        width: 'auto',
        height: vh(1),
        borderTopColor: '#000000',
        borderTopWidth: normalize(1)
    },
    text: {
        fontSize: normalize(20),
    }
})
export default FontsScreen