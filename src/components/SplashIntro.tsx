import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── FLOATING MOLECULE / SYMBOL COMPONENT ───
function FloatingSymbol({ symbol, x, y, delay: d }: { symbol: string; x: number; y: number; delay: number }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(d, withTiming(0.35, { duration: 800 }));
    translateY.value = withDelay(
      d,
      withRepeat(
        withSequence(
          withTiming(-14, { duration: 2200 + Math.random() * 1000 }),
          withTiming(14, { duration: 2200 + Math.random() * 1000 })
        ),
        -1,
        true
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Text style={[styles.floatingSymbol, { left: x, top: y }, style]}>
      {symbol}
    </Animated.Text>
  );
}

// ─── RISING BUBBLE COMPONENT ───
function RisingBubble({ x, delay, size, color }: { x: number; delay: number; size: number; color: string }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(0.6, { duration: 600 }));
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-SCREEN_HEIGHT * 0.7, { duration: 3500 + Math.random() * 1500, easing: Easing.out(Easing.quad) }),
        -1,
        false
      )
    );
  }, []);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          left: x,
          bottom: SCREEN_HEIGHT * 0.15,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
        },
        bubbleStyle,
      ]}
    />
  );
}

const PHRASES = [
  "Hey, buddy !! 👋",
  "Welcome to ChemiGuide 🧪",
  "Ready to mix & master Chemistry? 🚀",
];

