import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Home from "./screens/Home";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View>
      <Home />
    </View>
  );
}
