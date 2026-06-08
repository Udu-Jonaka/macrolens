import React, { useEffect, useRef } from "react";
import { View, Animated, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/progressBar.styles";

const ProgressBar = ({ label, current, target, color = "#BB86FC" }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const progress = target > 0 ? Math.min(current / target, 1) : 0;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress * 100,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.values}>
          {current} / {target}
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: color,
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

