import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import { AuthContext } from "../../src/context/AuthContext";
import api from "../../src/services/api";
import getStyles from "../../src/styles/settings.styles";

const UNIT_OPTIONS = [
  { label: "Metric", value: "metric", desc: "Kilograms (kg) and Centimeters (cm)" },
  { label: "Imperial", value: "imperial", desc: "Pounds (lb) and Inches (in)" },
];

export default function UnitSelect() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { user, updateUser } = useContext(AuthContext);

  const [unitSystem, setUnitSystem] = useState(user?.preferences?.unitSystem || "metric");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUnitSelect = async (newUnit) => {
    if (newUnit === unitSystem) return;
    setIsUpdating(true);
    const oldUnit = unitSystem;
    setUnitSystem(newUnit); // Optimistic UI update

    try {
      const response = await api.put("/api/auth/profile", { unitSystem: newUnit });
      if (response.data?.user) {
        await updateUser(response.data.user);
      }
    } catch (error) {
      setUnitSystem(oldUnit); // Revert on error
      Alert.alert("Error", "Could not update unit preferences.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Unit System</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {UNIT_OPTIONS.map((opt) => {
          const isActive = unitSystem === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.themeOption, isActive && styles.themeOptionActive]}
              onPress={() => handleUnitSelect(opt.value)}
              activeOpacity={0.7}
              disabled={isUpdating}
            >
              <View style={styles.rowLeft}>
                <View>
                  <Text style={[styles.themeOptionText, isActive && styles.themeOptionTextActive]}>
                    {opt.label}
                  </Text>
                  <Text style={[styles.rowSubtitle, { marginTop: 4 }]}>
                    {opt.desc}
                  </Text>
                </View>
              </View>
              {isUpdating && isActive ? (
                <ActivityIndicator color={theme.primary} />
              ) : isActive ? (
                <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
