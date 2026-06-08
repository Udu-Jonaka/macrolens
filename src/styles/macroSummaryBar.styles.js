import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    leftSection: {
      flex: 1,
    },
    remaining: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 2,
    },
    label: {
      fontSize: 11,
      color: theme.textMuted,
      marginBottom: 6,
    },
    trackContainer: {
      height: 6,
      backgroundColor: theme.background,
      borderRadius: 3,
      overflow: "hidden",
    },
    fill: {
      height: "100%",
      borderRadius: 3,
    },
    rightText: {
      marginLeft: 12,
      fontSize: 11,
      color: theme.textMuted,
      minWidth: 55,
      textAlign: "right",
    },
  });
