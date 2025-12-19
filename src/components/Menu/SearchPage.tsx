import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, FlatList, Animated, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// redux 
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// custom component 
import MenuCard from './MenuCard';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { normalize, vh, vw } from '../../utils/Dimensions';
export default function SearchPage({ searchTerm }: SearchPageProps) {
    const Colors = useThemeColors();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const Strings = useStrings()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchResult, setSearchResult] = useState<menuDataType[]>([])
    const menuData = useSelector((state: RootState) => state.menuData)
    const menuItems = menuData?.menuData ?? []
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        if (searchTerm.trim() === '') {
            setSearchResult([])
            return
        }
        debounceRef.current = setTimeout(() => {
            const lowerSearch = searchTerm.toLowerCase()
            const result = menuItems.filter((item: menuDataType) =>
                item?.name?.toLowerCase()?.includes(lowerSearch) ||
                (item.description ?? []).some(desc => desc?.toLowerCase()?.includes(lowerSearch)) ||
                (item.categories ?? []).some(cat => cat?.toLowerCase()?.includes(lowerSearch))
            )
            setSearchResult(result)
        }, 400)
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [searchTerm, menuItems])
    const distanceFromKeyboard = useRef<Animated.Value>(new Animated.Value(0)).current
    const scaleRef = useRef<Animated.Value>(new Animated.Value(0)).current
    const startAnimation = (value: number, scaleTo: number): void => {
        Animated.parallel([
            Animated.timing(distanceFromKeyboard, {
                toValue: value,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(scaleRef, {
                toValue: scaleTo,
                duration: 300,
                useNativeDriver: true
            })
        ]).start()
    }
    const showEvent = Platform.OS == 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent = Platform.OS == 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    useEffect((): (() => void) | void => {
        const showSub = Keyboard.addListener(showEvent, e => {
            startAnimation(-e.endCoordinates.height + 170, 1)
        })
        const hideSub = Keyboard.addListener(hideEvent, () => {
            startAnimation(0, 0)
        })
        return () => {
            showSub.remove()
            hideSub.remove()
        }
    }, [])

    return (
        <View style={Styles.parent}>
            <View style={Styles.ContentContainer}>
                {searchTerm === '' ? (
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}>
                        <Animated.View style={[Styles.blankScreenContainer, {
                            transform: [{
                                translateY: distanceFromKeyboard
                            }]
                        }]}>
                            <Animated.Text style={[Styles.trySearching, {
                                transform: [
                                    {
                                        scale: scaleRef.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 1.5]
                                        })
                                    }
                                ]
                            }]}>
                                {Strings.trySearching}
                            </Animated.Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                ) : (
                    <>
                        {searchResult?.length === 0 && (
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss} accessible={false}>
                                <Animated.View
                                    style={[Styles.NotFoundContainer, {
                                        transform: [{
                                            translateY: distanceFromKeyboard
                                        }]
                                    }]}>
                                    <View style={Styles.imageContaienr}>
                                        <Image source={Images.CoffeeCup} style={Styles.ConfeeCupImage} />
                                        <Image source={Images.SpilledWater} style={Styles.SplledWaterImage} />
                                    </View>
                                    <Text style={Styles.Opps}>{Strings.opps.toUpperCase()} </Text>
                                    <Text style={Styles.NotFoundRes}>{Strings.noResFound} </Text>
                                    <TouchableOpacity
                                        style={Styles.ExploreMoreButton}
                                        onPress={() => { navigation.pop() }}
                                    >
                                        <Text style={Styles.ExploreMoreButtonTxt}>{Strings.exploreKFCMenu.toUpperCase()} </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        )}
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <FlatList
                                data={searchResult}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <MenuCard foodItem={item} />}
                                contentContainerStyle={[Styles.ScrollViewContainer, { paddingBottom: inset.bottom + 20 }]}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            />
                        </TouchableWithoutFeedback>
                    </>
                )}
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1
        },

        ContentContainer: {
            flex: 1,
            backgroundColor: Colors.bodyLigheterColor,
        },
        blankScreenContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        trySearching: {
            fontFamily: Fonts.font18,
            color: Colors.textBlack,
            fontSize: normalize(18)
        },
        NotFoundContainer: {
            marginTop: vh(100),
            width: '100%',
        },
        imageContaienr: {
            height: vh(200),
            marginHorizontal: 'auto',
            marginTop: vh(60),
        },
        ConfeeCupImage: {
            height: vh(160),
            width: vw(160),
            transform: [{ rotate: '-88deg' }],
            position: 'relative',
            zIndex: 5,
            left: vw(20),
            top: vh(10),
        },
        SplledWaterImage: {
            height: vh(210),
            width: vw(210),
            transform: [{ rotate: '-5deg' }],
            position: 'absolute',
            zIndex: 4,
            right: vw(10),
            top: vh(50),
            objectFit: 'contain',
            opacity: .3
        },
        Opps: {
            marginTop: vh(30),
            alignSelf: 'center',
            fontSize: normalize(24),
            color: Colors.textBlack,
            fontFamily: Fonts.font18
        },
        NotFoundRes: {
            alignSelf: 'center',
            marginVertical: vh(10),
            fontSize: normalize(18),
            color: Colors.textFadeBlack,
            fontFamily: Fonts.font17
        },
        ExploreMoreButton: {
            backgroundColor: Colors.KFC_red,
            marginHorizontal: 'auto',
            marginTop: vh(15),
            borderRadius: normalize(2),
        },
        ExploreMoreButtonTxt: {
            color: Colors.constantWhite,
            fontSize: normalize(15),
            marginHorizontal: vw(35),
            marginVertical: vh(16),
            fontFamily: Fonts.font18
        },
        ScrollViewContainer: {

        }
    });
    return Styles;
};