import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom components 
import ExploreMenu from './ExploreMenu'
import BottomCart from './BottomCart';
//util files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useStrings } from '../../utils/Strings'
import { useThemeColors } from '../../utils/Colors'
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';


const Index = ({categoryType}:{categoryType:string} ) => {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const inset = useSafeAreaInsets()
    const Styles = createDynamicStyles(Colors, Fonts)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { CartItem } = useCart();
    const { menuItem } = useMenu();
    const category: string[] = [...(menuItem.map((item) => item.categories).flat(1))].sort()
    const iSFavouriteMenuArray = menuItem.filter(item => item?.isFavorite == true);
    const categorySet: string[] = [...new Set<string>([...category])];
    console.log(categorySet , categoryType);
    
    const [activeCategory, setActiveCategory] = useState<string>(categoryType);
    const frequencyMap: Map<string, number> = new Map();
    if (iSFavouriteMenuArray.length > 0) {
        categorySet.splice(1, 0,'Favourites')
        frequencyMap.set('Favourites', iSFavouriteMenuArray.length)
    }
    for (const element of category) {
        frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
    }
    const frequencyArray: CategoryFrequency[] = Array.from(frequencyMap, ([category, count]) => ({ category, count }));

    return (
        <View style={Styles.ParentContaienr}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings?.exploreMenu} </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Strings?.SearchScreen)}
                >
                    <Image source={Images?.Search_Icon} style={Styles.SearchIcon} />
                </TouchableOpacity>
            </View>
            <View style={Styles.CategorySelector}>
                <TouchableOpacity
                    style={Styles.menuIconContainer}
                    onPress={() => {
                        navigation.navigate(Strings?.MenuCategorizeScreen, {
                            activeCategory: activeCategory,
                            setActiveCategory: setActiveCategory,
                            frequencyArray: frequencyArray
                        })
                    }}
                >
                    <Image source={Images?.Foood_Menu_Icon} style={Styles.menuIcon} />
                </TouchableOpacity>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {categorySet.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                Styles.categoryContainer,
                                activeCategory === category && Styles.ActiveBorder
                            ]}
                            onPress={() => setActiveCategory(category)}
                        >
                            <Text
                                style={[
                                    Styles.categoryContainerText,
                                    activeCategory === category && Styles.ActiveText
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ExploreMenu activeCategory={activeCategory} categoryList={categorySet} />
            {CartItem?.length > 0 && (
                <View style={[Styles.BottomCartContainer, { bottom: inset.bottom - 10 }]}>
                    <BottomCart ButtonType={Strings?.viewCart} navLink={Strings?.CartScreen} totalAmount={0} />
                </View>
            )}
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        ParentContaienr: {
            backgroundColor: Colors?.bodyColor,
            height: '100%'
        },
        NavWrapper: {
            width: '100%',
            backgroundColor: Colors?.bodyColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingBottom: 15,
        },
        headerText: {
            fontSize: 20,
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
            height: 18,
            width: 18,
            alignSelf: 'flex-start',
            marginHorizontal: 18,
        },
        SearchIcon: {
            height: 26,
            width: 26,
            alignSelf: 'flex-end',
            marginHorizontal: 30,
        },
        CategorySelector: {
            height: 45,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            borderBottomWidth: 1,
            borderColor: Colors?.fadeWhiteText,
        },
        menuIconContainer: {
            height: '100%',
            width: 65,
            backgroundColor: Colors?.KFC_red,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        menuIcon: {
            height: 30,
            width: 30,
            tintColor: Colors?.constantWhite,
        },
        categoryContainer: {
            height: 40,
            marginHorizontal: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ActiveBorder: {
            borderBottomColor: Colors?.activeBorder,
            borderBottomWidth: 4
        },
        categoryContainerText: {
            marginHorizontal: 5,
            fontFamily: Fonts?.font17,
            color: Colors?.resendOtpText,
            fontSize: 14,
            fontWeight: 600,
        },
        ActiveText: {
            fontWeight: 700,
            color: Colors?.textBlack,
        },
        BottomCartContainer: {
            width: '100%',
            height: 70,
            backgroundColor: Colors?.bodyColor,
            position: 'absolute',
            left: 0,
            zIndex: 2,
        }
    })
    return Styles
}
export default Index