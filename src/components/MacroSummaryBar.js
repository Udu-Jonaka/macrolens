import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/macroSummaryBar.styles";

const MacroSummaryBar = ({ label, current, target, color }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const remaining = Math.max(target - current, 0);
  const progress = target > 0 ? Math.min(current / target, 1) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.remaining}>
          {remaining}g{" "}
          <Text style={styles.label}>{label} left</Text>
        </Text>
        <View style={styles.trackContainer}>
          <View
            style={[
              styles.fill,
              {
                backgroundColor: color,
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.rightText}>
        {current} / {target}g
      </Text>
    </View>
  );
};

export default MacroSummaryBar;
