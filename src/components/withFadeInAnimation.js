import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const withFadeInAnimation = (WrappedComponent) => {
  const AnimatedComponent = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: fadeAnim }],
        }}
      >
        <WrappedComponent />
      </Animated.View>
    );
  };

  return AnimatedComponent;
};

export default withFadeInAnimation;
