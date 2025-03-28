import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

// Import Screens
import HomeScreen from "./(tabs)/index";
import AboutPage from "./(tabs)/about";
import ImageViewer from "@/components/ImageViewer";
import Abt from "./about";

// Create Navigators
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Stack Navigator (Allows navigating without hiding tabs)
function TabStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ImageViewer" component={ImageViewer} />
    </Stack.Navigator>
  );
}

// ✅ Tab Navigator (Always Visible)
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About Us"
        component={AboutPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ✅ Drawer Navigator (Inside "More" Tab)
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Drawer.Screen name="ImageViewer" component={ImageViewer} />
      <Drawer.Screen name="Abt" component={Abt} />
    </Drawer.Navigator>
  );
}

// ✅ Main Layout (Drawer with Tabs Inside)
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerNavigator />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
