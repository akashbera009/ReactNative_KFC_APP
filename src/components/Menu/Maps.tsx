import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// maps import 
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
// datat imports 
import { DeliveryDetails } from '../../data/DeliveryDetails';
import { CountryInfo } from '../../data/CountryInfo';
import { normalize, vh, vw } from '../../utils/Dimensions';

export default function Maps() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected, setCountrySelected } = useCountry();
    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = (): void => {
        setOpen(!open);
    };
    const [deliveryType, setDeliveryType] = useState<string>(Strings.delivery)
    const [addressBox, setAddress] = useState<AddressBox>({
        address: '',
        buildingName: '',
        flatNo: ''
    })
    const [tag, setTag] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [location, setLocation] = useState<Coordinate>({
        latitude: 0,
        longitude: 0,
    });
    const handleChangeAddress = (text: string): void => {
        setAddress(prev => ({ ...prev, address: text }))
    }
    const handleChangeBuildingName = (text: string): void => {
        setAddress(prev => ({ ...prev, buildingName: text }))
    }
    const handleChangeFlatNo = (text: string): void => {
        setAddress(prev => ({ ...prev, flatNo: text }))
    }
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
    useEffect((): void => {
        if (showPopup) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        } else {
            opacity.setValue(0);
        }
    }, [showPopup, opacity]);

    useEffect((): void => {
        const isValid =
            addressBox.address.trim() !== '' &&
            addressBox.buildingName.trim() !== '' &&
            addressBox.flatNo.trim() !== '' &&
            tag.trim() !== ''
        setGoodToSave(isValid);
    }, [addressBox, tag, location]);

    const [goodToSave, setGoodToSave] = useState<boolean>(false)
    const handlChangeAddress = (): void => {
        setAddress({
            address: '',
            buildingName: '',
            flatNo: ''
        })
    }
    const getCurrentLocation = async (): Promise<void> => {
        Geolocation.getCurrentPosition(
            position => {
                console.log('position', position)
                setLocation({
                    latitude: position?.coords?.latitude,
                    longitude: position?.coords?.longitude
                })
            },
            error => console.log('error', error),
            {
                enableHighAccuracy: true,
                timeout: 15000
            }
        )
    };
    useEffect((): void => {
        getCurrentLocation()
    }, [])

    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.navHeaderText} numberOfLines={1} >{DeliveryDetails?.address}</Text>
                </View>
                <TouchableOpacity
                    style={Styles.headerCountrySelection}
                    onPress={toggleOpen}
                >
                    <Image source={countrySelected?.flag} style={Styles.flag} />
                    <Image source={Images.Arrow_down} style={Styles.arrowdonwn} />
                </TouchableOpacity>
                {open && (
                    <View style={Styles.CountrySelectionContainer}>
                        {CountryInfo.map((item, idx) =>
                            <TouchableOpacity
                                key={idx}
                                onPress={() => {
                                    setCountrySelected(item)
                                    setOpen(false)
                                }}
                                style={[Styles.row, { borderBottomColor: Colors.fadeWhiteText }]}>
                                <Image style={Styles.flag} source={item?.flag} />
                                <Text style={[Styles.countryName, { color: Colors.textBlack }]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
            <View style={Styles.body}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={150}
                    contentContainerStyle={Styles.contentContainerStyle}
                >
                    <View style={[Styles.MapContainer]}>
                        <MapView
                            style={Styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={
                                {
                                    latitude: location.latitude || 26.9124,
                                    longitude: location.longitude || 75.7873,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }
                            }>
                            {location && (
                                <Marker
                                    draggable
                                    coordinate={location}
                                    title="You are here"
                                />
                            )}
                        </MapView>
                    </View>
                    <View style={Styles.LowerContainer}>
                        <View style={Styles.locationTypeSelection}>
                            <Text style={Styles.iWant}>{Strings.iWant} : </Text>
                            <TouchableOpacity
                                onPress={() => setDeliveryType(Strings.delivery)}
                                activeOpacity={.5}
                                style={Styles.selectionContainer}>
                                <View style={[Styles.CheckBoxContainer, (deliveryType === Strings.delivery) && Styles.ActiveBorder]}>
                                    {(deliveryType === Strings.delivery) &&
                                        <View
                                            style={Styles.CheckBoxSelected}
                                        />
                                    }
                                </View>
                                <Text style={Styles.checkBoxText}>{Strings.delivery.toUpperCase()} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setDeliveryType(Strings.pickup)}
                                activeOpacity={.5}
                                style={Styles.selectionContainer}>
                                <View style={[Styles.CheckBoxContainer, (deliveryType === Strings.pickup) && Styles.ActiveBorder]}>
                                    {(deliveryType === Strings.pickup) &&
                                        <View
                                            style={Styles.CheckBoxSelected}
                                        />
                                    }
                                </View>
                                <Text style={Styles.checkBoxText}>{Strings.pickup.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.completeAddress}>
                            <Text style={Styles.completeYourAddress}>{Strings.completeYourAddress} </Text>
                            <View style={Styles.adressAndChangeButton} >
                                <TextInput
                                    value={addressBox?.address}
                                    placeholderTextColor={Colors.placeHoldertext}
                                    placeholder={Strings.address}
                                    onChangeText={handleChangeAddress}
                                    style={[Styles.PlaceHolderText, Styles.addresPlaceHolder]}
                                />
                                <TouchableOpacity
                                    style={Styles.ChangeButton}
                                    onPress={handlChangeAddress}
                                >
                                    <Text style={Styles.ChangeButtonText}>{Strings.change.toUpperCase()} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.CustomBottomBorder} />
                            <View style={Styles.BuildingAndFLat}>
                                <View style={Styles.buildingNameContainer}>
                                    <TextInput
                                        value={addressBox?.buildingName}
                                        placeholder={Strings.buildingName + '*'}
                                        placeholderTextColor={Colors.placeHoldertext}
                                        onChangeText={handleChangeBuildingName}
                                        style={Styles.PlaceHolderText}
                                    />
                                    <View style={Styles.CustomBottomBorder} />
                                </View>
                                <View style={Styles.FlatNoContainer}>
                                    <TextInput
                                        value={addressBox?.flatNo}
                                        placeholder={Strings.flatNo + '*'}
                                        placeholderTextColor={Colors.placeHoldertext}
                                        onChangeText={handleChangeFlatNo}
                                        style={Styles.PlaceHolderText}
                                    />
                                    <View style={Styles.CustomBottomBorder} />
                                </View>
                            </View>
                        </View>
                        <View style={Styles.AddressTagsContainer}>
                            <Text style={Styles.tagLocation}>{Strings.tagLocation} :  </Text>
                            <View style={Styles.TagsContainer}>
                                <TouchableOpacity
                                    onPress={() => { setTag(Strings.home) }}
                                >
                                    <Text style={[Styles.Tag, (tag === Strings.home) && Styles.ActiveTag]}>{Strings.home.toUpperCase()} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setTag(Strings.office) }}
                                >
                                    <Text style={[Styles.Tag, (tag === Strings.office) && Styles.ActiveTag]}>{Strings.office.toUpperCase()} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setTag(Strings.hotel) }}
                                >
                                    <Text style={[Styles.Tag, (tag === Strings.hotel) && Styles.ActiveTag]}>{Strings.hotel.toUpperCase()} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setTag(Strings.other) }}
                                >
                                    <Text style={[Styles.Tag, (tag === Strings.other) && Styles.ActiveTag]}>{Strings.other.toUpperCase()} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            disabled={!goodToSave}
                            style={[
                                Styles.confirmLocationButton,
                                { backgroundColor: goodToSave ? Colors.KFC_red : Colors.timerFadeText }
                            ]}
                            onPress={() => {
                                if (goodToSave) {
                                    setShowPopup(true);
                                }
                            }}
                        >
                            <Text style={Styles.confirmLocation}>
                                {Strings.confirmLocation.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType) => {
    return StyleSheet.create({
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
            paddingBottom: vh(15),
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.font18,
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
        headerCountrySelection: {
            marginRight: vw(20),
            flexDirection: "row",
            justifyContent: "space-between",
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
        },
        arrowdonwn: {
            height: vh(15),
            width: vw(15),
            tintColor: Colors.textBlack
        },
        CountrySelectionContainer: {
            position: 'absolute',
            zIndex: 999,
            elevation: 999,
            right: vw(15),
            top: vh(30),
            width: vw(120),
            backgroundColor: Colors.bodyColor,
            borderWidth: normalize(1),
            borderColor: Colors.fadeBorder,
            borderRadius: normalize(4),
        },
        navHeaderText: {
            overflow: 'hidden',
            fontSize: normalize(16),
            fontFamily: Fonts.font18,
            width: '70%',
            color: Colors.textBlack
        },
        row: {
            flexDirection: "row",
            paddingVertical: vh(12),
            paddingHorizontal: vw(15),
            alignItems: "center",
            borderBottomWidth: normalize(1),
        },
        flag: {
            height: vh(20),
            width: vw(30),
        },
        countryName: {
            fontSize: normalize(15),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
            marginLeft: vw(8)
        },
        OuterContianer: {
            flex: 1,
        },
        container: {
            flex: 1,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        },
        contentContainerStyle:{ 
            paddingBottom: vh(50) 
        },
        body: {
            flex: 1,
        },
        MapContainer: {
            height: vh(360),
            width: '100%',
            position: 'relative',
            top: 0,
            left: 0,
            zIndex: 1,
        },
        map: {
            height: vh(360),
            width: '100%',
        },
        LowerContainer: {
            flex: 1,
            marginHorizontal: vw(10),
        },
        locationTypeSelection: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: vh(20),
            marginLeft: vw(10)
        },
        iWant: {
            fontFamily: Fonts.font17,
            color: Colors.textBlack
        },
        selectionContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: vw(5),
        },
        CheckBoxContainer: {
            height: vh(20),
            width: vw(20),
            borderRadius: normalize(50),
            borderColor: Colors.textBlack,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: normalize(2),
            marginHorizontal: vw(8),
        },
        ActiveBorder: {
            borderColor: Colors.KFC_red,
        },
        CheckBoxSelected: {
            height: vh(10),
            width: vw(10),
            backgroundColor: Colors.KFC_red,
            borderRadius: normalize(10),
        },
        checkBoxText: {
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
        },
        completeAddress: {
            width: '95%',
            alignSelf: 'center',
        },
        completeYourAddress: {
            marginVertical: vh(20),
            marginTop: vh(30),
            color: Colors.textBlack,
            fontFamily: Fonts.font18,
            fontSize: normalize(16),
        },
        adressAndChangeButton: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
        },
        PlaceHolderText: {
            color: Colors.textBlack,
            fontFamily: Fonts.font17,
            fontSize: normalize(16),
        },
        addresPlaceHolder: {
            width: '75%'
        },
        ChangeButton: {
            borderWidth: normalize(1),
            borderColor: Colors.KFC_red,
            borderRadius: normalize(2),
            marginLeft: 'auto'
        },
        ChangeButtonText: {
            fontSize: normalize(12),
            color: Colors.textBlack,
            fontFamily: Fonts.font17,
            marginHorizontal: vw(8),
            marginVertical: vh(4)
        },
        CustomBottomBorder: {
            width: '100%',
            marginTop: vh(10),
            borderBottomWidth: normalize(1),
            borderBottomColor: Colors.fadeBorder
        },
        BuildingAndFLat: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: vh(20),
            gap: normalize(20),
        },
        buildingNameContainer: {
            width: '55%',
        },
        FlatNoContainer: {
            width: '40%',
        },
        AddressTagsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: vh(10)
        },
        tagLocation: {
            fontSize: normalize(13),
            fontFamily: Fonts.font17,
            color: Colors.textBlack,
        },
        TagsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        Tag: {
            borderRadius: normalize(2),
            color: Colors.ButtonTextBlueColor,
            backgroundColor: Colors.blueLightBG,
            marginHorizontal: vw(5),
            marginVertical: vh(2),
            paddingHorizontal: vw(10),
            paddingVertical: vh(5),
            fontFamily: Fonts.font17,
            fontSize: normalize(11),
        },
        ActiveTag: {
            backgroundColor: Colors.blueShadows,
            color: Colors.constantWhite
        },
        ButtonWrapper: {
            backgroundColor: Colors.bodyColor,
            width: '100%',
            position: 'absolute',
            left: vw(0)
        },
        confirmLocationButton: {
            width: '100%',
            height: vh(50),
            alignSelf: 'center',
            backgroundColor: Colors.timerFadeText,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: vh(30),
            marginBottom: vh(50)
        },
        confirmLocation: {
            color: Colors.constantWhite,
            fontFamily: Fonts.font18,
            fontSize: normalize(17),
        },
    });
};