export default function SplashIntro({ onFinish }: { onFinish: () => void }) {
  const [line1Text, setLine1Text] = useState('');
  const [line2Text, setLine2Text] = useState('');
  const [line3Text, setLine3Text] = useState('');
  const [activeLine, setActiveLine] = useState(1);
  const [cursorVisible, setCursorVisible] = useState(true);

  const containerOpacity = useSharedValue(1);
  const contentScale = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);

  const handleFinish = () => {
    'worklet';
    runOnJS(onFinish)();
  };

  const skipSplash = () => {
    containerOpacity.value = withTiming(0, { duration: 350 }, (finished) => {
      if (finished) handleFinish();
    });
  };

  // Blinking Cursor Effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing Sequence Effect
  useEffect(() => {
    contentOpacity.value = withTiming(1, { duration: 600 });
    contentScale.value = withTiming(1, { duration: 600 });

    let isCancelled = false;

    const typeText = async (text: string, setText: React.Dispatch<React.SetStateAction<string>>, delayMs = 65) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) return;
        setText(text.slice(0, i));
        await new Promise((res) => setTimeout(res, delayMs));
      }
    };

    const runTypingSequence = async () => {
      // Pause initially
      await new Promise((res) => setTimeout(res, 400));
      if (isCancelled) return;

      // Line 1: "Hey, buddy !! 👋"
      setActiveLine(1);
      await typeText(PHRASES[0], setLine1Text, 75);
      await new Promise((res) => setTimeout(res, 500));
      if (isCancelled) return;

      // Line 2: "Welcome to ChemiGuide 🧪"
      setActiveLine(2);
      await typeText(PHRASES[1], setLine2Text, 60);
      await new Promise((res) => setTimeout(res, 500));
      if (isCancelled) return;

      // Line 3: "Ready to mix & master Chemistry? 🚀"
      setActiveLine(3);
      await typeText(PHRASES[2], setLine3Text, 50);
      await new Promise((res) => setTimeout(res, 1200));
      if (isCancelled) return;

      // Fade out container and transition to main app
      containerOpacity.value = withTiming(0, { duration: 600 }, (finished) => {
        if (finished) handleFinish();
      });
    };

    runTypingSequence();

    return () => {
      isCancelled = true;
    };
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }],
  }));

  const chemicalSymbols = [
    { symbol: '🧪', x: SCREEN_WIDTH * 0.1, y: SCREEN_HEIGHT * 0.15 },
    { symbol: '⚗️', x: SCREEN_WIDTH * 0.82, y: SCREEN_HEIGHT * 0.18 },
    { symbol: 'H₂O', x: SCREEN_WIDTH * 0.08, y: SCREEN_HEIGHT * 0.45 },
    { symbol: 'NaCl', x: SCREEN_WIDTH * 0.82, y: SCREEN_HEIGHT * 0.48 },
    { symbol: '✨', x: SCREEN_WIDTH * 0.14, y: SCREEN_HEIGHT * 0.76 },
    { symbol: '💥', x: SCREEN_WIDTH * 0.8, y: SCREEN_HEIGHT * 0.78 },
    { symbol: 'O₂', x: SCREEN_WIDTH * 0.48, y: SCREEN_HEIGHT * 0.1 },
  ];

  const bubbles = [
    { x: SCREEN_WIDTH * 0.18, delay: 300, size: 12, color: '#00ffff' },
    { x: SCREEN_WIDTH * 0.35, delay: 900, size: 16, color: '#ff00ff' },
    { x: SCREEN_WIDTH * 0.65, delay: 600, size: 10, color: '#00ff88' },
    { x: SCREEN_WIDTH * 0.82, delay: 1200, size: 14, color: '#ffaa00' },
  ];

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={skipSplash}>
      <Animated.View style={[styles.container, containerStyle]}>
        <LinearGradient
          colors={['#030014', '#0a0524', '#140632', '#040212']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Floating chemical background symbols */}
        {chemicalSymbols.map((s, i) => (
          <FloatingSymbol key={i} symbol={s.symbol} x={s.x} y={s.y} delay={200 + i * 150} />
        ))}

        {/* Rising background bubbles */}
        {bubbles.map((b, i) => (
          <RisingBubble key={i} x={b.x} delay={b.delay} size={b.size} color={b.color} />
        ))}

        {/* CENTER TYPING CONTENT */}
        <Animated.View style={[styles.centerBox, contentStyle]}>
          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CHEMIGUIDE AI</Text>
          </View>

          {/* Typing Line 1: Hey, buddy !! */}
          <View style={styles.lineWrapper}>
            <Text style={styles.line1}>
              {line1Text}
              {activeLine === 1 && (
                <Text style={[styles.cursor, { opacity: cursorVisible ? 1 : 0 }]}>|</Text>
              )}
            </Text>
          </View>

          {/* Typing Line 2: Welcome to ChemiGuide 🧪 */}
          {line1Text.length >= PHRASES[0].length && (
            <View style={styles.lineWrapper}>
              <Text style={styles.line2}>
                {line2Text}
                {activeLine === 2 && (
                  <Text style={[styles.cursor, { opacity: cursorVisible ? 1 : 0 }]}>|</Text>
                )}
              </Text>
            </View>
          )}

          {/* Typing Line 3: Ready to mix & master Chemistry? 🚀 */}
          {line2Text.length >= PHRASES[1].length && (
            <View style={styles.lineWrapper}>
              <Text style={styles.line3}>
                {line3Text}
                {activeLine === 3 && (
                  <Text style={[styles.cursor, { opacity: cursorVisible ? 1 : 0 }]}>|</Text>
                )}
              </Text>
            </View>
          )}

          {/* Decorative Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={{ fontSize: 18 }}>⚗️</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.skipHint}>Tap anywhere to skip</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030014',
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 500,
    width: '100%',
  },
  badge: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 24,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  badgeText: {
    color: '#00ffff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  lineWrapper: {
    marginVertical: 6,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line1: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  line2: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ff00ff',
    textAlign: 'center',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(255, 0, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  line3: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00ffff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  cursor: {
    color: '#00ffff',
    fontWeight: '900',
    fontSize: 28,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 28,
    marginBottom: 16,
  },
  dividerLine: {
    width: 60,
    height: 2,
    backgroundColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  skipHint: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 10,
    fontStyle: 'italic',
  },
  floatingSymbol: {
    position: 'absolute',
    fontSize: 22,
    color: 'rgba(0, 255, 255, 0.3)',
  },
  bubble: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
});


