import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/fastingWidget.styles";
import * as SecureStore from "expo-secure-store";

const formatElapsed = (ms) => {
  if (ms <= 0) return "00:00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const FastingWidget = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const [isFasting, setIsFasting] = useState(false);
  const [fastStartTime, setFastStartTime] = useState(null);
  const [durationHours, setDurationHours] = useState(16);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [fastCompleted, setFastCompleted] = useState(false);

  // Reload persisted fasting state every time the dashboard gains focus
  const loadState = useCallback(async () => {
    try {
      const stored = await SecureStore.getItemAsync("fastingState");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDurationHours(parsed.durationHours ?? 16);
        setDurationMinutes(parsed.durationMinutes ?? 0);
        if (parsed.isFasting && parsed.fastStartTime) {
          setIsFasting(true);
          setFastStartTime(parsed.fastStartTime);
          // Check if already completed
          const totalDur = ((parsed.durationHours ?? 16) * 3600 + (parsed.durationMinutes ?? 0) * 60) * 1000;
          if (totalDur > 0 && Date.now() - parsed.fastStartTime >= totalDur) {
            setFastCompleted(true);
          } else {
            setFastCompleted(false);
          }
        } else {
          setIsFasting(false);
          setFastStartTime(null);
          setFastCompleted(false);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadState();
    }, [loadState]),
  );

  // Live tick
  useEffect(() => {
    if (!isFasting || !fastStartTime) {
      if (!fastCompleted) setElapsed(0);
      return;
    }
    const totalMs = (durationHours * 3600 + durationMinutes * 60) * 1000;
    const tick = () => {
      const now = Date.now() - fastStartTime;
      if (totalMs > 0 && now >= totalMs) {
        setElapsed(totalMs);
        setFastCompleted(true);
        return;
      }
      setElapsed(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isFasting, fastStartTime, durationHours, durationMinutes, fastCompleted]);

  const totalMs = (durationHours * 3600 + durationMinutes * 60) * 1000;
  const progress = isFasting && totalMs > 0 ? Math.min(elapsed / totalMs, 1) : 0;

  // Format duration label
  const durationLabel =
    durationHours > 0 && durationMinutes > 0
      ? `${durationHours}h ${durationMinutes}m`
      : durationHours > 0
        ? `${durationHours}h`
        : `${durationMinutes}m`;

  const statusText = fastCompleted
    ? "Complete!"
    : isFasting
      ? "In progress"
      : "Not active";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push("/fasting")}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.leftInfo}>
          <View
            style={[
              styles.iconWrap,
              isFasting && { backgroundColor: theme.primary + "22" },
            ]}
          >
            <Ionicons
              name={isFasting ? "timer" : "timer-outline"}
              size={18}
              color={theme.primary}
            />
          </View>
          <View>
            <Text style={styles.title}>Fasting</Text>
            <Text style={styles.subtitle}>{statusText}</Text>
          </View>
        </View>
      </View>

      {/* Live Timer Display */}
      {isFasting || fastCompleted ? (
        <View style={styles.liveTimerRow}>
          <Text style={styles.liveTimerText}>{formatElapsed(elapsed)}</Text>
          <Text style={styles.liveTimerGoal}>
            {fastCompleted ? "Goal reached!" : `of ${durationLabel}`}
          </Text>
        </View>
      ) : (
        <View style={styles.liveTimerRow}>
          <Text style={styles.idleText}>Tap to start a fast</Text>
        </View>
      )}

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.strategyBadge}>
          <Text style={styles.strategyBadgeText}>{durationLabel}</Text>
        </View>
        <View style={[styles.openBtn, isFasting && !fastCompleted && { backgroundColor: theme.error }]}>
          <Text style={styles.openBtnText}>
            {fastCompleted ? "View" : isFasting ? "View" : "Open"}
          </Text>
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FastingWidget;
