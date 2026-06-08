import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/hydrationWidget.styles";

const HydrationWidget = ({ current = 0, goal = 2000, onAdd, onRemove }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const glassSize = 250; // each glass = 250ml
  const totalDrops = 8;
  const filledDrops = Math.min(Math.floor(current / glassSize), totalDrops);

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.leftInfo}>
          <View style={styles.dropIcon}>
            <Ionicons name="water" size={18} color="#4DA8DA" />
          </View>
          <View>
            <Text style={styles.title}>Hydration</Text>
            <Text style={styles.goal}>Goal: {goal.toLocaleString()} ml</Text>
          </View>
        </View>
        <Text style={styles.amount}>
          {current.toLocaleString()} <Text style={styles.amountUnit}>ml</Text>
        </Text>
      </View>

      {/* Drops Row */}
      <View style={styles.dropsRow}>
        {Array.from({ length: totalDrops }).map((_, i) => (
          <Ionicons
            key={i}
            name="water"
            size={22}
            color={i < filledDrops ? "#4DA8DA" : theme.background}
          />
        ))}
      </View>

      {/* Bottom Row with +/- buttons */}
      <View style={styles.bottomRow}>
        <View />
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={onRemove}>
            <Text style={styles.circleBtnText}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn} onPress={onAdd}>
            <Text style={styles.circleBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HydrationWidget;
