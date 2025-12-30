import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//animaiton 
import Animated, { FadeIn, FadeInRight, FadeOut, Layout, Easing, FadeInLeft, FadeOutRight, BounceIn, BounceInRight, BounceInLeft, BounceOut } from 'react-native-reanimated';

// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function ReAnimated2() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // card fading entering 


    type Card = {
        id: number;
        label: string;
    };

    const initialCards: Card[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,              // stable unique key
        label: `Card ${i + 1}`,
    }));

    const [cards, setCards] = useState<Card[]>(initialCards);

    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.ReAnimatedScreen}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                <ScrollView>
                    <Text style={Styles.secitonTitle2}> layout animation   </Text>
                    <Animated.View >
                        {cards.map((item, idx) => (
                            <TouchableOpacity onPress={() => {
                                console.log(idx)
                                setCards(prev => prev.filter(card => card.id !== item.id));
                            }}
                                key={item.id}
                            >
                                <Animated.View
                                    entering={FadeInLeft.duration(500).delay(idx * 120).easing(Easing.ease)}
                                    exiting={FadeInRight
                                        .withCallback((finished) => {
                                            console.log(`finished without interruptions: ${finished}`);
                                        })}
                                    layout={Layout.delay(500).springify(500)}
                                    style={[Styles.EnteringCard, {
                                    }]}>
                                    <Text>{item.label}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>

                    <Text style={Styles.secitonTitle2}> Animated Custom shimmer   </Text>


                </ScrollView>
            </View>
        </View >
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            height: '100%',
            backgroundColor: Colors.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: vh(15),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors.textBlack,
            height: vh(18),
            width: vw(18),
            alignSelf: 'flex-start',
            marginHorizontal: vw(18),
        },
        body: {
            flex: 1,
        },
        secitonTitle2: {
            fontSize: normalize(18),
            alignSelf: 'center',
            marginVertical: vh(10)
        },
        EnteringCard: {
            backgroundColor: Colors.greenOk,
            height: vh(30),
            width: vw(300),
            alignSelf: 'center',
            margin: normalize(5),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        }
    });
    return Styles;
};