import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background, // '#2A1B12'
    },
    header: {
      marginTop: 40,
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.text, // '#FFFFFF'
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textMuted, // '#B8A89F'
    },
    heroCard: {
      backgroundColor: theme.primary, // '#D67B48'
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
    },
    heroHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    heroLabel: {
      color: "#FFEEDD",
      fontSize: 12,
      fontWeight: "bold",
      letterSpacing: 1,
    },
    heroContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    heroIconContainer: {
      backgroundColor: "rgba(255,255,255,0.2)",
      padding: 16,
      borderRadius: 50,
      marginRight: 16,
    },
    heroTextContainer: {
      flex: 1,
    },
    heroTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    heroDescription: {
      color: "#FFEEDD",
      fontSize: 14,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 16,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    badgeCard: {
      backgroundColor: theme.surface, // '#3B281D'
      width: "48%",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      alignItems: "center",
      position: "relative",
    },
    badgeLocked: {
      opacity: 0.6,
    },
    lockIcon: {
      position: "absolute",
      top: 12,
      right: 12,
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    iconCircleUnlocked: {
      backgroundColor: "rgba(214, 123, 72, 0.15)", // Muted Orange with low opacity
    },
    iconCircleLocked: {
      backgroundColor: "rgba(184, 168, 159, 0.1)", // Light Tan with low opacity
    },
    badgeTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 6,
    },
    badgeDesc: {
      color: theme.textMuted,
      fontSize: 12,
      textAlign: "center",
      lineHeight: 16,
    },
    textLocked: {
      color: theme.textMuted,
    },
  });
