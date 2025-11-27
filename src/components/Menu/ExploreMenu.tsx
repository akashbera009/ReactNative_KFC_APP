import { StyleSheet, View, FlatList, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// component imports 
import MenuCard from './MenuCard'
//util files 
import { useThemeColors } from '../../utils/Colors'
import { useMenu } from '../../context/MenuContext'
import { useCart } from '../../context/CartContext'
export default function ExploreMenu({ activeCategory, categoryList }: { activeCategory: string, categoryList: string[] }) {
    const Colors = useThemeColors()
    const Styles = createDynamicStyles(Colors)
    const { menuItem } = useMenu()
    const { CartItem } = useCart();
    const insets = useSafeAreaInsets();
    let prepareMenuList = [];
    if (activeCategory === 'Favourites') {
        prepareMenuList = menuItem.filter((item) => item.isFavorite)
    } else {
        prepareMenuList = menuItem.filter((item) => item.categories.includes(activeCategory))
    }
    return (
        <View style={Styles.ScrollContainer}>
            <FlatList
                data={prepareMenuList}
                renderItem={({ item }) =>
                    <View style={Styles.cardContainer}>
                        <MenuCard {...item} />
                    </View>
                }
                keyExtractor={item => item?.name}
            />
            {CartItem?.length != 0 ?
                <View style={[Styles.bottomBlank, Platform.OS == 'ios' ? { height: insets.bottom + 100 } : { height: insets.bottom + 60 }]} />
                :
                <View style={[Styles.bottomBlank, Platform.OS == 'ios' ? { height: insets.bottom } : { height: insets.bottom - 10 }]} />
            }
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        ScrollContainer: {
            backgroundColor: Colors?.bodyShadeColor,
            width: '100%',
            position: 'relative',
            zIndex: 1,
            marginTop: 4,
            height: '90%',
            paddingBottom: 40,
        },
        bottomBlank: {
            height: 40
        },
        cardContainer: {
            width: '100%',
            alignSelf: 'center',
        }
    })
    return Styles
}