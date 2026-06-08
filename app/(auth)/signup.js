import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AuthContext } from "../../src/context/AuthContext";
import getStyles from "../../src/styles/signup.styles";

// ────────────────────────────────────────
// Constants
// ────────────────────────────────────────
const TOTAL_STEPS = 4;

const ACTIVITY_LEVELS = [
  { key: "sedentary", label: "Sedentary", icon: "bed-outline" },
  { key: "light", label: "Lightly Active", icon: "walk-outline" },
  { key: "active", label: "Active", icon: "bicycle-outline" },
  { key: "very_active", label: "Very Active", icon: "barbell-outline" },
];

const FITNESS_GOALS = [
  { key: "lose_weight", label: "Lose Weight", icon: "trending-down-outline" },
  { key: "maintain", label: "Maintain", icon: "swap-horizontal-outline" },
  { key: "gain_weight", label: "Gain Muscle", icon: "trending-up-outline" },
];

const STEP_META = [
  {
    icon: "person-outline",
    title: "About You",
    subtitle: "Let's start with the basics so we can personalise your experience.",
  },
  {
    icon: "barbell-outline",
    title: "Your Metrics",
    subtitle: "We'll use these numbers to calculate your daily targets.",
  },
  {
    icon: "flame-outline",
    title: "Goals & Lifestyle",
    subtitle: "Tell us about your day-to-day activity and what you want to achieve.",
  },
  {
    icon: "lock-closed-outline",
    title: "Secure Your Account",
    subtitle: "Create your login credentials to keep your data safe.",
  },
];

