import { StyleSheet } from "react-native";

export default (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", color: theme.text, marginBottom: 24 },
  toggleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  typeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.surface,
    borderRadius: 20,
  },
  typeActive: { backgroundColor: theme.primary },
  typeText: { color: theme.text, fontSize: 12, fontWeight: "bold" },
  previewContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  preview: { width: "100%", height: 300, borderRadius: 16, marginBottom: 16 },
  clearBtn: { padding: 12 },
  clearText: { color: theme.error, fontWeight: "bold" },
  placeholderContainer: { flex: 1, justifyContent: "center", gap: 16 },
  actionBtn: {
    backgroundColor: theme.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  actionText: { color: theme.background, fontSize: 16, fontWeight: "bold" },
  secondaryBtn: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  secondaryText: { color: theme.primary, fontSize: 16, fontWeight: "bold" },
  analyzeBtn: {
    backgroundColor: theme.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  analyzeText: { color: theme.background, fontSize: 18, fontWeight: "bold" },
});
