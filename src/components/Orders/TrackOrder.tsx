import { StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// data import 
import DeliveryDetails from '../../data/DeliveryDetails'
// util imports 
import Fonts from '../../utils/Fonts'
import { useThemeColors } from '../../utils/Colors';
import { useStrings } from '../../utils/Strings';
import { OrderHistoryData } from '../../data/OrderHistorydata';
import Images from '../../utils/LocalImages';
export default function TrackOrder() {
  const Colors = useThemeColors()
  const Strings = useStrings()
  const Styles = createDynamicStyles(Colors, Fonts);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentOrder: OrderHistory = OrderHistoryData.filter((item)=> item?.status == 'Being Prepared')[0]
  const ItemNames = currentOrder.Items.map((item)=> item?.name).join(',')
 const inset = useSafeAreaInsets()
  return (
      <View style={Styles?.Parent}>
     <View style={[Styles.NavWrapper, { marginTop: inset.top }]}>
        <View style={Styles.BackIconAndHeaderText}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
          >
            <Image source={Images?.back_arrow} style={Styles.BackIcon} />
          </TouchableOpacity>
          <Text style={Styles.headerText}>{Strings?.orderHistory} </Text>
        </View>
      </View>
    </View>
  )
}
const createDynamicStyles = (Colors: ColorType, Fonts: FontType) => {
  const Styles = StyleSheet.create({
      Parent: {
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
  })
  return Styles
}