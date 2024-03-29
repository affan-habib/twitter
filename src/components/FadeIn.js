import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

const FadeIn = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
  );
};

export default FadeIn;
