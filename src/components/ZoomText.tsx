import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

interface ZoomTextProps {
  text: string;
  subtitle?: string;
}

export default function ZoomText({ text, subtitle }: ZoomTextProps) {
  const scale = useSharedValue(0.05);
  const opacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const glowPulse = useSharedValue(15);
  const lineWidth = useSharedValue(0);

  useEffect(() => {
    // Dramatic zoom-in with overshoot
    scale.value = withSpring(1, { damping: 8, stiffness: 60, mass: 1.5 });
    opacity.value = withTiming(1, { duration: 2000 });

    // Continuous pulsing glow
    glowPulse.value = withDelay(
      1800,
      withRepeat(
        withSequence(
          withTiming(30, { duration: 2500 }),
          withTiming(12, { duration: 2500 })
        ),
        -1,
        true
      )
    );

    // Decorative line expands
    lineWidth.value = withDelay(1600, withSpring(120, { damping: 14 }));

    // Subtitle slides up and fades in
    subtitleOpacity.value = withDelay(2000, withTiming(1, { duration: 1200 }));
    subtitleTranslateY.value = withDelay(2000, withSpring(0, { damping: 12, stiffness: 50 }));
  }, []);

  const mainTextStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value * 0.5,
    textShadowRadius: glowPulse.value,
  }));

  const secondGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value * 0.25,
    textShadowRadius: glowPulse.value * 2,
  }));

  const lineStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
    opacity: opacity.value * 0.6,
  }));

  const subtitleAnimStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Double glow layers for depth */}
      <Animated.Text style={[styles.text, styles.outerGlow, secondGlowStyle]}>
        {text}
      </Animated.Text>
      <Animated.Text style={[styles.text, styles.glow, glowStyle]}>
        {text}
      </Animated.Text>
      {/* Crisp main text */}
      <Animated.Text style={[styles.text, mainTextStyle]}>
        {text}
      </Animated.Text>

      {/* Decorative expanding line */}
      <Animated.View style={[styles.decorLine, lineStyle]} />

      {/* Subtitle */}
      {subtitle && (
        <Animated.Text style={[styles.subtitle, subtitleAnimStyle]}>
          {subtitle}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 58,
    fontWeight: '900',
    color: '#00ffff',
    textAlign: 'center',
    letterSpacing: 8,
    position: 'absolute',
  },
  glow: {
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  outerGlow: {
    textShadowColor: '#0088ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  decorLine: {
    position: 'absolute',
    top: 45,
    height: 2,
    backgroundColor: '#00ffff',
    borderRadius: 1,
  },
  subtitle: {
    position: 'absolute',
    top: 60,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    letterSpacing: 6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
