import { StyleSheet } from "react-native";

const COLORS = {
  background: "#2A1B12",
  card: "#3B281D",
  primary: "#D67B48",
  text: "#FFFFFF",
  muted: "#B8A89F",
  danger: "#E86D6D", // included for completeness based on palette
  separator: "#2A1B12",
};

export default (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
    backButton: {
      padding: 8,
      marginLeft: -8, // visually align left edge
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      marginLeft: 12,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 100, // leave space for bottom button
    },
    stepperCard: {
      backgroundColor: theme.surface,
      borderRadius: 24,
      paddingVertical: 24,
      paddingHorizontal: 20,
      marginBottom: 20,
      alignItems: "center",
    },
    stepperLabel: {
      fontSize: 14,
      color: theme.textMuted,
      fontWeight: "600",
      marginBottom: 20,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    stepperRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    stepperButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      // Adding a subtle shadow for tactile feel
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    stepperValue: {
      fontSize: 48,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
    saveButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 30, // account for safe area / home bar
      backgroundColor: "transparent",
    },
    saveButton: {
      backgroundColor: theme.primary,
      borderRadius: 16,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    saveButtonDisabled: {
      opacity: 0.7,
    },
    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    loader: {
      marginRight: 10,
    },
  });
