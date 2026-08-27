import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { predictReaction, ReactionResult } from '../services/aiService';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

// --- COLORS ---
const COLORS = {
  background: '#030308',
  cardBg: 'rgba(20, 20, 30, 0.7)',
  cardBorder: 'rgba(255, 255, 255, 0.1)',
  neonCyan: '#00ffff',
  neonMagenta: '#ff00ff',
  neonGreen: '#00ff44',
  neonGold: '#ffaa00',
  neonRed: '#ff4444',
  textMain: '#ffffff',
  textMuted: '#aaaaaa',
};

// --- 1. VIRTUAL LAB ---
const REACTIONS = [
  { id: 1, name: 'Sodium in Water (EXPLOSIVE!)', reactants: 'Na + H₂O', products: 'NaOH + H₂', type: 'exothermic', fact: 'Produces hydrogen gas that can ignite spontaneously!' },
  { id: 2, name: 'Neutralization (Safe)', reactants: 'HCl + NaOH', products: 'NaCl + H₂O', type: 'endothermic', fact: 'Acid and base cancel out to form harmless salt water.' },
  { id: 3, name: 'Thermal Decomposition', reactants: 'CaCO₃', products: 'CaO + CO₂', type: 'endothermic', fact: 'Requires intense heat to break down limestone.' },
  { id: 4, name: 'Displacement', reactants: 'Fe + CuSO₄', products: 'FeSO₄ + Cu', type: 'exothermic', fact: 'Iron steals the sulfate, leaving pure copper behind.' },
  { id: 5, name: 'Magnesium Combustion', reactants: '2Mg + O₂', products: '2MgO', type: 'exothermic', fact: 'Burns with a blinding white light! Do not stare.' },
  { id: 6, name: 'Zinc & Acid', reactants: 'Zn + H₂SO₄', products: 'ZnSO₄ + H₂', type: 'exothermic', fact: 'A classic way to generate hydrogen gas in the lab.' }
];

