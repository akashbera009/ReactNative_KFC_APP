import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// webviwe 
import { WebView, WebViewMessageEvent } from 'react-native-webview';
// data imports
import { htmlString } from '../data/termaAndCondition';
// utils
import Fonts from '../utils/Fonts';
import Images from '../utils/LocalImages';
import { useStrings } from '../utils/Strings';
import { useThemeColors } from '../utils/Colors';
import { normalize, vh, vw } from '../utils/Dimensions';
import { DeliveryDetails } from '../data/DeliveryDetails';

export default function WebViewPage() {
    const Colors = useThemeColors();
    const Strings = useStrings();
    const inset = useSafeAreaInsets();
    const Styles = createDynamicStyles(Colors, Fonts);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const INJECTED_JAVASCRIPT: string = `
    window.onload = function() {
        setTimeout(() => {
            try {
                if (!window.ReactNativeWebView) {
                    console.log('ReactNativeWebView not available');
                    return;
                }
                let injectedData = null;
                
                if (window.ReactNativeWebView.injectedObjectJson) {
                    const jsonString = window.ReactNativeWebView.injectedObjectJson();
                    injectedData = JSON.parse(jsonString);
                    console.log(injectedData)
                } else if (window.injectedData) {
                    injectedData = window.injectedData;
                }

                if (!injectedData) {
                    window.ReactNativeWebView.postMessage('NO_DATA');
                    return;
                }

                const nameEl = document.getElementById('name');
                const phoneEl = document.getElementById('phone');

                if (nameEl) nameEl.innerText = injectedData.userName || 'N/A';
                if (phoneEl) phoneEl.innerText = injectedData.phoneNo || 'N/A';

                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'DATA_RENDERED',
                        injectedData: injectedData
                    })
                );
            } catch (error) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'ERROR',
                        error: error.toString()
                    })
                );
            }
        }, 200);
    };
`;
    const onMessage = (event: WebViewMessageEvent): void => {
        const messageData = event.nativeEvent.data;
        console.log('Raw message:', messageData);
        try {
            if (messageData === 'NO_DATA') {
                console.log('No injected data found');
                return;
            }
            const parsedData: unknown = JSON.parse(messageData);
            console.log('Parsed message:', parsedData);
        } catch (error: unknown) {
            console.log('Message (not JSON):', messageData);
        }
    };
    const onLoad = () => {
        console.log('pagee loaded')
    }
    return (
        <View style={Styles.parent}>
            <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
                <View style={Styles.BackIconAndHeaderText}>
                    <TouchableOpacity
                        onPress={() => navigation.pop()}
                    >
                        <Image source={Images.back_arrow} style={Styles.BackIcon} />
                    </TouchableOpacity>
                    <Text style={Styles.headerText}>{Strings.termsCondition}</Text>
                </View>
            </View>
            <View style={Styles.body}>
                <WebView
                    source={{
                        html: htmlString,
                        baseUrl: 'https://kfc.com'
                    }}
                    onLoad={onLoad}
                    onMessage={onMessage}
                    onNavigationStateChange={(navstate) => {
                        console.log(navstate.url)
                    }}
                    originWhitelist={['https://*']}
                    startInLoadingState
                    javaScriptEnabled={true}
                    injectedJavaScript={INJECTED_JAVASCRIPT}
                    onShouldStartLoadWithRequest={(request) => {
                        return request.url.startsWith('https://kfc.com');
                    }}
                    onError={(e) => {
                        console.log('error is ', e);
                    }}
                    injectedJavaScriptObject={{
                        userName: DeliveryDetails?.personName,
                        phoneNo: DeliveryDetails?.mobileNumber
                    }}
                    pullToRefreshEnabled={true}
                    style={Styles.firstWeb1} />
            </View>
        </View>
    );
}

const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
    const Styles = StyleSheet.create({
        parent: {
            flex: 1,
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
            shadowColor: Colors.blueShadows,
            shadowOffset: { width: vw(0), height: vh(2) },
            shadowOpacity: 0.25,
            shadowRadius: normalize(3.84),
            elevation: 5,
        },
        headerText: {
            fontSize: normalize(20),
            fontFamily: Fonts.subHeader,
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
        body: {
            backgroundColor: Colors.bodyLigheterColor,
            flex: 1,
        },
        firstWeb: {
            padding: normalize(10),
            marginHorizontal: vw(0),
        },
        firstWeb1: {
            height: '100%',
            width: '100%',
            flex: 0,
            margin: normalize(0),
            padding: normalize(0),
            backgroundColor: Colors.bodyColor
        },
    });
    return Styles;
};