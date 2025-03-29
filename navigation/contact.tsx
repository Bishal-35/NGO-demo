// import { View, Text } from 'react-native';

// export default function ContactPage(){
//   return (
//     <View>
//       <Text>Contact us page</Text>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";

const MyComponent = () => {
  const [block, setBlock] = useState("");
  const [gram, setGram] = useState("");
  const [gramPanchayat, setGramPanchayat] = useState("");

  const handleStoreData = (type) => {
    switch (type) {
      case "block":
        Alert.alert("Block Data:", block);
        break;
      case "gram":
        Alert.alert("Gram Data:", gram);
        break;
      case "gramPanchayat":
        Alert.alert("Gram Panchayat Data:", gramPanchayat);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex:1, backgroundColor: '#1e1e1e' }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, color:'#fff'}}>Contact us page</Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* Block Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 , color:'#fff'}}>
            Demo
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
            }}
            placeholder="Enter Demo"
            placeholderTextColor={'gray'}
            value={block}
            onChangeText={setBlock}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff", // Blue background
              paddingVertical: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={() => handleStoreData("block")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Gram Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 , color:'#fff'}}>
          Demo
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
            }}
            placeholder="Enter Demo"
            placeholderTextColor={'gray'}
            value={gram}
            onChangeText={setGram}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff", // Blue background
              paddingVertical: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={() => handleStoreData("gram")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Gram Panchayat Section */}
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 , color:'#fff'}}>
          Demo
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
            }}
            placeholder="Enter Demo"
            placeholderTextColor={'gray'}
            value={gramPanchayat}
            onChangeText={setGramPanchayat}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff", // Blue background
              paddingVertical: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
            onPress={() => handleStoreData("gramPanchayat")}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyComponent;
