import { StyleSheet } from "react-native";

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.primary,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: theme.surface,
    color: theme.text,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: theme.background, fontSize: 16, fontWeight: "bold" },
  linkText: {
    color: theme.textMuted,
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
  },
});
