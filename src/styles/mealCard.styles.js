import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    // === Logged Meal Card ===
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 14,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    thumbnail: {
      width: 56,
      height: 56,
      borderRadius: 14,
      backgroundColor: theme.background,
      marginRight: 12,
    },
    cardContent: {
      flex: 1,
    },
    topLine: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 2,
    },
    mealIcon: {
      marginRight: 4,
    },
    timeText: {
      fontSize: 11,
      color: theme.textMuted,
    },
    mealName: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 4,
    },
    macroRow: {
      flexDirection: "row",
      gap: 8,
    },
    macroChip: {
      fontSize: 11,
      color: theme.textMuted,
    },
    macroSep: {
      fontSize: 11,
      color: theme.textMuted,
      opacity: 0.4,
    },
    rightSection: {
      alignItems: "flex-end",
    },
    totalCal: {
      fontSize: 17,
      fontWeight: "bold",
      color: theme.text,
    },
    totalCalUnit: {
      fontSize: 12,
      fontWeight: "normal",
      color: theme.textMuted,
    },
    chevron: {
      marginTop: 4,
    },

    // === Empty State Meal Card ===
    emptyCard: {
      backgroundColor: "transparent",
      borderRadius: 16,
      padding: 14,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.surface,
      borderStyle: "dashed",
    },
    emptyThumbnail: {
      width: 56,
      height: 56,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.textMuted,
      borderStyle: "dashed",
      marginRight: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyMealName: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 2,
    },
    emptySubtext: {
      fontSize: 12,
      color: theme.textMuted,
    },
    logBtn: {
      borderWidth: 1,
      borderColor: theme.primary,
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 14,
    },
    logBtnText: {
      color: theme.primary,
      fontSize: 13,
      fontWeight: "600",
    },
  });
