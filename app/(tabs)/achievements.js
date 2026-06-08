import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/achievements.styles";
import api from "../../src/services/api";

// Mock Data for the Achievements
const achievementsList = [
  {
    id: "1",
    title: "First Scan",
    description: "Log your first meal using the AI Vision scanner.",
    icon: "camera",
    type: "ion",
    unlocked: false,
  },
  {
    id: "2",
    title: "Iron Will",
    description: "Hit your daily protein target 3 days in a row.",
    icon: "arm-flex",
    type: "mci",
    unlocked: false,
  },
  {
    id: "3",
    title: "Hydration King",
    description: "Drink your full water goal today.",
    icon: "water",
    type: "ion",
    unlocked: false,
  },
  {
    id: "4",
    title: "Early Bird",
    description: "Log a healthy breakfast before 9 AM for a week.",
    icon: "partly-sunny",
    type: "ion",
    unlocked: false,
  },
  {
    id: "5",
    title: "Perfect Week",
    description: "Hit all macros perfectly for 7 straight days.",
    icon: "calendar-check",
    type: "mci",
    unlocked: false,
  },
  {
    id: "6",
    title: "Master Chef",
    description: "Use the manual entry log for 10 custom meals.",
    icon: "restaurant",
    type: "ion",
    unlocked: false,
  },
];

export default function Achievements() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [achievementsData, setAchievementsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get("/api/meals/achievements");
        if (res.data?.success) {
          setAchievementsData(res.data.data);
        }
      } catch (error) {
        console.warn("Failed to fetch achievements", error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const dynamicAchievements = achievementsList.map((a) => ({
    ...a,
    unlocked: achievementsData[a.id] || false,
  }));

  const unlockedCount = dynamicAchievements.filter((a) => a.unlocked).length;

  // Helper to render the correct icon library
  const renderIcon = (type, name, color, size = 32) => {
    if (type === "mci") {
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    }
    return <Ionicons name={name} size={size} color={color} />;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          You've unlocked {unlockedCount} of {dynamicAchievements.length}{" "}
          badges.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <>
          {/* Hero: Latest Achievement */}
          <View style={styles.heroCard}>
            <View style={styles.heroHeader}>
              <Text style={styles.heroLabel}>DAILY ACHIEVEMENT</Text>
              <Ionicons name="flame" size={20} color="#E89C6D" />
            </View>
            <View style={styles.heroContent}>
              <View style={styles.heroIconContainer}>
                <Ionicons name="water" size={40} color="#FFFFFF" />
              </View>
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>Hydration King</Text>
                <Text style={styles.heroDescription}>
                  Drink full water goal for 5 consecutive days.
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Your Display Case</Text>

          {/* Grid of Badges */}
          <View style={styles.grid}>
            {dynamicAchievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.badgeCard,
                  !achievement.unlocked && styles.badgeLocked,
                ]}
                activeOpacity={0.8}
              >
                {!achievement.unlocked && (
                  <View style={styles.lockIcon}>
                    <Ionicons name="lock-closed" size={14} color="#B8A89F" />
                  </View>
                )}

                <View
                  style={[
                    styles.iconCircle,
                    achievement.unlocked
                      ? styles.iconCircleUnlocked
                      : styles.iconCircleLocked,
                  ]}
                >
                  {renderIcon(
                    achievement.type,
                    achievement.icon,
                    achievement.unlocked ? "#D67B48" : "#B8A89F",
                  )}
                </View>

                <Text
                  style={[
                    styles.badgeTitle,
                    !achievement.unlocked && styles.textLocked,
                  ]}
                  numberOfLines={1}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.badgeDesc,
                    !achievement.unlocked && styles.textLocked,
                  ]}
                  numberOfLines={3}
                >
                  {achievement.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}
