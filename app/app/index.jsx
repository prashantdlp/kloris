import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.card, styles.mantis]}
        onPress={() => router.push("/camera")}
      >
        <Text>Use Camera</Text>
      </Pressable>

      <Pressable
        style={[styles.card, styles.parsley]}
        onPress={() => router.push("/gallery")}
      >
        <Text>Use Gallery</Text>
      </Pressable>
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

  card:{
    width: 250,
    height: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  mantis: {
    backgroundColor:"rgb(105, 191, 74)",
  },

  parsley:{
    backgroundColor:"rgb(30, 75, 22)",
  },
});