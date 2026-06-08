import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/log.styles";
import api from "../../src/services/api";
import { getFormattedDate } from "../../src/utils/helpers";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function PhotoLogger() {
  const [image, setImage] = useState(null);
  const [mealType, setMealType] = useState("lunch");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const pickImage = async (useCamera = false) => {
    let result;
    const options = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert(
          "Permission Required",
          "Camera access is needed to take photos."
        );
      }
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert(
          "Permission Required",
          "Photo library access is needed."
        );
      }
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
    formData.append("image", {
      uri: image.uri,
      name: "meal_photo.jpg",
      type: "image/jpeg",
    });

    try {
      await api.post("/api/meals/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Success ✨", "Meal analyzed and logged!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        error.response?.data?.error || "Could not process image. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>
        Take a photo or choose from your gallery
      </Text>

      {/* Meal Type Selector */}
      <View style={styles.pillRow}>
        {MEAL_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.pill, mealType === type && styles.pillActive]}
            onPress={() => setMealType(type)}
          >
            <Text
              style={
                mealType === type ? styles.pillTextActive : styles.pillText
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Image Preview or Picker */}
      {image ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image.uri }} style={styles.preview} />
          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={() => setImage(null)}
          >
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.photoPickerContainer}>
          <TouchableOpacity
            style={[styles.photoBtn, styles.photoBtnPrimary]}
            onPress={() => pickImage(true)}
          >
            <Ionicons name="camera-outline" size={22} color={theme.text} />
            <Text style={styles.photoBtnTextPrimary}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.photoBtn, styles.photoBtnSecondary]}
            onPress={() => pickImage(false)}
          >
            <Ionicons name="images-outline" size={22} color={theme.primary} />
            <Text style={styles.photoBtnTextSecondary}>
              Choose from Gallery
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Analyze Button */}
      {image && (
        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          onPress={analyzeMeal}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={theme.text} />
          ) : (
            <>
              <Ionicons name="sparkles" size={18} color={theme.text} />
              <Text style={styles.primaryBtnText}>Analyze Meal</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
