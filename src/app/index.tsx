import { Link } from "expo-router";
import { useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PeriodicTable from "../components/PeriodicTable";
import ZoomText from "../components/ZoomText";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── FLOATING CHEMISTRY EMOJIS ───
function FloatingEmojis() {
  const emojis = ["⚛", "🧪", "🔬", "💎", "⚗", "🧬", "🔥", "💧"];
  return (
    <View style={styles.floatingContainer}>
      {emojis.map((emoji, i) => (
        <FloatingEmoji key={i} emoji={emoji} index={i} />
      ))}
    </View>
  );
}

function FloatingEmoji({ emoji, index }: { emoji: string; index: number }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      2500 + index * 200,
      withTiming(0.4, { duration: 1000 }),
    );
    translateY.value = withDelay(
      2500 + index * 200,
      withRepeat(
        withSequence(
          withTiming(-15, { duration: 2000 + index * 300 }),
          withTiming(15, { duration: 2000 + index * 300 }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  // Spread emojis around the hero area
  const positions = [
    { top: "15%", left: "8%" },
    { top: "20%", right: "10%" },
    { top: "65%", left: "5%" },
    { top: "70%", right: "8%" },
    { top: "40%", left: "3%" },
    { top: "45%", right: "4%" },
    { top: "85%", left: "15%" },
    { top: "80%", right: "15%" },
  ];

  const pos = positions[index % positions.length] as any;

  return (
    <Animated.Text style={[styles.floatingEmoji, style, pos]}>
      {emoji}
    </Animated.Text>
  );
}

// ─── ANIMATED STAT COUNTER ───
function StatCard({
  number,
  label,
  color,
  delay,
}: {
  number: string;
  label: string;
  color: string;
  delay: number;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 800 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 12 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.statCard,
        { borderColor: color, shadowColor: color },
        animStyle,
      ]}
    >
      <Text style={[styles.statNumber, { color, textShadowColor: color }]}>
        {number}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

// ─── MOTIVATIONAL SECTION ───
function MotivationalSection() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withDelay(500, withTiming(1, { duration: 1500 }));
    translateY.value = withDelay(500, withSpring(0, { damping: 14 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.motiveContainer, animStyle]}>
      <View style={styles.motiveGlass}>
        <Text style={styles.motiveEmoji}>🧪</Text>
        <Text style={styles.motiveQuote}>
          "Chemistry is the study of matter, but I prefer to see it as the study
          of change."
        </Text>
        <Text style={styles.motiveAuthor}>— Walter White</Text>
        <View style={styles.motiveDivider} />
        <Text style={styles.motiveBody}>
          Everything around you — the air you breathe, the water you drink, the
          food you eat — is chemistry. Understanding chemistry means
          understanding the language of the universe.
        </Text>
        <Text style={styles.motiveBody}>
          It empowers you to think critically, solve real-world problems, and
          unlock the secrets of how matter transforms. Whether you're in Class 9
          or 10, this is where your molecular journey begins! 🚀
        </Text>
      </View>
    </Animated.View>
  );
}

// ─── CLASS CARD (PREMIUM) ───
function ClassCard({ grade, title, description, color, href, emoji }: any) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity activeOpacity={0.75} style={styles.classCardOuter}>
        <View
          style={[styles.classCard, { borderColor: color, shadowColor: color }]}
        >
          <View style={[styles.classCardGlow, { backgroundColor: color }]} />
          <View style={styles.classCardHeader}>
            <Text style={styles.classCardEmoji}>{emoji}</Text>
            <View>
              <Text style={[styles.classCardGrade, { color }]}>{grade}</Text>
              <Text style={styles.classCardTitle}>{title}</Text>
            </View>
          </View>
          <Text style={styles.classCardDesc}>{description}</Text>
          <View style={[styles.classCardButton, { borderColor: color }]}>
            <Text style={[styles.classCardButtonText, { color }]}>
              Start Learning →
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

// ─── BORED? BUTTON ───
function BoredButton() {
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 1200 }),
        withTiming(1, { duration: 1200 }),
      ),
      -1,
      true,
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1200 }),
        withTiming(0.3, { duration: 1200 }),
      ),
      -1,
      true,
    );
  }, []);

  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.boredContainer}>
      <Link href="/funzone" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Animated.View style={[styles.boredBtnOuter, btnStyle]}>
            <Animated.View style={[styles.boredGlow, glowStyle]} />
            <Text style={styles.boredEmoji}>🎮</Text>
            <Text style={styles.boredText}>BORED ? then surely try this out !!</Text>
            <Text style={styles.boredSubtext}>Virtual Lab • Molecule Builder • Escape Quiz • Card Collection</Text>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// ═══════════════════════════════════════
