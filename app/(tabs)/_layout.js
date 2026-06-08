import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Tabs, useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../src/context/ThemeContext";
import {
  getScreenOptions,
  getTabBarStyles,
} from "../../src/styles/tabsLayout.styles";

const TAB_CONFIG = [
  { name: "index", label: "Home", icon: "home", iconOutline: "home-outline" },
  {
    name: "history",
    label: "History",
    icon: "stats-chart",
    iconOutline: "stats-chart-outline",
  },
  { name: "scan", label: "Add", isCenter: true },
  {
    name: "achievements",
    label: "Awards",
    icon: "medal",
    iconOutline: "medal-outline",
  },
  {
    name: "profile",
    label: "Profile",
    icon: "person",
    iconOutline: "person-outline",
  },
];

function CustomTabBar() {
  const { theme } = useTheme();
  const styles = getTabBarStyles(theme);
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [isOpen, setIsOpen] = React.useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const getSubActionStyle = (index) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -60 * (index + 1)],
    });
    const scale = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });
    return {
      transform: [{ translateY }, { scale }],
      opacity: animation,
    };
  };

  const isActive = (name) => {
    if (name === "index") return pathname === "/" || pathname === "/index";
    return pathname === `/${name}`;
  };

  const navigateAndClose = (path) => {
    toggleMenu();
    router.push(path);
  };

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.fabOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {TAB_CONFIG.map((tab) => {
          if (tab.isCenter) {
            return (
              <View key={tab.name} style={styles.centerBtnWrapper}>
                {/* Sub actions */}
                <Animated.View style={[styles.fabActionBtn, getSubActionStyle(2), { zIndex: 3 }]}>
                  <TouchableOpacity onPress={() => navigateAndClose("/(log)/barcode")} style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Ionicons name="barcode-outline" size={20} color={theme.text} />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.fabActionBtn, getSubActionStyle(1), { zIndex: 2 }]}>
                  <TouchableOpacity onPress={() => navigateAndClose("/(log)/text")} style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Ionicons name="pencil-outline" size={20} color={theme.text} />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.fabActionBtn, getSubActionStyle(0), { zIndex: 1 }]}>
                  <TouchableOpacity onPress={() => navigateAndClose("/(log)/photo")} style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Ionicons name="camera-outline" size={20} color={theme.text} />
                  </TouchableOpacity>
                </Animated.View>

                {/* Main FAB */}
                <TouchableOpacity
                  style={[styles.centerBtn, { zIndex: 10 }]}
                  onPress={toggleMenu}
                  activeOpacity={0.8}
                >
                  <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    <Ionicons name="add" size={32} color="#FFF" />
                  </Animated.View>
                </TouchableOpacity>
                <Text style={styles.centerLabel}>{tab.label}</Text>
              </View>
            );
          }

          const active = isActive(tab.name);
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => {
                if (isOpen) toggleMenu();
                router.push(tab.name === "index" ? "/" : `/${tab.name}`);
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={active ? tab.icon : tab.iconOutline}
                size={22}
                color={active ? theme.primary : theme.textMuted}
              />
              <Text style={active ? styles.tabLabelActive : styles.tabLabel}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

export default function TabLayout() {
  const { theme } = useTheme();
  const screenOptions = getScreenOptions(theme);

  return (
    <Tabs
      screenOptions={screenOptions}
      tabBar={() => <CustomTabBar />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="scan" options={{ title: "Add" }} />
      <Tabs.Screen name="achievements" options={{ title: "Awards" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
