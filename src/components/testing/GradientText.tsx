import { Text, TextProps } from 'react-native';
import React from 'react';
// masked view 
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from 'react-native-linear-gradient';
// utils
import { useThemeColors } from '../../utils/Colors';
const GradientText = (props: TextProps ) => {
    const Colors = useThemeColors()
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={[Colors.KFC_red, Colors.greenOk, Colors.ButtonBlueColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;