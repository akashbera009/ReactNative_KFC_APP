import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom component
import BottomCart from './BottomCart';
import MediaSkeleton from '../../Loaders/MediaShimmer';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { vh, vw, normalize, screenWidth } from '../../utils/Dimensions'
import VideoPlayerComponent from '../../CommonFunctions/VideoPlayer';
import CarouselWithLeftRightPartialVisible from './ProductCursol';

export default function FoodCustomizationPage({ foodItem }: { foodItem: menuDataType }) {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [activeDotIdx, setActiveDotIdx] = useState<number>(0)
    const [loadingIdx, setLoadingIdx] = React.useState<number | null>(0);
    const [tabBarIdx, setTabBarIdx] = React.useState<number | null>(0);
    const media = [
        {
            type: 'video',
            uri: foodItem?.imageSet?.video,
        },
        foodItem?.imageSet?.image?.map(img => ({
            type: 'image',
            uri: img,
        }))
        ,
    ].flat(2);

    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
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
                    <View style={Styles.TopContentSlider}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={(e) => {
                                const idx = Math.round(e.nativeEvent.contentOffset.x / screenWidth)
                                setActiveDotIdx(idx)
                            }}
                            scrollEventThrottle={16}
                        >
                            {media?.map((content, idx) => (
                                <View key={idx} style={Styles.horizontalScrollview}>
                                    {content?.type === 'image' ?
                                        (
                                            <View style={Styles.MediaImageContainer}>
                                                <Image
                                                    key={idx}
                                                    source={{ uri: content?.uri }}
                                                    style={Styles.foodImage}
                                                />
                                            </View>
                                        ) : (
                                            <View style={Styles.MediavideoPlayer}>
                                                {loadingIdx === idx && (
                                                    <View style={StyleSheet.absoluteFill}>
                                                        <MediaSkeleton height={vh(240)} width={screenWidth * 0.9} />
                                                    </View>
                                                )}
                                                <VideoPlayerComponent
                                                    uri={content?.uri}
                                                    paused={activeDotIdx !== idx}
                                                    onLoad={() => setLoadingIdx(null)}
                                                    onLoadStart={() => setLoadingIdx(idx)}
                                                    muted={true}
                                                    repeat={true}
                                                />
                                            </View>
                                        )}
                                </View>
                            ))}
                        </ScrollView>
                        <View style={Styles.DotsContainer}>
                            {media?.map((_, idx) => (
                                <View key={idx} style={[Styles.Dots, activeDotIdx === idx && Styles.ActiveDot]} />
                            ))}
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={Styles.groupContainer}>
                            {foodItem?.customization && (
                                foodItem?.customization?.map((g, idx) => (
                                    <TouchableOpacity
                                        key={g.id}
                                        onPress={() => setTabBarIdx(idx)}
                                        style={Styles.groupButton}
                                    >
                                        <Text style={[Styles.groupText, tabBarIdx === idx && Styles.ActiveTab]}> {g.title} </Text>
                                        {tabBarIdx === idx && <View style={Styles.activetabUnderLine} />}
                                    </TouchableOpacity>
                                )
                                ))}
                        </ScrollView>
                    </View>
                    <View style={Styles.cursolContainer}>
                        <CarouselWithLeftRightPartialVisible />
                    </View>
                    {foodItem.customization?.map((group, idx) => (
                        <View key={idx}
                            style={{ marginVertical: normalize(10) }}>
                            <Text
                                style={Styles.choiceText3}
                            >
                                {group.title}
                            </Text>
                            {group?.styleBox === "horizontal" ? (
                                <View style={Styles.horizontalBoxContainer}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}>
                                        {group?.choices?.map((choice, i) => (
                                            <View key={i} style={Styles.customizationGropContajiner}>
                                                <Text style={Styles.customizationText}>
                                                    {choice.name}
                                                </Text>
                                                <TouchableOpacity
                                                    style={Styles.radioButton} />
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            ) : (
                                group.choices.map(choice => (
                                    <TouchableOpacity
                                        style={Styles.verticalContainer}
                                        key={choice?.id}
                                    >
                                        {choice.image && (
                                            <Image
                                                source={choice?.image}
                                                style={{
                                                    height: vh(45),
                                                    width: vw(45),
                                                    borderRadius: normalize(5),
                                                    marginRight: vw(12),
                                                }}
                                            />
                                        )}

                                        <View style={Styles.choiceFlex}>
                                            <Text
                                                style={Styles.choiceText}
                                            >
                                                {choice.name}
                                            </Text>

                                            {choice.price ? (
                                                <Text
                                                    style={Styles.choiceText2}
                                                >
                                                    + {choice.price} AED
                                                </Text>
                                            ) : null}
                                        </View>
                                        {group.type === "single" ? (
                                            <View
                                                style={Styles.groupContainerSingle}
                                            >
                                                {choice.default && (
                                                    <View
                                                        style={Styles.choiceContainer}
                                                    />
                                                )}
                                            </View>
                                        ) : (
                                            <View style={[Styles.groupContainerBox, {
                                                backgroundColor: choice.default
                                                    ? Colors.bodyColor
                                                    : Colors.bodyColor,
                                            }]} />
                                        )}
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    ))}
                </ScrollView>
                <View style={Styles.BottomCartContainer}>
                    <BottomCart ButtonType={Strings.AddToCart.toUpperCase()} navLink={Strings.CartScreen} totalAmount={0} discount={0} />
                </View>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType) => {
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
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: 0, height: vh(5) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
            zIndex: 999
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
            color: Colors.textBlack
        },
        ScrollContainer: {
            // height: '100%',
            flex: 1,
            paddingBottom: vh(100),
            backgroundColor: Colors.bodyLigheterColor,
        },
        horizontalScrollview: {
            height: vh(180),
            width: screenWidth,
            alignItems: 'center',
        },
        TopContentSlider: {
            height: vh(300),
            width: "100%",
            backgroundColor: Colors.bodyColor,
            display: 'flex',
            alignItems: "center",
            justifyContent: 'center',
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        MediaImageContainer: {
            width: '100%',
            height: vh(230),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        foodImage: {
            width: vw(200),
            height: vw(200),
            resizeMode: "contain",
            objectFit: 'cover',
            shadowColor: Colors.textBlack,
            shadowOffset: { width: 0, height: vh(15) },
            shadowOpacity: .25,
            shadowRadius: normalize(4),
            elevation: 5,
        },
        MediavideoPlayer: {
            height: vh(230),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        DotsContainer: {
            flexDirection: "row",
            marginVertical: vh(5),
            alignSelf: 'center',
        },
        Dots: {
            width: vw(8),
            height: vh(8),
            borderRadius: normalize(4),
            marginHorizontal: vw(4),
            borderWidth: 1,
            borderColor: Colors.timerFadeText,
        },
        ActiveDot: {
            backgroundColor: Colors.KFC_red,
        },
        groupContainer: {
            maxHeight: vh(50),
            flexDirection: "row",
            backgroundColor: Colors.bodyColor,
            borderBottomWidth: normalize(1),
            borderColor: Colors.fadeBorder,
        },
        groupContainerSingle: {
            height: vh(20),
            width: vw(20),
            borderRadius: vw(10),
            borderWidth: normalize(2),
            borderColor: Colors.fadeBorder,
            justifyContent: "center",
            alignItems: "center",
        },
        groupContainerBox: {
            height: vh(20),
            width: vw(20),
            borderWidth: normalize(2),
            borderColor: Colors.fadeBorder,

        },
        choiceContainer: {
            height: vh(12),
            width: vw(12),
            borderRadius: vw(6),
            backgroundColor: Colors.bodyColor,
        },
        groupButton: {
            paddingVertical: normalize(14),
            paddingHorizontal: vw(20),
            borderColor: Colors.bodyColor,
        },
        groupText: {
            fontSize: normalize(14),
            fontFamily: Fonts.font18,
            color: Colors.timerFadeText
        },
        cursolContainer: {
            marginTop: vh(30),
            height: vh(400),
            width: '100%'
        },
        ActiveTab: {
            fontSize: normalize(15),
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
        },
        activetabUnderLine: {
            width: '100%',
            borderBottomColor: Colors.KFC_red,
            borderBottomWidth: normalize(5),
            top: vh(15),
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
        horizontalBoxContainer: {
            marginHorizontal: vw(20),
            width: '100%',
        },
        customizationGropContajiner: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.bodyColor,
            padding: normalize(12),
            borderRadius: normalize(6),
            marginBottom: normalize(8),
            height: vh(150),
            width: vw(110),
            marginHorizontal: vw(5),
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: 0, height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        customizationText: {
            fontSize: normalize(15),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
        },
        radioButton: {
            position: 'absolute',
            right: vw(10),
            top: vh(10),
            height: vh(20),
            width: vw(20),
            borderRadius: normalize(50),
            borderColor: Colors.fadeBorder,
            borderWidth: normalize(2),
            justifyContent: "center",
            alignItems: "center",
        },
        verticalContainer: {
            flexDirection: "row",
            alignItems: "center",
            padding: normalize(12),
            backgroundColor: Colors.bodyColor,
            marginBottom: normalize(8),
            marginHorizontal: vw(20),
            borderRadius: normalize(6),
        },
        choiceFlex: {
            flex: 1
        },
        choiceText: {
            fontSize: normalize(14),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
        },
        choiceText2: {
            fontSize: normalize(12),
            fontFamily: Fonts.font17,
            color: Colors.textFadeBlack,
            marginTop: normalize(2),
        },
        choiceText3: {
            fontSize: normalize(16),
            fontFamily: Fonts.font18,
            marginHorizontal: vw(20),
            marginBottom: normalize(10),
        },
        BottomCartContainer: {
            width: '100%',
            height: vh(80),
            backgroundColor: Colors.bodyColor,
            position: 'absolute',
            left: 0,
            bottom: 0,
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