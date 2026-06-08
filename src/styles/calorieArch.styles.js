import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      paddingTop: 16,
      paddingBottom: 8,
    },
    svgContainer: {
      position: "relative",
      width: 220,
      height: 220,
      justifyContent: "center",
      alignItems: "center",
    },
    textOverlay: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: 13,
      color: theme.textMuted,
      marginBottom: 2,
    },
    bigNumber: {
      fontSize: 46,
      fontWeight: "bold",
      color: theme.text,
      lineHeight: 50,
    },
    subLabel: {
      fontSize: 13,
      color: theme.textMuted,
    },
    targetHighlight: {
      color: theme.primary,
      fontWeight: "bold",
    },
  });
