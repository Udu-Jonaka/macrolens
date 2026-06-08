import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";
import getStyles from "../styles/calorieArch.styles";

const CalorieArch = ({ current, target }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const remaining = Math.max(target - current, 0);
  const progress = target > 0 ? Math.min(current / target, 1) : 0;

  // SVG circle geometry
  const size = 220;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  
  const circumference = 2 * Math.PI * radius;
  // strokeDashoffset is how much of the ring is empty.
  // When progress is 0, offset is full circumference.
  // When progress is 1, offset is 0 (full circle).
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background track (full circle) */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={theme.background} // using background color to contrast with surface card
            strokeWidth={strokeWidth}
          />
          {/* Foreground progress */}
          {progress > 0 && (
            <Circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={theme.primary}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              // Rotate -90 degrees so the progress starts at the top (12 o'clock)
              transform={`rotate(-90 ${centerX} ${centerY})`}
            />
          )}
        </Svg>
        <View style={styles.textOverlay}>
          <Text style={styles.label}>Calories Left</Text>
          <Text style={styles.bigNumber}>
            {remaining.toLocaleString()}
          </Text>
          <Text style={styles.subLabel}>
            of <Text style={styles.targetHighlight}>{target.toLocaleString()}</Text> kcal
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalorieArch;
