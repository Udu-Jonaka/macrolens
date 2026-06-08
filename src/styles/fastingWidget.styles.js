import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    leftInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.text,
    },
    subtitle: {
      fontSize: 12,
      color: theme.textMuted,
    },

    // === Live Timer ===
    liveTimerRow: {
      alignItems: "center",
      paddingVertical: 10,
      marginBottom: 8,
    },
    liveTimerText: {
      fontSize: 36,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
      letterSpacing: 2,
    },
    liveTimerGoal: {
      fontSize: 13,
      color: theme.textMuted,
      fontWeight: "500",
      marginTop: 2,
    },
    idleText: {
      fontSize: 14,
      color: theme.textMuted,
      fontWeight: "500",
    },

    // === Progress ===
    progressBar: {
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.background,
      marginBottom: 14,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 3,
      backgroundColor: theme.primary,
    },

    // === Bottom ===
    bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    strategyBadge: {
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 12,
      backgroundColor: theme.background,
    },
    strategyBadgeText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.primary,
    },
    openBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 14,
      backgroundColor: theme.primary,
    },
    openBtnText: {
      fontSize: 13,
      fontWeight: "700",
      color: "#FFFFFF",
    },
  });
