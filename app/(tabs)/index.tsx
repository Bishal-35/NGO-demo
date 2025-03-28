import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState(null);
  const [block, setBlock] = useState('');
  const [gram, setGram] = useState('');
  const [gramPanchayat, setGramPanchayat] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if the form and image are submitted
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImageAsync = async () => {
    if (!mediaLibraryPermission?.granted) {
      const permissionResponse = await requestMediaLibraryPermission();
      if (!permissionResponse.granted) {
        alert("Permission to access media library is required to select images.");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const takePhotoAsync = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const discardPhoto = () => {
    setImage(null); // Reset image to allow taking a new photo
    setSubmitted(false); // Allow resubmission of the form and image
    setBlock(''); // Reset form inputs
    setGram('');
    setGramPanchayat('');
  };

  const handleFormSubmit = async () => {
    if (image) {
      try {
        // Save the image to the gallery when form is submitted
        if (!mediaLibraryPermission?.granted) {
          const permissionResponse = await requestMediaLibraryPermission();
          if (!permissionResponse.granted) {
            alert("Permission to access media library is required to save images.");
            return;
          }
        }
        await MediaLibrary.createAssetAsync(image);
        alert(`Data saved successfully!\nBlock: ${block}\nGram: ${gram}\nGram Panchayat: ${gramPanchayat}`);
        
        // Reset state after saving the image
        setImage(null);
        setBlock('');
        setGram('');
        setGramPanchayat('');
        setSubmitted(false);
      } catch (error) {
        console.log("Error saving photo:", error);
        alert("Failed to save photo.");
      }
    }
  };

  return (    
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top Bar with Icons and Title */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>NGO App</Text>
          <TouchableOpacity onPress={() => alert("User icon clicked!")}>
            <Ionicons name="person-circle" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {/* Image Preview or Camera View */}
        <View style={styles.imageContainer}>
          {/* Conditionally render the discard button if an image is selected */}
  {image && !submitted && (
    <TouchableOpacity onPress={discardPhoto} style={styles.discardButton}>
      <Entypo name="cross" size={26} color="white" />
    </TouchableOpacity>
  )}
              {/* </View> */}
          {!image || submitted ? (
            <CameraView style={styles.camera} type={"back"} ref={cameraRef} />
          ) : (
            <View style={styles.previewContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              </View>
            // </View>
          )}
        </View>

        {/* Form Section (Block, Gram, Gram Panchayat) - Only shown if image is selected */}
        {image && !submitted && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Block</Text>
            <TextInput
              style={styles.input}
              value={block}
              onChangeText={setBlock}
              placeholder="Enter Block"
              placeholderTextColor="gray"
            />
            <Text style={styles.formTitle}>Gram</Text>
            <TextInput
              style={styles.input}
              value={gram}
              onChangeText={setGram}
              placeholder="Enter Gram"
              placeholderTextColor="gray"
            />
            <Text style={styles.formTitle}>Gram Panchayat</Text>
            <TextInput
              style={styles.input}
              value={gramPanchayat}
              onChangeText={setGramPanchayat}
              placeholder="Enter Gram Panchayat"
              placeholderTextColor="gray"
            />
            <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer Buttons */}
        {!image && !submitted && (
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhotoAsync}>
              <Text style={styles.buttonText}>Click Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
              <Text style={styles.buttonText}>Choose a photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    // paddingBottom: none,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "relative", // Set this to relative
  },
  camera: {
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 4,
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: 'relative', // Necessary for absolute positioning of discard button
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  discardButton: {
    position: 'absolute',  // Absolute positioning inside the image container
    top: 10,              // Position the button above the image
    right: 5,             // Align the button to the top-right of the image
    alignItems: 'center',
    zIndex: 1,
  },  
  
  formContainer: {
    marginTop: 20,
    width: "80%",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    color: 'white',
    backgroundColor: "#333",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    paddingBottom: 10,
  },
});





