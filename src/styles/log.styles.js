import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    // === Shared ===
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 20,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    screenTitle: {
      fontSize: 14,
      color: theme.textMuted,
      marginTop: 12,
      marginBottom: 20,
    },

    // === Meal Type Selector ===
    pillRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 24,
    },
    pill: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: "center",
      backgroundColor: theme.surface,
    },
    pillActive: {
      backgroundColor: theme.primary,
    },
    pillText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.textMuted,
    },
    pillTextActive: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.text,
    },

    // === Text Logger ===
    textInput: {
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: 16,
      padding: 18,
      borderRadius: 16,
      minHeight: 140,
      textAlignVertical: "top",
      lineHeight: 24,
      marginBottom: 24,
    },

    // === Primary Action Button ===
    primaryBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
    },
    primaryBtnDisabled: {
      opacity: 0.5,
    },
    primaryBtnText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
    },

    // === Photo Screen ===
    photoPickerContainer: {
      flex: 1,
      justifyContent: "center",
      gap: 14,
      paddingVertical: 40,
    },
    photoBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      paddingVertical: 18,
      borderRadius: 16,
    },
    photoBtnPrimary: {
      backgroundColor: theme.primary,
    },
    photoBtnSecondary: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    photoBtnTextPrimary: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    photoBtnTextSecondary: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    previewContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    preview: {
      width: "100%",
      height: 280,
      borderRadius: 20,
      marginBottom: 12,
    },
    retakeBtn: {
      paddingVertical: 8,
    },
    retakeText: {
      color: theme.secondary,
      fontSize: 14,
      fontWeight: "600",
    },

    // === Barcode Screen ===
    cameraContainer: {
      flex: 1,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 16,
      position: "relative",
    },
    camera: {
      flex: 1,
    },
    scanOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    },
    scanBox: {
      width: 240,
      height: 240,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 16,
    },
    scanHint: {
      color: theme.text,
      fontSize: 13,
      marginTop: 16,
      textAlign: "center",
      opacity: 0.8,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    permissionText: {
      color: theme.textMuted,
      fontSize: 14,
      textAlign: "center",
      paddingHorizontal: 40,
    },
    permissionBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 12,
    },
    permissionBtnText: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 14,
    },

    // === Result Card (Barcode) ===
    resultCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 20,
      marginBottom: 16,
    },
    productName: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 16,
    },
    macroRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    macroItem: {
      alignItems: "center",
      flex: 1,
    },
    macroValue: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
    },
    macroUnit: {
      fontSize: 12,
      color: theme.textMuted,
      marginTop: 2,
    },
    macroLabel: {
      fontSize: 11,
      color: theme.textMuted,
      marginTop: 2,
    },
    divider: {
      width: 1,
      backgroundColor: theme.background,
      marginHorizontal: 8,
    },
    cancelBtn: {
      paddingVertical: 14,
      alignItems: "center",
    },
    cancelText: {
      color: theme.secondary,
      fontSize: 14,
      fontWeight: "600",
    },

    // === Loading overlay ===
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(42, 27, 18, 0.85)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    loadingText: {
      color: theme.textMuted,
      fontSize: 13,
      marginTop: 12,
    },
  });
