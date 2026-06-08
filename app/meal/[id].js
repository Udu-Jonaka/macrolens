import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/mealDetail.styles";
import api from "../../src/services/api";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function MealDetail() {
  const { id, date, meal: mealParam } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState("breakfast");
  const [imageUrl, setImageUrl] = useState(null);
  
  const [macros, setMacros] = useState({
    calories: "0",
    protein: "0",
    carbs: "0",
    fats: "0",
  });

  useEffect(() => {
    if (mealParam) {
      try {
        const parsed = JSON.parse(mealParam);
        setMealType(parsed.mealType || "breakfast");
        setImageUrl(parsed.imageUrl);
        setMacros({
          calories: parsed.macros?.calories?.toString() || "0",
          protein: parsed.macros?.protein?.toString() || "0",
          carbs: parsed.macros?.carbs?.toString() || "0",
          fats: parsed.macros?.fats?.toString() || "0",
        });
      } catch (e) {
        console.warn("Failed to parse meal param", e);
      }
    }
  }, [mealParam]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        mealType,
        calories: Number(macros.calories) || 0,
        protein: Number(macros.protein) || 0,
        carbs: Number(macros.carbs) || 0,
        fats: Number(macros.fats) || 0,
      };

      await api.put(`/api/meals/${date}/${id}`, payload);
      router.back();
    } catch (error) {
      console.warn("Error updating meal:", error?.message);
      Alert.alert("Error", "Failed to update meal.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Meal",
      "Are you sure you want to delete this meal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await api.delete(`/api/meals/${date}/${id}`);
              router.back();
            } catch (error) {
              console.warn("Error deleting meal:", error?.message);
              Alert.alert("Error", "Failed to delete meal.");
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const updateMacro = (key, value) => {
    setMacros((prev) => ({ ...prev, [key]: value.replace(/[^0-9]/g, "") }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Meal</Text>
        <View style={styles.placeholderBtn} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
        )}

        {/* Meal Type */}
        <Text style={styles.sectionTitle}>Meal Type</Text>
        <View style={styles.typeContainer}>
          {MEAL_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeChip,
                mealType === type && styles.typeChipActive,
              ]}
              onPress={() => setMealType(type)}
            >
              <Text
                style={[
                  styles.typeChipText,
                  mealType === type && styles.typeChipTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Macros */}
        <Text style={styles.sectionTitle}>Macros</Text>
        <View style={styles.macroGrid}>
          <View style={styles.macroInputContainer}>
            <Text style={styles.macroLabel}>Calories (kcal)</Text>
            <TextInput
              style={styles.input}
              value={macros.calories}
              onChangeText={(val) => updateMacro("calories", val)}
              keyboardType="number-pad"
              placeholderTextColor={theme.textMuted}
            />
          </View>
          <View style={styles.macroInputContainer}>
            <Text style={styles.macroLabel}>Protein (g)</Text>
            <TextInput
              style={styles.input}
              value={macros.protein}
              onChangeText={(val) => updateMacro("protein", val)}
              keyboardType="number-pad"
              placeholderTextColor={theme.textMuted}
            />
          </View>
          <View style={styles.macroInputContainer}>
            <Text style={styles.macroLabel}>Carbs (g)</Text>
            <TextInput
              style={styles.input}
              value={macros.carbs}
              onChangeText={(val) => updateMacro("carbs", val)}
              keyboardType="number-pad"
              placeholderTextColor={theme.textMuted}
            />
          </View>
          <View style={styles.macroInputContainer}>
            <Text style={styles.macroLabel}>Fats (g)</Text>
            <TextInput
              style={styles.input}
              value={macros.fats}
              onChangeText={(val) => updateMacro("fats", val)}
              keyboardType="number-pad"
              placeholderTextColor={theme.textMuted}
            />
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveBtnText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDelete}
          disabled={loading}
        >
          <Text style={styles.deleteBtnText}>Delete Meal</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
