import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/settings.styles";

const THEME_OPTIONS = [
  { label: "System Default", value: "system", icon: "phone-portrait-outline", color: "#95a5a6" },
  { label: "Light", value: "light", icon: "sunny-outline", color: "#f1c40f" },
  { label: "Dark", value: "dark", icon: "moon-outline", color: "#9b59b6" },
];

export default function ThemeSelect() {
  const router = useRouter();
  const { theme, themeMode, updateThemeMode } = useTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Theme Appearance</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {THEME_OPTIONS.map((opt) => {
          const isActive = themeMode === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.themeOption, isActive && styles.themeOptionActive]}
              onPress={() => updateThemeMode(opt.value)}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <Ionicons
                  name={opt.icon}
                  size={22}
                  color={isActive ? opt.color : theme.textMuted}
                  style={{ marginRight: 16 }}
                />
                <Text style={[styles.themeOptionText, isActive && styles.themeOptionTextActive]}>
                  {opt.label}
                </Text>
              </View>
              {isActive && <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
