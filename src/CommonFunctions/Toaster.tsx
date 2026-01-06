import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
//utils 
import { ToastService, ToastType } from '../utils/toastService';
import { COLORS } from '../utils/constants'
import { normalize, vh, vw } from '../utils/Dimensions';
import { useThemeColors } from '../utils/Colors';
interface toastType {
    message: string;
    type: ToastType
}
const Toast = () => {
    const Colors = useThemeColors()
    const Styles = createDynamicStyles(Colors);
    const [toast, setToast] = useState<toastType | null>(null);
    const translateY = useRef(new Animated.Value(-100)).current;
    useEffect(() => {
        ToastService.register(({ message, type = 'info' }) => {
            setToast({ message, type });

            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: 60,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    }, [translateY]);

    if (!toast) return null;

    return (
        <Animated.View
            style={[
                Styles.toast,
                {
                    backgroundColor: COLORS[toast.type],
                    transform: [{ translateY }],
                },
            ]}
        >
            <Text style={Styles.text}>{toast.message}</Text>
        </Animated.View>
    );
};

export default Toast;
const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        toast: {
            position: 'absolute',
            left: vw(16),
            right: vw(16),
            borderRadius: normalize(12),
            paddingVertical: vh(14),
            paddingHorizontal: vw(16),
            zIndex: 999,
            elevation: 999999,
        },
        text: {
            color: Colors.constantWhite,
            fontWeight: '600',
            textAlign: 'center',
        },
    })
    return Styles;
}
