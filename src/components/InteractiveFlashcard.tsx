import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface FlashcardProps {
  question: string;
  answer: string;
  hint?: string;
  color: string;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function InteractiveFlashcard({
  question,
  answer,
  hint,
  color,
  index,
  total,
  onNext,
  onPrev,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const rotateY = useSharedValue(0);

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    rotateY.value = withSpring(nextFlipped ? 180 : 0, {
      damping: 15,
      stiffness: 90,
    });
  };

  // Animated styles for the card front and back
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY.value}deg` }
      ],
      opacity: rotateY.value > 90 ? 0 : 1,
      zIndex: rotateY.value > 90 ? 0 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY.value - 180}deg` }
      ],
      opacity: rotateY.value > 90 ? 1 : 0,
      zIndex: rotateY.value > 90 ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
      {/* ─── METRICS HEADER ─── */}
      <View style={styles.cardHeader}>
        <Text style={styles.progressText}>
          CARD {index + 1} OF {total}
        </Text>
        {hint && !isFlipped && (
          <TouchableOpacity
            onPress={() => setShowHint(!showHint)}
            style={[styles.hintButton, { borderColor: color }]}
          >
            <Text style={[styles.hintButtonText, { color }]}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ─── CARD CONTAINER (TOUCHABLE) ─── */}
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={handleFlip}
        style={styles.cardWrapper}
      >
        {/* FRONT SIDE */}
        <Animated.View
          style={[
            styles.cardSide,
            frontAnimatedStyle,
            { borderColor: color, shadowColor: color },
          ]}
        >
          <View style={[styles.innerContent, styles.frontInner]}>
            <Text style={styles.questionLabel}>QUESTION</Text>
            <Text style={styles.questionText}>{question}</Text>
            {hint && showHint && (
              <View style={[styles.hintBox, { borderLeftColor: color }]}>
                <Text style={styles.hintText}>{hint}</Text>
              </View>
            )}
            <Text style={[styles.tapPrompt, { color }]}>Tap to reveal answer ↺</Text>
          </View>
        </Animated.View>

        {/* BACK SIDE */}
        <Animated.View
          style={[
            styles.cardSide,
            styles.cardBack,
            backAnimatedStyle,
            { borderColor: color, shadowColor: color },
          ]}
        >
          <View style={[styles.innerContent, styles.backInner]}>
            <Text style={[styles.answerLabel, { color }]}>ANSWER</Text>
            <Text style={styles.answerText}>{answer}</Text>
            <Text style={[styles.tapPrompt, { color }]}>Tap to view question ↺</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>

      {/* ─── NAVIGATION CONTROLS ─── */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={onPrev}
          style={[styles.navButton, { borderColor: 'rgba(255,255,255,0.15)' }]}
        >
          <Text style={styles.navButtonText}>← Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFlip}
          style={[styles.flipBtn, { backgroundColor: color }]}
        >
          <Text style={styles.flipBtnText}>FLIP CARD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          style={[styles.navButton, { borderColor: 'rgba(255,255,255,0.15)' }]}
        >
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  hintButton: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  hintButtonText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardWrapper: {
    width: '100%',
    height: 280,
    position: 'relative',
    marginBottom: 20,
  },
  cardSide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(12, 12, 28, 0.85)',
    borderWidth: 1.5,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  cardBack: {
    backgroundColor: 'rgba(16, 16, 38, 0.9)',
  },
  innerContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  frontInner: {
    alignItems: 'center',
  },
  backInner: {
    alignItems: 'center',
  },
  questionLabel: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
    textShadowRadius: 4,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
    flex: 1,
    verticalAlign: 'middle',
  },
  answerText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
    flex: 1,
    verticalAlign: 'middle',
  },
  hintBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderLeftWidth: 3,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginVertical: 8,
  },
  hintText: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 13.5,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  tapPrompt: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 8,
    opacity: 0.7,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  navButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  flipBtn: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 11,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  flipBtnText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
