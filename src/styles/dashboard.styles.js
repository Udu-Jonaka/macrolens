import { StyleSheet } from "react-native";

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
      paddingHorizontal: 18,
      paddingBottom: 100,
    },

    // === Header ===
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingTop: 8,
      marginBottom: 4,
    },
    greeting: {
      fontSize: 16,
      color: theme.textMuted,
    },
    wave: {
      fontSize: 16,
    },
    dateText: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.text,
      marginTop: 2,
    },
    profileBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },

    // === Streak ===
    streakContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-end",
      marginBottom: 4,
      marginTop: -6,
    },
    streakNumber: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primary,
      marginLeft: 4,
    },
    streakLabel: {
      fontSize: 11,
      color: theme.textMuted,
      marginLeft: 4,
    },

    // === Hero Card ===
    heroCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 16,
      marginBottom: 16,
    },

    // === Macro Bars ===
    macroGrid: {
      marginTop: 8,
    },

    // === Section Header ===
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    viewAll: {
      fontSize: 13,
      color: theme.primary,
      fontWeight: "600",
    },

    // === Footer Tip ===
    footerTip: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
      gap: 6,
    },
    footerTipText: {
      fontSize: 12,
      color: theme.textMuted,
      fontStyle: "italic",
    },

    // === Loading ===
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
  });
