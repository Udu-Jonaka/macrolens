import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/log.styles";
import api from "../../src/services/api";
import { getFormattedDate } from "../../src/utils/helpers";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function TextLogger() {
  const [text, setText] = useState("");
  const [mealType, setMealType] = useState("lunch");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleSubmit = async () => {
    if (!text.trim()) {
      return Alert.alert("Oops", "Please describe what you ate.");
    }

    setLoading(true);
    try {
      await api.post("/api/meals/text", {
        mealType,
        text: text.trim(),
        date: getFormattedDate(),
      });
      Alert.alert("Success ✨", "Meal logged successfully!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        error.response?.data?.error || "Could not analyze your meal. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.screenTitle}>
          Describe your meal in natural language
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

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="What did you eat? e.g., 2 scrambled eggs and toast"
          placeholderTextColor={theme.textMuted}
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={theme.text} />
          ) : (
            <>
              <Ionicons name="sparkles" size={18} color={theme.text} />
              <Text style={styles.primaryBtnText}>Analyze & Log</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
