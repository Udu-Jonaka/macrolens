import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const TIMER_SIZE = width * 0.72;

export default (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 40,
    },

    // === Header ===
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 12,
      marginBottom: 8,
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.text,
      letterSpacing: -0.5,
    },

    // === Timer Hero ===
    timerSection: {
      alignItems: "center",
      marginTop: 16,
      marginBottom: 28,
    },
    timerRing: {
      width: TIMER_SIZE,
      height: TIMER_SIZE,
      borderRadius: TIMER_SIZE / 2,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 4,
      borderColor: theme.primary,
    },
    timerRingIdle: {
      borderColor: theme.surface,
    },
    timerInner: {
      alignItems: "center",
      justifyContent: "center",
    },
    timerLabel: {
      fontSize: 13,
      color: theme.textMuted,
      fontWeight: "600",
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginBottom: 8,
    },
    timerText: {
      fontSize: 52,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
      letterSpacing: 2,
    },
    timerTarget: {
      fontSize: 14,
      color: theme.textMuted,
      marginTop: 10,
      fontWeight: "500",
    },
    timerTargetBold: {
      color: theme.primary,
      fontWeight: "700",
    },

    // === Progress Info ===
    progressRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 20,
      paddingHorizontal: 8,
    },
    progressItem: {
      alignItems: "center",
    },
    progressValue: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
    },
    progressLabel: {
      fontSize: 11,
      color: theme.textMuted,
      marginTop: 2,
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    // === Section Label ===
    sectionLabel: {
      fontSize: 12,
      color: theme.textMuted,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 12,
    },

    // === Duration Picker (Alarm-style) ===
    pickerCard: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    pickerColumn: {
      alignItems: "center",
      minWidth: 80,
    },
    pickerArrow: {
      width: 40,
      height: 36,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    pickerValueWrap: {
      backgroundColor: theme.background,
      borderRadius: 14,
      paddingHorizontal: 18,
      paddingVertical: 8,
      marginVertical: 4,
      minWidth: 76,
      alignItems: "center",
    },
    pickerValue: {
      fontSize: 34,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
    pickerUnit: {
      fontSize: 12,
      color: theme.textMuted,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginTop: 4,
    },
    pickerSeparator: {
      fontSize: 34,
      fontWeight: "800",
      color: theme.textMuted,
      marginHorizontal: 10,
      marginBottom: 24,
    },

    // === Quick Presets ===
    presetRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 28,
    },
    presetPill: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 14,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    presetPillActive: {
      backgroundColor: theme.primary,
    },
    presetText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textMuted,
    },
    presetTextActive: {
      color: "#FFFFFF",
    },

    // === Action Button ===
    actionBtn: {
      width: "100%",
      paddingVertical: 18,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
    },
    startBtn: {
      backgroundColor: theme.primary,
    },
    endBtn: {
      backgroundColor: theme.error,
    },
    actionBtnDisabled: {
      opacity: 0.4,
    },
    actionBtnText: {
      fontSize: 18,
      fontWeight: "800",
      color: "#FFFFFF",
      letterSpacing: 0.5,
    },
  });
