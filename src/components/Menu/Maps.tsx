import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
// data imports 
import { stores } from '../../data/StoresData';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// utils
import Fonts from '../../utils/Fonts';
import Images from '../../utils/LocalImages';
import { useStrings } from '../../utils/Strings';
import { useThemeColors } from '../../utils/Colors';
import { useCountry } from '../../context/CountryContext';
// datat imports 
import{DeliveryDetails}from '../../data/DeliveryDetails';
import { CountryInfo } from '../../data/CountryInfo';
export default function Maps() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { countrySelected, setCountrySelected } = useCountry();
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };
    const [deliveryType, setDeliveryType] = useState<string>(Strings?.delivery)
    const [addressBox, setAddress] = useState({
        address: '',
        buildingName: '',
        flatNo: ''
    })
    const [tag, setTag] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [location, setLocation] = useState<any>(null);
    const handleChangeAddress = (text: string) => {
        setAddress(prev => ({ ...prev, address: text }))
    }
    const handleChangeBuildingName = (text: string) => {
        setAddress(prev => ({ ...prev, buildingName: text }))
    }
    const handleChangeFlatNo = (text: string) => {
        setAddress(prev => ({ ...prev, flatNo: text }))
    }
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (showPopup) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        } else {
            opacity.setValue(0);
        }
    }, [showPopup]);

    useEffect(() => {
        const isValid =
            addressBox.address.trim() !== '' &&
            addressBox.buildingName.trim() !== '' &&
            addressBox.flatNo.trim() !== '' &&
            tag.trim() !== ''
        setGoodToSave(isValid);
    }, [addressBox, tag, location]);

    const [goodToSave, setGoodToSave] = useState(false)
    const saveLocationInfo = () => {
        if (!goodToSave) return;
        navigation.pop();
    };

    const handlChangeAddress = () => {
        setAddress({
            address: '',
            buildingName: '',
            flatNo: ''
        })
    }
    return (
        <View style={Styles.OuterContianer}>
            <TouchableWithoutFeedback
                onPress={() => setOpen(false)}>
                <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                    <View style={Styles.BackIconAndHeaderText}>
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                        >
                            <Image source={Images?.back_arrow} style={Styles.BackIcon} />
                        </TouchableOpacity>
                        <Text style={Styles.navHeaderText} numberOfLines={1} >{DeliveryDetails?.address}</Text>
                    </View>
                    <TouchableOpacity
                        style={Styles.headerCountrySelection}
                        onPress={toggleOpen}>
                        <Image source={countrySelected?.flag} style={Styles.flag} />
                        <Image source={Images?.Arrow_down} style={Styles.arrowdonwn} />
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
            </TouchableWithoutFeedback>
            <View style={Styles.container}>
                <View style={[Styles.MapContainer, open ? { zIndex: -1 } : { zIndex: 0 }]}>
                    <MapView
                        style={Styles.map}
                        initialRegion={
                            {
                                latitude: 26.9124,
                                longitude: 75.7873,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }
                            // location
                        }>
                        <Marker coordinate={location} title='You are here' />
                        {stores.map(store => (
                            <Marker
                                key={store.id}
                                coordinate={{ latitude: store.latitude, longitude: store.longitude }}
                                title={store.name}
                            />
                        ))}
                    </MapView>
                </View>
                <View style={Styles.LowerContainer}>
                    <View style={Styles.locationTypeSelection}>
                        <Text style={Styles.iWant}>{Strings?.iWant} : </Text>
                        <TouchableOpacity
                            onPress={() => setDeliveryType(Strings?.delivery)}
                            activeOpacity={.5}
                            style={Styles.selectionContainer}>
                            <View style={[Styles.CheckBoxContainer, (deliveryType == Strings?.delivery) && Styles.ActiveBorder]}>
                                {(deliveryType === Strings?.delivery) &&
                                    <View
                                        style={Styles.CheckBoxSelected}
                                    />
                                }
                            </View>
                            <Text style={Styles.checkBoxText}>{Strings?.delivery.toUpperCase()} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setDeliveryType(Strings?.pickup)}
                            activeOpacity={.5}
                            style={Styles.selectionContainer}>
                            <View style={[Styles.CheckBoxContainer, (deliveryType == Strings?.pickup) && Styles.ActiveBorder]}>
                                {(deliveryType == Strings?.pickup) &&
                                    <View
                                        style={Styles.CheckBoxSelected}
                                    />
                                }
                            </View>
                            <Text style={Styles.checkBoxText}>{Strings?.pickup.toUpperCase()} </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.completeAddress}>
                        <Text style={Styles.completeYourAddress}>{Strings?.completeYourAddress} </Text>
                        <View style={Styles.adressAndChangeButton} >
                            <TextInput
                                value={addressBox?.address}
                                placeholderTextColor={Colors?.placeHoldertext}
                                placeholder={Strings?.address}
                                onChangeText={handleChangeAddress}
                                style={[Styles.PlaceHolderText, Styles.addresPlaceHolder]}
                            />
                            <TouchableOpacity
                                style={Styles.ChangeButton}
                                onPress={handlChangeAddress}
                            >
                                <Text style={Styles.ChangeButtonText}>{Strings?.change.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.CustomBottomBorder} />
                        <View style={Styles.BuildingAndFLat}>
                            <View style={Styles.buildingNameContainer}>
                                <TextInput
                                    value={addressBox?.buildingName}
                                    placeholder={Strings?.buildingName + '*'}
                                    placeholderTextColor={Colors?.placeHoldertext}
                                    onChangeText={handleChangeBuildingName}
                                    style={Styles.PlaceHolderText}
                                />
                                <View style={Styles.CustomBottomBorder} />
                            </View>
                            <View style={Styles.FlatNoContainer}>
                                <TextInput
                                    value={addressBox?.flatNo}
                                    placeholder={Strings?.flatNo + '*'}
                                    placeholderTextColor={Colors?.placeHoldertext}
                                    onChangeText={handleChangeFlatNo}
                                    style={Styles.PlaceHolderText}
                                />
                                <View style={Styles.CustomBottomBorder} />
                            </View>
                        </View>
                    </View>
                    <View style={Styles.AddressTagsContainer}>
                        <Text style={Styles.tagLocation}>{Strings?.tagLocation} :  </Text>
                        <View style={Styles.TagsContainer}>
                            <TouchableOpacity
                                onPress={() => { setTag(Strings?.home) }}
                            >
                                <Text style={[Styles.Tag, (tag == Strings?.home) && Styles.ActiveTag]}>{Strings?.home.toUpperCase()} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setTag(Strings?.office) }}
                            >
                                <Text style={[Styles.Tag, (tag == Strings?.office) && Styles.ActiveTag]}>{Strings?.office.toUpperCase()} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setTag(Strings?.hotel) }}
                            >
                                <Text style={[Styles.Tag, (tag == Strings?.hotel) && Styles.ActiveTag]}>{Strings?.hotel.toUpperCase()} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setTag(Strings?.other) }}
                            >
                                <Text style={[Styles.Tag, (tag == Strings?.other) && Styles.ActiveTag]}>{Strings?.other.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[Styles.ButtonWrapper, { bottom: inset.bottom + 10 }]}>
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
                        {Strings?.confirmLocation.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>
            {showPopup && (
                <Animated.View style={[Styles.popupOverlay, { opacity }]}>
                    <Animated.View style={[Styles.popupBox, { opacity: opacity }]}>
                        <Text style={Styles.popupTitle}>Confirm Location</Text>
                        <Text style={Styles.popupMessage}>
                            {Strings?.saveLocationConfirmation}
                        </Text>

                        <View style={Styles.popupButtons}>
                            <TouchableOpacity
                                style={[Styles.popupButton, Styles.cancelButton]}
                                onPress={() => setShowPopup(false)}
                            >
                                <Text style={Styles.cancelText}>{Strings?.cancel}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[Styles.popupButton, Styles.saveButton]}
                                onPress={() => {
                                    setShowPopup(false);
                                    saveLocationInfo();
                                }}
                            >
                                <Text style={Styles.saveText}>{Strings?.save}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            )}
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
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
        headerCountrySelection: {
            marginRight: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
        },
        arrowdonwn: {
            height: 15,
            width: 15,
            tintColor: Colors?.textBlack
        },
        CountrySelectionContainer: {
            position: 'absolute',
            zIndex: 5,
            right: 20,
            top: 30,
            width: 120,
            backgroundColor: Colors?.bodyColor,
            borderWidth: 1,
            borderColor: Colors?.fadeBorder,
            borderRadius: 4,
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
        navHeaderText: {
            overflow: 'hidden',
            fontSize: 16,
            fontFamily: Fonts?.subHeader,
            fontWeight: 700,
            width: '70%',
            color: Colors?.textBlack
        },
        arrow: {
            fontSize: 18,
            fontWeight: "700",
        },
        row: {
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 15,
            alignItems: "center",
            borderBottomWidth: 1,
        },
        flag: {
            height: 20,
            width: 30,
        },
        countryName: {
            fontSize: 15,
            fontFamily: Fonts?.font17,
            fontWeight: "500",
            color: Colors?.textBlack,
            marginLeft: 8
        },
        OuterContianer: {
            flex: 1,
            backgroundColor: Colors?.bodyColor
        },
        container: {
            height: 400,
        },
        MapContainer: {
            // position: 'relative',
        },
        map: {
            height: 400,
        },
        LowerContainer: {
            backgroundColor: Colors?.bodyColor,
        },
        locationTypeSelection: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginLeft: 20
        },
        iWant: {
            fontFamily: Fonts?.font17,
            fontWeight: 600,
            color: Colors?.textBlack
        },
        selectionContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 5,
        },
        CheckBoxContainer: {
            height: 20,
            width: 20,
            borderRadius: 50,
            borderColor: Colors?.textBlack,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            marginHorizontal: 8,
        },
        ActiveBorder: {
            borderColor: Colors?.KFC_red,
        },
        CheckBoxSelected: {
            height: 10,
            width: 10,
            backgroundColor: Colors?.KFC_red,
            borderRadius: 10,
        },
        checkBoxText: {
            fontFamily: Fonts?.font17,
            fontWeight: 600,
            color: Colors?.textBlack,
        },
        completeAddress: {
            width: '90%',
            alignSelf: 'center'
        },
        completeYourAddress: {
            marginVertical: 20,
            marginTop: 30,
            color: Colors?.textBlack,
            fontFamily: Fonts?.font17,
            fontSize: 16,
            fontWeight: 700,
        },
        adressAndChangeButton: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            alignSelf: 'center',
        },
        PlaceHolderText: {
            color: Colors?.textBlack,
            fontFamily: Fonts?.font17,
            fontSize: 16,
            fontWeight: 500,
        },
        addresPlaceHolder: {
            width: '75%'
        },
        ChangeButton: {
            borderWidth: 1,
            borderColor: Colors?.KFC_red,
            borderRadius: 2,
            marginLeft: 'auto'
        },
        ChangeButtonText: {
            fontSize: 12,
            color: Colors?.textBlack,
            fontFamily: Fonts?.font17,
            marginHorizontal: 8,
            marginVertical: 4
        },
        CustomBottomBorder: {
            width: '100%',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: Colors?.fadeBorder
        },
        BuildingAndFLat: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 20,
            gap: 20,
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
            marginTop: 10
        },
        tagLocation: {
            fontSize: 13,
            fontFamily: Fonts?.font17,
            fontWeight: 500,
            color: Colors?.textBlack,
        },
        TagsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        Tag: {
            borderRadius: 2,
            color: Colors?.ButtonTextBlueColor,
            backgroundColor: Colors?.blueLightBG,
            marginHorizontal: 5,
            marginVertical: 2,
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontFamily: Fonts?.font17,
            fontSize: 11,
            fontWeight: 500,
        },
        ActiveTag: {
            backgroundColor: Colors?.blueShadows,
            color: Colors?.constantWhite
        },
        ButtonWrapper: {
            backgroundColor: Colors?.bodyColor,
            width: '100%',
            position: 'absolute',
            left: 0
        },
        confirmLocationButton: {
            width: '93%',
            height: 50,
            alignSelf: 'center',
            backgroundColor: Colors?.timerFadeText,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        confirmLocation: {
            color: Colors?.constantWhite,
            fontFamily: Fonts?.font17,
            fontSize: 17,
            fontWeight: 700,
        },
        popupOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: Colors?.SemiTransparent,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
        },
        popupBox: {
            width: '80%',
            backgroundColor: Colors.bodyColor,
            padding: 20,
            borderRadius: 10,
            elevation: 10
        },
        popupTitle: {
            fontSize: 18,
            fontWeight: 700,
            fontFamily: Fonts?.subHeader,
            color: Colors.textBlack,
            marginBottom: 10,
        },
        popupMessage: {
            fontSize: 14,
            fontFamily: Fonts?.font17,
            color: Colors.textFadeBlack,
            marginBottom: 20
        },
        popupButtons: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10
        },
        popupButton: {
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 5,
            marginLeft: 10
        },
        cancelButton: {
            backgroundColor: Colors.blueLightBG
        },
        saveButton: {
            backgroundColor: Colors.KFC_red
        },
        cancelText: {
            fontFamily: Fonts?.font17,
            color: Colors.textBlack
        },
        saveText: {
            fontFamily: Fonts?.font17,
            color: Colors.constantWhite,
            fontWeight: 700
        }

    })
    return Styles;
};