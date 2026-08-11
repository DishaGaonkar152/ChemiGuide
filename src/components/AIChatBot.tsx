import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as Speech from 'expo-speech';
import { sendChatMessage, resetChatSession, ChatMessage } from '../services/aiService';

const QUICK_PROMPTS = [
  '📷 Upload Textbook Page',
  '📄 Scan Chemistry Notes',
  '⚗️ Balance Reaction from Photo',
  '📐 Analyze Chemistry Diagram',
  '⚛️ What is an atom?',
  '🧂 Acids, Bases & pH',
  '💎 Metals vs Non-metals',
  '🧮 Mole Concept Math',
];

interface VisualStep {
  stepNum: number;
  title: string;
  body: string;
  icon: string;
  badgeColor: string;
}

interface VisualDeck {
  title: string;
  steps: VisualStep[];
  speechText: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Visual Explanation & Sound States
  const [visualVisible, setVisualVisible] = useState(false);
  const [currentDeck, setCurrentDeck] = useState<VisualDeck | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const fileInputRef = useRef<any>(null);

  const stopAudio = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const speakText = (text: string) => {
    stopAudio();
    // Clean markdown characters for clear speech
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/•/g, '')
      .replace(/→/g, ' yields ')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4');

    setIsSpeaking(true);
    Speech.speak(cleanText, {
      rate: 0.9,
      pitch: 1.05,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleOpenVisual = (rawText: string) => {
    const lines = rawText.split('\n').filter(l => l.trim().length > 0);
    const title = lines[0]?.replace(/[*_#`~]/g, '').trim() || 'Visual Chemistry Breakdown';

    const steps: VisualStep[] = [];
    let currentBody: string[] = [];
    let stepCount = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.includes(':')) {
        if (currentBody.length > 0) {
          const bodyStr = currentBody.join('\n');
          steps.push({
            stepNum: stepCount++,
            title: getStepTitle(stepCount - 1),
            body: bodyStr,
            icon: getStepIcon(stepCount - 1),
            badgeColor: getStepColor(stepCount - 1),
          });
          currentBody = [];
        }
      }
      currentBody.push(line);
    }

    if (currentBody.length > 0) {
      steps.push({
        stepNum: stepCount,
        title: getStepTitle(stepCount),
        body: currentBody.join('\n'),
        icon: getStepIcon(stepCount),
        badgeColor: getStepColor(stepCount),
      });
    }

    const deck: VisualDeck = {
      title,
      steps: steps.length > 0 ? steps : [{
        stepNum: 1,
        title: 'Core Concept',
        body: rawText,
        icon: '⚗️',
        badgeColor: '#00ffff',
      }],
      speechText: rawText,
    };

    setCurrentDeck(deck);
    setActiveStep(0);
    setVisualVisible(true);
    speakText(deck.speechText);
  };

  function getStepTitle(idx: number): string {
    switch (idx % 4) {
      case 1: return 'Core Chemistry Concept';
      case 2: return 'Chemical Breakdown & Formula';
      case 3: return 'Reaction Mechanism / Trend';
      default: return 'Key Summary & Pro Tip';
    }
  }

  function getStepIcon(idx: number): string {
    switch (idx % 4) {
      case 1: return '⚛️';
      case 2: return '🧪';
      case 3: return '⚗️';
      default: return '💡';
    }
  }

  function getStepColor(idx: number): string {
    switch (idx % 4) {
      case 1: return '#00ffff';
      case 2: return '#ff00ff';
      case 3: return '#ffaa00';
      default: return '#00ff44';
    }
  }

  const handlePickImage = () => {
    if (Platform.OS === 'web') {
      if (!fileInputRef.current) {
        const inputEl = document.createElement('input');
        inputEl.type = 'file';
        inputEl.accept = 'image/*';
        inputEl.onchange = (e: any) => {
          const file = e.target?.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setSelectedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
          }
        };
        fileInputRef.current = inputEl;
      }
      fileInputRef.current.click();
    }
  };

  const handleSend = async (text?: string) => {
    const msgText = (text || input).trim();
    const currentImg = selectedImage;
    if ((!msgText && !currentImg) || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: msgText || '📷 [Uploaded Chemistry Image]',
      imageUrl: currentImg || undefined,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(msgText, currentImg || undefined);
      const botMsg: ChatMessage = { role: 'model', text: reply };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Something went wrong analyzing the image. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const handleReset = () => {
    stopAudio();
    resetChatSession();
    setMessages([]);
    setSelectedImage(null);
  };

  const handleClose = () => {
    stopAudio();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating AI Button — Bottom Right */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>🤖</Text>
        <View style={styles.fabBadge}>
          <Text style={styles.fabBadgeText}>AI</Text>
        </View>
      </TouchableOpacity>

      {/* Chat Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.6)' }]} />
          </Pressable>

          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={{ fontSize: 24 }}>🤖</Text>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.headerTitle}>ChemBot Vision & Sound AI</Text>
                  <Text style={styles.headerStatus}>● Online — Ask, upload photos & listen!</Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
                  <Text style={styles.resetText}>🔄</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollRef}
              style={styles.chatArea}
              contentContainerStyle={{ padding: 15, paddingBottom: 10 }}
              onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.length === 0 && (
                <View style={styles.welcomeContainer}>
                  <Text style={{ fontSize: 50, textAlign: 'center', marginBottom: 10 }}>📷🧪</Text>
                  <Text style={styles.welcomeTitle}>Hi! I'm ChemBot Vision AI 🤖</Text>
                  <Text style={styles.welcomeText}>
                    Upload any picture (NCERT textbook page, handwritten notes, chemical reaction diagram, or formula problem) by tapping 📷!
                    I will scan it, recognize the image type, and provide an accurate step-by-step solution!
                  </Text>

                  <Text style={styles.quickLabel}>Try asking:</Text>
                  <View style={styles.quickGrid}>
                    {QUICK_PROMPTS.map((prompt, i) => (
                      <TouchableOpacity key={i} style={styles.quickBtn} onPress={() => handleSend(prompt)}>
                        <Text style={styles.quickBtnText}>{prompt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {messages.map((msg, i) => (
                <View
                  key={i}
                  style={[
                    styles.bubble,
                    msg.role === 'user' ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  {msg.role === 'model' && (
                    <Text style={{ fontSize: 14, marginBottom: 3 }}>🤖</Text>
                  )}
                  {msg.imageUrl && (
                    <Image source={{ uri: msg.imageUrl }} style={styles.chatBubbleImage} />
                  )}
                  <Text
                    style={[
                      styles.bubbleText,
                      msg.role === 'user' ? styles.userText : styles.botText,
                    ]}
                  >
                    {msg.text.replace(/\*\*/g, '').replace(/\*/g, '')}
                  </Text>

                  {/* Visual & Sound Explanation Button for Bot Messages */}
                  {msg.role === 'model' && (
                    <TouchableOpacity
                      style={styles.visualBtn}
                      onPress={() => handleOpenVisual(msg.text)}
                    >
                      <Text style={styles.visualBtnText}>🎨 Visual Explanation & Sound 🔊</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {isLoading && (
                <View style={[styles.bubble, styles.botBubble, { flexDirection: 'row', alignItems: 'center' }]}>
                  <Text style={{ fontSize: 14, marginRight: 8 }}>🤖</Text>
                  <ActivityIndicator size="small" color="#00ffff" />
                  <Text style={{ color: '#aaa', marginLeft: 8, fontStyle: 'italic' }}>Analyzing image & question...</Text>
                </View>
              )}
            </ScrollView>

            {/* Selected Image Preview Container */}
            {selectedImage && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ color: '#00ffff', fontWeight: 'bold', fontSize: 12 }}>Image Attached 📷</Text>
                  <Text style={{ color: '#aaa', fontSize: 11 }}>Tap send to analyze with Vision AI</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.removeImageBtn}>
                  <Text style={{ color: '#ff4444', fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Input Bar */}
            <View style={styles.inputBar}>
              <TouchableOpacity style={styles.uploadBtn} onPress={handlePickImage}>
                <Text style={{ fontSize: 20 }}>📷</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                placeholder={selectedImage ? "Add a note or question (optional)..." : "Ask or upload a question image..."}
                placeholderTextColor="#666"
                onSubmitEditing={() => handleSend()}
                returnKeyType="send"
                editable={!isLoading}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendBtn, (!input.trim() && !selectedImage || isLoading) && { opacity: 0.4 }]}
                onPress={() => handleSend()}
                disabled={(!input.trim() && !selectedImage) || isLoading}
              >
                <Text style={styles.sendBtnText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── VISUAL EXPLANATION & SOUND MODAL ─── */}
      <Modal
        visible={visualVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => { stopAudio(); setVisualVisible(false); }}
      >
        <View style={styles.visualOverlay}>
          <View style={styles.visualCard}>
            {/* Visual Modal Header */}
            <View style={styles.visualHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 26, marginRight: 8 }}>🎨</Text>
                <View>
                  <Text style={styles.visualHeaderTitle}>Visual Blackboard</Text>
                  <Text style={{ color: '#00ff44', fontSize: 11, fontWeight: 'bold' }}>
                    {isSpeaking ? '🔊 Audio Narrating...' : '🔈 Audio Paused'}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity
                  style={styles.soundControlBtn}
                  onPress={() => {
                    if (isSpeaking) stopAudio();
                    else if (currentDeck) speakText(currentDeck.speechText);
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{isSpeaking ? '⏸️' : '🔊'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => { stopAudio(); setVisualVisible(false); }}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Deck Title */}
            <View style={styles.deckTitleBox}>
              <Text style={styles.deckTitleText}>{currentDeck?.title}</Text>
            </View>

            {/* Step Navigator Tabs */}
            <View style={styles.stepTabsRow}>
              {currentDeck?.steps.map((step, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.stepTab,
                    activeStep === idx && { backgroundColor: step.badgeColor + '33', borderColor: step.badgeColor }
                  ]}
                  onPress={() => setActiveStep(idx)}
                >
                  <Text style={[styles.stepTabText, activeStep === idx && { color: step.badgeColor, fontWeight: 'bold' }]}>
                    Step {step.stepNum}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Active Step Visual Slide */}
            <ScrollView style={styles.visualSlideArea} contentContainerStyle={{ paddingBottom: 20 }}>
              {currentDeck && currentDeck.steps[activeStep] && (
                <View style={[styles.slideCard, { borderColor: currentDeck.steps[activeStep].badgeColor }]}>
                  <View style={styles.slideHeader}>
                    <Text style={{ fontSize: 32 }}>{currentDeck.steps[activeStep].icon}</Text>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={[styles.slideBadge, { color: currentDeck.steps[activeStep].badgeColor }]}>
                        STEP {currentDeck.steps[activeStep].stepNum} OF {currentDeck.steps.length}
                      </Text>
                      <Text style={styles.slideTitle}>{currentDeck.steps[activeStep].title}</Text>
                    </View>
                  </View>

                  <View style={styles.slideDivider} />

                  <Text style={styles.slideBody}>
                    {currentDeck.steps[activeStep].body}
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Slide Navigation Buttons */}
            <View style={styles.slideNavRow}>
              <TouchableOpacity
                style={[styles.navBtn, activeStep === 0 && { opacity: 0.3 }]}
                disabled={activeStep === 0}
                onPress={() => setActiveStep(prev => Math.max(0, prev - 1))}
              >
                <Text style={styles.navBtnText}>◀ Previous</Text>
              </TouchableOpacity>

              <Text style={{ color: '#aaa', fontWeight: 'bold', fontSize: 13 }}>
                {activeStep + 1} / {currentDeck?.steps.length || 1}
              </Text>

              <TouchableOpacity
                style={[styles.navBtn, activeStep === (currentDeck?.steps.length || 1) - 1 && { opacity: 0.3 }]}
                disabled={activeStep === (currentDeck?.steps.length || 1) - 1}
                onPress={() => setActiveStep(prev => Math.min((currentDeck?.steps.length || 1) - 1, prev + 1))}
              >
                <Text style={styles.navBtnText}>Next ▶</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // ─── FAB ───

  fab: {
    position: 'absolute',
    bottom: 105,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff00ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 9999,
  },
  fabIcon: {
    fontSize: 28,
  },
  fabBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#00ffff',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
  fabBadgeText: {
    color: '#000',
    fontSize: 8,
    fontWeight: '900',
  },

  // ─── Modal ───
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0a0a14',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '85%',
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 255, 0.2)',
    borderBottomWidth: 0,
    overflow: 'hidden',
  },

  // ─── Header ───
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  headerStatus: {
    color: '#00ff44',
    fontSize: 11,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resetBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 16,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,68,68,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // ─── Chat ───
  chatArea: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  welcomeText: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 20,
  },
  quickLabel: {
    color: '#00ffff',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 18,
    marginBottom: 10,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  quickBtn: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff00ff',
    backgroundColor: 'rgba(255,0,255,0.08)',
  },
  quickBtnText: {
    color: '#ff00ff',
    fontSize: 11,
    fontWeight: '600',
  },

  // ─── Bubbles ───
  bubble: {
    maxWidth: '85%',
    padding: 11,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.25)',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 20,
  },
  userText: {
    color: '#00ffff',
  },
  botText: {
    color: '#fff',
  },

  // ─── Input ───
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
    maxHeight: 80,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  uploadBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: '#ff00ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,255,255,0.05)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,255,255,0.2)',
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  removeImageBtn: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,68,68,0.2)',
  },
  chatBubbleImage: {
    width: 200,
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff00ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // ─── Visual Explanation & Sound Styles ───
  visualBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff00ff',
    backgroundColor: 'rgba(255,0,255,0.15)',
    alignSelf: 'flex-start',
  },
  visualBtnText: {
    color: '#ff00ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  visualOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  visualCard: {
    width: '100%',
    maxWidth: 550,
    maxHeight: '85%',
    backgroundColor: '#0a0a14',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#00ffff',
    padding: 20,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  visualHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  visualHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  soundControlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,255,68,0.15)',
    borderWidth: 1,
    borderColor: '#00ff44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitleBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00ffff',
  },
  deckTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  stepTab: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
  },
  stepTabText: {
    color: '#aaa',
    fontSize: 11,
  },
  visualSlideArea: {
    flex: 1,
  },
  slideCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  slideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slideBadge: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  slideTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 2,
  },
  slideDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 12,
  },
  slideBody: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
  },
  slideNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.3)',
  },
  navBtnText: {
    color: '#00ffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});


