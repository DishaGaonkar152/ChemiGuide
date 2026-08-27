import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

interface InteractiveExperimentProps {
  type: 'magnesium_burn' | 'ph_scale' | 'pop_test' | 'states_of_matter' | 'mole_calc';
  color?: string;
}

export default function InteractiveExperiment({ type, color = '#00ffff' }: InteractiveExperimentProps) {
  // ─── 1. MAGNESIUM RIBBON EXPERIMENT ───
  const [mgStep, setMgStep] = useState(0); // 0: raw, 1: burning, 2: ash
  const [flashAnim] = useState(new Animated.Value(0));

  const handleMgBurn = () => {
    setMgStep(1);
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => setMgStep(2));
  };

  // ─── 2. PH SCALE SIMULATOR ───
  const [phValue, setPhValue] = useState(7);

  const getPhColor = (val: number) => {
    if (val <= 2) return '#ff2a2a';
    if (val <= 4) return '#ff7b00';
    if (val <= 6) return '#ffcc00';
    if (val === 7) return '#00e676';
    if (val <= 9) return '#00b0ff';
    if (val <= 12) return '#3d5aff';
    return '#8e24aa';
  };

  const getPhInfo = (val: number) => {
    if (val === 0) return { name: 'Battery Acid (1M HCl)', nature: 'Strongly Acidic (High H⁺)' };
    if (val <= 2) return { name: 'Gastric Juice / Lemon', nature: 'Strongly Acidic' };
    if (val <= 4) return { name: 'Vinegar / Tomato', nature: 'Moderately Acidic' };
    if (val <= 6) return { name: 'Milk / Coffee / Rainwater', nature: 'Weakly Acidic' };
    if (val === 7) return { name: 'Pure Water / Blood (7.4)', nature: 'Neutral (H⁺ = OH⁻)' };
    if (val <= 9) return { name: 'Baking Soda Solution', nature: 'Weakly Basic' };
    if (val <= 11) return { name: 'Milk of Magnesia', nature: 'Moderately Basic' };
    if (val <= 13) return { name: 'Bleach / Household Ammonia', nature: 'Strongly Basic' };
    return { name: 'Sodium Hydroxide (1M NaOH)', nature: 'Strongly Basic (High OH⁻)' };
  };

  // ─── 3. POP TEST EXPERIMENT ───
  const [popStep, setPopStep] = useState(0); // 0: start, 1: bubbling, 2: popped

  const handlePopTest = () => {
    setPopStep(1);
    setTimeout(() => {
      setPopStep(2);
    }, 1500);
  };

  // ─── 4. STATES OF MATTER SLIDER ───
  const [temp, setTemp] = useState(25); // Celsius

  const getStateInfo = (t: number) => {
    if (t < 0) return { state: 'SOLID (Ice)', desc: 'Particles tightly packed in fixed lattice. Low kinetic energy.', color: '#00e5ff', emoji: '🧊' };
    if (t <= 100) return { state: 'LIQUID (Water)', desc: 'Particles can slide past each other. Definite volume, takes container shape.', color: '#2979ff', emoji: '💧' };
    return { state: 'GAS (Steam)', desc: 'Particles move rapidly in all directions. High kinetic energy, expands fully.', color: '#ff9100', emoji: '💨' };
  };

  // ─── 5. MOLE CALCULATOR ───
  const [massInput, setMassInput] = useState(36); // grams of water

  const moles = (massInput / 18).toFixed(2);
  const particles = (Number(moles) * 6.022).toFixed(2);

  return (
    <View style={[styles.card, { borderColor: color }]}>
      <View style={[styles.badge, { backgroundColor: `${color}25` }]}>
        <Text style={[styles.badgeText, { color }]}>🧪 INTERACTIVE VIRTUAL LAB</Text>
      </View>

      {/* ─── 1. MAGNESIUM BURNING ─── */}
      {type === 'magnesium_burn' && (
        <View style={styles.expContainer}>
          <Text style={styles.expTitle}>🔥 Burning Magnesium Ribbon</Text>
          <Text style={styles.expSub}>Tap to ignite the ribbon and observe the white flame!</Text>

          <View style={styles.visualBox}>
            {mgStep === 0 && (
              <View style={styles.ribbonRaw}>
                <Text style={styles.visualText}>🩶 Shiny Silver Magnesium Ribbon (Mg)</Text>
              </View>
            )}

            {mgStep === 1 && (
              <Animated.View style={[styles.ribbonBurning, { opacity: flashAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }]}>
                <Text style={styles.flameEmoji}>💥</Text>
                <Text style={styles.flameText}>DAZZLING WHITE FLAME!</Text>
                <Text style={styles.flameSub}>2Mg + O₂ → 2MgO + Heat</Text>
              </Animated.View>
            )}

            {mgStep === 2 && (
              <View style={styles.ribbonAsh}>
                <Text style={styles.visualText}>⚪ White Powder — Magnesium Oxide (MgO)</Text>
                <Text style={styles.ashSub}>Basic oxide that turns red litmus blue when dissolved in water!</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: color }]}
            onPress={mgStep === 2 ? () => setMgStep(0) : handleMgBurn}
          >
            <Text style={styles.actionBtnText}>
              {mgStep === 0 ? '🔥 Hold in Flame & Burn' : mgStep === 1 ? '⚡ Burning in Air...' : '🔄 Clean & Repeat Experiment'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ─── 2. PH SCALE SIMULATOR ─── */}
      {type === 'ph_scale' && (
        <View style={styles.expContainer}>
          <Text style={styles.expTitle}>🌈 Interactive pH Spectrum</Text>
          <Text style={styles.expSub}>Tap different pH values to test substances!</Text>

          <View style={[styles.phDisplay, { backgroundColor: getPhColor(phValue) }]}>
            <Text style={styles.phNumber}>pH {phValue}</Text>
            <Text style={styles.phSubstance}>{getPhInfo(phValue).name}</Text>
            <Text style={styles.phNature}>{getPhInfo(phValue).nature}</Text>
          </View>

          {/* pH Selector Buttons */}
          <View style={styles.phGrid}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setPhValue(num)}
                style={[
                  styles.phChip,
                  { backgroundColor: getPhColor(num) },
                  phValue === num && styles.phChipSelected,
                ]}
              >
                <Text style={styles.phChipText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* ─── 3. POP TEST ─── */}
      {type === 'pop_test' && (
        <View style={styles.expContainer}>
          <Text style={styles.expTitle}>💥 Hydrogen Gas "Pop" Test</Text>
          <Text style={styles.expSub}>Mix Zinc + Acid, capture bubbles, and test with a flame!</Text>

          <View style={styles.visualBox}>
            {popStep === 0 && (
              <Text style={styles.visualText}>🧪 Test Tube containing Zinc granules + dilute H₂SO₄</Text>
            )}

            {popStep === 1 && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>🫧 🫧 🫧</Text>
                <Text style={styles.visualText}>Hydrogen gas bubbles escaping into soap solution!</Text>
              </View>
            )}

            {popStep === 2 && (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 36 }}>🔥 💥 🔊</Text>
                <Text style={[styles.visualText, { color: '#ff4444', fontWeight: '900', fontSize: 18 }]}>
                  POP! POP! POP!
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
                  Hydrogen burns with a characteristic 'pop' sound!
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: color }]}
            onPress={popStep === 2 ? () => setPopStep(0) : handlePopTest}
          >
            <Text style={styles.actionBtnText}>
              {popStep === 0 ? '🧪 Add Zinc & Collect Gas' : popStep === 1 ? '🔥 Bring Burning Candle...' : '🔄 Repeat Pop Test'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ─── 4. STATES OF MATTER ─── */}
      {type === 'states_of_matter' && (
        <View style={styles.expContainer}>
          <Text style={styles.expTitle}>🌡️ Temperature vs State of Matter</Text>
          <Text style={styles.expSub}>Adjust temperature to see phase changes of Water!</Text>

          <View style={[styles.visualBox, { borderColor: getStateInfo(temp).color }]}>
            <Text style={{ fontSize: 36 }}>{getStateInfo(temp).emoji}</Text>
            <Text style={[styles.visualText, { color: getStateInfo(temp).color, fontSize: 18, fontWeight: '900' }]}>
              {getStateInfo(temp).state} at {temp}°C
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center', marginTop: 4 }}>
              {getStateInfo(temp).desc}
            </Text>
          </View>

          {/* Quick Temp Selector */}
          <View style={styles.tempGrid}>
            {[-20, 0, 25, 60, 100, 150].map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setTemp(t)}
                style={[
                  styles.tempChip,
                  temp === t && { backgroundColor: color },
                ]}
              >
                <Text style={[styles.tempChipText, temp === t && { color: '#000' }]}>{t}°C</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* ─── 5. MOLE CALCULATOR ─── */}
      {type === 'mole_calc' && (
        <View style={styles.expContainer}>
          <Text style={styles.expTitle}>🔢 Live Mole & Particle Calculator</Text>
          <Text style={styles.expSub}>Water (H₂O) Molar Mass = 18 g/mol</Text>

          <View style={styles.calcGrid}>
            {[9, 18, 36, 54, 90, 180].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => setMassInput(g)}
                style={[
                  styles.calcChip,
                  massInput === g && { backgroundColor: color },
                ]}
              >
                <Text style={[styles.calcChipText, massInput === g && { color: '#000' }]}>{g}g Water</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.calcResultBox}>
            <View style={styles.calcRow}>
              <Text style={styles.calcLabel}>Given Mass (m):</Text>
              <Text style={[styles.calcVal, { color }]}>{massInput} grams</Text>
            </View>
            <View style={styles.calcRow}>
              <Text style={styles.calcLabel}>Moles (n = m/M):</Text>
              <Text style={[styles.calcVal, { color: '#00e676' }]}>{moles} Moles</Text>
            </View>
            <View style={styles.calcRow}>
              <Text style={styles.calcLabel}>Molecules (N = n × Nₐ):</Text>
              <Text style={[styles.calcVal, { color: '#ffb300' }]}>{particles} × 10²³ molecules</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(12, 12, 30, 0.9)',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 18,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '900',
    letterSpacing: 1,
  },
  expContainer: {
    width: '100%',
  },
  expTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },
  expSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 14,
  },
  visualBox: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginBottom: 14,
  },
  visualText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  ribbonRaw: {
    alignItems: 'center',
  },
  ribbonBurning: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  flameEmoji: {
    fontSize: 32,
  },
  flameText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
  flameSub: {
    color: '#ffaa00',
    fontSize: 12,
    marginTop: 2,
  },
  ribbonAsh: {
    alignItems: 'center',
  },
  ashSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  actionBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 13.5,
    letterSpacing: 0.5,
  },

  // pH styles
  phDisplay: {
    width: '100%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  phNumber: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
  },
  phSubstance: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  phNature: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 2,
  },
  phGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  phChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phChipSelected: {
    borderWidth: 2.5,
    borderColor: '#ffffff',
    transform: [{ scale: 1.25 }],
  },
  phChipText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 12,
  },

  // Temp grid
  tempGrid: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  tempChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  tempChipText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },

  // Mole calc
  calcGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  calcChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  calcChipText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  calcResultBox: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calcLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12.5,
  },
  calcVal: {
    fontSize: 13.5,
    fontWeight: '900',
  },
});
