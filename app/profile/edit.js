import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import api from "../../src/services/api";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/edit-metrics.styles";

// ────────────────────────────────────────
// Reusable Stepper Component
// ────────────────────────────────────────
const StepperCard = ({ label, value, onIncrement, onDecrement, styles }) => (
  <View style={styles.stepperCard}>
    <Text style={styles.stepperLabel}>{label}</Text>
    <View style={styles.stepperRow}>
      <TouchableOpacity
        style={styles.stepperButton}
        onPress={onDecrement}
        activeOpacity={0.7}
      >
        <Ionicons name="remove" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      
      <Text style={styles.stepperValue}>{value}</Text>
      
      <TouchableOpacity
        style={styles.stepperButton}
        onPress={onIncrement}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  </View>
);

// ────────────────────────────────────────
// Main Screen
// ────────────────────────────────────────
export default function EditMetrics() {
  const { user, updateUser } = useContext(AuthContext);
  const { theme } = useTheme();
  const router = useRouter();
  const styles = getStyles(theme);

  // Initialize local state based on user preference
  const isImperial = user?.preferences?.unitSystem === "imperial";
  const initialWeight = user?.profile?.weight || 70;
  const initialHeight = user?.profile?.height || 170;

  const [weight, setWeight] = useState(
    isImperial ? Math.round(initialWeight * 2.20462) : initialWeight
  );
  const [height, setHeight] = useState(
    isImperial ? Math.round(initialHeight * 0.393701) : initialHeight
  );
  const [age, setAge] = useState(user?.profile?.age || 25);
  
  const [isSaving, setIsSaving] = useState(false);

  // ── Handlers ──
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Convert back to metric for the backend
      const finalWeight = isImperial ? weight * 0.453592 : weight;
      const finalHeight = isImperial ? height * 2.54 : height;

      const payload = { weight: finalWeight, height: finalHeight, age };
      const response = await api.put("/api/auth/profile", payload);
      
      if (response.data && response.data.user) {
        // Update global state with the updated user object (includes new BMR & targets)
        await updateUser(response.data.user);
        Alert.alert("Success", "Personal metrics updated and macros recalculated!", [
          { text: "OK", onPress: () => router.back() }
        ]);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      Alert.alert(
        "Update Failed",
        error.response?.data?.error || "Could not update metrics. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Metrics</Text>
        </View>

        {/* ── Content ── */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <StepperCard
            label={`Current Weight (${isImperial ? "lbs" : "kg"})`}
            value={weight}
            onDecrement={() => setWeight((prev) => Math.max(isImperial ? 66 : 30, prev - 1))}
            onIncrement={() => setWeight((prev) => prev + 1)}
            styles={styles}
          />
          
          <StepperCard
            label={`Height (${isImperial ? "in" : "cm"})`}
            value={height}
            onDecrement={() => setHeight((prev) => Math.max(isImperial ? 39 : 100, prev - 1))}
            onIncrement={() => setHeight((prev) => prev + 1)}
            styles={styles}
          />

          <StepperCard
            label="Age (Years)"
            value={age}
            onDecrement={() => setAge((prev) => Math.max(13, prev - 1))}
            onIncrement={() => setAge((prev) => prev + 1)}
            styles={styles}
          />
        </ScrollView>

        {/* ── Fixed Bottom Button ── */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
            activeOpacity={0.8}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFFFFF" style={styles.loader} />
            ) : null}
            <Text style={styles.saveButtonText}>
              {isSaving ? "Recalculating..." : "Recalculate Macros"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
