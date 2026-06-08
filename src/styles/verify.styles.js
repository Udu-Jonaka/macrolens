import { StyleSheet } from "react-native";

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    color: theme.textMuted,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  emailText: {
    color: theme.secondary,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 32,
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  codeInput: {
    width: 52,
    height: 60,
    backgroundColor: theme.surface,
    borderRadius: 12,
    color: theme.text,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  codeInputFocused: {
    borderWidth: 2,
    borderColor: theme.primary,
  },
  button: {
    backgroundColor: theme.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  resendText: {
    color: theme.textMuted,
    fontSize: 14,
  },
  resendLink: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  resendDisabled: {
    opacity: 0.4,
  },
  timerText: {
    color: theme.textMuted,
    fontSize: 14,
    marginLeft: 4,
  },
  errorText: {
    color: theme.error,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
  },
  successText: {
    color: "#4CAF50",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 16,
  },
  backLink: {
    color: theme.textMuted,
    fontSize: 14,
    marginTop: 24,
  },
});
