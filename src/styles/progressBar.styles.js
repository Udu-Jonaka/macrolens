import { StyleSheet } from "react-native";

export default (theme) => StyleSheet.create({
  container: { marginBottom: 16 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { color: theme.textMuted, fontSize: 14, fontWeight: "600" },
  values: { color: theme.textMuted, fontSize: 12 },
  track: {
    height: 8,
    backgroundColor: theme.background,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 4 },
});
