import { Stack } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";

export default function LogLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.primary,
        headerTitleStyle: { color: theme.text, fontWeight: "bold" },
        contentStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="text" options={{ title: "Type Meal" }} />
      <Stack.Screen name="photo" options={{ title: "Snap Photo" }} />
      <Stack.Screen name="barcode" options={{ title: "Scan Barcode" }} />
    </Stack>
  );
}
