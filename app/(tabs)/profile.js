import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import getStyles from "../../src/styles/profile.styles";
import useStreak from "../../src/hooks/useStreak";
import api from "../../src/services/api";

// ────────────────────────────────────────
// Helpers & Options
// ────────────────────────────────────────
const GOAL_OPTIONS = [
  { value: "lose_weight", label: "Cut" },
  { value: "maintain", label: "Maintain" },
  { value: "gain_weight", label: "Gain" },
];

const ACTIVITY_OPTIONS = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "active", label: "Active" },
  { value: "very_active", label: "Very Active" },
];

const getGoalLabel = (val) => GOAL_OPTIONS.find((o) => o.value === val)?.label || "—";
const getActivityLabel = (val) => ACTIVITY_OPTIONS.find((o) => o.value === val)?.label || "—";

// ────────────────────────────────────────
// Account menu items
// ────────────────────────────────────────
const MENU_ITEMS = [
  {
    key: "edit",
    label: "Edit Personal Metrics",
    icon: "body-outline",
    route: "/profile/edit",
    color: "#4DA8DA", // Blue
  },
  {
    key: "goal",
    label: "Adjust Fitness Goal",
    icon: "disc-outline",
    route: "/profile/goal",
    color: "#9b59b6", // Purple
  },
  {
    key: "settings",
    label: "App Settings",
    icon: "settings-outline",
    route: "/profile/settings",
    color: "#95a5a6", // Gray
  },
  {
    key: "logout",
    label: "Log Out",
    icon: "log-out-outline",
    isDanger: true,
  },
];

import { useTheme } from "../../src/context/ThemeContext";

