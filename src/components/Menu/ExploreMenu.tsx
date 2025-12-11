import { StyleSheet, View, FlatList, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// component imports 
import MenuCard from './MenuCard'
//redux 
import { useSelector } from 'react-redux';
import { RootState} from '../../store/store';
//util files 
import { useThemeColors } from '../../utils/Colors'
import { vh, vw, normalize } from '../../utils/Dimensions'

export default function ExploreMenu({ activeCategory}: { activeCategory: string }) {
    const Colors = useThemeColors()
    const Styles = createDynamicStyles(Colors)
    const menuData = useSelector((state: RootState) => state.menuData)
    const menuItem   = menuData?.menuData
    const cartData = useSelector((state: RootState)=> state.cart)
    const cartItem = cartData?.cartItems
    const favoriteListData = useSelector((state:RootState)=> state.favourite)
    const favouriteList = favoriteListData.favorites
    const insets = useSafeAreaInsets();
    let prepareMenuList = [];
    if (activeCategory === 'Favourites') {
        prepareMenuList = menuItem.filter((item) => favouriteList.includes(item?.uid))
    } else {
        prepareMenuList = menuItem.filter((item) => item.categories.includes(activeCategory))
    }
    return (
        <View style={[Styles.ScrollContainer]}>
            <FlatList
                data={prepareMenuList}
                renderItem={(item ) =>
                    <View style={Styles.cardContainer}>
                        <MenuCard foodItem = {item.item} />
                    </View>
                }
                keyExtractor={item => item?.name}
            />
            {cartItem?.length != 0 ?
                <View style={[Styles.bottomBlank, Platform.OS == 'ios' ? { height: insets.bottom + 60 } : { height: insets.bottom + 70 }]} />
                :
                <View style={[Styles.bottomBlank, Platform.OS == 'ios' ? { height: insets.bottom - 30} : { height: insets.bottom  }]} />
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
            flex: 1 ,
        },
        bottomBlank: {
            height: vh(40)
        },
        cardContainer: {
            width: '100%',
            alignSelf: 'center',
        }
    })
    return Styles
}