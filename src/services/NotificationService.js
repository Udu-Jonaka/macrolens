import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Initialize the behavior for when a notification is received while the app is foregrounded.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#D67B48",
  });
}

export const requestPermissionsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
};

export const scheduleTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    identifier: "test-notification",
    content: {
      title: "Test Successful! 🎉",
      body: "Yayyy my notification worked.",
    },
    trigger: {
      seconds: 5,
      channelId: "default",
    },
  });
};

export const scheduleStreakSaver = async () => {
  await Notifications.cancelScheduledNotificationAsync("streak-saver");
  await Notifications.scheduleNotificationAsync({
    identifier: "streak-saver",
    content: {
      title: "Don't break your streak! 🔥",
      body: "You haven't logged any meals today. Take a moment to keep your streak alive!",
    },
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
      channelId: "default",
    },
  });
};

export const cancelStreakSaver = async () => {
  await Notifications.cancelScheduledNotificationAsync("streak-saver");
};

export const scheduleMealReminders = async () => {
  await cancelMealReminders();

  const mealTimes = [
    {
      id: "meal-1",
      title: "Breakfast Time 🍳",
      body: "Don't forget to log your breakfast!",
      hour: 9,
      minute: 0,
    },
    {
      id: "meal-2",
      title: "Lunch Time 🥗",
      body: "Time to fuel up! Log your lunch now.",
      hour: 13,
      minute: 0,
    },
    {
      id: "meal-3",
      title: "Dinner Time 🍽️",
      body: "What's for dinner? Log it to stay on track.",
      hour: 19,
      minute: 0,
    },
  ];

  for (const meal of mealTimes) {
    await Notifications.scheduleNotificationAsync({
      identifier: meal.id,
      content: {
        title: meal.title,
        body: meal.body,
      },
      trigger: {
        hour: meal.hour,
        minute: meal.minute,
        repeats: true,
        channelId: "default",
      },
    });
  }
};

export const cancelMealReminders = async () => {
  await Notifications.cancelScheduledNotificationAsync("meal-1");
  await Notifications.cancelScheduledNotificationAsync("meal-2");
  await Notifications.cancelScheduledNotificationAsync("meal-3");
};

export const scheduleHydrationReminders = async () => {
  await cancelHydrationReminders();

  const hydrationTimes = [
    { id: "hydro-1", hour: 10 },
    { id: "hydro-2", hour: 12 },
    { id: "hydro-3", hour: 14 },
    { id: "hydro-4", hour: 16 },
    { id: "hydro-5", hour: 18 },
  ];

  for (const hydro of hydrationTimes) {
    await Notifications.scheduleNotificationAsync({
      identifier: hydro.id,
      content: {
        title: "Hydration Check! 💧",
        body: "Time for a glass of water to stay hydrated.",
      },
      trigger: {
        hour: hydro.hour,
        minute: 0,
        repeats: true,
        channelId: "default",
      },
    });
  }
};

export const cancelHydrationReminders = async () => {
  await Notifications.cancelScheduledNotificationAsync("hydro-1");
  await Notifications.cancelScheduledNotificationAsync("hydro-2");
  await Notifications.cancelScheduledNotificationAsync("hydro-3");
  await Notifications.cancelScheduledNotificationAsync("hydro-4");
  await Notifications.cancelScheduledNotificationAsync("hydro-5");
};

export const scheduleFastingNotifications = async (durationHours, durationMinutes) => {
  // Cancel any existing fasting notifications first
  await cancelFastingNotifications();

  // Immediate notification: fast has started
  await Notifications.scheduleNotificationAsync({
    identifier: "fasting-start",
    content: {
      title: "Fast Started ⏱️",
      body: `Your ${durationHours > 0 ? durationHours + "h" : ""}${durationMinutes > 0 ? " " + durationMinutes + "m" : ""} fast has begun. Stay strong!`,
    },
    trigger: null, // fires immediately
  });

  // Scheduled notification: fast is complete
  const totalSeconds = durationHours * 3600 + durationMinutes * 60;
  if (totalSeconds > 0) {
    await Notifications.scheduleNotificationAsync({
      identifier: "fasting-complete",
      content: {
        title: "Fast Complete! 🎉",
        body: `Congratulations! Your ${durationHours > 0 ? durationHours + "h" : ""}${durationMinutes > 0 ? " " + durationMinutes + "m" : ""} fast is done. Time to eat!`,
      },
      trigger: {
        type: "timeInterval",
        seconds: totalSeconds,
        repeats: false,
        channelId: "default",
      },
    });
  }
};

export const cancelFastingNotifications = async () => {
  await Notifications.cancelScheduledNotificationAsync("fasting-start");
  await Notifications.cancelScheduledNotificationAsync("fasting-complete");
};

export const cancelAllReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