// MAIN HOME SCREEN
// ═══════════════════════════════════════
export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
      >
        {/* ═══ FULL SCREEN HERO ═══ */}
        <View style={styles.heroSection}>
          <FloatingEmojis />
          <ZoomText text="CHEMI GUIDE" subtitle="Your Gateway to Chemistry" />
        </View>

        {/* ═══ STATS BAR ═══ */}
        <View style={styles.statsRow}>
          <StatCard number="118" label="Elements" color="#00ffff" delay={300} />
          <StatCard number="8" label="Topics" color="#ff00ff" delay={500} />
          <StatCard number="2" label="Classes" color="#00ff44" delay={700} />
        </View>

        {/* ═══ MOTIVATIONAL SECTION ═══ */}
        <MotivationalSection />

        {/* ═══ PERIODIC TABLE ═══ */}
        <View style={styles.fullSection}>
          <View style={styles.glassSection}>
            <Text style={styles.sectionEmoji}>⚛</Text>
            <Text style={styles.sectionTitle}>Interactive Periodic Table</Text>
            <Text style={styles.sectionSubtitle}>
              Tap any element to see its 3D atomic structure
            </Text>
            <PeriodicTable />
          </View>
        </View>

        {/* ═══ CLASS SELECTION ═══ */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionEmoji}>📚</Text>
          <Text style={styles.sectionTitle}>Choose Your Class</Text>
          <Text style={styles.sectionSubtitle}>
            Select your grade to begin your chemistry journey
          </Text>

          <View style={styles.classCardsRow}>
            <ClassCard
              grade="CLASS 9"
              title="Chemistry"
              emoji="⚗"
              description="Atomic structure, Mole concept, Atomic models, Matter classification and more."
              color="#ff00ff"
              href="/class9"
            />
            <ClassCard
              grade="CLASS 10"
              title="Chemistry"
              emoji="🧬"
              description="Chemical Reactions, Acids/Bases/Salts, Metals & Non-Metals, Carbon Compounds."
              color="#00ff44"
              href="/class10"
            />
          </View>
        </View>
        {/* ═══ BORED? FUN ZONE BUTTON ═══ */}
        <BoredButton />

        {/* ═══ FOOTER ═══ */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>Made with 💚 for curious minds</Text>
          <Text style={styles.footerSub}>BY DISHA GOPAL GAONKAR</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030308",
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    alignItems: "center",
  },

  // ═══ HERO ═══
  heroSection: {
    minHeight: SCREEN_HEIGHT,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  floatingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingEmoji: {
    position: "absolute",
    fontSize: 32,
  },

  // ═══ STATS ═══
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    marginTop: -30,
    marginBottom: 30,
    flexWrap: "wrap",
    paddingHorizontal: 20,
    width: "100%",
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 25, 0.85)",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    minWidth: 140,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  statNumber: {
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 2,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  statLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginTop: 8,
  },

  // ═══ MOTIVATIONAL ═══
  motiveContainer: {
    width: "96%",
    marginVertical: 30,
  },
  motiveGlass: {
    backgroundColor: "rgba(10, 10, 30, 0.75)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.15)",
    padding: 36,
    shadowColor: "#00ffff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 12,
    alignItems: "center",
  },
  motiveEmoji: {
    fontSize: 40,
    marginBottom: 16,
  },
  motiveQuote: {
    color: "#00ffff",
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 36,
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  motiveAuthor: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 2,
  },
  motiveDivider: {
    height: 1,
    backgroundColor: "rgba(0,255,255,0.12)",
    marginVertical: 24,
    width: "50%",
  },
  motiveBody: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 17,
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 14,
  },

  // ═══ FULL SECTION ═══
  fullSection: {
    minHeight: SCREEN_HEIGHT,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },

  // ═══ GLASS SECTION ═══
  glassSection: {
    width: "96%",
    backgroundColor: "rgba(8, 8, 20, 0.7)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#0088ff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  sectionEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    letterSpacing: 2,
  },
  sectionSubtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 16,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 30,
    textAlign: "center",
  },

  // ═══ CLASS CARDS ═══
  classCardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
    marginTop: 35,
    paddingHorizontal: 20,
    width: "96%",
  },
  classCardOuter: {
    flex: 1,
    minWidth: 320,
  },
  classCard: {
    backgroundColor: "rgba(12, 12, 28, 0.85)",
    borderWidth: 1.5,
    borderRadius: 24,
    padding: 36,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 12,
    overflow: "hidden",
    position: "relative",
  },
  classCardGlow: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.08,
  },
  classCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 14,
  },
  classCardEmoji: {
    fontSize: 52,
  },
  classCardGrade: {
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 5,
    textTransform: "uppercase",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  classCardTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 1,
  },
  classCardDesc: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },
  classCardButton: {
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignSelf: "flex-start",
  },
  classCardButtonText: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // ═══ FOOTER ═══
  footer: {
    paddingVertical: 50,
    alignItems: "center",
    width: "100%",
  },
  footerLine: {
    width: 60,
    height: 2,
    backgroundColor: "rgba(0,255,255,0.2)",
    borderRadius: 1,
    marginBottom: 20,
  },
  footerText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 14,
    letterSpacing: 1,
  },
  footerSub: {
    color: "rgba(255,255,255,0.15)",
    fontSize: 12,
    marginTop: 6,
    letterSpacing: 3,
  },

  // ═══ BORED BUTTON ═══
  boredContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  boredBtnOuter: {
    width: '96%',
    backgroundColor: 'rgba(255, 0, 100, 0.08)',
    borderWidth: 2,
    borderColor: '#ff0066',
    borderRadius: 28,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#ff0066',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
  },
  boredGlow: {
    position: 'absolute',
    top: -80,
    left: '30%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ff0066',
  },
  boredEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  boredText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: '#ff0066',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 10,
  },
  boredSubtext: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 1,
  },
});
