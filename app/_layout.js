import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { StatusBar } from "react-native";
import { useTheme } from "../src/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutInner />
    </ThemeProvider>
  );
}

function RootLayoutInner() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
          }}
          initialRouteName="(tabs)"
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="(log)"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen name="fasting" />
        </Stack>
      </AuthProvider>
    </>
  );
}
