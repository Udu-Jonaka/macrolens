import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/dashboard.styles";
import { AuthContext } from "../../src/context/AuthContext";
import api from "../../src/services/api";
import { getFormattedDate } from "../../src/utils/helpers";
import CalorieArch from "../../src/components/CalorieArch";
import MacroSummaryBar from "../../src/components/MacroSummaryBar";
import QuickActions from "../../src/components/QuickActions";
import HydrationWidget from "../../src/components/HydrationWidget";
import FastingWidget from "../../src/components/FastingWidget";
import MealCard from "../../src/components/MealCard";
import { useFocusEffect, useRouter } from "expo-router";
import useStreak from "../../src/hooks/useStreak";
import * as SecureStore from "expo-secure-store";
import * as NotificationService from "../../src/services/NotificationService";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const streak = useStreak();

  const fetchTodayData = async () => {
    try {
      const date = getFormattedDate();
      const response = await api.get(`/api/meals/history/${date}`);
      setLog(response.data.data);
    } catch (error) {
      console.warn("API Error:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTodayData();

      // Reset streak saver to 8PM today (or tomorrow if after 8PM)
      const resetStreakSaver = async () => {
        try {
          const isEnabled = await SecureStore.getItemAsync("notif_streak");
          if (isEnabled === "true") {
            await NotificationService.scheduleStreakSaver();
          }
        } catch (e) {
          console.warn("Failed to reset streak saver", e);
        }
      };
      resetStreakSaver();
    }, []),
  );

  const addWater = async () => {
    try {
      const response = await api.patch("/api/meals/water", {
        date: getFormattedDate(),
        amountMl: 250,
      });
      setLog(response.data.data);
    } catch (error) {
      console.warn("API Error:", error?.message);
    }
  };

  const removeWater = async () => {
    try {
      const response = await api.patch("/api/meals/water", {
        date: getFormattedDate(),
        amountMl: -250,
      });
      setLog(response.data.data);
    } catch (error) {
      console.warn("API Error:", error?.message);
    }
  };

  if (loading || !user)
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.primary} size="large" />
      </View>
    );

  const targets = user.dailyTargets || {
    calories: 2000,
    proteinGrams: 100,
    carbsGrams: 200,
    fatsGrams: 50,
  };

  // Build the meal type cards — logged meals grouped by type, then fill empty slots
  const mealsByType = {};
  MEAL_TYPES.forEach((t) => (mealsByType[t] = []));
  (log?.meals || []).forEach((meal) => {
    if (mealsByType[meal.mealType]) {
      mealsByType[meal.mealType].push(meal);
    }
  });

  // Get today's formatted date for display
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateDisplay = `Today, ${monthNames[today.getMonth()]} ${today.getDate()}`;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* === Header === */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hey, {user.name?.split(" ")[0] || "User"}{" "}
              <Text style={styles.wave}>👋</Text>
            </Text>
            <Text style={styles.dateText}>{dateDisplay}</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={20} color="#4DA8DA" />
          </TouchableOpacity>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={20} color="#FF8C00" />
          <Text style={styles.streakNumber}>{streak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        {/* === Hero Card: Calorie Arch + Macro Bars === */}
        <View style={styles.heroCard}>
          <CalorieArch
            current={log?.totalCalories || 0}
            target={targets.calories}
          />
          <View style={styles.macroGrid}>
            <MacroSummaryBar
              label="Protein"
              current={log?.totalProtein || 0}
              target={targets.proteinGrams}
              color={theme.primary}
            />
            <MacroSummaryBar
              label="Carbs"
              current={log?.totalCarbs || 0}
              target={targets.carbsGrams}
              color={theme.secondary}
            />
            <MacroSummaryBar
              label="Fats"
              current={log?.totalFats || 0}
              target={targets.fatsGrams}
              color="#C4A47C"
            />
          </View>
        </View>

        {/* === Quick Action Pills === */}
        <QuickActions />

        {/* === Hydration Widget === */}
        <HydrationWidget
          current={log?.waterIntake || 0}
          goal={2000}
          onAdd={addWater}
          onRemove={removeWater}
        />

        {/* === Fasting Widget === */}
        <FastingWidget />

        {/* === Today's Meals === */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <TouchableOpacity onPress={() => router.push("/history")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {MEAL_TYPES.map((type) => {
          const meals = mealsByType[type];
          if (meals.length > 0) {
            return meals.map((meal, idx) => (
              <MealCard key={`${type}-${idx}`} meal={meal} date={getFormattedDate()} />
            ));
          }
          return <MealCard key={type} isEmpty mealType={type} />;
        })}

        {/* Footer Tip */}
        <View style={styles.footerTip}>
          <Text style={styles.footerTipText}>✨</Text>
          <Text style={styles.footerTipText}>
            Tap any meal to view details or edit
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
