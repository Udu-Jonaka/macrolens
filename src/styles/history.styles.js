import { StyleSheet } from "react-native";

export default (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  dateControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.surface,
  },
  arrowBtn: { padding: 10 },
  arrow: { color: theme.primary, fontSize: 20, fontWeight: "bold" },
  dateText: { color: theme.text, fontSize: 18, fontWeight: "bold" },
  emptyText: { color: theme.textMuted, textAlign: "center", marginTop: 40 },
});
