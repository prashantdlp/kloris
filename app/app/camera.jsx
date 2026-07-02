import { View, Text, Pressable, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { router } from "expo-router";

export default function CameraPage() {
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
            <Pressable onPress={requestPermission}>
                <Text>Grant Camera Permission</Text>
            </Pressable>
            </View>
        );
    }

    async function takePhoto() {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync();
        router.push({
            pathname: "/predict",
            params: {imageUri: photo.uri}
        });
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="back" />

            <View style={styles.topBar}>
            <Text style={styles.icon}>✕</Text>
            <View style={styles.topRight}>
                <Text style={styles.icon}>⚡</Text>
                <Text style={styles.icon}>↺</Text>
            </View>
            </View>

            <View style={styles.cropBox} />

            <View style={styles.bottomBar}>
            <Text style={styles.icon}>🖼</Text>

            <Pressable style={styles.shutterOuter} onPress={takePhoto}>
                <View style={styles.shutterInner} />
            </Pressable>

            <Text style={styles.icon}>⚙</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    camera: {
        flex: 1,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    topBar: {
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    topRight: {
        flexDirection: "row",
        gap: 20,
    },

    icon: {
        color: "white",
        fontSize: 28,
    },

    cropBox: {
        position: "absolute",
        top: "18%",
        left: "10%",
        width: "80%",
        height: "50%",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.7)",
        borderRadius: 20,
    },

    bottomBar: {
        position: "absolute",
        bottom: 50,
        left: 30,
        right: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    shutterOuter: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 4,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },

    shutterInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "white",
    },
});