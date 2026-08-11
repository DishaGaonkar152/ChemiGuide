import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TOPIC_ACTIVITIES, Flashcard, FlowchartNode } from '../constants/learningActivities';
import InteractiveFlashcard from './InteractiveFlashcard';
import InteractiveFlowchart from './InteractiveFlowchart';
import AIFlashcardGenerator from './AIFlashcardGenerator';

interface TopicActivitiesProps {
  topicTitle: string;
  color: string;
}

export default function TopicActivities({ topicTitle, color }: TopicActivitiesProps) {
  // Find activities matching the title or fallback
  const normalizedTitle = Object.keys(TOPIC_ACTIVITIES).find(
    (key) => topicTitle.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(topicTitle.toLowerCase())
  ) || "Atomic Structure";

  const defaultData = TOPIC_ACTIVITIES[normalizedTitle];

  // Activities States
  const [flashcards] = useState<Flashcard[]>(defaultData?.flashcards || []);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flowchartData] = useState<FlowchartNode>(
    defaultData?.flowchart || { id: 'root', label: topicTitle, description: 'Concept Map' }
  );

  // Tab State
  const [activeTab, setActiveTab] = useState<'cards' | 'chart' | 'ai'>('cards');

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <View style={[styles.container, { borderColor: 'rgba(255,255,255,0.06)' }]}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🎓</Text>
        <View>
          <Text style={[styles.headerTitle, { color }]}>Active Learning Corner</Text>
          <Text style={styles.headerSubtitle}>Boost memory with interactive tools</Text>
        </View>
      </View>

      {/* ─── TAB NAVIGATION BAR ─── */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('cards')}
          style={[
            styles.tabButton,
            activeTab === 'cards' && {
              borderColor: color,
              backgroundColor: 'rgba(255,255,255,0.05)',
              shadowColor: color,
            },
          ]}
        >
          <Text style={[styles.tabButtonText, activeTab === 'cards' && { color }]}>
            🎴 Flashcards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('chart')}
          style={[
            styles.tabButton,
            activeTab === 'chart' && {
              borderColor: color,
              backgroundColor: 'rgba(255,255,255,0.05)',
              shadowColor: color,
            },
          ]}
        >
          <Text style={[styles.tabButtonText, activeTab === 'chart' && { color }]}>
            🌿 Flowchart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('ai')}
          style={[
            styles.tabButton,
            activeTab === 'ai' && {
              borderColor: color,
              backgroundColor: 'rgba(255,255,255,0.05)',
              shadowColor: color,
            },
          ]}
        >
          <Text style={[styles.tabButtonText, activeTab === 'ai' && { color }]}>
            🤖 AI Quiz
          </Text>
        </TouchableOpacity>
      </View>

      {/* ─── TAB CONTENT ─── */}
      <View style={styles.tabContent}>
        {activeTab === 'cards' && flashcards.length > 0 && (
          <InteractiveFlashcard
            key={currentCardIndex}
            question={flashcards[currentCardIndex].question}
            answer={flashcards[currentCardIndex].answer}
            hint={flashcards[currentCardIndex].hint}
            color={color}
            index={currentCardIndex}
            total={flashcards.length}
            onNext={handleNextCard}
            onPrev={handlePrevCard}
          />
        )}

        {activeTab === 'chart' && (
          <InteractiveFlowchart data={flowchartData} color={color} />
        )}

        {activeTab === 'ai' && (
          <AIFlashcardGenerator topicTitle={topicTitle} color={color} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(8, 8, 20, 0.65)',
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginTop: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  headerEmoji: {
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    padding: 6,
    gap: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tabButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tabContent: {
    marginTop: 20,
    minHeight: 320,
  },
});
