import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/scan.styles";
import * as ImagePicker from "expo-image-picker";
import api from "../../src/services/api";
import { useRouter } from "expo-router";
import { getFormattedDate } from "../../src/utils/helpers";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState("lunch");
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const pickImage = async (useCamera = false) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    if (useCamera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const analyzeMeal = async () => {
    if (!image) return Alert.alert("Error", "Please select an image first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("mealType", mealType);
    formData.append("date", getFormattedDate());

    // React Native FormData file requirement
    formData.append("image", {
      uri: image.uri,
      name: "meal_photo.jpg",
      type: "image/jpeg",
    });

    try {
      await api.post("/api/meals/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      router.push("/"); // Navigate back to dashboard on success
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        error.response?.data?.error || "Could not process image.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log a Meal</Text>

      <View style={styles.toggleRow}>
        {["breakfast", "lunch", "dinner", "snack"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeBtn, mealType === type && styles.typeActive]}
            onPress={() => setMealType(type)}
          >
            <Text style={styles.typeText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {image ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image.uri }} style={styles.preview} />
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setImage(null)}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => pickImage(true)}
          >
            <Text style={styles.actionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.secondaryBtn]}
            onPress={() => pickImage(false)}
          >
            <Text style={styles.secondaryText}>Upload from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}

      {image && (
        <TouchableOpacity
          style={styles.analyzeBtn}
          onPress={analyzeMeal}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={styles.analyzeText}>Analyze Meal</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
