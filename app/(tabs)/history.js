import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/history.styles";
import api from "../../src/services/api";
import MealCard from "../../src/components/MealCard";
import { useFocusEffect } from "expo-router";

export default function History() {
  const [date, setDate] = useState(new Date());
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const fetchHistory = async (targetDate) => {
    setLoading(true);
    try {
      const yyyy = targetDate.getFullYear();
      const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
      const dd = String(targetDate.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      const response = await api.get(`/api/meals/history/${formattedDate}`);
      setLog(response.data.data);
    } catch (error) {
      console.warn("API Error:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory(date);
    }, [date]),
  );

  const isToday = date.toDateString() === new Date().toDateString();

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    if (newDate > new Date()) return;
    setDate(newDate);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.dateControl}>
        <TouchableOpacity
          onPress={() => changeDate(-1)}
          style={styles.arrowBtn}
        >
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <TouchableOpacity
          onPress={() => changeDate(1)}
          style={styles.arrowBtn}
          disabled={isToday}
        >
          <Text style={[styles.arrow, isToday && { opacity: 0.3 }]}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color="#BB86FC" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={log?.meals || []}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => <MealCard meal={item} date={date.toISOString().split("T")[0]} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No meals logged on this date.</Text>
          }
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}