// ────────────────────────────────────────
// Component
// ────────────────────────────────────────
export default function Profile() {
  const { user, updateUser, logout, isLoading } = useContext(AuthContext);
  const { theme } = useTheme();
  const router = useRouter();
  const styles = getStyles(theme);
  const streak = useStreak();

  // ── Modal States ──
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  // ── Derived values ──
  const isImperial = user?.preferences?.unitSystem === "imperial";
  const currentWeightKg = user?.profile?.weight || 70;
  const currentWeightDisplay = isImperial ? Math.round(currentWeightKg * 2.20462) : currentWeightKg;
  const currentActivity = user?.profile?.activityLevel;
  const currentGoal = user?.profile?.fitnessGoal;

  // ── Temp Edits ──
  const [tempWeight, setTempWeight] = useState(currentWeightDisplay);
  const [isUpdating, setIsUpdating] = useState(false);

  // ── Loading state ──
  if (isLoading || !user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D67B48" />
      </SafeAreaView>
    );
  }

  // ── Handlers ──
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const handleMenuPress = (item) => {
    if (item.isDanger) {
      handleLogout();
      return;
    }
    if (item.route) {
      router.push(item.route);
    }
  };

  const saveQuickMetric = async (payload, closeModal) => {
    setIsUpdating(true);
    try {
      const response = await api.put("/api/auth/profile", payload);
      if (response.data?.user) {
        await updateUser(response.data.user);
        closeModal();
      }
    } catch (error) {
      Alert.alert("Update Failed", "Could not save your changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const openWeightModal = () => {
    setTempWeight(currentWeightDisplay);
    setWeightModalVisible(true);
  };

  // ────────────────────────────────────
  // Render
  // ────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page title ── */}
        <Text style={styles.pageTitle}>Profile</Text>

        {/* ── Identity card ── */}
        <View style={styles.identityCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={theme.text} />
          </View>
          <View style={styles.identityInfo}>
            <Text style={styles.userName}>{user.name || "User"}</Text>
            <Text style={styles.userEmail}>{user.email || ""}</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={14} color="#FFFFFF" />
              <Text style={styles.streakText}>
                {streak} Day Streak
              </Text>
            </View>
          </View>
        </View>

        {/* ── Quick metrics grid ── */}
        <View style={styles.metricsCard}>
          {/* Weight */}
          <TouchableOpacity
            style={styles.metricColumn}
            onPress={openWeightModal}
            activeOpacity={0.7}
          >
            <View style={styles.metricIconCircle}>
              <Ionicons name="scale-outline" size={22} color="#4DA8DA" />
            </View>
            <Text style={styles.metricLabel}>Current Weight</Text>
            <Text style={styles.metricValue}>{currentWeightDisplay} {isImperial ? "lbs" : "kg"}</Text>
            <Ionicons name="chevron-forward" size={16} color="#4DA8DA" />
          </TouchableOpacity>

          {/* Activity */}
          <TouchableOpacity
            style={styles.metricColumn}
            onPress={() => setActivityModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.metricIconCircle}>
              <Ionicons name="walk-outline" size={22} color="#2ecc71" />
            </View>
            <Text style={styles.metricLabel}>Activity Level</Text>
            <Text style={styles.metricValue}>{getActivityLabel(currentActivity)}</Text>
            <Ionicons name="chevron-forward" size={16} color="#2ecc71" />
          </TouchableOpacity>

          {/* Goal */}
          <TouchableOpacity
            style={styles.metricColumn}
            onPress={() => setGoalModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.metricIconCircle}>
              <Ionicons name="disc-outline" size={22} color="#9b59b6" />
            </View>
            <Text style={styles.metricLabel}>Current Goal</Text>
            <Text style={styles.metricValue}>{getGoalLabel(currentGoal)}</Text>
            <Ionicons name="chevron-forward" size={16} color="#9b59b6" />
          </TouchableOpacity>
        </View>

        {/* ── Account section ── */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.accountCard}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.key}>
              {index > 0 && <View style={styles.separator} />}
              <TouchableOpacity
                style={styles.accountRow}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.accountIconBox, item.isDanger && styles.accountIconBoxDanger]}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={item.isDanger ? theme.error : item.color}
                  />
                </View>
                <Text style={[styles.accountLabel, item.isDanger && styles.accountLabelDanger]}>
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* ────────────────────────────────────────
          MODALS 
      ──────────────────────────────────────── */}

      {/* 1. Weight Modal */}
      <Modal visible={weightModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Weight</Text>
              <TouchableOpacity onPress={() => setWeightModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color="#B8A89F" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.stepperContainer}>
              <View style={styles.stepperRow}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setTempWeight(w => Math.max(isImperial ? 66 : 30, w - 1))}
                >
                  <Ionicons name="remove" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <Text style={styles.stepperValue}>{tempWeight}</Text>
                
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setTempWeight(w => w + 1)}
                >
                  <Ionicons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.saveBtn, isUpdating && styles.saveBtnDisabled]}
              onPress={() => {
                const finalWeight = isImperial ? tempWeight * 0.453592 : tempWeight;
                saveQuickMetric({ weight: finalWeight }, () => setWeightModalVisible(false));
              }}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.saveBtnText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 2. Activity Level Modal */}
      <Modal visible={activityModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Activity Level</Text>
              <TouchableOpacity onPress={() => setActivityModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color="#B8A89F" />
              </TouchableOpacity>
            </View>
            
            {ACTIVITY_OPTIONS.map((opt) => {
              const isActive = opt.value === currentActivity;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.modalOption, isActive && styles.modalOptionActive]}
                  onPress={() => saveQuickMetric({ activityLevel: opt.value }, () => setActivityModalVisible(false))}
                  disabled={isUpdating}
                >
                  <Text style={[styles.modalOptionText, isActive && styles.modalOptionTextActive]}>
                    {opt.label}
                  </Text>
                  {isActive && <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

      {/* 3. Goal Modal */}
      <Modal visible={goalModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Current Goal</Text>
              <TouchableOpacity onPress={() => setGoalModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color="#B8A89F" />
              </TouchableOpacity>
            </View>
            
            {GOAL_OPTIONS.map((opt) => {
              const isActive = opt.value === currentGoal;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.modalOption, isActive && styles.modalOptionActive]}
                  onPress={() => saveQuickMetric({ fitnessGoal: opt.value }, () => setGoalModalVisible(false))}
                  disabled={isUpdating}
                >
                  <Text style={[styles.modalOptionText, isActive && styles.modalOptionTextActive]}>
                    {opt.label}
                  </Text>
                  {isActive && <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
