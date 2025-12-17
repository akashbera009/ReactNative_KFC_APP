import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom component
import BottomCart from './BottomCart';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { vh, vw, normalize } from '../../utils/Dimensions'

export default function FoodCustomizationPage({ foodItem }: { foodItem: menuDataType }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [active, setActive] = React.useState(0);
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <View style={Styles.HeaderTextContainer}>
                        <Text style={Styles.navHeaderText} >{foodItem?.name}</Text>
                    </View>
                </View>
                <View style={Styles.resetButton}>
                    <Text style={Styles.resetButtonText}>{Strings.reset.toUpperCase()} </Text>
                </View>
            </View>
            <View style={Styles.ScrollContainer}>
                <ScrollView>
                    <View style={Styles.TopImageSlider}>
                        <Image
                            source={foodItem.image}
                            style={Styles.foodImage}
                        />
                        <View style={Styles.DotsContainer}>
                            <View style={Styles.Dots} />
                        </View>
                    </View>
                    <View style={Styles.groupContainer}>
                        {foodItem?.customization && (
                            foodItem?.customization?.map((g, idx) => (
                                <TouchableOpacity
                                    key={g.id}
                                    onPress={() => setActive(idx)}
                                    style={Styles.groupButton}
                                >
                                    <Text style={Styles.groupText}> {g.title} </Text>
                                </TouchableOpacity>
                            )
                            ))}
                    </View>
                    {foodItem.customization?.map((group, idx) => (
                        <View key={idx}
                            style={{ marginVertical: normalize(10) }}>
                            <Text
                                style={{
                                    fontSize: normalize(16),
                                    fontFamily: Fonts.font18,
                                    marginHorizontal: vw(20),
                                    marginBottom: normalize(10),
                                }}
                            >
                                {group.title}
                            </Text>

                            {group.type === "quantity" ? (
                                <View style={{ marginHorizontal: vw(20) }}>
                                    {group.choices.map((choice, idx) => (
                                        <View
                                            key={idx}
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                backgroundColor: Colors.bodyColor,
                                                padding: normalize(12),
                                                borderRadius: normalize(6),
                                                marginBottom: normalize(8),
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: normalize(15),
                                                    fontFamily: Fonts.font17,
                                                    color: Colors.textBlack,
                                                }}
                                            >
                                                {choice.name}
                                            </Text>

                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity
                                                    style={{
                                                        height: vh(28),
                                                        width: vw(28),
                                                        borderRadius: vw(4),
                                                        backgroundColor: Colors.fadeBorder,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text style={{ fontSize: normalize(20), fontFamily: Fonts.font17 }}>−</Text>
                                                </TouchableOpacity>

                                                <Text
                                                    style={{
                                                        width: vw(40),
                                                        textAlign: "center",
                                                        fontSize: normalize(16),
                                                        fontFamily: Fonts.subHeader,
                                                    }}
                                                >
                                                    {choice.default || 0}
                                                </Text>

                                                <TouchableOpacity
                                                    style={{
                                                        height: vh(28),
                                                        width: vw(28),
                                                        borderRadius: vw(4),
                                                        backgroundColor: Colors.bodyColor,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text style={{ color: Colors.constantWhite, fontSize: normalize(20), fontFamily: Fonts.font17 }}>
                                                        +
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                group.choices.map(choice => (
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            padding: normalize(12),
                                            backgroundColor: Colors.bodyColor,
                                            marginBottom: normalize(8),
                                            marginHorizontal: vw(20),
                                            borderRadius: normalize(6),
                                        }}
                                        key={choice?.id}
                                    >
                                        {choice.image && (
                                            <Image
                                                source={choice.image}
                                                style={{
                                                    height: vh(45),
                                                    width: vw(45),
                                                    borderRadius: normalize(5),
                                                    marginRight: vw(12),
                                                }}
                                            />
                                        )}

                                        <View style={{ flex: 1 }}>
                                            <Text
                                                style={{
                                                    fontSize: normalize(14),
                                                    fontFamily: Fonts.font17,
                                                    color: Colors.textBlack,
                                                }}
                                            >
                                                {choice.name}
                                            </Text>

                                            {choice.price ? (
                                                <Text
                                                    style={{
                                                        fontSize: normalize(12),
                                                        fontFamily: Fonts.font17,
                                                        color: Colors.textFadeBlack,
                                                        marginTop: normalize(2),
                                                    }}
                                                >
                                                    + {choice.price} AED
                                                </Text>
                                            ) : null}
                                        </View>
                                        {group.type === "single" ? (
                                            <View
                                                style={{
                                                    height: vh(20),
                                                    width: vw(20),
                                                    borderRadius: vw(10),
                                                    borderWidth: normalize(2),
                                                    borderColor: Colors.fadeBorder,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {choice.default && (
                                                    <View
                                                        style={{
                                                            height: vh(12),
                                                            width: vw(12),
                                                            borderRadius: vw(6),
                                                            backgroundColor: Colors.bodyColor,
                                                        }}
                                                    />
                                                )}
                                            </View>
                                        ) : (
                                            <View
                                                style={{
                                                    height: vh(20),
                                                    width: vw(20),
                                                    borderWidth: normalize(2),
                                                    borderColor: Colors.fadeBorder,
                                                    backgroundColor: choice.default
                                                        ? Colors.bodyColor
                                                        : Colors.bodyColor,
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    ))}
                </ScrollView>
                <View style={[Styles.BottomCartContainer, { bottom: 0 }]}>
                    <BottomCart ButtonType={Strings.AddToCart.toUpperCase()} navLink={Strings.CartScreen} totalAmount={0} discount={0} />
                </View>
            </View>
        </View>
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
            paddingBottom: normalize(15),
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
        HeaderTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'center',
        },
        navHeaderText: {
            fontSize: normalize(20),
            fontFamily: Fonts.font18,
        },
        ScrollContainer: {
            height: '92%',
            backgroundColor: Colors.bodyLigheterColor,
        },
        TopImageSlider: {
            width: "100%",
            alignItems: "center",
            backgroundColor: Colors.bodyColor,
            paddingVertical: normalize(20),
        },
        foodImage: {
            width: vw(250),
            height: vh(200),
            resizeMode: "contain",
        },
        DotsContainer: {
            flexDirection: "row",
            marginTop: normalize(10)
        },
        Dots: {
            width: vw(8),
            height: vh(8),
            borderRadius: normalize(4),
            backgroundColor: Colors.bodyColor,
            marginHorizontal: vw(4)
        },
        groupContainer: {
            flexDirection: "row",
            backgroundColor: Colors.bodyColor,
            borderBottomWidth: normalize(1),
            borderColor: Colors.fadeBorder,
        },
        groupButton: {
            paddingVertical: normalize(14),
            paddingHorizontal: vw(20),
            borderColor: Colors.bodyColor,
        },
        groupText: {
            fontSize: normalize(14),
            fontFamily: Fonts.subHeader,
        },
        resetButton: {
            marginRight: vw(20),
            borderWidth: normalize(1),
            borderColor: Colors.fadeBorder
        },
        resetButtonText: {
            fontSize: normalize(12),
            paddingHorizontal: normalize(12),
            paddingVertical: normalize(6),
            fontFamily: Fonts.font18,
            color: Colors.textFadeBlack
        },
        BottomCartContainer: {
            width: '100%',
            height: vh(110),
            backgroundColor: Colors.bodyColor,
            position: 'absolute',
            left: 0,
            zIndex: 2,
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: 0, height: vh(0) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(5),
            elevation: 5,
        },
    });
    return Styles;
};