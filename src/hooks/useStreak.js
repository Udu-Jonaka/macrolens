import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const STREAK_KEY = "macrolens_streak";

/**
 * Returns today's date string in YYYY-MM-DD format (local timezone).
 */
const getToday = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Returns yesterday's date string in YYYY-MM-DD format (local timezone).
 */
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Custom hook that tracks consecutive daily app visits.
 *
 * Streak rules:
 * - First ever visit → streak = 1
 * - Same day as last visit → streak unchanged
 * - Last visit was yesterday → streak + 1
 * - Last visit was 2+ days ago → streak resets to 1
 *
 * Persists { lastVisit, count } to SecureStore.
 */
export default function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    (async () => {
      const today = getToday();
      const yesterday = getYesterday();

      try {
        const raw = await SecureStore.getItemAsync(STREAK_KEY);
        let data = raw ? JSON.parse(raw) : null;

        if (!data) {
          // First ever visit
          data = { lastVisit: today, count: 1 };
        } else if (data.lastVisit === today) {
          // Already visited today — no change
        } else if (data.lastVisit === yesterday) {
          // Consecutive day — increment
          data = { lastVisit: today, count: data.count + 1 };
        } else {
          // Missed a day (or more) — reset
          data = { lastVisit: today, count: 1 };
        }

        await SecureStore.setItemAsync(STREAK_KEY, JSON.stringify(data));
        setStreak(data.count);
      } catch (err) {
        console.error("Streak error:", err);
        setStreak(1);
      }
    })();
  }, []);

  return streak;
}
