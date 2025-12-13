import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
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
export default function SearchPage() {
    const Colors = useThemeColors();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const Strings = useStrings()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchResult, setSearchResult] = useState<menuDataType[]>([])
    const menuData = useSelector((state: RootState) => state.menuData)
    const menuItem = menuData?.menuData
    useEffect(() => {
        const result = menuItem?.filter((item) => item?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
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
                        placeholder={Strings?.search}
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
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss} accessible={false}>
                        <View
                            style={Styles.NotFoundContainer}>
                            <View style={Styles.imageContaienr}>
                                <Image source={Images?.CoffeeCup} style={Styles.ConfeeCupImage} />
                                <Image source={Images?.SpilledWater} style={Styles.SplledWaterImage} />
                            </View>
                            <Text style={Styles.Opps}>{Strings?.opps.toUpperCase()} </Text>
                            <Text style={Styles.NotFoundRes}>{Strings?.noResFound} </Text>
                            <TouchableOpacity
                                style={Styles.ExploreMoreButton}
                                onPress={() => { navigation.pop() }}
                            >
                                <Text style={Styles.ExploreMoreButtonTxt}>{Strings?.exploreKFCMenu.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
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
            width:'100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            backgroundColor: Colors?.bodyColor,
            shadowColor: Colors?.blueShadows,
            shadowOffset: { width: vw(0), height: vh(0) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        innerNavigationContainer: {
            width:'100%',
            height: vh(60),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Colors?.bodyColor,
        },
        BackBUtton: {
            height: vh(18),
            width: vw(18),
            marginLeft: vw(20),
        },

        SearchBar: {
            width:'70%',
            height: '90%',
            fontSize: normalize(14),
            fontFamily: Fonts?.subHeader,
            fontWeight: 600,
            color: Colors?.textBlack,
            marginLeft: vw(20)
        },
        crossButton: {
            height: vh(14),
            width: vw(14),
            color: Colors?.textBlack,
            marginRight: vw(40),
        },
        ContentContainer: {
            marginTop: vh(8),
            flex: 1,
        },
        NotFoundContainer: {
            marginTop: vh(100),
            width:'100%',
        },
        imageContaienr: {
            height: vh(200),
            marginHorizontal:'auto',
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
            fontWeight: 700,
            color: Colors?.textBlack,
            fontFamily: Fonts?.subHeader
        },
        NotFoundRes: {
            alignSelf: 'center',
            marginVertical: vh(10),
            fontSize: normalize(18),
            fontWeight: 600,
            color: Colors?.textFadeBlack,
            fontFamily: Fonts?.subHeader
        },
        ExploreMoreButton: {
            backgroundColor: Colors?.KFC_red,
            marginHorizontal:'auto',
            marginTop: vh(15),
            borderRadius: normalize(2),
        },
        ExploreMoreButtonTxt: {
            color: Colors.constantWhite,
            fontWeight: 700,
            fontSize: normalize(15),
            marginHorizontal: vw(35),
            marginVertical: vh(16),
            fontFamily: Fonts?.font17
        },
        ScrollViewContainer: {

        }
    });
    return Styles;
};