function VirtualLab() {
  const [selectedReaction, setSelectedReaction] = useState(REACTIONS[0]);
  const [isMixing, setIsMixing] = useState(false);
  
  const shakeValue = useSharedValue(0);
  const glowValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeValue.value }],
      shadowOpacity: glowValue.value,
      shadowRadius: glowValue.value * 20,
    };
  });

  const handleMix = () => {
    if (isMixing) return;
    setIsMixing(true);
    
    // Shake animation
    shakeValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 100 }), 5, true),
      withTiming(0, { duration: 50 })
    );

    // Glow animation
    glowValue.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0, { duration: 500 })
    );

    setTimeout(() => {
      setIsMixing(false);
    }, 2000);
  };

  const isExo = selectedReaction.type === 'exothermic';

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionEmoji}>🧪</Text>
      <Text style={styles.sectionTitle}>Virtual Lab</Text>
      <Text style={styles.sectionSubtitle}>Chemical Reaction Simulator</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reactionSelector}>
        {REACTIONS.map((rxn) => (
          <TouchableOpacity
            key={rxn.id}
            style={[
              styles.rxnBtn,
              selectedReaction.id === rxn.id && styles.rxnBtnActive
            ]}
            onPress={() => setSelectedReaction(rxn)}
          >
            <Text style={[styles.rxnBtnText, selectedReaction.id === rxn.id && styles.rxnBtnTextActive]}>
              {rxn.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.View style={[
        styles.beakerContainer,
        animatedStyle,
        {
          shadowColor: isExo ? COLORS.neonRed : COLORS.neonCyan,
          borderColor: isExo ? COLORS.neonRed : COLORS.neonCyan,
        }
      ]}>
        <View style={styles.beakerSides}>
          <Text style={styles.chemicalText}>{selectedReaction.reactants}</Text>
          <Text style={styles.arrowText}>→</Text>
          <Text style={styles.chemicalText}>{isMixing ? '???' : selectedReaction.products}</Text>
        </View>
        
        {isMixing && <Text style={styles.mixingText}>Reacting...</Text>}
        {!isMixing && (
          <View style={styles.factBox}>
            <Text style={styles.factText}>{selectedReaction.fact}</Text>
          </View>
        )}
      </Animated.View>

      <TouchableOpacity style={styles.actionBtn} onPress={handleMix}>
        <Text style={styles.actionBtnText}>MIX CHEMICALS!</Text>
      </TouchableOpacity>
    </View>
  );
}


// --- 2. MOLECULE BUILDER ---
const MOLECULES = [
  { name: 'Water (H₂O)', target: { H: 2, O: 1 } },
  { name: 'Salt (NaCl)', target: { Na: 1, Cl: 1 } },
  { name: 'Carbon Dioxide (CO₂)', target: { C: 1, O: 2 } },
  { name: 'Ammonia (NH₃)', target: { N: 1, H: 3 } },
  { name: 'Quicklime (CaO)', target: { Ca: 1, O: 1 } },
  { name: 'Magnesium Oxide (MgO)', target: { Mg: 1, O: 1 } },
  { name: 'Hydrochloric Acid (HCl)', target: { H: 1, Cl: 1 } },
  { name: 'Sulfuric Acid (H₂SO₄)', target: { H: 2, S: 1, O: 4 } },
  { name: 'Rust (Fe₂O₃)', target: { Fe: 2, O: 3 } },
  { name: 'Methane (CH₄)', target: { C: 1, H: 4 } }
];

const ATOMS = ['H', 'O', 'C', 'N', 'Na', 'Cl', 'Ca', 'S', 'Fe', 'Mg', 'Zn', 'K', 'Cu', 'Ag', 'Pb', 'Al'];

function MoleculeBuilder() {
  const [level, setLevel] = useState(0);
  const [currentBuild, setCurrentBuild] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<null | 'success' | 'fail'>(null);
  const [score, setScore] = useState(0);

  const addAtom = (atom: string) => {
    setCurrentBuild(prev => ({ ...prev, [atom]: (prev[atom] || 0) + 1 }));
    setStatus(null);
  };

  const checkBuild = () => {
    const target = MOLECULES[level].target;
    let isCorrect = true;
    
    const targetKeys = Object.keys(target);
    const buildKeys = Object.keys(currentBuild);

    if (targetKeys.length !== buildKeys.length) isCorrect = false;
    
    const targetObj = target as unknown as Record<string, number>;
    for (const key of targetKeys) {
      if (currentBuild[key] !== targetObj[key]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      setStatus('success');
      setScore(s => s + 100);
      setTimeout(() => {
        setCurrentBuild({});
        setStatus(null);
        setLevel((l) => (l + 1) % MOLECULES.length);
      }, 1500);
    } else {
      setStatus('fail');
      setTimeout(() => setStatus(null), 1500);
    }
  };

  const clearBuild = () => setCurrentBuild({});

  const displayBuild = Object.entries(currentBuild).map(([atom, count]) => {
    return Array(count).fill(atom).join(' + ');
  }).join(' + ');

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionEmoji}>🧩</Text>
      <Text style={styles.sectionTitle}>Molecule Builder</Text>
      <Text style={styles.sectionSubtitle}>Score: {score} | Level {level + 1}/10</Text>

      <Text style={styles.targetText}>Build: {MOLECULES[level].name}</Text>

      <View style={styles.buildZone}>
        <Text style={styles.buildText}>{displayBuild || 'Tap atoms to build...'}</Text>
        {status === 'success' && <Text style={styles.successText}>🎉 Correct! 🎉</Text>}
        {status === 'fail' && <Text style={styles.failText}>❌ Try Again! ❌</Text>}
      </View>

      <View style={styles.atomGrid}>
        {ATOMS.map(atom => (
          <TouchableOpacity key={atom} style={styles.atomBtn} onPress={() => addAtom(atom)}>
            <Text style={styles.atomBtnText}>{atom}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.actionBtn, { flex: 1, backgroundColor: 'rgba(255, 0, 0, 0.2)', borderColor: COLORS.neonRed }]} onPress={clearBuild}>
          <Text style={styles.actionBtnText}>CLEAR</Text>
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity style={[styles.actionBtn, { flex: 2 }]} onPress={checkBuild}>
          <Text style={styles.actionBtnText}>CHECK!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// --- 3. LAB ESCAPE QUIZ ---
const QUIZ_QUESTIONS = [
  { q: 'What is the chemical formula of Water?', options: ['H₂O', 'CO₂', 'NaCl', 'O₂'], a: 'H₂O' },
  { q: 'What is the formula for Table Salt?', options: ['NaCl', 'KCl', 'HCl', 'NaOH'], a: 'NaCl' },
  { q: 'What gas is produced when zinc reacts with sulfuric acid?', options: ['O₂', 'N₂', 'H₂', 'CO₂'], a: 'H₂' },
  { q: 'What is the product of burning magnesium?', options: ['MgCO₃', 'MgO', 'Mg(OH)₂', 'MgSO₄'], a: 'MgO' },
  { q: 'What is baking soda?', options: ['Na₂CO₃', 'NaHCO₃', 'NaCl', 'NaOH'], a: 'NaHCO₃' },
  { q: 'Chemical name of Plaster of Paris?', options: ['CaSO₄', 'CaSO₄·2H₂O', 'CaSO₄·½H₂O', 'CaCO₃'], a: 'CaSO₄·½H₂O' },
  { q: 'What is rust chemically?', options: ['FeO', 'Fe₂O₃', 'Fe₃O₄', 'Fe(OH)₃'], a: 'Fe₂O₃' },
  { q: 'Formula of Methane?', options: ['CH₃', 'CH₄', 'C₂H₆', 'CO₂'], a: 'CH₄' },
  { q: 'What is quicklime?', options: ['CaO', 'Ca(OH)₂', 'CaCO₃', 'CaCl₂'], a: 'CaO' },
  { q: 'Formula of Ammonia?', options: ['NH₂', 'NH₃', 'NH₄', 'NO₂'], a: 'NH₃' },
  { q: 'What gas do we exhale?', options: ['O₂', 'CO', 'CO₂', 'N₂'], a: 'CO₂' },
  { q: 'Formula of Sulfuric Acid?', options: ['HCl', 'HNO₃', 'H₂SO₄', 'H₂CO₃'], a: 'H₂SO₄' },
  { q: 'What is the formula of Ozone?', options: ['O₂', 'O', 'O₃', 'O₄'], a: 'O₃' },
  { q: 'Formula of Ethanol?', options: ['CH₃OH', 'C₂H₅OH', 'C₃H₈O', 'C₂H₄'], a: 'C₂H₅OH' },
  { q: 'What is vinegar chemically?', options: ['CH₃COOH', 'HCOOH', 'C₂H₅OH', 'HCl'], a: 'CH₃COOH' }
];

function LabEscapeQuiz() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsFinished(true);
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startQuiz = () => {
    setIsPlaying(true);
    setIsFinished(false);
    setTimeLeft(30);
    setQIndex(0);
    setScore(0);
  };

  const handleAnswer = (ans: string) => {
    if (ans === QUIZ_QUESTIONS[qIndex].a) {
      setScore(s => s + 1);
    }
    
    if (qIndex < QUIZ_QUESTIONS.length - 1) {
      setQIndex(i => i + 1);
    } else {
      setIsFinished(true);
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionEmoji}>🎮</Text>
      <Text style={styles.sectionTitle}>Lab Escape</Text>
      <Text style={styles.sectionSubtitle}>Timed Challenge</Text>

      {!isPlaying && !isFinished && (
        <TouchableOpacity style={styles.actionBtn} onPress={startQuiz}>
          <Text style={styles.actionBtnText}>START ESCAPE!</Text>
        </TouchableOpacity>
      )}

      {isPlaying && (
        <View style={styles.quizActiveArea}>
          <Text style={[styles.timerText, { color: timeLeft <= 10 ? COLORS.neonRed : COLORS.neonCyan }]}>
            {timeLeft}s
          </Text>
          <Text style={styles.qText}>{QUIZ_QUESTIONS[qIndex].q}</Text>
          
          <View style={styles.optionsGrid}>
            {QUIZ_QUESTIONS[qIndex].options.map((opt, i) => (
              <TouchableOpacity key={i} style={styles.optionBtn} onPress={() => handleAnswer(opt)}>
                <Text style={styles.optionBtnText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {isFinished && (
        <View style={styles.quizResultArea}>
          <Text style={styles.resultTitle}>
            {score === QUIZ_QUESTIONS.length ? 'LAB ESCAPED! 🔓🎉' : 'TIME OUT! 💥'}
          </Text>
          <Text style={styles.resultScore}>You got {score} / {QUIZ_QUESTIONS.length} correct.</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={startQuiz}>
            <Text style={styles.actionBtnText}>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


// --- 4. CHEMISTRY CARD COLLECTION ---
const CARDS = [
  { sym: 'H', name: 'Hydrogen', num: 1, cat: 'Non-metal', re: 8, el: 5, color: COLORS.neonCyan },
  { sym: 'He', name: 'Helium', num: 2, cat: 'Noble Gas', re: 0, el: 0, color: COLORS.neonMagenta },
  { sym: 'C', name: 'Carbon', num: 6, cat: 'Non-metal', re: 5, el: 6, color: COLORS.neonCyan },
  { sym: 'N', name: 'Nitrogen', num: 7, cat: 'Non-metal', re: 3, el: 7, color: COLORS.neonCyan },
  { sym: 'O', name: 'Oxygen', num: 8, cat: 'Non-metal', re: 9, el: 9, color: COLORS.neonCyan },
  { sym: 'Na', name: 'Sodium', num: 11, cat: 'Metal', re: 10, el: 2, color: COLORS.neonGold },
  { sym: 'Mg', name: 'Magnesium', num: 12, cat: 'Metal', re: 8, el: 3, color: COLORS.neonGold },
  { sym: 'Al', name: 'Aluminum', num: 13, cat: 'Metal', re: 7, el: 4, color: COLORS.neonGold },
  { sym: 'Si', name: 'Silicon', num: 14, cat: 'Metalloid', re: 4, el: 5, color: COLORS.neonGreen },
  { sym: 'Cl', name: 'Chlorine', num: 17, cat: 'Non-metal', re: 9, el: 8, color: COLORS.neonCyan },
  { sym: 'Ca', name: 'Calcium', num: 20, cat: 'Metal', re: 9, el: 2, color: COLORS.neonGold },
  { sym: 'Fe', name: 'Iron', num: 26, cat: 'Metal', re: 6, el: 4, color: COLORS.neonGold },
  { sym: 'Cu', name: 'Copper', num: 29, cat: 'Metal', re: 4, el: 5, color: COLORS.neonGold },
  { sym: 'Zn', name: 'Zinc', num: 30, cat: 'Metal', re: 5, el: 4, color: COLORS.neonGold },
  { sym: 'Ag', name: 'Silver', num: 47, cat: 'Metal', re: 2, el: 5, color: COLORS.neonGold },
  { sym: 'Au', name: 'Gold', num: 79, cat: 'Metal', re: 1, el: 6, color: COLORS.neonGold }
];

const SwipeableCard = ({ card, isNext, onSwipe }: { card: typeof CARDS[0], isNext?: boolean, onSwipe?: () => void }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(!isNext)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = event.translationX / 10;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 100) {
        translateX.value = withSpring(Math.sign(event.translationX) * 500, { velocity: event.velocityX });
        if (onSwipe) {
          runOnJS(onSwipe)();
        }
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: isNext ? 0.9 : 1 },
      ],
      position: 'absolute',
      zIndex: isNext ? 1 : 100,
      opacity: isNext ? 0.7 : 1,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.elementCard, { borderColor: card.color, shadowColor: card.color, width: 250, height: 350 }, rStyle]}>
        <Text style={[styles.cardNum, { color: card.color, fontSize: 18 }]}>{card.num}</Text>
        <Text style={[styles.cardSym, { color: card.color, fontSize: 80, marginVertical: 20 }]}>{card.sym}</Text>
        <Text style={[styles.cardName, { fontSize: 24 }]}>{card.name}</Text>
        <Text style={[styles.cardCat, { color: card.color, fontSize: 14 }]}>{card.cat}</Text>
        
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { width: 80, fontSize: 14 }]}>Reactivity</Text>
          <View style={styles.statBarBg}>
            <View style={[styles.statBarFill, { width: `${card.re * 10}%`, backgroundColor: card.color }]} />
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { width: 80, fontSize: 14 }]}>ElecNeg</Text>
          <View style={styles.statBarBg}>
            <View style={[styles.statBarFill, { width: `${card.el * 10}%`, backgroundColor: card.color }]} />
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

function ChemistryCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const currentCard = CARDS[currentIndex];
  const nextCard = CARDS[currentIndex + 1];

  return (
    <View style={[styles.sectionContainer, { height: 500 }]}>
      <Text style={styles.sectionEmoji}>🏆</Text>
      <Text style={styles.sectionTitle}>Element Collection</Text>
      <Text style={styles.sectionSubtitle}>Swipe Deck</Text>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20 }}>
        {currentIndex >= CARDS.length ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: COLORS.neonGold, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Deck Completed!</Text>
            <TouchableOpacity style={[styles.actionBtn, { paddingHorizontal: 40 }]} onPress={handleReset}>
              <Text style={styles.actionBtnText}>RESET DECK</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {nextCard && (
              <SwipeableCard key={nextCard.sym} card={nextCard} isNext={true} />
            )}
            {currentCard && (
              <SwipeableCard key={currentCard.sym} card={currentCard} onSwipe={handleSwipe} />
            )}
          </>
        )}
      </View>
    </View>
  );
}


// --- 5. DAILY CHALLENGE (BALANCING) ---
const BALANCING_EQS = [
  { 
    eq: ['Fe', 'O₂', 'Fe₂O₃'], ans: ['4', '3', '2'], arrowIndex: 2,
    hint: "Iron (Fe) has a subscript of 2 in the product, and Oxygen (O) has 3.",
    strategy: "Find the lowest common multiple for Oxygen (which is 6). Make 3 O₂ and 2 Fe₂O₃. Then balance Iron."
  },
  { 
    eq: ['Na', 'H₂O', 'NaOH', 'H₂'], ans: ['2', '2', '2', '1'], arrowIndex: 2,
    hint: "Notice that hydrogen appears in two different products.",
    strategy: "Balance the odd number of Hydrogen atoms first by doubling NaOH. Then balance Na and H₂O."
  },
  { 
    eq: ['H₂', 'O₂', 'H₂O'], ans: ['2', '1', '2'], arrowIndex: 2,
    hint: "Oxygen has 2 atoms in the reactants but only 1 in the product.",
    strategy: "Double the H₂O to balance Oxygen, which gives 4 Hydrogens, then double H₂."
  },
  { 
    eq: ['N₂', 'H₂', 'NH₃'], ans: ['1', '3', '2'], arrowIndex: 2,
    hint: "Nitrogen starts with 2 atoms, but NH₃ only has 1.",
    strategy: "Double NH₃ to balance N, giving 6 Hydrogens. Then multiply H₂ by 3."
  },
  { 
    eq: ['CH₄', 'O₂', 'CO₂', 'H₂O'], ans: ['1', '2', '1', '2'], arrowIndex: 2,
    hint: "Balance Carbon first, then Hydrogen, then Oxygen last.",
    strategy: "C is already balanced. H has 4 on the left, so put a 2 in front of H₂O. Finally, count all O's on the right (2+2=4) and put a 2 in front of O₂."
  },
  { 
    eq: ['Al', 'O₂', 'Al₂O₃'], ans: ['4', '3', '2'], arrowIndex: 2,
    hint: "Oxygen has an even number on the left and an odd number on the right.",
    strategy: "Find the lowest common multiple for O (which is 6). Multiply O₂ by 3 and Al₂O₃ by 2. Then balance Al with 4."
  },
  { 
    eq: ['K', 'Cl₂', 'KCl'], ans: ['2', '1', '2'], arrowIndex: 2,
    hint: "Chlorine is diatomic (Cl₂) on the left.",
    strategy: "Put a 2 in front of KCl to balance Chlorine, which forces K to also need a 2."
  },
  { 
    eq: ['Mg', 'HCl', 'MgCl₂', 'H₂'], ans: ['1', '2', '1', '1'], arrowIndex: 2,
    hint: "Chlorine and Hydrogen both have 2 atoms on the right.",
    strategy: "Simply place a 2 in front of HCl to balance both H and Cl."
  }
];

function DailyChallenge() {
  const [streak, setStreak] = useState(0);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [eqIndex, setEqIndex] = useState(() => Math.floor(Math.random() * BALANCING_EQS.length));
  const [inputs, setInputs] = useState<string[]>(Array(4).fill(''));
  const [status, setStatus] = useState<null | 'success' | 'fail'>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const currentEq = BALANCING_EQS[eqIndex];

  const handleCheck = () => {
    let isCorrect = true;
    for (let i = 0; i < currentEq.ans.length; i++) {
      if ((inputs[i] || '1') !== currentEq.ans[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      setStatus('success');
      setStreak(s => s + 1);
      setTimeout(() => {
        setStatus(null);
        setInputs(Array(4).fill(''));
        setShowHint(false);
        setShowSolution(false);
        
        const nextCompleted = [...completedIndices, eqIndex];
        if (nextCompleted.length >= BALANCING_EQS.length) {
          setCompletedIndices([]);
          setEqIndex(Math.floor(Math.random() * BALANCING_EQS.length));
        } else {
          setCompletedIndices(nextCompleted);
          let nextIndex = Math.floor(Math.random() * BALANCING_EQS.length);
          while (nextCompleted.includes(nextIndex) || nextIndex === eqIndex) {
            nextIndex = Math.floor(Math.random() * BALANCING_EQS.length);
          }
          setEqIndex(nextIndex);
        }
      }, 1500);
    } else {
      setStatus('fail');
      setStreak(0);
      setTimeout(() => setStatus(null), 1500);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionEmoji}>🔥</Text>
      <Text style={styles.sectionTitle}>Daily Challenge</Text>
      <Text style={styles.sectionSubtitle}>Streak: {streak} 🔥</Text>

      <View style={styles.balancingZone}>
        <View style={styles.eqRow}>
          {currentEq.eq.map((term, i) => (
            <View key={i} style={styles.eqTerm}>
              {i > 0 && (
                <Text style={styles.eqPlus}>
                  {i === currentEq.arrowIndex ? '→' : '+'}
                </Text>
              )}
              <TextInput
                style={styles.coefficientInput}
                keyboardType="numeric"
                value={inputs[i]}
                onChangeText={(t) => {
                  const newInputs = [...inputs];
                  newInputs[i] = t;
                  setInputs(newInputs);
                }}
                placeholder="_"
                placeholderTextColor={COLORS.textMuted}
                maxLength={2}
              />
              <Text style={styles.eqText}>{term}</Text>
            </View>
          ))}
        </View>

        {status === 'success' && <Text style={styles.successText}>Perfect Balance! ⚖️</Text>}
        {status === 'fail' && <Text style={styles.failText}>Unbalanced! Try again.</Text>}
      </View>

      <View style={styles.helpContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.helpBtn, showHint && styles.helpBtnActive]} onPress={() => setShowHint(!showHint)}>
            <Text style={styles.helpBtnText}>💡 Hint & Strategy</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity style={[styles.helpBtn, showSolution && styles.helpBtnActive]} onPress={() => setShowSolution(!showSolution)}>
            <Text style={styles.helpBtnText}>👀 Solution</Text>
          </TouchableOpacity>
        </View>

        {showHint && (
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>Hint:</Text>
            <Text style={styles.hintText}>{currentEq.hint}</Text>
            <Text style={[styles.hintTitle, { marginTop: 10 }]}>Strategy:</Text>
            <Text style={styles.hintText}>{currentEq.strategy}</Text>
          </View>
        )}

        {showSolution && (
          <View style={styles.solutionBox}>
            <Text style={styles.solutionText}>
              {currentEq.ans.join(' : ')}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.actionBtn} onPress={handleCheck}>
        <Text style={styles.actionBtnText}>CHECK BALANCE</Text>
      </TouchableOpacity>
    </View>
  );
}


// --- 6. AI REACTION SIMULATOR ---
const CHEMICAL_SHELF = [
  // Metals
  { symbol: 'Na', name: 'Sodium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'K', name: 'Potassium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Ca', name: 'Calcium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Mg', name: 'Magnesium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Fe', name: 'Iron', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Zn', name: 'Zinc', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Cu', name: 'Copper', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Al', name: 'Aluminium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Li', name: 'Lithium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Ba', name: 'Barium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Sn', name: 'Tin', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Mn', name: 'Manganese', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Cr', name: 'Chromium', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Ni', name: 'Nickel', state: '(s)', category: 'metal', color: '#ffaa00' },
  { symbol: 'Ag', name: 'Silver', state: '(s)', category: 'metal', color: '#ffaa00' },
  // Acids
  { symbol: 'HCl', name: 'Hydrochloric Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'H₂SO₄', name: 'Sulfuric Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'HNO₃', name: 'Nitric Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'CH₃COOH', name: 'Acetic Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'H₃PO₄', name: 'Phosphoric Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'H₂CO₃', name: 'Carbonic Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'HF', name: 'Hydrofluoric Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  { symbol: 'HBr', name: 'Hydrobromic Acid', state: '(aq)', category: 'acid', color: '#ff4444' },
  // Bases
  { symbol: 'NaOH', name: 'Sodium Hydroxide', state: '(aq)', category: 'base', color: '#4488ff' },
  { symbol: 'KOH', name: 'Potassium Hydroxide', state: '(aq)', category: 'base', color: '#4488ff' },
  { symbol: 'Ca(OH)₂', name: 'Slaked Lime', state: '(aq)', category: 'base', color: '#4488ff' },
  { symbol: 'NH₃·H₂O', name: 'Ammonium Hydroxide', state: '(aq)', category: 'base', color: '#4488ff' },
  { symbol: 'Mg(OH)₂', name: 'Milk of Magnesia', state: '(aq)', category: 'base', color: '#4488ff' },
  { symbol: 'Ba(OH)₂', name: 'Barium Hydroxide', state: '(aq)', category: 'base', color: '#4488ff' },
  { symbol: 'Al(OH)₃', name: 'Aluminium Hydroxide', state: '(s)', category: 'base', color: '#4488ff' },
  // Salts & Compounds
  { symbol: 'CuSO₄', name: 'Copper Sulfate', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'CaCO₃', name: 'Calcium Carbonate', state: '(s)', category: 'salt', color: '#00ff44' },
  { symbol: 'NaHCO₃', name: 'Baking Soda', state: '(s)', category: 'salt', color: '#00ff44' },
  { symbol: 'AgNO₃', name: 'Silver Nitrate', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'Fe₂O₃', name: 'Iron Oxide', state: '(s)', category: 'salt', color: '#00ff44' },
  { symbol: 'Pb(NO₃)₂', name: 'Lead Nitrate', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'KI', name: 'Potassium Iodide', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'Na₂CO₃', name: 'Washing Soda', state: '(s)', category: 'salt', color: '#00ff44' },
  { symbol: 'KMnO₄', name: 'Potassium Permanganate', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'FeCl₃', name: 'Ferric Chloride', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'BaCl₂', name: 'Barium Chloride', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'ZnSO₄', name: 'Zinc Sulfate', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'NaNO₃', name: 'Sodium Nitrate', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'CuCl₂', name: 'Copper Chloride', state: '(aq)', category: 'salt', color: '#00ff44' },
  { symbol: 'Na₂SO₄', name: 'Sodium Sulfate', state: '(aq)', category: 'salt', color: '#00ff44' },
  // Non-metals & Others
  { symbol: 'H₂O', name: 'Water', state: '(l)', category: 'other', color: '#88ddff' },
  { symbol: 'O₂', name: 'Oxygen', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'H₂', name: 'Hydrogen', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'Cl₂', name: 'Chlorine', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'C', name: 'Carbon', state: '(s)', category: 'other', color: '#88ddff' },
  { symbol: 'N₂', name: 'Nitrogen', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'CO₂', name: 'Carbon Dioxide', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'SO₂', name: 'Sulfur Dioxide', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'NH₃', name: 'Ammonia', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'He', name: 'Helium', state: '(g)', category: 'other', color: '#88ddff' },
  { symbol: 'S', name: 'Sulfur', state: '(s)', category: 'other', color: '#88ddff' },
];

const CATEGORY_LABELS: Record<string, string> = {
  metal: '⚙️ Metals',
  acid: '🧪 Acids',
  base: '🧫 Bases',
  salt: '🧂 Salts & Compounds',
  other: '💨 Non-metals & Others',
};

function ReactionSimulator() {
  const [beakerContents, setBeakerContents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReactionResult | null>(null);
  const [mixCount, setMixCount] = useState(0);

  const shakeValue = useSharedValue(0);
  const glowValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);

  // Pulse animation for MIX button
  useEffect(() => {
    if (beakerContents.length >= 2) {
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulseValue.value = withTiming(1);
    }
  }, [beakerContents.length]);

  const beakerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeValue.value }],
    shadowOpacity: glowValue.value,
    shadowRadius: glowValue.value * 25,
  }));

  const mixBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  const addToBeaker = (symbol: string) => {
    if (beakerContents.length >= 3) return;
    if (beakerContents.includes(symbol)) return;
    setBeakerContents(prev => [...prev, symbol]);
    setResult(null);
  };

  const removeFromBeaker = (symbol: string) => {
    setBeakerContents(prev => prev.filter(s => s !== symbol));
    setResult(null);
  };

  const resetSimulator = () => {
    setBeakerContents([]);
    setResult(null);
    setIsLoading(false);
  };

  const handleMix = async () => {
    if (beakerContents.length < 2 || isLoading) return;

    setIsLoading(true);
    setResult(null);

    // Shake animation
    shakeValue.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withRepeat(withTiming(8, { duration: 80 }), 8, true),
      withTiming(0, { duration: 50 })
    );
    glowValue.value = withSequence(
      withTiming(1, { duration: 600 }),
      withTiming(0.3, { duration: 400 })
    );

    try {
      const prediction = await predictReaction(beakerContents);
      setResult(prediction);
      setMixCount(c => c + 1);

      // Post-result glow
      glowValue.value = withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 700 })
      );
    } catch (err) {
      console.error('Reaction prediction failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getEnergyColor = (type: string) => {
    switch (type) {
      case 'exothermic': return COLORS.neonRed;
      case 'endothermic': return COLORS.neonCyan;
      default: return COLORS.textMuted;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Combination': return '#00ff88';
      case 'Decomposition': return '#ff8800';
      case 'Single Displacement': return '#ffdd00';
      case 'Double Displacement': return '#ff00ff';
      case 'Combustion': return '#ff4400';
      case 'Neutralization': return '#4488ff';
      case 'Redox': return '#ff6688';
      case 'No Reaction': return '#888888';
      default: return COLORS.neonCyan;
    }
  };

  const categories = ['metal', 'acid', 'base', 'salt', 'other'];

  return (
    <View style={simStyles.container}>
      {/* Header */}
      <Text style={styles.sectionEmoji}>⚗️</Text>
      <Text style={styles.sectionTitle}>AI Mix Lab</Text>
      <Text style={styles.sectionSubtitle}>Mix Any Chemicals • AI Predicts the Reaction</Text>
      <Text style={simStyles.mixCounter}>Reactions mixed: {mixCount} 🧬</Text>

      {/* Chemical Shelf */}
      {categories.map(cat => (
        <View key={cat} style={simStyles.categorySection}>
          <Text style={[simStyles.categoryLabel, { color: CHEMICAL_SHELF.find(c => c.category === cat)?.color }]}>
            {CATEGORY_LABELS[cat]}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={simStyles.shelfScroll}>
            {CHEMICAL_SHELF.filter(c => c.category === cat).map(chem => {
              const isInBeaker = beakerContents.includes(chem.symbol);
              return (
                <TouchableOpacity
                  key={chem.symbol}
                  style={[
                    simStyles.shelfItem,
                    { borderColor: chem.color },
                    isInBeaker && simStyles.shelfItemDisabled,
                  ]}
                  onPress={() => addToBeaker(chem.symbol)}
                  disabled={isInBeaker || beakerContents.length >= 3}
                  activeOpacity={0.7}
                >
                  <Text style={[simStyles.shelfSymbol, { color: chem.color }]}>{chem.symbol}</Text>
                  <Text style={simStyles.shelfName} numberOfLines={1}>{chem.name}</Text>
                  <Text style={[simStyles.shelfState, { color: chem.color }]}>{chem.state}</Text>
                  {isInBeaker && <Text style={simStyles.inBeakerBadge}>IN BEAKER</Text>}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ))}

      {/* Beaker Drop Zone */}
      <Animated.View style={[
        simStyles.beakerZone,
        beakerAnimatedStyle,
        result && { shadowColor: result.liquidColor, borderColor: result.liquidColor + '66' },
      ]}>
        <Text style={simStyles.beakerIcon}>🧪</Text>
        <Text style={simStyles.beakerTitle}>Reaction Beaker</Text>

        {beakerContents.length === 0 ? (
          <Text style={simStyles.beakerHint}>Tap chemicals above to add them (max 3)</Text>
        ) : (
          <View style={simStyles.chipRow}>
            {beakerContents.map(sym => {
              const chem = CHEMICAL_SHELF.find(c => c.symbol === sym);
              return (
                <TouchableOpacity
                  key={sym}
                  style={[simStyles.chip, { borderColor: chem?.color || COLORS.neonCyan }]}
                  onPress={() => removeFromBeaker(sym)}
                >
                  <Text style={[simStyles.chipText, { color: chem?.color || COLORS.neonCyan }]}>{sym}</Text>
                  <Text style={simStyles.chipX}>✕</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Liquid color indicator */}
        {result && (
          <View style={[simStyles.liquidIndicator, { backgroundColor: result.liquidColor + '33', borderColor: result.liquidColor }]}>
            <View style={[simStyles.liquidDot, { backgroundColor: result.liquidColor }]} />
            <Text style={[simStyles.liquidText, { color: result.liquidColor }]}>Solution Color</Text>
          </View>
        )}
      </Animated.View>

      {/* MIX Button */}
      {!result && (
        <Animated.View style={mixBtnAnimatedStyle}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              beakerContents.length < 2 && { opacity: 0.4 },
              isLoading && { opacity: 0.6 },
            ]}
            onPress={handleMix}
            disabled={beakerContents.length < 2 || isLoading}
          >
            {isLoading ? (
              <View style={simStyles.loadingRow}>
                <ActivityIndicator size="small" color={COLORS.neonCyan} />
                <Text style={[styles.actionBtnText, { marginLeft: 10 }]}>🔬 AI is Analyzing...</Text>
              </View>
            ) : (
              <Text style={styles.actionBtnText}>
                {beakerContents.length < 2 ? 'Add at least 2 chemicals' : '⚗️  MIX CHEMICALS!'}
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Results */}
      {result && (
        <View style={simStyles.resultContainer}>
          {/* Equation */}
          <View style={simStyles.equationBox}>
            <Text style={simStyles.equationLabel}>⚗️ BALANCED EQUATION</Text>
            <Text style={simStyles.equationText}>{result.equation}</Text>
          </View>

          {/* Reaction Type Badge */}
          <View style={[simStyles.typeBadge, { backgroundColor: getTypeColor(result.reactionType) + '22', borderColor: getTypeColor(result.reactionType) }]}>
            <Text style={[simStyles.typeBadgeText, { color: getTypeColor(result.reactionType) }]}>
              {result.reactionType}
            </Text>
            <Text style={[simStyles.energyBadge, { color: getEnergyColor(result.energyType) }]}>
              {result.energyType === 'exothermic' ? '🔥 Exothermic' : result.energyType === 'endothermic' ? '❄️ Endothermic' : '⚖️ Neutral'}
            </Text>
          </View>

          {/* Products */}
          <View style={simStyles.infoSection}>
            <Text style={simStyles.infoLabel}>🧪 Products Formed</Text>
            {result.products.map((p, i) => (
              <Text key={i} style={simStyles.productItem}>• {p}</Text>
            ))}
          </View>

          {/* Observations */}
          <View style={simStyles.infoSection}>
            <Text style={simStyles.infoLabel}>👁️ What You Would Observe</Text>
            {result.observations.map((obs, i) => (
              <Text key={i} style={simStyles.observationItem}>{obs}</Text>
            ))}
          </View>

          {/* Safety Warning */}
          {result.safetyWarning && (
            <View style={simStyles.safetyBox}>
              <Text style={simStyles.safetyText}>{result.safetyWarning}</Text>
            </View>
          )}

          {/* Fun Fact */}
          <View style={simStyles.funFactBox}>
            <Text style={simStyles.funFactLabel}>💡 Fun Fact</Text>
            <Text style={simStyles.funFactText}>{result.funFact}</Text>
          </View>

          {/* Explanation */}
          <View style={simStyles.explanationBox}>
            <Text style={simStyles.explanationLabel}>📖 Explanation</Text>
            <Text style={simStyles.explanationText}>{result.explanation}</Text>
          </View>

          {/* Try Another */}
          <TouchableOpacity style={[styles.actionBtn, { marginTop: 15, borderColor: COLORS.neonGreen }]} onPress={resetSimulator}>
            <Text style={[styles.actionBtnText, { color: COLORS.neonGreen }]}>🧪 Try Another Reaction!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}


// --- MAIN PAGE COMPONENT ---
export default function FunZone() {
  const router = useRouter();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'VirtualLab': return <VirtualLab />;
      case 'MoleculeBuilder': return <MoleculeBuilder />;
      case 'LabEscapeQuiz': return <LabEscapeQuiz />;
      case 'ChemistryCards': return <ChemistryCards />;
      case 'DailyChallenge': return <DailyChallenge />;
      case 'ReactionSimulator': return <ReactionSimulator />;
      default: return null;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => activeGame ? setActiveGame(null) : router.back()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FUNZONE</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!activeGame ? (
          <View style={styles.menuGrid}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => setActiveGame('VirtualLab')}>
              <Text style={styles.menuEmoji}>🧪</Text>
              <Text style={styles.menuBtnText}>Virtual Lab</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => setActiveGame('MoleculeBuilder')}>
              <Text style={styles.menuEmoji}>🧩</Text>
              <Text style={styles.menuBtnText}>Molecule Builder</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => setActiveGame('LabEscapeQuiz')}>
              <Text style={styles.menuEmoji}>🎮</Text>
              <Text style={styles.menuBtnText}>Lab Escape</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => setActiveGame('ChemistryCards')}>
              <Text style={styles.menuEmoji}>🏆</Text>
              <Text style={styles.menuBtnText}>Element Cards</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuBtn} onPress={() => setActiveGame('DailyChallenge')}>
              <Text style={styles.menuEmoji}>🔥</Text>
              <Text style={styles.menuBtnText}>Daily Challenge</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuBtn, { borderColor: COLORS.neonMagenta, shadowColor: COLORS.neonMagenta }]} onPress={() => setActiveGame('ReactionSimulator')}>
              <Text style={styles.menuEmoji}>⚗️</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.menuBtnText}>AI Mix Lab</Text>
                  <View style={{ backgroundColor: COLORS.neonMagenta + '33', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: COLORS.neonMagenta }}>
                    <Text style={{ color: COLORS.neonMagenta, fontSize: 10, fontWeight: '900' }}>✨ AI</Text>
                  </View>
                </View>
                <Text style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 4 }}>Mix anything • AI predicts</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {renderGame()}
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}


// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  backBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  backBtnText: {
    color: COLORS.neonCyan,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: COLORS.neonMagenta,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: COLORS.neonMagenta,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scrollContent: {
    padding: 20,
    gap: 30,
  },
  sectionContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  sectionEmoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  sectionTitle: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: COLORS.neonCyan,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  
  // Virtual Lab
  reactionSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  rxnBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: 10,
  },
  rxnBtnActive: {
    borderColor: COLORS.neonCyan,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  rxnBtnText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  rxnBtnTextActive: {
    color: COLORS.neonCyan,
    fontWeight: 'bold',
  },
  beakerContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    marginBottom: 20,
  },
  beakerSides: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  chemicalText: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  arrowText: {
    color: COLORS.neonCyan,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  mixingText: {
    color: COLORS.neonMagenta,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  factBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  factText: {
    color: COLORS.neonGold,
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionBtn: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  actionBtnText: {
    color: COLORS.neonCyan,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },

  // Molecule Builder
  targetText: {
    color: COLORS.neonMagenta,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buildZone: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buildText: {
    color: COLORS.textMain,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  successText: {
    color: COLORS.neonGreen,
    fontWeight: 'bold',
    marginTop: 5,
  },
  failText: {
    color: COLORS.neonRed,
    fontWeight: 'bold',
    marginTop: 5,
  },
  atomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  atomBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    backgroundColor: 'rgba(0,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  atomBtnText: {
    color: COLORS.neonCyan,
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },

  // Quiz
  quizActiveArea: {
    width: '100%',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 15,
  },
  qText: {
    color: COLORS.textMain,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  optionsGrid: {
    width: '100%',
    gap: 10,
  },
  optionBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  optionBtnText: {
    color: COLORS.textMain,
    fontSize: 16,
  },
  quizResultArea: {
    alignItems: 'center',
    width: '100%',
  },
  resultTitle: {
    color: COLORS.neonGreen,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultScore: {
    color: COLORS.textMain,
    fontSize: 16,
    marginBottom: 20,
  },

  // Cards
  cardsScroll: {
    flexDirection: 'row',
  },
  elementCard: {
    width: 140,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardNum: {
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  cardSym: {
    fontSize: 40,
    fontWeight: '900',
    marginVertical: 10,
  },
  cardName: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardCat: {
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 9,
    width: 45,
  },
  statBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Daily Challenge
  balancingZone: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.neonGold,
    alignItems: 'center',
    marginBottom: 20,
  },
  eqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  eqTerm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eqPlus: {
    color: COLORS.neonGold,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  coefficientInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: COLORS.neonCyan,
    fontSize: 18,
    fontWeight: 'bold',
    width: 35,
    height: 35,
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 5,
  },
  eqText: {
    color: COLORS.textMain,
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Menu Styles
  menuGrid: {
    gap: 15,
  },
  menuBtn: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuEmoji: {
    fontSize: 40,
    marginRight: 20,
  },
  menuBtnText: {
    color: COLORS.textMain,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // Daily Challenge Help
  helpContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  helpBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    backgroundColor: 'rgba(0,255,255,0.05)',
  },
  helpBtnActive: {
    backgroundColor: 'rgba(0,255,255,0.2)',
  },
  helpBtnText: {
    color: COLORS.neonCyan,
    fontSize: 14,
    fontWeight: 'bold',
  },
  hintBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.neonGold,
  },
  hintTitle: {
    color: COLORS.neonGold,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  hintText: {
    color: COLORS.textMain,
    fontSize: 14,
    lineHeight: 20,
  },
  solutionBox: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(0,255,0,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
  },
  solutionText: {
    color: COLORS.neonGreen,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 5,
  }
});

// --- AI REACTION SIMULATOR STYLES ---
const simStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.neonMagenta + '44',
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  mixCounter: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 15,
  },
  categorySection: {
    width: '100%',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  shelfScroll: {
    flexDirection: 'row',
  },
  shelfItem: {
    width: 85,
    height: 90,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1.5,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  shelfItemDisabled: {
    opacity: 0.3,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  shelfSymbol: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 2,
  },
  shelfName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
    textAlign: 'center',
  },
  shelfState: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
    opacity: 0.7,
  },
  inBeakerBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: 6,
    color: COLORS.neonGreen,
    fontWeight: '900',
    backgroundColor: 'rgba(0,255,68,0.2)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  beakerZone: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.neonCyan + '44',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: COLORS.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 5,
  },
  beakerIcon: {
    fontSize: 50,
    marginBottom: 5,
  },
  beakerTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  beakerHint: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 14,
    fontStyle: 'italic',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },
  chipText: {
    fontSize: 16,
    fontWeight: '900',
  },
  chipX: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  liquidIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  liquidDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  liquidText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    width: '100%',
    marginTop: 5,
    gap: 15,
  },
  equationBox: {
    backgroundColor: 'rgba(0, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: COLORS.neonCyan + '44',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  equationLabel: {
    color: COLORS.neonCyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  equationText: {
    color: COLORS.neonCyan,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: COLORS.neonCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    lineHeight: 30,
  },
  typeBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  typeBadgeText: {
    fontSize: 15,
    fontWeight: '800',
  },
  energyBadge: {
    fontSize: 13,
    fontWeight: '700',
  },
  infoSection: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 15,
  },
  infoLabel: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  productItem: {
    color: COLORS.neonGreen,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    paddingLeft: 5,
  },
  observationItem: {
    color: COLORS.textMain,
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 20,
    paddingLeft: 5,
  },
  safetyBox: {
    backgroundColor: 'rgba(255, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: COLORS.neonRed + '66',
    borderRadius: 14,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.neonRed,
  },
  safetyText: {
    color: COLORS.neonRed,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  funFactBox: {
    backgroundColor: 'rgba(255, 170, 0, 0.08)',
    borderWidth: 1,
    borderColor: COLORS.neonGold + '44',
    borderRadius: 14,
    padding: 15,
  },
  funFactLabel: {
    color: COLORS.neonGold,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  funFactText: {
    color: COLORS.textMain,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  explanationBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 15,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.neonCyan,
  },
  explanationLabel: {
    color: COLORS.neonCyan,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  explanationText: {
    color: COLORS.textMain,
    fontSize: 13,
    lineHeight: 22,
  },
});
