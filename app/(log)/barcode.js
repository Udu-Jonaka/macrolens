import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import getStyles from "../../src/styles/log.styles";
import api from "../../src/services/api";
import { getFormattedDate } from "../../src/utils/helpers";
import axios from "axios";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function BarcodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);
  const [mealType, setMealType] = useState("snack");
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned || fetching) return;
    setScanned(true);
    setFetching(true);

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );

      if (response.data.status !== 1) {
        Alert.alert(
          "Not Found",
          "This product was not found in the database. Try scanning again.",
          [{ text: "OK", onPress: () => resetScanner() }]
        );
        return;
      }

      const p = response.data.product;
      const nutrients = p.nutriments || {};

      setProduct({
        name: p.product_name || p.generic_name || "Unknown Product",
        calories: Math.round(nutrients["energy-kcal_100g"] || nutrients["energy-kcal"] || 0),
        protein: Math.round(nutrients.proteins_100g || nutrients.proteins || 0),
        carbs: Math.round(nutrients.carbohydrates_100g || nutrients.carbohydrates || 0),
        fats: Math.round(nutrients.fat_100g || nutrients.fat || 0),
        barcode: data,
      });
    } catch (error) {
      Alert.alert(
        "Lookup Failed",
        "Could not fetch product information. Please try again.",
        [{ text: "OK", onPress: () => resetScanner() }]
      );
    } finally {
      setFetching(false);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setProduct(null);
    setFetching(false);
  };

  const saveToLog = async () => {
    if (!product) return;
    setSaving(true);

    try {
      await api.post("/api/meals/manual", {
        mealType,
        calories: product.calories,
        protein: product.protein,
        carbs: product.carbs,
        fats: product.fats,
        identifiedItems: [product.name],
        date: getFormattedDate(),
      });
      Alert.alert("Success ✨", `${product.name} logged!`, [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (error) {
      Alert.alert(
        "Save Failed",
        error.response?.data?.error || "Could not save to your log."
      );
    } finally {
      setSaving(false);
    }
  };

  // === Permission not yet determined ===
  if (!permission) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <ActivityIndicator color={theme.primary} size="large" />
      </View>
    );
  }

  // === Permission denied ===
  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <Ionicons name="camera-outline" size={48} color={theme.textMuted} />
        <Text style={styles.permissionText}>
          Camera access is required to scan barcodes.
        </Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // === Product Found — Show Result Card ===
  if (product) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{product.calories}</Text>
              <Text style={styles.macroUnit}>kcal</Text>
              <Text style={styles.macroLabel}>Calories</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{product.protein}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{product.carbs}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{product.fats}g</Text>
              <Text style={styles.macroLabel}>Fats</Text>
            </View>
          </View>
        </View>

        {/* Meal Type Selector */}
        <View style={styles.pillRow}>
          {MEAL_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.pill, mealType === type && styles.pillActive]}
              onPress={() => setMealType(type)}
            >
              <Text
                style={
                  mealType === type ? styles.pillTextActive : styles.pillText
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.primaryBtn, saving && styles.primaryBtnDisabled]}
          onPress={saveToLog}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color={theme.text} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={18} color={theme.text} />
              <Text style={styles.primaryBtnText}>Save to Log</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Scan Again */}
        <TouchableOpacity style={styles.cancelBtn} onPress={resetScanner}>
          <Text style={styles.cancelText}>Scan Again</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // === Camera View ===
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>
        Point your camera at a product barcode
      </Text>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8",
              "upc_a",
              "upc_e",
              "code128",
              "code39",
            ],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

        {/* Scan Overlay */}
        <View style={styles.scanOverlay}>
          <View style={styles.scanBox} />
          <Text style={styles.scanHint}>Align barcode within the box</Text>
        </View>

        {/* Loading overlay while fetching */}
        {fetching && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={theme.primary} size="large" />
            <Text style={styles.loadingText}>Looking up product...</Text>
          </View>
        )}
      </View>
    </View>
  );
}
