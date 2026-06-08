import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 16,
    },
    pill: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 24,
      gap: 6,
    },
    pillFilled: {
      backgroundColor: theme.primary,
    },
    pillOutline: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.surface,
    },
    pillTextFilled: {
      color: theme.text,
      fontSize: 13,
      fontWeight: "600",
    },
    pillTextOutline: {
      color: theme.textMuted,
      fontSize: 13,
      fontWeight: "600",
    },
  });
