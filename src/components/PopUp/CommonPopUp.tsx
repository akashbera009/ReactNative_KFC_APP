import { View, Text, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils 
import Fonts from '../../utils/Fonts';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize, vh, vw } from '../../utils/Dimensions';

export const CommonPopUp = ({ header, message }: CommonPopUpScreenProps) => {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const Styles = createDynamicStyles(Colors, Fonts);
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    }
        , []);
    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.pop()}>
            <Animated.View style={[Styles.popupOverlay, { opacity }]}>
                <TouchableOpacity>
                    <Animated.View style={[Styles.popupBox, { opacity: opacity }]}>
                        <Text style={Styles.popupTitle}>{header}</Text>
                        <Text style={Styles.popupMessage}>
                            {message}
                        </Text>
                        <TouchableOpacity
                            style={Styles.popupButton}
                            onPress={() => {
                                navigation.pop()
                            }}
                        >
                            <Text style={Styles.saveText}>{Strings.done.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        popupOverlay: {
            position: 'absolute',
            top: vh(0),
            left: vw(0),
            height: '100%',
            width: '100%',
            backgroundColor: Colors.SemiTransparent,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
        },
        popupBox: {
            width: '80%',
            backgroundColor: Colors.bodyColor,
            padding: normalize(20),
            borderRadius: normalize(10),
            elevation: 10
        },
        popupTitle: {
            fontSize: normalize(18),
            fontWeight: 700,
            fontFamily: Fonts.subHeader,
            color: Colors.textBlack,
            marginBottom: vh(10),
        },
        popupMessage: {
            fontSize: normalize(14),
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack,
            marginBottom: vh(20)
        },
        popupButton: {
            marginTop: vh(15),
            paddingHorizontal: vw(0),
            paddingVertical: vh(12),
            borderRadius: normalize(5),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: Colors.KFC_red
        },
        saveText: {
            fontSize: normalize(16),
            fontFamily: Fonts.font17,
            color: Colors.constantWhite,
            fontWeight: 700
        }
    })
    return Styles;
};