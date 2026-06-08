import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import { useRouter, useSegments, useRootNavigationState } from "expo-router";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    loadUser();

    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    if (isLoading || !navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments, isLoading, navigationState]);

  const loadUser = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync("userData");
      const token = await SecureStore.getItemAsync("userToken");
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { token, user: userData } = response.data;

      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.error || "An error occurred",
      );
      throw error;
    }
  };

  const register = async (profileData) => {
    try {
      const response = await api.post("/api/auth/register", profileData);
      // Backend no longer returns a token — user must verify first
      // Navigate to the verify screen with the user's email
      router.replace({ pathname: "/verify", params: { email: profileData.email } });
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.error || "An error occurred",
      );
      throw error;
    }
  };

  const verifyPin = async (email, pin) => {
    try {
      const response = await api.post("/api/auth/verify-email", { email, pin });
      const { token, user: userData } = response.data;

      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      const message = error.response?.data?.error || "Verification failed";
      throw new Error(message);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userData");
    setUser(null);
  };

  const updateUser = async (newUserData) => {
    try {
      await SecureStore.setItemAsync("userData", JSON.stringify(newUserData));
      setUser(newUserData);
    } catch (error) {
      console.error("Failed to update user context", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verifyPin, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
