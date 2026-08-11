import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── ERUPTING REACTION SPARKLE / SMOKE ───
function EruptingParticle({
  startX,
  startY,
  targetX,
  targetY,
  delay,
  symbol,
  color,
}: {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  delay: number;
  symbol: string;
  color: string;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSequence(
        withSpring(1.4, { damping: 8, stiffness: 100 }),
        withTiming(0.8, { duration: 1000 })
      )
    );
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(0.95, { duration: 300 }),
        withTiming(0, { duration: 1200 })
      )
    );
    translateX.value = withDelay(
      delay,
      withTiming(targetX, { duration: 1500, easing: Easing.out(Easing.quad) })
    );
    translateY.value = withDelay(
      delay,
      withTiming(targetY, { duration: 1500, easing: Easing.out(Easing.quad) })
    );
  }, []);

  const particleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.Text
      style={[
        styles.eruptingParticle,
        { left: startX, top: startY, color: color, textShadowColor: color },
        particleStyle,
      ]}
    >
      {symbol}
    </Animated.Text>
  );
}

// ─── RISING BUBBLE COMPONENT ───
function RisingBubble({ x, delay, size, color }: { x: number; delay: number; size: number; color: string }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(0.7, { duration: 600 }));
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
          bottom: SCREEN_HEIGHT * 0.2,
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

