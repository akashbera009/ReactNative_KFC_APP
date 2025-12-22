import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
// utils
import Fonts from '../utils/Fonts';
import { useThemeColors } from '../utils/Colors';
import { normalize, screenWidth, vh, vw } from '../utils/Dimensions';

export default function Shimer() {
    const Colors = useThemeColors();
    const Styles = createDynamicStyles(Colors, Fonts);

    const translateRef = useRef<Animated.Value>(new Animated.Value(-screenWidth)).current
    useEffect((): void => {
        Animated.loop(
            Animated.timing(translateRef , {
                toValue : screenWidth , 
                duration : 1500, 
                useNativeDriver : true
            })
        ).start()
    }, [])

    return (
        <View style={Styles.container}>
            <View style={Styles.card}>
                <View style={Styles.box}>
                    <View style={[Styles.box, Styles.box2]} />
                    <View style={[Styles.box, Styles.box3]} />
                    <Animated.View style={[Styles.shimmer , {transform:[
                        {translateX: translateRef}
                    ]}]} />
                </View>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        card: {
            backgroundColor: Colors?.bodyColor,
            padding: normalize(15),
            margin: normalize(10),
            borderRadius: normalize(8),
            overflow: 'hidden',
        },
        box: {
            height: vh(80),
            backgroundColor: Colors.bodyLigheterColor,
            borderRadius: normalize(4),
            marginBottom: vh(6)
        },
        box2: {
            width: '60%',
            height: vh(20)
        },
        box3: {
            width: '80%',
            height: vh(40),
            marginBottom: 0,
        },
        shimmer: {
            height: '100%',
            width: '100%',
            backgroundColor: Colors.HyperTransparent,
            position: 'absolute',
            top : vh(15) , 
            left : vw(10)
        }
    });
    return Styles;
};