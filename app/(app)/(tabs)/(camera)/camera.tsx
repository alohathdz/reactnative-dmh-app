import { useState } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import axios from "axios";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<any>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
      aspect: [4, 3],
      // base64: true,
    });

    if (result.assets!?.length > 0) {
      // resize image
      const manipResult = await manipulateAsync(
        result.assets![0].uri!,
        [{ resize: { height: 400 } }],
        { compress: 0.5, format: SaveFormat.JPEG, base64: true }
      );

      // upload to server
      const url = "https://api.codingthailand.com/api/upload";
      const res = await axios.post(url, {
        picture: "data:image/jpeg;base64," + manipResult.base64,
      });
      console.log(res.data);
      alert(JSON.stringify(res.data));
    }

    if (!result.canceled) {
      setImage(result.assets[0]!.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 400,
    margin: 20
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});