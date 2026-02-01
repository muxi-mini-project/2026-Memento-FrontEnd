import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={["#94d1ff", "#c9def6", "#d4e7f8", "#ffffff"]}
      style={[styles.container, styles.gradientBackground]}
    >
      {children}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
