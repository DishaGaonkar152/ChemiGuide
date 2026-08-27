import React from 'react';
import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from 'react-native';
import TopicActivities from './TopicActivities';

interface DetailScreenLayoutProps {
  title: string;
  children: React.ReactNode;
  color?: string;
  emoji?: string;
}

export default function DetailScreenLayout({ title, children, color = '#00ffff', emoji }: DetailScreenLayoutProps) {
  const { height: windowHeight } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* ─── FULL-SCREEN TITLE HERO ─── */}
        <View style={[styles.heroSection, { minHeight: windowHeight * 0.55 }]}>
          <View style={[styles.heroGlass, { borderColor: color, shadowColor: color }]}>
            {emoji && <Text style={styles.heroEmoji}>{emoji}</Text>}
            <Text style={[styles.heroTitle, { color, textShadowColor: color }]}>{title}</Text>
            <View style={[styles.heroDivider, { backgroundColor: color }]} />
            <Text style={styles.heroHint}>Scroll down to learn</Text>
          </View>
        </View>

        {/* ─── CONTENT CARD ─── */}
        <View style={[styles.glassCard, { borderColor: color, shadowColor: color }]}>
          <View style={styles.body}>
            {children}
          </View>
        </View>

        {/* ─── INTERACTIVE ACTIVITIES ─── */}
        <View style={styles.activitiesWrapper}>
          <TopicActivities topicTitle={title} color={color} />
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030308',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 60,
  },

  // ─── HERO ───
  heroSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  heroGlass: {
    backgroundColor: 'rgba(10, 10, 30, 0.7)',
    paddingVertical: 60,
    paddingHorizontal: 40,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    width: '100%',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 12,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    textAlign: 'center',
    letterSpacing: 1,
  },
  heroDivider: {
    height: 2,
    width: 60,
    borderRadius: 1,
    marginVertical: 18,
    opacity: 0.4,
  },
  heroHint: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },

  // ─── CONTENT ───
  glassCard: {
    width: '96%',
    backgroundColor: 'rgba(15, 15, 25, 0.85)',
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 36,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 10,
  },
  body: {
    marginTop: 5,
  },
  heading: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 32,
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  paragraph: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 18,
  },
  bulletPoint: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 12,
    paddingLeft: 18,
  },
  highlight: {
    color: '#00ffff',
    fontWeight: 'bold',
  },
  modelContainer: {
    width: '100%',
    height: 380,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  infoBox: {
    backgroundColor: 'rgba(0, 255, 255, 0.06)',
    borderLeftWidth: 4,
    borderLeftColor: '#00ffff',
    borderRadius: 14,
    padding: 22,
    marginVertical: 20,
  },
  infoBoxText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  activitiesWrapper: {
    width: '96%',
    marginTop: 20,
  },
});
