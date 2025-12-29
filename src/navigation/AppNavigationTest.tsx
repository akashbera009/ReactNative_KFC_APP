import SideBarScreen from "../screens/SideBarScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RootStackNavigator from "./RootStack";

const DrawerContent = () => <SideBarScreen />;
const Drawer = createDrawerNavigator()

export default function AppNavigationTest() {
  return (
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerShown: false }}
          drawerContent={DrawerContent}
        >
          <Drawer.Screen name="Root" component={RootStackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
