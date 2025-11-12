import { StyleSheet, View, FlatList } from 'react-native'
import React, {useState} from 'react'
// component imports 
import MenuCard from './MenuCard'
// data imports 
import { menuData } from '../../data/MenuData'
//util files 
import { useThemeColors } from '../../utils/Colors'
export default function ExploreMenu({isActive,  categoryList}: {isActive: number,  categoryList: string[]}) {
    const Colors = useThemeColors() 
    const Styles = createDynamicStyles(Colors)
    const prepareMenuList = menuData.filter((item)=> item.categories.includes(categoryList[isActive]))
    // const [menuDataSetter , setMenuDataSetter] = useState(menuData)
    
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
            height: '85%'
        },
        cardContainer: {
            width: '100%',
            alignSelf: 'center',
        }
    })
    return Styles
}