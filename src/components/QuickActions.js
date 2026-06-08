import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/quickActions.styles";

const QuickActions = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.pill, styles.pillFilled]}
        onPress={() => router.push("/(log)/photo")}
      >
        <Ionicons name="camera-outline" size={18} color={theme.text} />
        <Text style={styles.pillTextFilled}>Snap Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.pill, styles.pillOutline]}
        onPress={() => router.push("/(log)/text")}
      >
        <Ionicons name="pencil-outline" size={16} color="#2ecc71" />
        <Text style={styles.pillTextOutline}>Type Meal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.pill, styles.pillOutline]}
        onPress={() => router.push("/(log)/barcode")}
      >
        <Ionicons name="barcode-outline" size={18} color="#9b59b6" />
        <Text style={styles.pillTextOutline}>Barcode</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickActions;
