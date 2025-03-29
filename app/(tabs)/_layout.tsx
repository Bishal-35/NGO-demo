// import { Tabs } from 'expo-router';

// import Ionicons from '@expo/vector-icons/Ionicons';


// export default function TabLayout() {
//   return (
//     <Tabs
//   screenOptions={{
//     tabBarActiveTintColor: '#ffd33d',
//     headerShown: false,    // Hide the top header completely
//     headerStyle: {
//       backgroundColor: '#25292e',
//     },
//     headerShadowVisible: false,
//     headerTintColor: '#fff',
//     tabBarStyle: {
//     backgroundColor: '#25292e',
//     },
//   }}
// >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           // tabBarIcon: ({ color, focused }) => (
//           //   <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
//           // ),
//         }}
//       />
//       <Tabs.Screen
//         name="about"
//         options={{
//           title: 'About',
//           // tabBarIcon: ({ color, focused }) => (
//           //   <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
//           // ),
//         }}
//       />
//     </Tabs>
//   );
// }



import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerShown: false,  // Hide the top header completely
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
          position: 'absolute',  // Fix tab bar to the bottom
          bottom: 0,             // Make sure it is at the bottom
          left: 0,
          right: 0,
          borderTopWidth: 0,     // Remove any border at the top
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ color, focused }) => (
          //   <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          // ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          // tabBarIcon: ({ color, focused }) => (
          //   <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          // ),
        }}
      />
    </Tabs>
  );
}
