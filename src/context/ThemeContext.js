import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";

// True Light Theme (White background)
const lightTheme = {
  background: "#FFFFFF",
  surface: "#F5F0EC", // Very light off-white/tan
  primary: "#D67B48", // Muted Orange
  secondary: "#E89C6D", // Soft Orange
  text: "#2A1B12", // Deep Brown
  textMuted: "#7A6B62", // Darker tan for readability on light bg
  error: "#CF6679",
};

// True Dark Theme (Current Deep Brown)
const darkTheme = {
  background: "#2A1B12", // Deep Brown
  surface: "#3B281D", // Medium Brown
  primary: "#D67B48", // Muted Orange
  secondary: "#E89C6D", // Soft Orange
  text: "#FFFFFF", // Crisp White
  textMuted: "#B8A89F", // Light Tan/Beige
  error: "#CF6679",
};

export const ThemeContext = createContext({
  theme: darkTheme,
  isDarkTheme: true,
  themeMode: "dark",
  updateThemeMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  
  // "light", "dark", or "system"
  const [themeMode, setThemeMode] = useState("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load persisted theme preference
    const loadTheme = async () => {
      try {
        const storedTheme = await SecureStore.getItemAsync("themeMode");
        if (storedTheme) {
          setThemeMode(storedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme preference", error);
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, []);

  const updateThemeMode = async (mode) => {
    setThemeMode(mode);
    try {
      await SecureStore.setItemAsync("themeMode", mode);
    } catch (error) {
      console.error("Failed to save theme preference", error);
    }
  };

  const isDarkTheme = themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark";
  const theme = isDarkTheme ? darkTheme : lightTheme;

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, themeMode, updateThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
