import { StyleSheet } from "react-native";

const COLORS = {
  background: "#2A1B12",
  card: "#3B281D",
  primary: "#D67B48",
  secondary: "#E89C6D",
  text: "#FFFFFF",
  muted: "#B8A89F",
  activeTint: "rgba(214, 123, 72, 0.1)",
};

export default (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 20,
    },
    backButton: {
      padding: 8,
      marginLeft: -8, // Visually align with left edge
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.text,
      marginTop: 10,
      marginBottom: 30,
      paddingHorizontal: 24,
      letterSpacing: -0.5,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 100, // Space for bottom button
    },
    goalCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 24,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    goalCardActive: {
      borderColor: theme.primary,
      backgroundColor: "rgba(214, 123, 72, 0.1)",
    },
    iconBox: {
      width: 50,
      height: 50,
      borderRadius: 16,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 20,
    },
    iconBoxActive: {
      backgroundColor: theme.primary,
    },
    textContainer: {
      flex: 1,
    },
    goalTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 4,
    },
    goalDesc: {
      fontSize: 14,
      color: theme.textMuted,
      lineHeight: 20,
    },
    saveButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 30,
      backgroundColor: theme.background,
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
