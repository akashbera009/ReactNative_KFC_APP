import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// custom components 
import ExploreMenu from './ExploreMenu'
// data imports 
import { menuData } from '../../data/MenuData';
//util files 
import Fonts from '../../utils/Fonts'
import Images from '../../utils/LocalImages'
import { useStrings } from '../../utils/Strings'
import { useThemeColors } from '../../utils/Colors'

const Index = () => {
    const Colors = useThemeColors()
    const Strings = useStrings()
    const inset = useSafeAreaInsets()
    const Styles = createDynamicStyles(Colors, Fonts)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const category = [...new Set(menuData.map((item) => item.categories).flat(1))].sort()
    const [isActive, setIsActive] = useState<number>(0)
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
                <Image source={Images?.Search_Icon} style={Styles.SearchIcon} />
            </View>
            <View style={Styles.CategorySelector}>
                <View style={Styles.menuIconCOntainer}>
                    <Image source={Images?.Foood_Menu_Icon} style={Styles.menuIcon} />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {category.map((item, idx) => (
                        <TouchableOpacity
                            activeOpacity={.8}
                            key={idx}
                            style={[Styles?.categoryContainer, isActive === idx && Styles.ActiveBorder]}
                            onPress={() => setIsActive(idx)}
                        >
                            <Text style={[Styles?.categoryContainerText, isActive == idx && Styles.ActiveText]}>{item} </Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
            <ExploreMenu isActive = {isActive} categoryList = {category}/>
        </View>
    )
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        ParentContaienr: {
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
        menuIconCOntainer: {
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
    })
    return Styles
}
export default Index