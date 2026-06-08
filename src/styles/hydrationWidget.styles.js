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
      marginBottom: 12,
    },
    leftInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dropIcon: {
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
    goal: {
      fontSize: 12,
      color: theme.textMuted,
    },
    amount: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    amountUnit: {
      fontSize: 14,
      fontWeight: "normal",
      color: theme.textMuted,
    },
    dropsRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 14,
    },
    bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    circleBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },
    circleBtnText: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "bold",
      lineHeight: 24,
    },
    btnRow: {
      flexDirection: "row",
      gap: 10,
    },
  });
