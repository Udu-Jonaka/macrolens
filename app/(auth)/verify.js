import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/verify.styles";
import { AuthContext } from "../../src/context/AuthContext";
import { useLocalSearchParams, Link } from "expo-router";
import api from "../../src/services/api";

const PIN_LENGTH = 5;

export default function Verify() {
  const { verifyPin } = useContext(AuthContext);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { email } = useLocalSearchParams();

  const [code, setCode] = useState(Array(PIN_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (text, index) => {
    // Only accept digits
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError("");

    // Auto-advance to next input
    if (digit && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  const fullPin = code.join("");
  const isComplete = fullPin.length === PIN_LENGTH;

  const handleVerify = async () => {
    if (!isComplete) return;
    Keyboard.dismiss();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await verifyPin(email, fullPin);
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setSuccess("");

    try {
      await api.post("/api/auth/resend-pin", { email });
      setSuccess("A new PIN has been sent to your email.");
      setResendCooldown(60);
      // Clear the inputs
      setCode(Array(PIN_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend PIN.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>📧</Text>
      </View>

      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        We sent a 5-digit PIN to
      </Text>
      <Text style={styles.emailText}>{email}</Text>

      {/* PIN Input Row */}
      <View style={styles.codeRow}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              styles.codeInput,
              focusedIndex === index && styles.codeInputFocused,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setFocusedIndex(index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

      {/* Error / Success Messages */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.button, (!isComplete || loading) && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={!isComplete || loading}
      >
        {loading ? (
          <ActivityIndicator color="#121212" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      {/* Resend */}
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn't get the code? </Text>
        {resendCooldown > 0 ? (
          <Text style={styles.timerText}>Resend in {resendCooldown}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        )}
      </View>

      <Link href="/signup" style={styles.backLink}>
        ← Back to Sign Up
      </Link>
    </View>
  );
}