// ────────────────────────────────────────
// Component
// ────────────────────────────────────────
export default function Signup() {
  const { register } = useContext(AuthContext);
  const styles = getStyles();

  // Wizard step
  const [step, setStep] = useState(1);

  // Step 1 — Demographics
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [biologicalSex, setSex] = useState("");

  // Step 2 — Metrics
  const [unitSystem, setUnitSystem] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // Step 3 — Lifestyle & Goals
  const [activityLevel, setActivity] = useState("");
  const [fitnessGoal, setGoal] = useState("");

  // Step 4 — Account Security
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  // Progress animation
  const progressAnim = useRef(new Animated.Value(1 / TOTAL_STEPS)).current;

  // ── Validation per step ──
  const isStepValid = () => {
    switch (step) {
      case 1:
        return name.trim().length > 0 && age.trim().length > 0 && biologicalSex !== "";
      case 2:
        return height.trim().length > 0 && weight.trim().length > 0;
      case 3:
        return activityLevel !== "" && fitnessGoal !== "";
      case 4:
        return email.trim().length > 0 && password.trim().length >= 6;
      default:
        return false;
    }
  };

  // ── Navigation ──
  const animateProgress = (toStep) => {
    Animated.timing(progressAnim, {
      toValue: toStep / TOTAL_STEPS,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setError("");
      const next = step + 1;
      setStep(next);
      animateProgress(next);
    } else {
      handleRegister();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setError("");
      const prev = step - 1;
      setStep(prev);
      animateProgress(prev);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    // The backend stores everything in metric (kg/cm)
    const parsedWeight = Number(weight);
    const parsedHeight = Number(height);
    const finalWeight = unitSystem === "imperial" ? parsedWeight * 0.453592 : parsedWeight;
    const finalHeight = unitSystem === "imperial" ? parsedHeight * 2.54 : parsedHeight;

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      preferences: { unitSystem },
      profile: {
        age: Number(age),
        weight: finalWeight,
        height: finalHeight,
        biologicalSex,
        activityLevel,
        fitnessGoal,
      },
    };
    try {
      await register(payload);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers ──
  const valid = isStepValid();
  const meta = STEP_META[step - 1];

  const inputProps = (field, setter, extraProps = {}) => ({
    style: [styles.input, focusedField === field && styles.inputFocused],
    placeholderTextColor: "#7A6B62",
    onFocus: () => setFocusedField(field),
    onBlur: () => setFocusedField(null),
    value: field === "name" ? name : field === "age" ? age : field === "height" ? height : field === "weight" ? weight : field === "email" ? email : password,
    onChangeText: setter,
    ...extraProps,
  });

  // ────────────────────────────────────
  // Step renderers
  // ────────────────────────────────────
  const renderStep1 = () => (
    <>
      <Text style={styles.fieldLabel}>Full Name</Text>
      <TextInput
        {...inputProps("name", setName)}
        placeholder="e.g. John Doe"
        autoCapitalize="words"
        returnKeyType="next"
      />

      <Text style={styles.fieldLabel}>Age</Text>
      <TextInput
        {...inputProps("age", setAge)}
        placeholder="e.g. 25"
        keyboardType="number-pad"
        maxLength={3}
        returnKeyType="done"
      />

      <Text style={styles.fieldLabel}>Biological Sex</Text>
      <View style={styles.pillRow}>
        {["male", "female"].map((sex) => (
          <TouchableOpacity
            key={sex}
            style={[styles.pill, biologicalSex === sex && styles.pillSelected]}
            onPress={() => setSex(sex)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillText,
                biologicalSex === sex && styles.pillTextSelected,
              ]}
            >
              {sex === "male" ? "Male" : "Female"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.fieldLabel}>Unit System</Text>
      <View style={styles.pillRow}>
        {["metric", "imperial"].map((unit) => (
          <TouchableOpacity
            key={unit}
            style={[styles.pill, unitSystem === unit && styles.pillSelected]}
            onPress={() => {
              if (unit !== unitSystem) {
                setHeight("");
                setWeight("");
              }
              setUnitSystem(unit);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.pillText,
                unitSystem === unit && styles.pillTextSelected,
              ]}
            >
              {unit === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/in)"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.fieldLabel}>
        Height ({unitSystem === "imperial" ? "in" : "cm"})
      </Text>
      <TextInput
        {...inputProps("height", setHeight)}
        placeholder={unitSystem === "imperial" ? "e.g. 70" : "e.g. 175"}
        keyboardType="number-pad"
        maxLength={3}
        returnKeyType="next"
      />

      <Text style={styles.fieldLabel}>
        Current Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
      </Text>
      <TextInput
        {...inputProps("weight", setWeight)}
        placeholder={unitSystem === "imperial" ? "e.g. 150" : "e.g. 70"}
        keyboardType="decimal-pad"
        maxLength={5}
        returnKeyType="done"
      />
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.fieldLabel}>Activity Level</Text>
      <View style={styles.pillGrid}>
        {ACTIVITY_LEVELS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.gridPill,
              activityLevel === item.key && styles.gridPillSelected,
            ]}
            onPress={() => setActivity(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={activityLevel === item.key ? "#D67B48" : "#B8A89F"}
              style={styles.gridPillIcon}
            />
            <Text
              style={[
                styles.gridPillText,
                activityLevel === item.key && styles.gridPillTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.fieldLabel}>Fitness Goal</Text>
      <View style={styles.pillGrid}>
        {FITNESS_GOALS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.gridPill,
              fitnessGoal === item.key && styles.gridPillSelected,
            ]}
            onPress={() => setGoal(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={fitnessGoal === item.key ? "#D67B48" : "#B8A89F"}
              style={styles.gridPillIcon}
            />
            <Text
              style={[
                styles.gridPillText,
                fitnessGoal === item.key && styles.gridPillTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderStep4 = () => (
    <>
      <Text style={styles.fieldLabel}>Email Address</Text>
      <TextInput
        {...inputProps("email", setEmail)}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
      />

      <Text style={styles.fieldLabel}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[
            styles.passwordInput,
            focusedField === "password" && styles.inputFocused,
          ]}
          placeholder="Min. 6 characters"
          placeholderTextColor="#7A6B62"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword((v) => !v)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#B8A89F"
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const STEP_RENDERERS = [renderStep1, renderStep2, renderStep3, renderStep4];

  // ────────────────────────────────────
  // Render
  // ────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* ── Top bar ── */}
        <View style={styles.topBar}>
          {step > 1 ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonPlaceholder} />
          )}

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>
              STEP {step} OF {TOTAL_STEPS}
            </Text>
          </View>
        </View>

        {/* ── Scrollable content ── */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Step header */}
          <View style={styles.stepHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name={meta.icon} size={36} color="#D67B48" />
            </View>
            <Text style={styles.stepTitle}>{meta.title}</Text>
            <Text style={styles.stepSubtitle}>{meta.subtitle}</Text>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Step form */}
          {STEP_RENDERERS[step - 1]()}
        </ScrollView>

        {/* ── Bottom CTA ── */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.nextButton, !valid && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!valid || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#2A1B12" />
            ) : (
              <>
                <Text
                  style={[
                    styles.nextButtonText,
                    !valid && styles.nextButtonTextDisabled,
                  ]}
                >
                  {step === TOTAL_STEPS ? "Create Account" : "Next"}
                </Text>
                {step < TOTAL_STEPS && (
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={valid ? "#2A1B12" : "rgba(42, 27, 18, 0.6)"}
                  />
                )}
              </>
            )}
          </TouchableOpacity>

          {step === 1 && (
            <View style={styles.loginLink}>
              <Link href="/login">
                <Text style={styles.loginLinkText}>
                  Already have an account?{" "}
                  <Text style={styles.loginLinkAccent}>Log In</Text>
                </Text>
              </Link>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
