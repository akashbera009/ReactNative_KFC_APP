import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { vh, vw, normalize } from '../../utils/Responsive'

export default function FoodCustomizationPage({ foodItem }: { foodItem: menuDataType }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
                    <Text style={Styles.resetButtonText}>{Strings?.reset.toUpperCase()} </Text>
                </View>
            </View>
            <View style={Styles.ScrollContainer}>
                <ScrollView>
                    <TopImageSection foodItem={foodItem} />
                    <TabSection groups={foodItem.customization} />
                    {foodItem.customization?.map((group) => (
                        <OptionGroup key={group.id} group={group} />
                    ))}
                </ScrollView>
                <AddToCartBar foodItem={foodItem} />
            </View>
        </View>
    );
}
const TopImageSection = ({ foodItem}: {foodItem : menuDataType }) => {
    const Colors = useThemeColors();

    return (
        <View
            style={{
                width: "100%",
                alignItems: "center",
                backgroundColor: Colors.bodyColor,
                paddingVertical: normalize(20),
            }}
        >
            <Image
                source={foodItem.image}
                style={{
                    width: vw(250),
                    height: vw(200),
                    resizeMode: "contain",
                }}
            />

            <View style={{ flexDirection: "row", marginTop: normalize(10) }}>
                <View style={{
                    width: 8, height: 8, borderRadius: 4,
                    backgroundColor: Colors.bodyColor,
                    marginHorizontal: 4
                }} />
                <View style={{
                    width: 8, height: 8, borderRadius: 4,
                    backgroundColor: Colors.fadeBorder,
                    marginHorizontal: 4
                }} />
                <View style={{
                    width: 8, height: 8, borderRadius: 4,
                    backgroundColor: Colors.fadeBorder,
                    marginHorizontal: 4
                }} />
            </View>
        </View>
    );
};
const TabSection = ({ groups }:{groups:MenuOptionGroup[]| undefined }) => {
    const [active, setActive] = React.useState(0);
    const Colors = useThemeColors();

    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: Colors.bodyColor,
                borderBottomWidth: 1,
                borderColor: Colors.fadeBorder,
            }}
        >
            {groups && (

                groups?.map((g: MenuOptionGroup , index: number) => (
                    <TouchableOpacity
                    key={g.id}
                    onPress={() => setActive(index)}
                    style={{
                        paddingVertical: normalize(14),
                        paddingHorizontal: vw(20),
                        borderBottomWidth: active === index ? 3 : 0,
                        borderColor: Colors.bodyColor,
                    }}
                    >
                    <Text
                        style={{
                            fontSize: normalize(14),
                            color: active === index ? Colors.bodyColor : Colors.textFadeBlack,
                            fontFamily: Fonts.subHeader,
                        }}
                        >
                        {g.title}
                    </Text>
                </TouchableOpacity>
                )
            ))}
        </View>
    );
};
const AddToCartBar = ({ foodItem }: {foodItem:menuDataType}) => {
    const Colors = useThemeColors();

    return (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: Colors.bodyColor,
                padding: normalize(12),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopWidth: 1,
                borderColor: Colors.fadeBorder,
            }}
        >
            <View>
                <Text
                    style={{
                        fontSize: normalize(18),
                        fontFamily: Fonts?.subHeader,
                        fontWeight: "700",
                    }}
                >
                    {foodItem.price.toFixed(2)}
                </Text>
                <Text
                    style={{
                        fontSize: normalize(12),
                        color: Colors.textFadeBlack,
                        marginTop: 2,
                    }}
                >
                    {foodItem.oldPrice - foodItem.price} AED you saved
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.bodyColor,
                    paddingVertical: normalize(14),
                    paddingHorizontal: vw(40),
                    borderRadius: normalize(8),
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: normalize(16),
                        fontFamily: Fonts.subHeader,
                    }}
                >
                    ADD TO CART
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const OptionGroup = ({ group }: { group: MenuOptionGroup }) => {

    return (
        <View style={{ marginVertical: normalize(10) }}>
            <Text
                style={{
                    fontSize: normalize(16),
                    fontFamily: Fonts?.subHeader,
                    fontWeight: '700',
                    marginHorizontal: vw(20),
                    marginBottom: normalize(10),
                }}
            >
                {group.title}
            </Text>

            {group.type === "quantity" ? (
                <QuantityGroup group={group} />
            ) : (
                group.choices.map(choice => (
                    <ChoiceItem
                        key={choice.id}
                        choice={choice}
                        group={group}
                    />
                ))
            )}
        </View>
    );
};
const ChoiceItem = ({
    choice,
    group,
}: {
    choice: MenuOptionChoice;
    group: MenuOptionGroup;
}) => {

    const Colors = useThemeColors();

    return (
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
        >
            {choice.image && (
                <Image
                    source={choice.image}
                    style={{
                        height: vw(45),
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
                        fontFamily: Fonts?.font17,
                        fontWeight: '600',
                        color: Colors.textBlack,
                    }}
                >
                    {choice.name}
                </Text>

                {choice.price ? (
                    <Text
                        style={{
                            fontSize: normalize(12),
                            fontFamily: Fonts?.font17,
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
                        height: vw(20),
                        width: vw(20),
                        borderRadius: vw(10),
                        borderWidth: 2,
                        borderColor: Colors.fadeBorder,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {choice.default && (
                        <View
                            style={{
                                height: vw(12),
                                width: vw(12),
                                borderRadius: vw(6),
                                backgroundColor: Colors?.bodyColor,
                            }}
                        />
                    )}
                </View>
            ) : (
                <View
                    style={{
                        height: vw(20),
                        width: vw(20),
                        borderWidth: 2,
                        borderColor: Colors.fadeBorder,
                        backgroundColor: choice.default
                            ? Colors.bodyColor
                            : Colors.bodyColor,
                    }}
                />
            )}
        </TouchableOpacity>
    );
};
const QuantityGroup = ({ group }: { group: MenuOptionGroup }) => {
    const Colors = useThemeColors();

    return (
        <View style={{ marginHorizontal: vw(20) }}>
            {group.choices.map(choice => (
                <View
                    key={choice.id}
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
                            fontFamily: Fonts?.font17,
                            fontWeight: '600',
                            color: Colors.textBlack,
                        }}
                    >
                        {choice.name}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity
                            style={{
                                height: vw(28),
                                width: vw(28),
                                borderRadius: vw(4),
                                backgroundColor: Colors.fadeBorder,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontSize: normalize(20) }}>−</Text>
                        </TouchableOpacity>

                        <Text
                            style={{
                                width: vw(40),
                                textAlign: "center",
                                fontSize: normalize(16),
                                fontFamily: Fonts?.subHeader,
                            }}
                        >
                            {choice.default || 0}
                        </Text>

                        <TouchableOpacity
                            style={{
                                height: vw(28),
                                width: vw(28),
                                borderRadius: vw(4),
                                backgroundColor: Colors.bodyColor,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontSize: normalize(20) }}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};


const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            height: '100%',
            backgroundColor: Colors?.bodyColor,
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: normalize(15),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            color: Colors?.textBlack
        },
        BackIconAndHeaderText: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        BackIcon: {
            tintColor: Colors?.textBlack,
            height: vw(18),
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
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
        },
        ScrollContainer: {
            flexGrow: 1,
            backgroundColor: Colors?.bodyLigheterColor,
        },
        resetButton: {
            marginRight: vw(20),
            borderWidth: 1,
            borderColor: Colors?.fadeBorder
        },
        resetButtonText: {
            fontSize: normalize(12),
            fontWeight: 700,
            paddingHorizontal: normalize(12),
            paddingVertical: normalize(6),
            fontFamily: Fonts?.font17,
            color: Colors?.textFadeBlack
        }
    });
    return Styles;
};