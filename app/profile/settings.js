import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "../../src/context/ThemeContext";
import { AuthContext } from "../../src/context/AuthContext";
import api from "../../src/services/api";
import getStyles from "../../src/styles/settings.styles";
import * as NotificationService from "../../src/services/NotificationService";

export default function Settings() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { user, updateUser, logout } = useContext(AuthContext);

  // ── Preferences ──
  const [unitSystem, setUnitSystem] = useState(user?.preferences?.unitSystem || "metric");
  const [isUpdatingUnit, setIsUpdatingUnit] = useState(false);

  // ── Notifications ──
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [mealReminder, setMealReminder] = useState(false);
  const [hydrationCheck, setHydrationCheck] = useState(false);
  const [streakSaver, setStreakSaver] = useState(false);

  // ── Delete Modal ──
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load local notification settings on mount
  useEffect(() => {
    const loadNotifs = async () => {
      try {
        const notifs = await SecureStore.getItemAsync("notif_master");
        const meals = await SecureStore.getItemAsync("notif_meals");
        const hydration = await SecureStore.getItemAsync("notif_hydration");
        const streak = await SecureStore.getItemAsync("notif_streak");

        setNotificationsEnabled(notifs === "true");
        setMealReminder(meals === "true");
        setHydrationCheck(hydration === "true");
        setStreakSaver(streak === "true");
      } catch (err) {}
    };
    loadNotifs();
  }, []);

  // Helpers to toggle and save
  const handleMasterToggle = async (value) => {
    if (value) {
      const granted = await NotificationService.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission Required", "Please enable notifications in your phone's settings.");
        return;
      }
    } else {
      await NotificationService.cancelAllReminders();
      setMealReminder(false);
      setHydrationCheck(false);
      setStreakSaver(false);
      await SecureStore.setItemAsync("notif_meals", "false");
      await SecureStore.setItemAsync("notif_hydration", "false");
      await SecureStore.setItemAsync("notif_streak", "false");
    }
    setNotificationsEnabled(value);
    await SecureStore.setItemAsync("notif_master", String(value));
  };

  const handleMealToggle = async (value) => {
    setMealReminder(value);
    await SecureStore.setItemAsync("notif_meals", String(value));
    if (value) await NotificationService.scheduleMealReminders();
    else await NotificationService.cancelMealReminders();
  };

  const handleHydrationToggle = async (value) => {
    setHydrationCheck(value);
    await SecureStore.setItemAsync("notif_hydration", String(value));
    if (value) await NotificationService.scheduleHydrationReminders();
    else await NotificationService.cancelHydrationReminders();
  };

  const handleStreakToggle = async (value) => {
    setStreakSaver(value);
    await SecureStore.setItemAsync("notif_streak", String(value));
    if (value) await NotificationService.scheduleStreakSaver();
    else await NotificationService.cancelStreakSaver();
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await api.delete("/api/auth/profile");
      await logout();
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  };

  const renderRow = ({ icon, title, subtitle, rightElement, onPress, isDanger, iconColor }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        <View style={[styles.iconBox, isDanger && styles.iconBoxDanger]}>
          <Ionicons name={icon} size={20} color={isDanger ? theme.error : (iconColor || theme.primary)} />
        </View>
        <View>
          <Text style={[styles.rowTitle, isDanger && styles.rowTitleDanger]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ── PREFERENCES ── */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          {renderRow({
            icon: "speedometer-outline",
            title: "Unit System",
            subtitle: "Weight and height formatting",
            iconColor: "#4DA8DA", // Blue
            onPress: () => router.push("/profile/units"),
            rightElement: <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />,
          })}
          <View style={styles.separator} />
          {renderRow({
            icon: "color-palette-outline",
            title: "Theme Appearance",
            subtitle: "Light, dark, or system default",
            iconColor: "#9b59b6", // Purple
            onPress: () => router.push("/profile/theme"),
            rightElement: <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />,
          })}
        </View>

        {/* ── NOTIFICATIONS ── */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          {renderRow({
            icon: "notifications-outline",
            title: "Allow Notifications",
            iconColor: "#f1c40f", // Gold
            rightElement: (
              <Switch
                value={notificationsEnabled}
                onValueChange={handleMasterToggle}
                trackColor={{ false: theme.background, true: theme.primary }}
              />
            ),
          })}
          
          {notificationsEnabled && (
            <>
              <View style={styles.separator} />
              {renderRow({
                icon: "restaurant-outline",
                title: "Meal Reminders",
                subtitle: "Remind me to log meals",
                iconColor: "#2ecc71", // Green
                rightElement: (
                  <Switch
                    value={mealReminder}
                    onValueChange={handleMealToggle}
                    trackColor={{ false: theme.background, true: theme.primary }}
                  />
                ),
              })}
              <View style={styles.separator} />
              {renderRow({
                icon: "water-outline",
                title: "Hydration Check-ins",
                subtitle: "Periodic reminders to drink water",
                iconColor: "#4DA8DA", // Blue
                rightElement: (
                  <Switch
                    value={hydrationCheck}
                    onValueChange={handleHydrationToggle}
                    trackColor={{ false: theme.background, true: theme.primary }}
                  />
                ),
              })}
              <View style={styles.separator} />
              {renderRow({
                icon: "flame-outline",
                title: "Streak Saver",
                subtitle: "8 PM reminder if haven't opened app",
                iconColor: "#FF8C00", // Orange
                rightElement: (
                  <Switch
                    value={streakSaver}
                    onValueChange={handleStreakToggle}
                    trackColor={{ false: theme.background, true: theme.primary }}
                  />
                ),
              })}
            </>
          )}
        </View>

        {/* ── DATA & PRIVACY ── */}
        <Text style={styles.sectionTitle}>Data & Privacy</Text>
        <View style={styles.card}>
          {renderRow({
            icon: "shield-checkmark-outline",
            title: "Privacy Policy",
            iconColor: "#2ecc71", // Green
            onPress: () => {},
            rightElement: <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />,
          })}
          <View style={styles.separator} />
          {renderRow({
            icon: "document-text-outline",
            title: "Terms & Conditions",
            iconColor: "#95a5a6", // Gray
            onPress: () => {},
            rightElement: <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />,
          })}
          <View style={styles.separator} />
          {renderRow({
            icon: "warning-outline",
            title: "Delete Account",
            subtitle: "Permanently erase your data",
            isDanger: true,
            onPress: () => setShowDeleteModal(true),
          })}
        </View>
      </ScrollView>

      {/* ── DELETE WARNING MODAL ── */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="warning" size={48} color={theme.error} />
            <Text style={styles.modalTitle}>Delete Account?</Text>
            <Text style={styles.modalDesc}>
              This will permanently erase all your data, meal logs, and streak. If you just want to take a break, consider logging out instead.
            </Text>
            
            <TouchableOpacity 
              style={styles.modalBtnDanger} 
              onPress={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.modalBtnText}>Yes, Delete Account</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalBtnSecondary} 
              onPress={async () => {
                setShowDeleteModal(false);
                await logout();
                router.replace("/login");
              }}
              disabled={isDeleting}
            >
              <Text style={styles.modalBtnTextSecondary}>Log Out Instead</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalBtnSecondary, { marginTop: 10 }]} 
              onPress={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              <Text style={styles.modalBtnTextSecondary}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
