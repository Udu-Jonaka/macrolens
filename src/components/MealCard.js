import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/mealCard.styles";

const mealIcons = {
  breakfast: "sunny-outline",
  lunch: "restaurant-outline",
  dinner: "moon-outline",
  snack: "cafe-outline",
};

const MealCard = ({ meal, isEmpty = false, mealType, date }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  // === Empty State ===
  if (isEmpty) {
    const icon = mealIcons[mealType] || "restaurant-outline";
    const label = mealType
      ? mealType.charAt(0).toUpperCase() + mealType.slice(1)
      : "Meal";

    return (
      <View style={styles.emptyCard}>
        <View style={styles.emptyThumbnail}>
          <Ionicons name={icon} size={22} color={theme.textMuted} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.topLine}>
            <Ionicons
              name={icon}
              size={12}
              color={theme.textMuted}
              style={styles.mealIcon}
            />
            <Text style={styles.timeText}>–</Text>
          </View>
          <Text style={styles.emptyMealName}>{label}</Text>
          <Text style={styles.emptySubtext}>No meals logged yet</Text>
        </View>
        <TouchableOpacity
          style={styles.logBtn}
          onPress={() => router.push("/scan")}
        >
          <Text style={styles.logBtnText}>+ Log Meal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // === Logged Meal ===
  const time = new Date(meal.timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const icon = mealIcons[meal.mealType] || "restaurant-outline";
  const mealLabel = meal.mealType
    ? meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)
    : "Meal";

  const handlePress = () => {
    router.push({
      pathname: `/meal/${meal.id}`,
      params: { date, meal: JSON.stringify(meal) },
    });
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={handlePress}>
      {meal.imageUrl ? (
        <Image source={{ uri: meal.imageUrl }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, { alignItems: "center", justifyContent: "center" }]}>
          <Ionicons name={icon} size={24} color={theme.textMuted} />
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.topLine}>
          <Ionicons
            name={icon}
            size={12}
            color={theme.secondary}
            style={styles.mealIcon}
          />
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <Text style={styles.mealName}>{mealLabel}</Text>
        <View style={styles.macroRow}>
          <Text style={styles.macroChip}>P: {meal.macros?.protein || 0}g</Text>
          <Text style={styles.macroSep}>|</Text>
          <Text style={styles.macroChip}>C: {meal.macros?.carbs || 0}g</Text>
          <Text style={styles.macroSep}>|</Text>
          <Text style={styles.macroChip}>F: {meal.macros?.fats || 0}g</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.totalCal}>
          {meal.macros?.calories || 0} <Text style={styles.totalCalUnit}>kcal</Text>
        </Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={theme.textMuted}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;
