import { useState } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function GalleryPage() {
  const [imageUri, setImageUri] = useState(null);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      router.push({
        pathname: "/predict",
        params: { imageUri: uri }
      });
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Pick Image" onPress={pickImage} />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {!imageUri && <Text>No image selected</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});