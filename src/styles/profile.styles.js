import { StyleSheet } from "react-native";

export default (theme) =>
  StyleSheet.create({
    // ── Container ──
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },

    // ── Page header ──
    pageTitle: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
      marginTop: 8,
      marginBottom: 24,
      letterSpacing: -0.5,
    },

    // ── Identity card ──
    identityCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: "rgba(214, 123, 72, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    identityInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 3,
    },
    userEmail: {
      fontSize: 13,
      color: theme.textMuted,
      marginBottom: 10,
    },
    streakBadge: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: theme.primary,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 20,
      gap: 5,
    },
    streakText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#FFFFFF", // Keep white for contrast on primary badge
    },

    // ── Quick metrics grid ──
    metricsCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 8,
      flexDirection: "row",
      marginBottom: 28,
    },
    metricColumn: {
      flex: 1,
      alignItems: "center",
    },
    metricIconCircle: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: "rgba(214, 123, 72, 0.12)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    metricLabel: {
      fontSize: 11,
      color: theme.textMuted,
      marginBottom: 4,
      textAlign: "center",
    },
    metricValue: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 8,
      textAlign: "center",
    },
    metricChevron: {
      color: theme.primary,
    },

    // ── Account section ──
    sectionTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.textMuted,
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    accountCard: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      overflow: "hidden",
    },
    accountRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 18,
    },
    accountIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "rgba(214, 123, 72, 0.12)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    accountIconBoxDanger: {
      backgroundColor: "rgba(207, 102, 121, 0.12)",
    },
    accountLabel: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500",
      color: theme.text,
    },
    accountLabelDanger: {
      color: theme.error,
    },
    separator: {
      height: 1,
      backgroundColor: theme.background,
      marginHorizontal: 18,
    },

    // ── Loading fallback ──
    loadingContainer: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },

    // ── Modal Styles ──
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: theme.background,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      paddingBottom: 40,
      minHeight: 300,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
    },
    modalCloseBtn: {
      padding: 4,
    },
    modalOption: {
      backgroundColor: theme.surface,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalOptionActive: {
      backgroundColor: theme.primary,
    },
    modalOptionText: {
      fontSize: 16,
      color: theme.text,
      fontWeight: "500",
    },
    modalOptionTextActive: {
      fontWeight: "700",
      color: "#FFFFFF",
    },
    
    // ── Stepper Modal Specific ──
    stepperContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30,
    },
    stepperRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
      marginBottom: 30,
    },
    stepperBtn: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    stepperValue: {
      fontSize: 48,
      fontWeight: "800",
      color: theme.text,
      fontVariant: ["tabular-nums"],
    },
    saveBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginTop: 10,
    },
    saveBtnText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "700",
    },
    saveBtnDisabled: {
      opacity: 0.7,
    },
  });
