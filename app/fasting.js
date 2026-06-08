import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../src/context/ThemeContext";
import getStyles from "../src/styles/fasting.styles";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";

const formatElapsed = (ms) => {
  if (ms <= 0) return "00:00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const formatTime12h = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export default function FastingScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const [isFasting, setIsFasting] = useState(false);
  const [fastStartTime, setFastStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [fastCompleted, setFastCompleted] = useState(false);
  const completedRef = useRef(false);

  // Custom duration picker state (hours & minutes)
  const [durationHours, setDurationHours] = useState(16);
  const [durationMinutes, setDurationMinutes] = useState(0);

  // Animation for the timer ring pulse
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  // Load persisted fasting state
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await SecureStore.getItemAsync("fastingState");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.isFasting && parsed.fastStartTime) {
            setIsFasting(true);
            setFastStartTime(parsed.fastStartTime);
            setDurationHours(parsed.durationHours ?? 16);
            setDurationMinutes(parsed.durationMinutes ?? 0);
            // Check if already completed while app was closed
            const totalDur = ((parsed.durationHours ?? 16) * 3600 + (parsed.durationMinutes ?? 0) * 60) * 1000;
            if (totalDur > 0 && Date.now() - parsed.fastStartTime >= totalDur) {
              setFastCompleted(true);
              completedRef.current = true;
            }
          } else {
            setDurationHours(parsed.durationHours ?? 16);
            setDurationMinutes(parsed.durationMinutes ?? 0);
          }
        }
      } catch (e) {
        console.warn("Failed to load fasting state", e);
      }
    };
    load();
  }, []);

  // Persist fasting state
  const persistState = useCallback(
    async (fasting, startTime, hours, minutes) => {
      try {
        await SecureStore.setItemAsync(
          "fastingState",
          JSON.stringify({
            isFasting: fasting,
            fastStartTime: startTime,
            durationHours: hours,
            durationMinutes: minutes,
          }),
        );
      } catch (e) {
        console.warn("Failed to persist fasting state", e);
      }
    },
    [],
  );

  // Live timer tick
  useEffect(() => {
    if (!isFasting || !fastStartTime) {
      if (!fastCompleted) setElapsed(0);
      return;
    }
    const totalDurationMs = (durationHours * 3600 + durationMinutes * 60) * 1000;
    const tick = () => {
      const now = Date.now() - fastStartTime;
      if (totalDurationMs > 0 && now >= totalDurationMs) {
        setElapsed(totalDurationMs);
        // Pause at goal — don't reset
        if (!completedRef.current) {
          completedRef.current = true;
          setFastCompleted(true);
          // Fire completion notification directly
          Notifications.scheduleNotificationAsync({
            identifier: "fasting-complete",
            content: {
              title: "Fast Complete! 🎉",
              body: `Congratulations! Your ${durationHours > 0 ? durationHours + "h" : ""}${durationMinutes > 0 ? " " + durationMinutes + "m" : ""} fast is done!`,
            },
            trigger: null,
          }).catch(() => {});
        }
        return;
      }
      setElapsed(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isFasting, fastStartTime, durationHours, durationMinutes, fastCompleted]);

  // Subtle pulse animation when fasting
  useEffect(() => {
    if (isFasting) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isFasting, pulseAnim]);

  const handleStartFast = async () => {
    if (durationHours === 0 && durationMinutes === 0) return;
    const now = Date.now();
    setIsFasting(true);
    setFastStartTime(now);
    setFastCompleted(false);
    completedRef.current = false;
    persistState(true, now, durationHours, durationMinutes);
    // Immediate start notification
    await Notifications.scheduleNotificationAsync({
      identifier: "fasting-start",
      content: {
        title: "Fast Started ⏱️",
        body: `Your ${durationHours > 0 ? durationHours + "h" : ""}${durationMinutes > 0 ? " " + durationMinutes + "m" : ""} fast has begun. Stay strong!`,
      },
      trigger: null,
    }).catch(() => {});
  };

  const handleEndFast = async () => {
    setIsFasting(false);
    setFastStartTime(null);
    setElapsed(0);
    setFastCompleted(false);
    completedRef.current = false;
    persistState(false, null, durationHours, durationMinutes);
    // Cancel any pending fasting notifications
    await Notifications.cancelScheduledNotificationAsync("fasting-start").catch(() => {});
    await Notifications.cancelScheduledNotificationAsync("fasting-complete").catch(() => {});
  };

  const adjustHours = (delta) => {
    if (isFasting || fastCompleted) return;
    setDurationHours((prev) => {
      const next = prev + delta;
      if (next < 0) return 23;
      if (next > 23) return 0;
      return next;
    });
  };

  const adjustMinutes = (delta) => {
    if (isFasting || fastCompleted) return;
    setDurationMinutes((prev) => {
      const next = prev + delta;
      if (next < 0) return 55;
      if (next > 59) return 0;
      return next;
    });
  };

  // Total duration in ms
  const totalMs = (durationHours * 3600 + durationMinutes * 60) * 1000;

  // Calculate target end time
  const targetEndTime = fastStartTime
    ? new Date(fastStartTime + totalMs)
    : null;

  // Progress percentage
  const progress =
    isFasting && totalMs > 0 ? Math.min(elapsed / totalMs, 1) : 0;
  const remaining = Math.max(totalMs - elapsed, 0);

  // Format the goal display
  const goalDisplay =
    durationHours > 0 && durationMinutes > 0
      ? `${durationHours}h ${durationMinutes}m`
      : durationHours > 0
        ? `${durationHours}h`
        : `${durationMinutes}m`;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* === Header === */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Fasting Tracker</Text>
        </View>

        {/* === Timer Hero === */}
        <View style={styles.timerSection}>
          <Animated.View
            style={[
              styles.timerRing,
              !isFasting && styles.timerRingIdle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={styles.timerInner}>
              <Text style={styles.timerLabel}>
                {fastCompleted ? "Complete!" : isFasting ? "Elapsed Time" : "Ready"}
              </Text>
              <Text style={styles.timerText}>{formatElapsed(elapsed)}</Text>
              {isFasting && targetEndTime ? (
                <Text style={styles.timerTarget}>
                  Target:{" "}
                  <Text style={styles.timerTargetBold}>
                    {formatTime12h(targetEndTime)}
                  </Text>
                </Text>
              ) : (
                <Text style={styles.timerTarget}>
                  Set your duration & start
                </Text>
              )}
            </View>
          </Animated.View>

          {/* Progress Info */}
          <View style={styles.progressRow}>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>
                {Math.round(progress * 100)}%
              </Text>
              <Text style={styles.progressLabel}>Complete</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{goalDisplay}</Text>
              <Text style={styles.progressLabel}>Goal</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>
                {formatElapsed(remaining).substring(0, 5)}
              </Text>
              <Text style={styles.progressLabel}>Remaining</Text>
            </View>
          </View>
        </View>

        {/* === Duration Picker (Alarm-style) === */}
        <Text style={styles.sectionLabel}>Set Duration</Text>
        <View style={styles.pickerCard}>
          {/* Hours Column */}
          <View style={styles.pickerColumn}>
            <TouchableOpacity
              style={styles.pickerArrow}
              onPress={() => adjustHours(1)}
              activeOpacity={0.7}
              disabled={isFasting}
            >
              <Ionicons
                name="chevron-up"
                size={28}
                color={isFasting ? theme.textMuted : theme.primary}
              />
            </TouchableOpacity>
            <View style={styles.pickerValueWrap}>
              <Text style={styles.pickerValue}>
                {String(durationHours).padStart(2, "0")}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.pickerArrow}
              onPress={() => adjustHours(-1)}
              activeOpacity={0.7}
              disabled={isFasting}
            >
              <Ionicons
                name="chevron-down"
                size={28}
                color={isFasting ? theme.textMuted : theme.primary}
              />
            </TouchableOpacity>
            <Text style={styles.pickerUnit}>hours</Text>
          </View>

          {/* Separator */}
          <Text style={styles.pickerSeparator}>:</Text>

          {/* Minutes Column */}
          <View style={styles.pickerColumn}>
            <TouchableOpacity
              style={styles.pickerArrow}
              onPress={() => adjustMinutes(5)}
              activeOpacity={0.7}
              disabled={isFasting}
            >
              <Ionicons
                name="chevron-up"
                size={28}
                color={isFasting ? theme.textMuted : theme.primary}
              />
            </TouchableOpacity>
            <View style={styles.pickerValueWrap}>
              <Text style={styles.pickerValue}>
                {String(durationMinutes).padStart(2, "0")}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.pickerArrow}
              onPress={() => adjustMinutes(-5)}
              activeOpacity={0.7}
              disabled={isFasting}
            >
              <Ionicons
                name="chevron-down"
                size={28}
                color={isFasting ? theme.textMuted : theme.primary}
              />
            </TouchableOpacity>
            <Text style={styles.pickerUnit}>mins</Text>
          </View>
        </View>

        {/* === Quick Presets === */}
        <View style={styles.presetRow}>
          {[
            { h: 12, m: 0, label: "12h" },
            { h: 16, m: 0, label: "16h" },
            { h: 18, m: 0, label: "18h" },
            { h: 24, m: 0, label: "24h" },
          ].map((p) => {
            const active = durationHours === p.h && durationMinutes === p.m;
            return (
              <TouchableOpacity
                key={p.label}
                style={[styles.presetPill, active && styles.presetPillActive]}
                onPress={() => {
                  if (!isFasting) {
                    setDurationHours(p.h);
                    setDurationMinutes(p.m);
                  }
                }}
                activeOpacity={0.8}
                disabled={isFasting}
              >
                <Text
                  style={[styles.presetText, active && styles.presetTextActive]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* === Action Button === */}
        {!isFasting && !fastCompleted ? (
          <TouchableOpacity
            style={[
              styles.actionBtn,
              styles.startBtn,
              durationHours === 0 &&
                durationMinutes === 0 &&
                styles.actionBtnDisabled,
            ]}
            onPress={handleStartFast}
            activeOpacity={0.85}
            disabled={durationHours === 0 && durationMinutes === 0}
          >
            <Ionicons name="play" size={22} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Start Fast</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionBtn, fastCompleted ? styles.startBtn : styles.endBtn]}
            onPress={handleEndFast}
            activeOpacity={0.85}
          >
            <Ionicons name={fastCompleted ? "checkmark-circle" : "stop"} size={22} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>
              {fastCompleted ? "Done — Reset" : "End Fast"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
