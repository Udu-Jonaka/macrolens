import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import api from "../../src/services/api";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/adjust-goal.styles";

// ────────────────────────────────────────
// Goal Options Configuration
// ────────────────────────────────────────
const GOALS = [
  {
    key: "lose_weight",
    title: "Lose Weight",
    desc: "Burn fat and get leaner with a safe, sustainable calorie deficit.",
    icon: "flame",
    color: "#e74c3c", // Red/Orange
    IconComponent: Ionicons,
  },
  {
    key: "maintain",
    title: "Maintain Weight",
    desc: "Keep your current weight steady while building healthy habits.",
    icon: "anchor",
    color: "#3498db", // Blue
    IconComponent: MaterialCommunityIcons,
  },
  {
    key: "gain_weight",
    title: "Gain Muscle",
    desc: "Build strength and muscle mass with a controlled calorie surplus.",
    icon: "arm-flex",
    color: "#2ecc71", // Green
    IconComponent: MaterialCommunityIcons,
  },
];

// ────────────────────────────────────────
// Component
// ────────────────────────────────────────
export default function AdjustGoal() {
  const { user, updateUser } = useContext(AuthContext);
  const { theme } = useTheme();
  const router = useRouter();
  const styles = getStyles(theme);

  const [selectedGoal, setSelectedGoal] = useState(
    user?.profile?.fitnessGoal || "maintain"
  );
  const [isSaving, setIsSaving] = useState(false);

  // ── Handlers ──
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.put("/api/auth/profile", {
        fitnessGoal: selectedGoal,
      });

      if (response.data?.user) {
        // Update global user object (this includes newly recalculated macros)
        await updateUser(response.data.user);
        Alert.alert("Success", "Your fitness goal and macros have been updated!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Failed to update goal", error);
      Alert.alert(
        "Update Failed",
        error.response?.data?.error || "Could not update your goal. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Where are we heading?</Text>

      {/* ── Content ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {GOALS.map((goal) => {
          const isActive = selectedGoal === goal.key;
          const { IconComponent, icon } = goal;

          return (
            <TouchableOpacity
              key={goal.key}
              style={[styles.goalCard, isActive && styles.goalCardActive]}
              onPress={() => setSelectedGoal(goal.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
                <IconComponent
                  name={icon}
                  size={26}
                  color={isActive ? "#FFFFFF" : goal.color}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDesc}>{goal.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
            {isSaving ? "Updating..." : "Update Goal & Macros"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
