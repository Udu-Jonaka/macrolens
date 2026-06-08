import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  background: "#2A1B12",
  card: "#3B281D",
  cardLight: "#4A3528",
  primary: "#D67B48",
  secondary: "#E89C6D",
  text: "#FFFFFF",
  muted: "#B8A89F",
  disabled: "rgba(214, 123, 72, 0.4)",
  inputBorder: "rgba(184, 168, 159, 0.15)",
  progressTrack: "rgba(214, 123, 72, 0.15)",
};

export default () =>
  StyleSheet.create({
    // ── Outer wrapper ──
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    // ── Top bar (progress + back arrow) ──
    topBar: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 8,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.card,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    backButtonPlaceholder: {
      width: 40,
      height: 40,
      marginBottom: 16,
    },
    progressTrack: {
      height: 4,
      backgroundColor: COLORS.progressTrack,
      borderRadius: 2,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: COLORS.primary,
      borderRadius: 2,
    },
    stepIndicator: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 8,
    },
    stepText: {
      fontSize: 12,
      color: COLORS.muted,
      fontWeight: "600",
      letterSpacing: 0.5,
    },

    // ── Scrollable body ──
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 120,
    },

    // ── Step header (icon + title + subtitle) ──
    stepHeader: {
      alignItems: "center",
      marginTop: 24,
      marginBottom: 32,
    },
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(214, 123, 72, 0.12)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    stepTitle: {
      fontSize: 28,
      fontWeight: "800",
      color: COLORS.text,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    stepSubtitle: {
      fontSize: 14,
      color: COLORS.muted,
      textAlign: "center",
      lineHeight: 20,
      maxWidth: 280,
    },

    // ── Form fields ──
    fieldLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: COLORS.muted,
      marginBottom: 8,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    input: {
      backgroundColor: COLORS.card,
      color: COLORS.text,
      fontSize: 16,
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
    },
    inputFocused: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.cardLight,
    },

    // ── Pill selectors ──
    pillRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 24,
    },
    pill: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 8,
      backgroundColor: COLORS.card,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    pillSelected: {
      backgroundColor: "rgba(214, 123, 72, 0.15)",
      borderColor: COLORS.primary,
    },
    pillText: {
      color: COLORS.muted,
      fontSize: 14,
      fontWeight: "600",
    },
    pillTextSelected: {
      color: COLORS.primary,
    },

    // ── Grid pills (2-column) ──
    pillGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 24,
    },
    gridPill: {
      width: (width - 58) / 2,
      paddingVertical: 16,
      paddingHorizontal: 12,
      backgroundColor: COLORS.card,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    gridPillSelected: {
      backgroundColor: "rgba(214, 123, 72, 0.15)",
      borderColor: COLORS.primary,
    },
    gridPillIcon: {
      marginBottom: 6,
    },
    gridPillText: {
      color: COLORS.muted,
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
    },
    gridPillTextSelected: {
      color: COLORS.primary,
    },

    // ── Bottom CTA area ──
    bottomBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 36,
      backgroundColor: COLORS.background,
      borderTopWidth: 1,
      borderTopColor: "rgba(184, 168, 159, 0.08)",
    },
    nextButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
    },
    nextButtonDisabled: {
      backgroundColor: COLORS.disabled,
    },
    nextButtonText: {
      color: COLORS.background,
      fontSize: 16,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    nextButtonTextDisabled: {
      color: "rgba(42, 27, 18, 0.6)",
    },

    // ── Login link ──
    loginLink: {
      marginTop: 16,
      alignItems: "center",
    },
    loginLinkText: {
      color: COLORS.muted,
      fontSize: 14,
    },
    loginLinkAccent: {
      color: COLORS.secondary,
      fontWeight: "600",
    },

    // ── Error banner ──
    errorBanner: {
      backgroundColor: "rgba(207, 102, 121, 0.15)",
      borderRadius: 10,
      padding: 14,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "rgba(207, 102, 121, 0.3)",
    },
    errorText: {
      color: "#CF6679",
      fontSize: 13,
      textAlign: "center",
      fontWeight: "500",
    },

    // ── Password visibility toggle ──
    passwordWrapper: {
      position: "relative",
      marginBottom: 20,
    },
    passwordInput: {
      backgroundColor: COLORS.card,
      color: COLORS.text,
      fontSize: 16,
      padding: 16,
      paddingRight: 52,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
    },
    eyeButton: {
      position: "absolute",
      right: 16,
      top: 16,
    },
  });
