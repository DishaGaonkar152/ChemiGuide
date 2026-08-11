import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInUp } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedInfoBox({ children, color = '#00ffff', delay = 0 }: { children: React.ReactNode, color?: string, delay?: number }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      entering={FadeInUp.delay(delay).springify()}
      onPressIn={() => (scale.value = withSpring(0.97))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[styles.infoBox, { borderColor: color, shadowColor: color }, animatedStyle]}
    >
      <Text style={styles.infoBoxText}>{children}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderRadius: 16,
    padding: 24,
    marginVertical: 24,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  infoBoxText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
  },
});