// ─── FLOATING MOLECULE / SYMBOL COMPONENT ───
function FloatingSymbol({ symbol, x, y, delay: d }: { symbol: string; x: number; y: number; delay: number }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(d, withTiming(0.4, { duration: 800 }));
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

// ═══════════════════════════════════════
// MAIN SPLASH INTRO WITH REAL ACTION CHEMIST
// ═══════════════════════════════════════
export default function SplashIntro({ onFinish }: { onFinish: () => void }) {
  // Action status banner state
  const [actionStatus, setActionStatus] = useState('Mixing Chemicals... 🧪⚗️');

  // Avatar animations
  const avatarScale = useSharedValue(0.1);
  const avatarOpacity = useSharedValue(0);
  const avatarBobbing = useSharedValue(0);

  // Liquid Stream (Pouring Action)
  const pourStreamHeight = useSharedValue(0);
  const pourStreamOpacity = useSharedValue(0);

  // Beaker filling & liquid color reaction
  const beakerFillHeight = useSharedValue(12);
  const beakerGlowOpacity = useSharedValue(0.3);

  // Reaction Explosion / Flash
  const reactionFlashOpacity = useSharedValue(0);

  // Speech Bubble "Hello!"
  const bubbleScale = useSharedValue(0);
  const bubbleOpacity = useSharedValue(0);

  // "Enjoy The Mix" Title
  const textScale = useSharedValue(0.6);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(25);

  const taglineOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  // Pulse glow ring around avatar
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  const handleFinish = () => {
    'worklet';
    runOnJS(onFinish)();
  };

  const skipSplash = () => {
    containerOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) handleFinish();
    });
  };

  useEffect(() => {
    // ─── STAGE 1: CHEMIST APPEARS & STARTS POURING/MIXING CHEMICALS (0s - 1.5s) ───
    avatarScale.value = withDelay(100, withSpring(1, { damping: 12, stiffness: 90 }));
    avatarOpacity.value = withDelay(100, withTiming(1, { duration: 600 }));

    // Pouring liquid stream animation
    pourStreamOpacity.value = withDelay(400, withSequence(
      withTiming(0.9, { duration: 300 }),
      withDelay(1200, withTiming(0, { duration: 400 }))
    ));
    pourStreamHeight.value = withDelay(400, withSequence(
      withTiming(65, { duration: 500, easing: Easing.out(Easing.quad) }),
      withDelay(1000, withTiming(0, { duration: 400 }))
    ));

    // Beaker fills up as liquid is mixed
    beakerFillHeight.value = withDelay(600, withTiming(48, { duration: 1200, easing: Easing.out(Easing.cubic) }));
    beakerGlowOpacity.value = withDelay(800, withSequence(
      withTiming(0.9, { duration: 600 }),
      withTiming(0.5, { duration: 600 })
    ));

    // Chemical Reaction Eruption Flash at 1.4s
    reactionFlashOpacity.value = withDelay(1400, withSequence(
      withTiming(0.8, { duration: 200 }),
      withTiming(0, { duration: 600 })
    ));

    // Avatar bobbing animation after entrance
    avatarBobbing.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
          withTiming(8, { duration: 1800, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      )
    );

    // Continuous glow ring pulse
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 })
      ),
      -1,
      true
    );

    // ─── STAGE 2: REACTION EXPLODES & CHEMIST SAYS "HELLO!" (1.6s - 3.0s) ───
    const timer1 = setTimeout(() => {
      setActionStatus('Reaction Complete! ✨🧪');
    }, 1600);

    bubbleScale.value = withDelay(1800, withSpring(1, { damping: 10, stiffness: 120 }));
    bubbleOpacity.value = withDelay(1800, withTiming(1, { duration: 500 }));

    // ─── STAGE 3: "ENJOY THE MIX" APPEARS & AUTO TRANSIT TO HOME (3.0s - 4.8s) ───
    const timer2 = setTimeout(() => {
      setActionStatus('Ready to Explore! 🚀');
    }, 2800);

    textScale.value = withDelay(2400, withSpring(1, { damping: 11, stiffness: 80 }));
    textOpacity.value = withDelay(2400, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(2400, withSpring(0, { damping: 14 }));

    // Subtitle tagline
    taglineOpacity.value = withDelay(3000, withTiming(1, { duration: 800 }));

    // Auto transit to home page after 4.8 seconds
    containerOpacity.value = withDelay(
      4800,
      withTiming(0, { duration: 700 }, (finished) => {
        if (finished) {
          handleFinish();
        }
      })
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }, { translateY: avatarBobbing.value }],
    opacity: avatarOpacity.value,
  }));

  const pourStreamStyle = useAnimatedStyle(() => ({
    height: pourStreamHeight.value,
    opacity: pourStreamOpacity.value,
  }));

  const beakerFillStyle = useAnimatedStyle(() => ({
    height: beakerFillHeight.value,
  }));

  const beakerGlowStyle = useAnimatedStyle(() => ({
    opacity: beakerGlowOpacity.value,
  }));

  const reactionFlashStyle = useAnimatedStyle(() => ({
    opacity: reactionFlashOpacity.value,
  }));

  const speechBubbleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bubbleScale.value }],
    opacity: bubbleOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }, { translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const chemicalSymbols = [
    { symbol: '🧪', x: SCREEN_WIDTH * 0.1, y: SCREEN_HEIGHT * 0.16 },
    { symbol: '⚗️', x: SCREEN_WIDTH * 0.8, y: SCREEN_HEIGHT * 0.14 },
    { symbol: 'H₂O', x: SCREEN_WIDTH * 0.06, y: SCREEN_HEIGHT * 0.42 },
    { symbol: 'NaCl', x: SCREEN_WIDTH * 0.84, y: SCREEN_HEIGHT * 0.45 },
    { symbol: '✨', x: SCREEN_WIDTH * 0.15, y: SCREEN_HEIGHT * 0.72 },
    { symbol: '💥', x: SCREEN_WIDTH * 0.78, y: SCREEN_HEIGHT * 0.74 },
    { symbol: 'O₂', x: SCREEN_WIDTH * 0.45, y: SCREEN_HEIGHT * 0.08 },
  ];

  const eruptingParticles = [
    { startX: 110, startY: 100, targetX: -60, targetY: -70, delay: 1400, symbol: '💨', color: '#00ffff' },
    { startX: 110, startY: 100, targetX: 60, targetY: -80, delay: 1450, symbol: '💥', color: '#ff00ff' },
    { startX: 110, startY: 100, targetX: -40, targetY: -110, delay: 1500, symbol: '✨', color: '#00ffaa' },
    { startX: 110, startY: 100, targetX: 40, targetY: -100, delay: 1550, symbol: '⚡', color: '#ffaa00' },
    { startX: 110, startY: 100, targetX: 0, targetY: -130, delay: 1600, symbol: '🫧', color: '#00ffff' },
    { startX: 110, startY: 100, targetX: -80, targetY: -40, delay: 1650, symbol: '🌟', color: '#ffff00' },
    { startX: 110, startY: 100, targetX: 80, targetY: -50, delay: 1700, symbol: '🧪', color: '#ff00aa' },
  ];

  const bubbles = [
    { x: SCREEN_WIDTH * 0.18, delay: 400, size: 12, color: '#00ffff' },
    { x: SCREEN_WIDTH * 0.32, delay: 1000, size: 16, color: '#ff00ff' },
    { x: SCREEN_WIDTH * 0.68, delay: 700, size: 10, color: '#00ff88' },
    { x: SCREEN_WIDTH * 0.82, delay: 1300, size: 14, color: '#ffaa00' },
    { x: SCREEN_WIDTH * 0.48, delay: 1700, size: 8, color: '#00ffff' },
  ];

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={skipSplash}>
      <Animated.View style={[styles.container, containerStyle]}>
        <LinearGradient
          colors={['#030018', '#0b0528', '#160838', '#040212']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Floating chemical background symbols */}
        {chemicalSymbols.map((s, i) => (
          <FloatingSymbol key={i} symbol={s.symbol} x={s.x} y={s.y} delay={300 + i * 150} />
        ))}

        {/* Rising beaker bubbles */}
        {bubbles.map((b, i) => (
          <RisingBubble key={i} x={b.x} delay={b.delay} size={b.size} color={b.color} />
        ))}

        {/* CENTER CONTENT CONTAINER */}
        <View style={styles.centerContainer}>
          {/* ACTION STATUS BADGE */}
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{actionStatus}</Text>
          </View>

          {/* SPEECH BUBBLE FROM CHEMIST SAYING HELLO */}
          <Animated.View style={[styles.speechBubble, speechBubbleStyle]}>
            <View style={styles.bubbleInner}>
              <Text style={styles.speechText}>Hello! 👋🧪</Text>
            </View>
            <View style={styles.bubbleTail} />
          </Animated.View>

          {/* CHEMIST AVATAR WITH REAL ACTION CHEMICAL MIXING OVERLAYS */}
          <View style={styles.avatarWrapper}>
            {/* Outer pulsing neon aura */}
            <Animated.View style={[styles.glowRing, glowStyle]} />

            {/* Reaction Flash Aura on Eruption */}
            <Animated.View style={[styles.reactionFlash, reactionFlashStyle]} />

            {/* Chemist Image Avatar (Actively Pouring & Mixing Chemicals) */}
            <Animated.View style={[styles.avatarFrame, avatarStyle]}>
              <Image
                source={require('../../assets/images/chemist_mixing.jpg')}
                style={styles.avatarImage}
                resizeMode="cover"
              />

              {/* OVERLAY 1: ANIMATED POURING LIQUID STREAM */}
              <Animated.View style={[styles.pourStream, pourStreamStyle]} />

              {/* OVERLAY 2: MASTER BEAKER FILLING WITH GLOWING MIXED CHEMICAL */}
              <View style={styles.beakerContainer}>
                <Animated.View style={[styles.beakerGlow, beakerGlowStyle]} />
                <View style={styles.beakerGlass}>
                  <Animated.View style={[styles.beakerLiquid, beakerFillStyle]}>
                    <LinearGradient
                      colors={['#00ffff', '#9900ff', '#00ffaa']}
                      style={StyleSheet.absoluteFill}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    />
                  </Animated.View>
                </View>
              </View>
            </Animated.View>

            {/* OVERLAY 3: ERUPTING REACTION PARTICLES & SPARKLES */}
            {eruptingParticles.map((p, i) => (
              <EruptingParticle
                key={i}
                startX={p.startX}
                startY={p.startY}
                targetX={p.targetX}
                targetY={p.targetY}
                delay={p.delay}
                symbol={p.symbol}
                color={p.color}
              />
            ))}
          </View>

          {/* "ENJOY THE MIX" TEXT BELOW THE CHEMIST */}
          <Animated.View style={[styles.textContainer, textStyle]}>
            <View style={styles.titleRow}>
              <Text style={styles.enjoyText}>ENJOY </Text>
              <Text style={styles.theText}>THE </Text>
              <Text style={styles.mixText}>MIX</Text>
            </View>
            <View style={styles.decorativeLineContainer}>
              <View style={styles.lineGlow} />
              <Text style={styles.beakerIcon}>⚗️</Text>
              <View style={styles.lineGlow} />
            </View>
          </Animated.View>

          {/* SUBTITLE */}
          <Animated.View style={[styles.taglineContainer, taglineStyle]}>
            <Text style={styles.tagline}>CHEMISTRY IS ALL ABOUT CREATIVE REACTIONS</Text>
            <Text style={styles.skipHint}>Tap anywhere to skip</Text>
          </Animated.View>
        </View>
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
    backgroundColor: '#030018',
  },

  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  // ─── ACTION BADGE ───
  actionBadge: {
    backgroundColor: 'rgba(0, 255, 240, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 12,
  },
  actionBadgeText: {
    color: '#00ffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // ─── SPEECH BUBBLE ───
  speechBubble: {
    marginBottom: 14,
    alignItems: 'center',
    zIndex: 10,
  },
  bubbleInner: {
    backgroundColor: 'rgba(0, 255, 240, 0.18)',
    borderWidth: 1.5,
    borderColor: '#00ffff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },
  speechText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.5,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  bubbleTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#00ffff',
    marginTop: -1,
  },

  // ─── AVATAR & REAL ACTION OVERLAYS ───
  avatarWrapper: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  glowRing: {
    position: 'absolute',
    width: 235,
    height: 235,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: '#ff00ff',
    backgroundColor: 'rgba(255, 0, 255, 0.12)',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  reactionFlash: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(0, 255, 255, 0.35)',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  avatarFrame: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#00ffff',
    overflow: 'hidden',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  // Pouring Liquid Stream
  pourStream: {
    position: 'absolute',
    top: 35,
    left: 85,
    width: 6,
    backgroundColor: '#00ffff',
    borderRadius: 3,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  // Master Beaker Fill Overlay
  beakerContainer: {
    position: 'absolute',
    bottom: 25,
    right: 35,
    width: 40,
    height: 52,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  beakerGlow: {
    position: 'absolute',
    width: 50,
    height: 58,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 255, 240, 0.4)',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  beakerGlass: {
    width: 34,
    height: 48,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  beakerLiquid: {
    width: '100%',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  // Erupting particles
  eruptingParticle: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    zIndex: 20,
  },

  // ─── "ENJOY THE MIX" TEXT ───
  textContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enjoyText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  theText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ff00ff',
    letterSpacing: 4,
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  mixText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#00ffff',
    letterSpacing: 4,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  decorativeLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  lineGlow: {
    width: 60,
    height: 2,
    backgroundColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  beakerIcon: {
    fontSize: 16,
  },

  // ─── TAGLINE ───
  taglineContainer: {
    alignItems: 'center',
    gap: 6,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipHint: {
    color: 'rgba(0, 255, 255, 0.4)',
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 6,
    fontStyle: 'italic',
  },

  // ─── BUBBLES ───
  bubble: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingSymbol: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(0, 255, 255, 0.35)',
  },
});


