import React from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import NeonCard from '../../components/NeonCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const TOPICS = [
  {
    title: '⚛ Atomic Structure',
    description: 'Understand isotopes, isobars, and the critical difference between valency and valence electrons.',
    color: '#00ffff',
    href: '/class9/atomic-structure'
  },
  {
    title: '📝 Chemical Formulas',
    description: 'Master the Criss-Cross method and learn to write and name chemical compounds like a pro.',
    color: '#00ff88',
    href: '/class9/chemical-formulas'
  },
  {
    title: '🔢 Mole Concept Basics',
    description: "Your first exposure to chemistry math! Learn about Avogadro's number and molar mass.",
    color: '#ff00ff',
    href: '/class9/mole-concept'
  },
  {
    title: '🔬 Structure of the Atom',
    description: 'Explore the timeline of atomic models: Thomson, Rutherford, and Bohr.',
    color: '#00ff00',
    href: '/class9/atomic-models'
  },
  {
    title: '🧪 Changes & Classification',
    description: 'Master the difference between physical vs chemical changes, and mixtures vs compounds.',
    color: '#ffff00',
    href: '/class9/matter'
  }
];

export default function Class9Screen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* ─── HERO HEADER ─── */}
        <View style={styles.heroSection}>
          <View style={styles.glassHeader}>
            <Text style={styles.classLabel}>CLASS 9</Text>
            <Text style={styles.title}>Chemistry Topics</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>
              Build a strong foundation with the basics of atoms, matter, and chemical mathematics
            </Text>
          </View>
        </View>

        {/* ─── TOPICS ─── */}
        <View style={styles.topicsSection}>
          {TOPICS.map((topic, index) => (
            <View key={index} style={styles.cardWrapper}>
              <NeonCard 
                title={topic.title}
                description={topic.description}
                color={topic.color}
                href={topic.href}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  heroSection: {
    minHeight: SCREEN_HEIGHT * 0.55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  glassHeader: {
    backgroundColor: 'rgba(10, 10, 30, 0.7)',
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 255, 0.25)',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
  },
  classLabel: {
    color: '#ff00ff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginBottom: 10,
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(255, 0, 255, 0.25)',
    width: '40%',
    marginVertical: 20,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  topicsSection: {
    width: '100%',
    paddingHorizontal: 6,
  },
  cardWrapper: {
    marginBottom: 16,
  }
});
