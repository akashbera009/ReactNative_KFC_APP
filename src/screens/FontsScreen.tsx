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
                Login to unlock
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.firstPageCUrsuve }}>
                It's finger likin' good
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.subHeader }}>
                CUSTOMIZED
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.bodyBoldFot }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font1 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font2 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font3 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font4 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font5 }}>
                KFC
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font6 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font7 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font9 }}>
               Finger Licling
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font10 }}>
                fiinger licking 
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font11 }}>
                Twister BBQ Box
            </Text>
            <View style={Styles.divider} />
            <Text
                style={{ fontSize: 20, fontFamily: Fonts.font8 }}>
                Twister BBQ Box
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