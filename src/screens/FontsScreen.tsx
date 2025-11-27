import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'


// util files 
import Fonts from '../utils/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context'

// navigation 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const FontsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <SafeAreaView >

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.headerRegular }}>
                Login to unlock (header Regular)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.exp  }}>
                KFC (exp )
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.firstPageCUrsuve }}>
                It's finger likin' good
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.subHeader }}>
                CUSTOMIZED (subHeader)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.bodyBoldFot }}>
                Twister BBQ Box (bodyBoldFot)
            </Text>
            <Text
                style={{ fontSize: 20, }}>
                Twister BBQ Box (no font) 
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font1 }}>
                Twister BBQ Box (font1)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font2 }}>
                Twister BBQ Box (font2)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font3 }}>
                Twister BBQ Box (font3)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font4 }}>
                Twister BBQ Box (font4)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font5 }}>
                KFC (font5)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font6 }}>
                Twister BBQ Box (font6)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font7 }}>
                Twister BBQ Box (font7)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font9, fontWeight: 700 }}>
                Finger Licling (font9)
            </Text>
            <Text
                style={{ fontSize: 20,}}>
                Finger Licling (no font)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font10 , fontWeight: 600 }}>
                FOR SHARING (font10)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font11 }}>
                Twister BBQ Box (font11)
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font8 }}>
                Twister BBQ Box (font8)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20,}}>
                Twister BBQ Box (no fonts)
            </Text>
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font12 }}>
                Twister BBQ Box (font12)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font13 }}>
                Twister BBQ Box (font13)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font14 }}>
                Twister BBQ Box (font14)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font15 }}>
                Twister BBQ Box (font15)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font16 }}>
                Twister BBQ Box (font16)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font17 }}>
                Twister BBQ Box (font17)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font18 }}>
                Twister BBQ Box (font18)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font19 }}>
                Twister BBQ Box (font19)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font20 }}>
                Twister BBQ Box (font20)
            </Text>
            <View style={Styles.divider} />

            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font21 }}>
                Twister BBQ Box (font21)
            </Text>
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
        height: 1,
        borderTopColor: '#000000',
        borderTopWidth: 1
    }
})
export default FontsScreen