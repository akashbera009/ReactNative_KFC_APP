import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TouchableOpacity , StyleSheet ,View,  Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SideBarScreen = ({ navigation }: DrawerContentComponentProps) => {
    return (
        <SafeAreaView>

        <TouchableOpacity style={Styles.SingleEntry}
          onPress={() => navigation.navigate('Main', { screen: 'HomeScreen' })}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.SingleEntry}
          onPress={() => navigation.navigate('Help', { screen: 'HelpScreen' })}>
          <Text>Help</Text>
        </TouchableOpacity>
              </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    SingleEntry: {
        
    }
})
export default SideBarScreen