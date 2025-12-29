import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Animated, Keyboard, BackHandler } from 'react-native'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom components 
import ExploreMenu from './ExploreMenu'
import BottomCart from './BottomCart';
//redux 
import { fetchMenu } from '../../actions/MenuAction';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
//util files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useStrings } from '../../utils/Strings'
import { useThemeColors } from '../../utils/Colors'
import { normalize, vh, vw } from '../../utils/Dimensions';
import { TextInput } from 'react-native-gesture-handler';
import SearchComponent from './SearchComponent';
import { useMenuCategory } from '../../context/MenuContext';

const Index = ({ categoryType }: { categoryType: string }) => {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const inset = useSafeAreaInsets()
    const Styles = createDynamicStyles(Colors)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch()
    useEffect((): void => {
        dispatch(fetchMenu())
    }, [dispatch])
    const cartData = useSelector((state: RootState) => state?.cart)
    const menuData = useSelector((state: RootState) => state?.menuData)
    const iSFavouriteMenuData = useSelector((state: RootState) => state.favourite)
    const cartItem: CartItemType[] = cartData?.cartItems
    const menuItem: menuDataType[] = menuData?.menuData
    const iSFavouriteMenuArray: string[] = iSFavouriteMenuData?.favorites
    const categoryArr: string[] = [...(menuItem.map((item) => item.categories).flat(1))].sort()
    const categorySet: string[] = [...new Set<string>([...categoryArr])];
    const frequencyMap: Map<string, number> = new Map();
    const { activeCategory, setActiveCategory } = useMenuCategory()
    useEffect(() => {
        setActiveCategory(categoryType)
    }, [categoryType , setActiveCategory]);
    //search
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchActive, setSearchActive] = useState<boolean>(false)
    const inputRef = useRef<TextInput>(null)
    if (iSFavouriteMenuArray?.length > 0) {
        categorySet.splice(1, 0, Strings.favouriteString)
        frequencyMap.set(Strings.favouriteString, iSFavouriteMenuArray?.length)
    }
    for (const cat of categoryArr) {
        frequencyMap.set(cat, (frequencyMap.get(cat) || 0) + 1);
    }
    const frequencyArray: CategoryFrequency[] = Array.from(frequencyMap, ([category, count]) => ({ category, count }));
    const slideUp = useRef<Animated.Value>(new Animated.Value(0)).current;
    const handleslideUp = useCallback((): void => {
        Animated.timing(slideUp, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }, [slideUp])
    useEffect((): void => {
        if (cartItem.length > 0) {
            handleslideUp();
        }
    }, [cartItem.length, handleslideUp])
    const slideInRef = useRef<Animated.Value>(new Animated.Value(0)).current
    const searchBarSlideDown = (): void => {
        Animated.timing(slideInRef, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        }).start()
    }
    const searchBarSlideUp = useCallback((): void => {
        Animated.timing(slideInRef, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [slideInRef])
    const toggleSearch = async (): Promise<void> => {
        if (searchActive) {
            searchBarSlideUp()
            await Keyboard.dismiss()
        }
        else
            searchBarSlideDown()
        setSearchActive(!searchActive)
    }
    useEffect((): (() => void) => {
        const backAction = () => {
            if (searchActive) {
                setSearchActive(false)
                searchBarSlideUp()
                setSearchTerm('')
                return true;
            }
            return false
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [searchActive, searchBarSlideUp]);

    return (
        <View style={Styles.ParentContaienr}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.exploreMenu} </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        toggleSearch()
                        inputRef?.current?.focus()
                    }}
                >
                    <Image source={Images.Search_Icon} style={Styles.SearchIcon} />
                </TouchableOpacity>

                <Animated.View style={[Styles.searchBarActiveContainer, {
                    transform: [{
                        translateY: slideInRef.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-100, 0]
                        })
                    }],
                    opacity: slideInRef.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                },]}>
                    <TouchableOpacity
                        onPress={toggleSearch}>
                        <Image source={Images.back_arrow} style={Styles.BackBUtton} />
                    </TouchableOpacity>
                    <TextInput value={searchTerm}
                        ref={inputRef}
                        style={Styles.SearchBar}
                        onChangeText={setSearchTerm}
                        placeholder={Strings.search}
                        placeholderTextColor={Colors.textFadeBlack2}
                        cursorColor={Colors.KFC_red}
                        selectionColor={Colors.KFC_red}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (searchTerm !== '')
                                setSearchTerm('')
                            else
                                toggleSearch()
                        }}
                    >
                        <Image source={Images.Cross_Icon} style={Styles.crossButton} />
                    </TouchableOpacity>
                </Animated.View >
            </View>
            {searchActive ? (
                <SearchComponent searchTerm={searchTerm} />
            ) : (
                <>
                    <View style={Styles.CategorySelector}>
                        <TouchableOpacity
                            style={Styles.menuIconContainer}
                            onPress={() => {
                                navigation.navigate(Strings.ModalStack,
                                    {
                                        screen: Strings.MenuCategorizeScreen,
                                        params: {
                                            frequencyArray: frequencyArray
                                        }
                                    })
                            }}
                        >
                            <Image source={Images.Foood_Menu_Icon} style={Styles.menuIcon} />
                        </TouchableOpacity>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {categorySet.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        Styles.categoryContainer,
                                        activeCategory === cat && Styles.ActiveBorder
                                    ]}
                                    onPress={() => setActiveCategory(cat)}
                                >
                                    <Text
                                        style={[
                                            Styles.categoryContainerText,
                                            activeCategory === cat && Styles.ActiveText
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <ExploreMenu activeCategory={activeCategory} />
                    {cartItem.length > 0 && (
                        <Animated.View style={[Styles.BottomCartContainer, { bottom: inset.bottom - 10 }, {
                            opacity: slideUp.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1]
                            }),
                            transform: [
                                {
                                    translateY: slideUp.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [80, 0]
                                    })
                                }
                            ]
                        }]}>
                            <BottomCart ButtonType={Strings.viewCart} navLink={Strings.CartScreen} totalAmount={0} discount={0} />
                        </Animated.View>
                    )}
                </>)}
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        ParentContaienr: {
            backgroundColor: Colors.bodyColor,
            flex: 1
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
        SearchIcon: {
            height: vh(26),
            width: vw(26),
            alignSelf: 'flex-end',
            marginHorizontal: vw(30),
            tintColor: Colors.textBlack
        },
        searchBarActiveContainer: {
            width: '100%',
            height: vh(40),
            backgroundColor: Colors?.bodyColor,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        BackBUtton: {
            height: vh(18),
            width: vw(18),
            marginLeft: vw(20),
            tintColor: Colors.textBlack
        },
        SearchBar: {
            width: '70%',
            height: '90%',
            fontSize: normalize(14),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.textBlack,
            marginLeft: vw(20)
        },
        crossButton: {
            height: vh(14),
            width: vw(14),
            marginRight: vw(40),
            tintColor: Colors.textBlack,
        },
        CategorySelector: {
            height: vh(45),
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            borderBottomWidth: normalize(1),
            borderColor: Colors.fadeWhiteText,
        },
        menuIconContainer: {
            height: '100%',
            width: vw(65),
            backgroundColor: Colors.KFC_red,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuIcon: {
            height: vh(30),
            width: vw(30),
            tintColor: Colors.constantWhite,
        },
        categoryContainer: {
            height: vh(40),
            marginHorizontal: vw(5),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ActiveBorder: {
            borderBottomColor: Colors.activeBorder,
            borderBottomWidth: normalize(4)
        },
        categoryContainerText: {
            marginHorizontal: vw(5),
            fontFamily: Fonts.helveticaMedium,
            color: Colors.resendOtpText,
            fontSize: normalize(14),
        },
        ActiveText: {
            fontFamily: Fonts.helveticaBold,
            color: Colors.textBlack,
        },
        BottomCartContainer: {
            width: '100%',
            height: vh(70),
            backgroundColor: Colors.bodyColor,
            position: 'absolute',
            left: 0,
            zIndex: 2,
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(0) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(5),
            elevation: 5,
        }
    })
    return Styles
}
export default Index