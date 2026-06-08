import { StyleSheet } from "react-native";

export const getScreenOptions = (theme) => ({
  headerShown: false,
  tabBarStyle: { display: "none" },
});

export const getTabBarStyles = (theme) =>
  StyleSheet.create({
    tabBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: theme.surface,
      flexDirection: "row",
      alignItems: "flex-end",
      paddingBottom: 12,
      borderTopWidth: 0,
      elevation: 0,
    },
    tabItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 10,
    },
    tabLabel: {
      fontSize: 10,
      marginTop: 3,
      color: theme.textMuted,
    },
    tabLabelActive: {
      fontSize: 10,
      marginTop: 3,
      color: theme.primary,
    },
    centerBtnWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    centerBtn: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      marginTop: -28,
      elevation: 8,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
    },
    centerLabel: {
      fontSize: 10,
      marginTop: 4,
      color: theme.primary,
      fontWeight: "600",
    },
    fabActionBtn: {
      position: "absolute",
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: theme.background,
    },
    fabOverlay: {
      position: "absolute",
      top: -1000,
      bottom: 0,
      left: -1000,
      right: -1000,
      backgroundColor: "rgba(0,0,0,0.5)",
    }
  });
