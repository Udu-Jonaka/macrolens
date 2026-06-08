import { StyleSheet } from "react-native";

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
      paddingBottom: 10,
    },
    backButton: {
      padding: 8,
      marginLeft: -8,
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
      paddingBottom: 60,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 12,
      marginTop: 24,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 18,
      paddingHorizontal: 20,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "rgba(214, 123, 72, 0.12)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    iconBoxDanger: {
      backgroundColor: "rgba(207, 102, 121, 0.12)",
    },
    rowTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 2,
    },
    rowTitleDanger: {
      color: theme.error,
    },
    rowSubtitle: {
      fontSize: 13,
      color: theme.textMuted,
    },
    separator: {
      height: 1,
      backgroundColor: theme.background,
      marginHorizontal: 20,
    },
    unitToggler: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 4,
    },
    unitBtn: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    unitBtnActive: {
      backgroundColor: theme.primary,
    },
    unitText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textMuted,
    },
    unitTextActive: {
      color: "#FFFFFF",
    },
    
    // Theme Select specific
    themeOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 20,
      paddingHorizontal: 24,
      backgroundColor: theme.surface,
      borderRadius: 20,
      marginBottom: 12,
    },
    themeOptionActive: {
      borderWidth: 2,
      borderColor: theme.primary,
    },
    themeOptionText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
    themeOptionTextActive: {
      color: theme.primary,
    },
    
    // Modal
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    modalContainer: {
      backgroundColor: theme.surface,
      borderRadius: 24,
      padding: 24,
      width: "100%",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
      marginTop: 16,
      marginBottom: 8,
    },
    modalDesc: {
      fontSize: 15,
      color: theme.textMuted,
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 22,
    },
    modalBtnDanger: {
      backgroundColor: theme.error,
      width: "100%",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginBottom: 12,
    },
    modalBtnSecondary: {
      backgroundColor: theme.background,
      width: "100%",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
    },
    modalBtnText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
    modalBtnTextSecondary: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "600",
    },
  });
