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
import Contact from "@/navigation/contact";

// Create Navigators
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Stack Navigator (Allows navigating without hiding tabs)
// function TabStackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Tabs"
//         component={TabNavigator}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="Demo1" component={ImageViewer} />
//     </Stack.Navigator>
//   );
// }

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
    <Drawer.Navigator initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#25292e', // Style the header background
      },
      headerTintColor: '#fff', // Header text color
      drawerStyle: {
        backgroundColor: '#1e1e1e', // Drawer background color
        width: 240, // Width of the drawer
      },
      drawerActiveTintColor: '#ffd33d', // Active item color in the drawer
      drawerInactiveTintColor: '#fff', // Inactive item color
    }}
  >
      <Drawer.Screen
        name="Home"
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
      <Drawer.Screen name="Demo1" component={ImageViewer} />
      <Drawer.Screen name="Demo2" component={Abt} />
      <Drawer.Screen name="Contact Us" component={Contact} />
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



