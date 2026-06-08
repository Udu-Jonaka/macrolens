import { Stack } from "react-native";
import { Stack as RouterStack } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";

export default function ProfileLayout() {
  const { theme } = useTheme();

  return (
    <RouterStack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    />
  );
}
