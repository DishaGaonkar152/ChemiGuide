import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface InteractiveConceptCheckProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  color?: string;
}

export default function InteractiveConceptCheck({
  question,
  options,
  correctIndex,
  explanation,
  color = '#00ffff',
}: InteractiveConceptCheckProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setRevealed(true);
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <View style={[styles.card, { borderColor: `${color}40` }]}>
      <View style={[styles.headerBadge, { backgroundColor: `${color}18` }]}>
        <Text style={[styles.headerBadgeText, { color }]}>💡 QUICK CONCEPT CHECK</Text>
      </View>

      <Text style={styles.questionText}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          let optionBg = 'rgba(255,255,255,0.04)';
          let optionBorder = 'rgba(255,255,255,0.1)';
          let optionTextColor = '#ffffff';

          if (revealed) {
            if (index === correctIndex) {
              optionBg = 'rgba(0, 230, 118, 0.2)';
              optionBorder = '#00e676';
              optionTextColor = '#00e676';
            } else if (index === selectedIndex) {
              optionBg = 'rgba(255, 68, 68, 0.2)';
              optionBorder = '#ff4444';
              optionTextColor = '#ff4444';
            }
          }

          return (
            <TouchableOpacity
              key={index}
              disabled={revealed}
              onPress={() => handleSelect(index)}
              style={[
                styles.optionButton,
                { backgroundColor: optionBg, borderColor: optionBorder },
              ]}
            >
              <Text style={[styles.optionText, { color: optionTextColor }]}>
                {String.fromCharCode(65 + index)}. {option}
              </Text>
              {revealed && index === correctIndex && <Text style={{ fontSize: 14 }}>✅</Text>}
              {revealed && index === selectedIndex && index !== correctIndex && <Text style={{ fontSize: 14 }}>❌</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {revealed && (
        <View style={[styles.explanationBox, { borderColor: isCorrect ? '#00e676' : '#ff4444' }]}>
          <Text style={[styles.resultTitle, { color: isCorrect ? '#00e676' : '#ff4444' }]}>
            {isCorrect ? '🎉 Spot On! That is Correct.' : '💡 Not Quite! Here is why:'}
          </Text>
          <Text style={styles.explanationText}>{explanation}</Text>

          <TouchableOpacity
            onPress={() => {
              setSelectedIndex(null);
              setRevealed(false);
            }}
            style={styles.retryBtn}
          >
            <Text style={[styles.retryText, { color }]}>🔄 Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(10, 10, 25, 0.85)',
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 16,
    marginVertical: 14,
  },
  headerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerBadgeText: {
    fontSize: 10.5,
    fontWeight: '900',
    letterSpacing: 1,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 14,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 13.5,
    fontWeight: '700',
    flex: 1,
  },
  explanationBox: {
    marginTop: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  resultTitle: {
    fontSize: 13.5,
    fontWeight: '900',
    marginBottom: 4,
  },
  explanationText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 19,
  },
  retryBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  retryText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
