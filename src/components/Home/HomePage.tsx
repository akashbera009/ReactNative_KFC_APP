import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';;
// external imports 
import { RadialGradient } from 'react-native-gradients';

// util imports
import Fonts from '../../utils/Fonts'
// import { useCountry } from '../../context/CountryContext';
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';

export default function HomePage() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const colorList: { offset: string, color: string, opacity: string }[] = [
    { offset: '0%', color: Colors?.tintOrange, opacity: '1' },
    { offset: '50%', color: Colors?.orangeColorText, opacity: '1' },
    { offset: '100%', color: Colors?.KFC_red, opacity: '1' },
  ]
  return (
    <ScrollView >
      <View style={Styles.BlankCover} />
      <View style={Styles.menuButtonContainer}>
        <Image source={Images?.Menu} style={[Styles.menuIcon,{top:inset.top}]}/>
      </View>
      
      <View style={Styles.gradientBg}>
        <RadialGradient x="50%" y="50%" rx="50%" ry="50%" colorList={colorList} ></RadialGradient>
      </View>
      <View style={Styles.ImagesAndAddressContainer}>
        <Image source={Images?.Home_Page_Main_Image} style={Styles.HomePageMainImage} />
      </View>

      <View style={Styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Strings?.FontsScreen)}>
          <Text>Goto Fonts Screen </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Strings?.CreateProfileScreen, { phoneNo: '322222222' })}>
          <Text> crreate profile Screen </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SplashScreen')}>
          <Text>landing Screen </Text>
        </TouchableOpacity>
      </View>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ipsum? Ipsa, tempora quos. Iste et, ad consectetur quia quaerat unde dolorem similique quos quo corrupti enim beatae officia rem placeat accusamus eos reprehenderit repudiandae ratione dolor est. Quae nemo dolorum natus, vero molestiae eligendi error! Nisi sunt temporibus eveniet officiis dignissimos dicta qui. Magnam atque dolore eos quae possimus voluptas est minima fugiat harum cumque sint, eveniet voluptate commodi dicta laboriosam rem corporis nulla, alias exercitationem aut, doloremque accusantium. Commodi, nesciunt. Dolore inventore quod suscipit eaque harum beatae enim dicta cum, magni recusandae incidunt velit! Maiores accusantium ab dicta velit voluptatem, neque a! Illum praesentium quos cum ipsum omnis est sunt, in maiores ratione amet ullam sapiente id? Sit magni laudantium fugit omnis, assumenda, magnam, nisi nemo placeat doloremque ducimus numquam dolore aliquam. Dolorem odio laudantium doloremque dignissimos ducimus expedita quibusdam! Rem iste nihil eaque quaerat, dolores amet. Optio dolorem quo saepe aspernatur reiciendis sit deleniti repellat eum distinctio. Labore, aliquid dolor suscipit officia blanditiis hic nemo incidunt modi distinctio ratione magnam velit quia error consectetur sunt architecto magni quasi? Modi ad provident pariatur facere amet ex adipisci assumenda unde rem ut temporibus asperiores nulla necessitatibus quaerat, maxime ducimus sequi?</Text>
    </ScrollView >
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
    BlankCover: {
      width: '100%',
      height: 400,
    },
    menuButtonContainer:{
      position:'absolute',
      left: 15 ,
      zIndex: 200
    },
    menuIcon:{
      height: 25,
      width:25 ,
      tintColor: Colors?.constantWhite,
    },
    gradientBg: {
      position: 'absolute',
      zIndex: 100 , 
      top: 0,
      left: 0,
      width: '100%',
      height: 400,
    },
    ImagesAndAddressContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 150,
      width: '100%',
      height: 400,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    HomePageMainImage: {
      height: 230,
      width: 230,
      alignSelf: 'center'
    },
    bottomButtonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: '#ebbdbdff'
    },
  })
  return Styles
}