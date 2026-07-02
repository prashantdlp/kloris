import { View, Text, ImageBackground, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { router } from "expo-router";

export default function PredictPage() {
    const { imageUri } = useLocalSearchParams();
    // console.log("imageUri", imageUri)
    
    const [prediction, setPrediction] = useState(["Predicting..."]);

    useEffect(() => {
        async function predictImage() {
            try {
                const formData = new FormData();
                if (Platform.OS === "web") {
                    const img = await fetch(imageUri);
                    const blob = await img.blob();
                    formData.append("file", blob, "image.jpg");
                } else {
                    formData.append("file", {
                        uri: imageUri,
                        name: "image.jpg",
                        type: "image/jpeg",
                    });
                }
                const response = await fetch("https://kloris.onrender.com/predict", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                console.log(data);
                setPrediction([data.pred_class, data.confidence]);
            } catch (error) {
                console.log(error);
                setPrediction(["Prediction failed"]);
            }
        }
        predictImage();
    }, []);

    return (
        <ImageBackground
            source = {{ uri: imageUri }}
            style = {{ flex: 1 }}
        >
            <View style = {{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "35%",
                backgroundColor: "#143d2b",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 20 
            }}>
                {Array.isArray(prediction) && prediction.length === 2 ? (
                    <View>
                        <Text style={{ color: "white", fontSize: 24 }}>
                            Predicted Class: {prediction[0]}
                        </Text>

                        <Text style={{ color: "white", fontSize: 20, marginTop: 8 }}>
                            Confidence: {prediction[1]}
                        </Text>
                    </View>
                ) : (
                    <Text style={{ color: "white", fontSize: 24 }}>
                        {prediction}
                    </Text>
                )}
            </View>
        </ImageBackground>
    );
};