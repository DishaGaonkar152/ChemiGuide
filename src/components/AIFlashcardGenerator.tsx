import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  generateNextMCQ,
  getQuestionCount,
  getRemainingInRound,
  resetSession,
  GeneratedMCQ,
  MCQOption,
} from '../utils/aiQuestionEngine';
import {
  loadHistory,
  saveHistoryEntry,
  clearHistory,
  HistoryEntry,
  TopicHistory,
} from '../utils/historyDB';

// ─── PROPS ───
interface Props {
  topicTitle: string;
  color: string;
}

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════
export default function AIFlashcardGenerator({ topicTitle, color }: Props) {
  // Card state
  const [currentMCQ, setCurrentMCQ] = useState<GeneratedMCQ | null>(null);
  const [selectedOption, setSelectedOption] = useState<MCQOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // History state
  const [history, setHistory] = useState<TopicHistory>(() => loadHistory(topicTitle));

  // Session stats
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [streak, setStreak] = useState(0);

  // Flip animation
  const rotateY = useSharedValue(0);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotateY.value}deg` }],
    opacity: rotateY.value > 90 ? 0 : 1,
    zIndex: rotateY.value > 90 ? 0 : 1,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotateY.value - 180}deg` }],
    opacity: rotateY.value > 90 ? 1 : 0,
    zIndex: rotateY.value > 90 ? 1 : 0,
  }));

  // ─── GENERATE NEW QUESTION ───
  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setIsAnswered(false);
    setSelectedOption(null);
    rotateY.value = withSpring(0, { damping: 20, stiffness: 120 });

    // Small delay for "thinking" animation feel
    setTimeout(() => {
      const mcq = generateNextMCQ(topicTitle);
      setCurrentMCQ(mcq);
      setIsGenerating(false);
    }, 400);
  }, [topicTitle]);

  // ─── SELECT AN OPTION ───
  const handleSelectOption = useCallback(
    (option: MCQOption) => {
      if (isAnswered || !currentMCQ) return;

      setSelectedOption(option);
      setIsAnswered(true);

      // Flip the card to reveal
      rotateY.value = withSpring(180, { damping: 15, stiffness: 90 });

      const result: 'correct' | 'wrong' = option.isCorrect ? 'correct' : 'wrong';

      // Save to history
      const entry: HistoryEntry = {
        id: currentMCQ.question.id + '_' + Date.now(),
        question: currentMCQ.question.question,
        answer: currentMCQ.question.answer,
        selectedAnswer: option.text,
        difficulty: currentMCQ.question.difficulty,
        category: currentMCQ.question.category,
        userResult: result,
        timestamp: Date.now(),
      };

      const updated = saveHistoryEntry(topicTitle, entry);
      setHistory(updated);

      if (result === 'correct') {
        setSessionCorrect((p) => p + 1);
        setStreak((p) => p + 1);
      } else {
        setSessionWrong((p) => p + 1);
        setStreak(0);
      }
    },
    [isAnswered, currentMCQ, topicTitle],
  );

  // ─── CLEAR HISTORY ───
  const handleClearHistory = () => {
    const cleared = clearHistory(topicTitle);
    setHistory(cleared);
  };

  // ─── NEW ROUND ───
  const handleNewRound = () => {
    resetSession(topicTitle);
    setSessionCorrect(0);
    setSessionWrong(0);
    setStreak(0);
    setCurrentMCQ(null);
    setSelectedOption(null);
    setIsAnswered(false);
    rotateY.value = 0;
  };

  const totalPool = getQuestionCount(topicTitle);
  const remaining = getRemainingInRound(topicTitle);
  const sessionTotal = sessionCorrect + sessionWrong;
  const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

  const isCorrectAnswer = selectedOption?.isCorrect === true;
  const resultColor = isCorrectAnswer ? '#00ff88' : '#ff4466';

  // ─── RENDER ───
  return (
    <View style={styles.wrapper}>
      {/* ═══ SESSION STATS BAR ═══ */}
      {sessionTotal > 0 && (
        <View style={styles.statsBar}>
          <View style={styles.statPill}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={[styles.statVal, { color }]}>{accuracy}%</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statVal}>{sessionCorrect}</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statIcon}>❌</Text>
            <Text style={styles.statVal}>{sessionWrong}</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={[styles.statVal, streak >= 3 && { color: '#ff6600' }]}>
              {streak}
            </Text>
          </View>
        </View>
      )}

      {/* ═══ EMPTY STATE ═══ */}
      {!currentMCQ && !isGenerating ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🤖</Text>
          <Text style={[styles.emptyTitle, { color }]}>AI Quiz Engine</Text>
          <Text style={styles.emptyDesc}>
            Tap Generate to get a random MCQ from a pool of {totalPool} questions.
            Pick the correct answer from 4 options!
          </Text>
          <TouchableOpacity
            onPress={handleGenerate}
            style={[styles.generateBtn, { backgroundColor: color }]}
          >
            <Text style={styles.generateBtnText}>⚡ GENERATE QUESTION</Text>
          </TouchableOpacity>
        </View>
      ) : isGenerating ? (
        <View style={styles.generatingState}>
          <Text style={styles.generatingEmoji}>🧠</Text>
          <Text style={[styles.generatingText, { color }]}>AI is thinking...</Text>
        </View>
      ) : currentMCQ ? (
        <View style={styles.cardArea}>
          {/* Difficulty Badge Row */}
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.diffBadge,
                {
                  borderColor:
                    currentMCQ.question.difficulty === 'easy'
                      ? '#00ff88'
                      : currentMCQ.question.difficulty === 'medium'
                      ? '#ffaa00'
                      : '#ff4466',
                },
              ]}
            >
              <Text
                style={[
                  styles.diffText,
                  {
                    color:
                      currentMCQ.question.difficulty === 'easy'
                        ? '#00ff88'
                        : currentMCQ.question.difficulty === 'medium'
                        ? '#ffaa00'
                        : '#ff4466',
                  },
                ]}
              >
                {currentMCQ.question.difficulty.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.categoryText}>{currentMCQ.question.category}</Text>
            <Text style={styles.remainingText}>
              {remaining}/{totalPool} left
            </Text>
          </View>

          {/* ═══ FLIP CARD ═══ */}
          <View style={styles.cardWrapper}>
            {/* FRONT — Question */}
            <Animated.View
              style={[styles.card, frontStyle, { borderColor: color, shadowColor: color }]}
            >
              <View style={styles.cardInner}>
                <Text style={styles.cardLabel}>QUESTION</Text>
                <Text style={styles.cardQuestion}>{currentMCQ.question.question}</Text>
                <Text style={[styles.tapHint, { color }]}>Pick an option below</Text>
              </View>
            </Animated.View>

            {/* BACK — Answer + Result */}
            <Animated.View
              style={[
                styles.card,
                styles.cardBackSide,
                backStyle,
                {
                  borderColor: resultColor,
                  shadowColor: resultColor,
                  borderWidth: 2,
                },
              ]}
            >
              <View style={styles.cardInner}>
                {/* Result banner */}
                <View style={[styles.resultBanner, { backgroundColor: resultColor }]}>
                  <Text style={styles.resultBannerText}>
                    {isCorrectAnswer ? '✅  CORRECT!' : '❌  WRONG!'}
                  </Text>
                </View>

                <Text style={[styles.cardLabel, { color: resultColor }]}>CORRECT ANSWER</Text>
                <Text style={styles.cardAnswer}>{currentMCQ.question.answer}</Text>

                {!isCorrectAnswer && selectedOption && (
                  <View style={styles.yourAnswerBox}>
                    <Text style={styles.yourAnswerLabel}>Your answer:</Text>
                    <Text style={styles.yourAnswerText} numberOfLines={2}>
                      {selectedOption.text}
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          </View>

          {/* ═══ MCQ OPTIONS (shown when not yet answered) ═══ */}
          {!isAnswered ? (
            <View style={styles.optionsGrid}>
              {currentMCQ.options.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.75}
                  onPress={() => handleSelectOption(option)}
                  style={[styles.optionBtn, { borderColor: 'rgba(255,255,255,0.12)' }]}
                >
                  <View style={[styles.optionLetter, { borderColor: color }]}>
                    <Text style={[styles.optionLetterText, { color }]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </View>
                  <Text style={styles.optionText} numberOfLines={3}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            /* ═══ AFTER ANSWER: show options with green/red highlights ═══ */
            <View style={styles.optionsGrid}>
              {currentMCQ.options.map((option, idx) => {
                const isThisSelected = selectedOption?.text === option.text;
                const isThisCorrect = option.isCorrect;

                let borderClr = 'rgba(255,255,255,0.06)';
                let bgClr = 'transparent';
                if (isThisCorrect) {
                  borderClr = '#00ff88';
                  bgClr = 'rgba(0, 255, 136, 0.08)';
                } else if (isThisSelected && !isThisCorrect) {
                  borderClr = '#ff4466';
                  bgClr = 'rgba(255, 68, 102, 0.08)';
                }

                return (
                  <View
                    key={idx}
                    style={[
                      styles.optionBtn,
                      {
                        borderColor: borderClr,
                        backgroundColor: bgClr,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.optionLetter,
                        {
                          borderColor: isThisCorrect
                            ? '#00ff88'
                            : isThisSelected
                            ? '#ff4466'
                            : 'rgba(255,255,255,0.15)',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionLetterText,
                          {
                            color: isThisCorrect
                              ? '#00ff88'
                              : isThisSelected
                              ? '#ff4466'
                              : 'rgba(255,255,255,0.3)',
                          },
                        ]}
                      >
                        {isThisCorrect ? '✓' : isThisSelected ? '✗' : String.fromCharCode(65 + idx)}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isThisCorrect && { color: '#00ff88' },
                        isThisSelected && !isThisCorrect && { color: '#ff4466' },
                      ]}
                      numberOfLines={3}
                    >
                      {option.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* Next / New Round buttons */}
          {isAnswered && (
            <TouchableOpacity
              onPress={handleGenerate}
              style={[styles.nextBtn, { backgroundColor: color }]}
            >
              <Text style={styles.nextBtnText}>NEXT QUESTION →</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleNewRound} style={styles.newRoundBtn}>
            <Text style={styles.newRoundText}>↻ New Round</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* ═══ HISTORY SECTION ═══ */}
      {history.entries.length > 0 && (
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle, { color }]}>📜 Your History</Text>
            <View style={styles.historyMeta}>
              <Text style={styles.historyMetaText}>
                ✅ {history.totalCorrect} &nbsp; ❌ {history.totalWrong}
              </Text>
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={styles.clearBtn}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={styles.historyScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
          >
            {history.entries.slice(0, 50).map((entry, idx) => (
              <View
                key={entry.id + idx}
                style={[
                  styles.historyCard,
                  {
                    borderLeftColor:
                      entry.userResult === 'correct' ? '#00ff88' : '#ff4466',
                  },
                ]}
              >
                <View style={styles.historyCardTop}>
                  <Text style={styles.historyCardResult}>
                    {entry.userResult === 'correct' ? '✅' : '❌'}
                  </Text>
                  <View style={styles.historyCardContent}>
                    <Text style={styles.historyQ} numberOfLines={2}>
                      {entry.question}
                    </Text>
                    <Text style={styles.historyA} numberOfLines={2}>
                      {entry.answer}
                    </Text>
                  </View>
                  <View style={styles.historyCardRight}>
                    <Text
                      style={[
                        styles.historyDiff,
                        {
                          color:
                            entry.difficulty === 'easy'
                              ? '#00ff88'
                              : entry.difficulty === 'medium'
                              ? '#ffaa00'
                              : '#ff4466',
                        },
                      ]}
                    >
                      {entry.difficulty.toUpperCase()}
                    </Text>
                    <Text style={styles.historyTime}>
                      {formatTime(entry.timestamp)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// ─── HELPERS ───
function formatTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return d.toLocaleDateString();
}

// ═══════════════════════════════════════
// STYLES
// ═══════════════════════════════════════
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  // ─── STATS BAR ───
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statVal: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },

  // ─── EMPTY STATE ───
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  emptyDesc: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  generateBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  generateBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // ─── GENERATING STATE ───
  generatingState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  generatingEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },
  generatingText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // ─── CARD AREA ───
  cardArea: {
    width: '100%',
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  diffBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  diffText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  categoryText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  remainingText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    fontWeight: '600',
  },

  // ─── CARD ───
  cardWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
    marginBottom: 16,
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(12, 12, 28, 0.85)',
    borderWidth: 1.5,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  cardBackSide: {
    backgroundColor: 'rgba(16, 16, 38, 0.92)',
  },
  cardInner: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
  },
  cardQuestion: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
  },
  cardAnswer: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  tapHint: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.7,
    marginTop: 4,
  },

  // ─── RESULT BANNER ───
  resultBanner: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 6,
  },
  resultBannerText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // ─── YOUR ANSWER BOX (when wrong) ───
  yourAnswerBox: {
    marginTop: 8,
    backgroundColor: 'rgba(255, 68, 102, 0.06)',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 102, 0.15)',
    width: '100%',
  },
  yourAnswerLabel: {
    color: '#ff4466',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 3,
  },
  yourAnswerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    lineHeight: 16,
  },

  // ─── MCQ OPTIONS ───
  optionsGrid: {
    width: '100%',
    gap: 8,
    marginBottom: 14,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(10, 10, 25, 0.6)',
    gap: 12,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLetterText: {
    fontSize: 13,
    fontWeight: '900',
  },
  optionText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13.5,
    fontWeight: '600',
    lineHeight: 19,
    flex: 1,
  },

  // ─── NEXT BUTTON ───
  nextBtn: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 4,
  },
  nextBtnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // ─── NEW ROUND ───
  newRoundBtn: {
    marginTop: 10,
    paddingVertical: 8,
  },
  newRoundText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // ─── HISTORY ───
  historySection: {
    marginTop: 28,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyMetaText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 12,
    fontWeight: '700',
  },
  clearBtn: {
    color: '#ff4466',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  historyScroll: {
    maxHeight: 300,
  },
  historyCard: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    borderLeftWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  historyCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  historyCardResult: {
    fontSize: 16,
    marginTop: 2,
  },
  historyCardContent: {
    flex: 1,
  },
  historyQ: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  historyA: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11.5,
    lineHeight: 16,
    marginTop: 3,
  },
  historyCardRight: {
    alignItems: 'flex-end',
  },
  historyDiff: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  historyTime: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 10,
    marginTop: 3,
  },
});
