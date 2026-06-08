import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    backBtn: {
      padding: 8,
      marginLeft: -8,
    },
    placeholderBtn: {
      width: 40,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    imagePreview: {
      width: "100%",
      height: 200,
      borderRadius: 16,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 12,
    },
    typeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 24,
    },
    typeChip: {
      flex: 1,
      minWidth: "45%",
      backgroundColor: theme.surface,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    typeChipActive: {
      borderColor: theme.primary,
      backgroundColor: theme.background,
    },
    typeChipText: {
      color: theme.textMuted,
      fontSize: 14,
      fontWeight: "500",
    },
    typeChipTextActive: {
      color: theme.primary,
      fontWeight: "700",
    },
    macroGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      marginBottom: 32,
    },
    macroInputContainer: {
      flex: 1,
      minWidth: "45%",
    },
    macroLabel: {
      color: theme.textMuted,
      fontSize: 12,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
    },
    saveBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginBottom: 16,
    },
    saveBtnText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    deleteBtn: {
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.secondary,
    },
    deleteBtnText: {
      color: theme.secondary,
      fontSize: 16,
      fontWeight: "600",
    },
  });
