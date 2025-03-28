import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImageAsync = async () => {
    // Request media library permission if not granted
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
      alert('You did not select any image.');
    }
  };

  const takePhotoAsync = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const savePhoto = async () => {
    if (!mediaLibraryPermission?.granted) {
      const permissionResponse = await requestMediaLibraryPermission();
      if (!permissionResponse.granted) {
        alert("Permission to access media library is required to save images.");
        return;
      }
    }

    try {
      await MediaLibrary.createAssetAsync(image);
      alert("Photo saved to gallery!");
      setImage(null); // Reset image after saving
    } catch (error) {
      console.log("Error saving photo:", error);
      alert("Failed to save photo.");
    }
  };

  const discardPhoto = () => {
    setImage(null); // Reset image to return to camera mode
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Icons and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>NGO App</Text>
        <TouchableOpacity onPress={() => alert('User icon clicked!')}>
          <Ionicons name="person-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Image Preview or Camera View */}
      <View style={styles.imageContainer}>
        {!image ? (
          <CameraView style={styles.camera} type={'back'} ref={cameraRef} />
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={savePhoto} style={styles.saveButton}>
                <Ionicons name="checkmark-circle" size={50} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={discardPhoto} style={styles.discardButton}>
                <Ionicons name="close-circle" size={50} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Footer Buttons */}
      {!image && (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  camera: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4, 
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '60%',
  },
  saveButton: {
    alignItems: 'center',
  },
  discardButton: {
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    paddingBottom: 10,
  },
});

