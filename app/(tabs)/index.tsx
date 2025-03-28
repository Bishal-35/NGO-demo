import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

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
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.uri);
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

  return (
    <View style={styles.container}>
      {/* Top Bar with Icons and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => alert('Menu clicked!')}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>NGO App</Text>
        <TouchableOpacity onPress={() => alert('User icon clicked!')}>
          <Ionicons name="person-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Live Camera Feed */}
      <View style={styles.imageContainer}>
        <CameraView style={styles.camera} type={'back'} ref={cameraRef} />
      </View>
      
      {/* Footer Buttons */}
      <View style={styles.footerContainer}>
      {/* <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} /> */}
      {/* <Button theme="primary" label="Click photo" onPress={takePhotoAsync} /> */}
        <TouchableOpacity style={styles.button} onPress={takePhotoAsync}>
          <Text style={styles.buttonText}>Click Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
          <Text style={styles.buttonText}>Choose a photo</Text>
        </TouchableOpacity>
      </View>
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
    height: '100%',
  },
  image: {
    width: 300,
    height: 300,
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
