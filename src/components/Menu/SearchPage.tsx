import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import MenuCard from './MenuCard';
import { useStrings } from '../../utils/Strings';
import { useMenu } from '../../context/MenuContext';
export default function SearchPage() {
    const Colors = useThemeColors();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const Strings = useStrings()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchResult, setSearchResult] = useState<menuDataType[]>([])
    const {menuItem} =useMenu()
    useEffect(() => {
        const result = menuItem.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchResult(result)
    }, [searchTerm])
    return (
        <View style={Styles.parent}>
            <View style={[Styles.navigationContainer, {}]}>
                <View style={[Styles.innerNavigationContainer, { marginTop: inset.top - 10 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}>
                        <Image source={Images?.back_arrow} style={Styles.BackBUtton} />
                    </TouchableOpacity>
                    <TextInput value={searchTerm}
                        style={Styles.SearchBar}
                        onChangeText={setSearchTerm}
                        placeholder='search'
                        cursorColor={Colors?.KFC_red}
                        selectionColor={Colors?.KFC_red}
                    />
                    <TouchableOpacity
                        onPress={() => setSearchTerm('')}
                    >
                        <Image source={Images?.Cross_Icon} style={Styles.crossButton} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.ContentContainer}>
                {searchResult?.length === 0 && (
                    <View style={Styles.NotFoundContainer}>
                        <View style={Styles.imageContaienr}>
                            <Image source={Images?.CoffeeCup} style={Styles.ConfeeCupImage} />
                            <Image source={Images?.SpilledWater} style={Styles.SplledWaterImage} />
                        </View>
                        <Text style={Styles.Opps}>{Strings?.opps.toUpperCase()} </Text>
                        <Text style={Styles.NotFoundRes}>{Strings?.noResFound} </Text>
                        <TouchableOpacity
                            style={Styles.ExploreMoreButton}
                            onPress={() => {navigation.pop() }}
                        >
                            <Text style={Styles.ExploreMoreButtonTxt}>{Strings?.exploreKFCMenu.toUpperCase()} </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <FlatList
                        data={searchResult}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <MenuCard {...item} />}
                        contentContainerStyle={[Styles.ScrollViewContainer, { paddingBottom: inset.bottom + 20 }]}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    />
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1
        },
        navigationContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            backgroundColor: Colors?.bodyColor,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        innerNavigationContainer: {
            width: '100%',
            height: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors?.bodyColor,
        },
        BackBUtton: {
            height: 18,
            width: 18,
            marginLeft: 20,
        },

        SearchBar: {
            width: '70%',
            height: '90%',
            fontSize: 14,
            fontFamily: Fonts?.subHeader,
            fontWeight: 600,
            color: Colors?.textBlack,
            marginLeft: 20
        },
        crossButton: {
            height: 14,
            width: 14,
            color: Colors?.textBlack,
            marginRight: 40,
        },
        ContentContainer: {
            marginTop: 8,
            height: '90%',
        },
        NotFoundContainer: {
            height: '70%',
            width: '100%',
        },
        imageContaienr: {
            height: 200,
            marginHorizontal: 'auto',
            marginTop: 60,
        },
        ConfeeCupImage: {
            height: 160,
            width: 160,
            transform: [{ rotate: '-88deg' }],
            position: 'relative',
            zIndex: 5,
            left: 20,
            top: 10,
        },
        SplledWaterImage: {
            height: 210,
            width: 210,
            transform: [{ rotate: '-5deg' }],
            position: 'absolute',
            zIndex: 4,
            right: 10,
            top: 50,
            objectFit: 'contain',
            opacity: .3
        },
        Opps: {
            marginTop: 30,
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: 700 , 
            color: Colors?.textBlack , 
            fontFamily: Fonts?.subHeader
        },
        NotFoundRes: {
            alignSelf: 'center',
            marginVertical: 10 , 
            fontSize: 18,
            fontWeight: 600 , 
            color: Colors?.textFadeBlack , 
            fontFamily: Fonts?.subHeader
        },
        ExploreMoreButton: {
            backgroundColor: Colors?.KFC_red,
            marginHorizontal: 'auto',
            marginTop : 15 , 
            borderRadius: 2 , 
        },
        ExploreMoreButtonTxt: {
            color: Colors.constantWhite,
            fontWeight: 700,
            fontSize: 15,
            marginHorizontal: 35, 
            marginVertical:16 ,
            fontFamily: Fonts?.font17
        },
        ScrollViewContainer: {
            
        }
    });
    return Styles;
};