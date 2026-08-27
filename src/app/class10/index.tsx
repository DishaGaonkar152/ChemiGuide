import React from 'react';
import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from 'react-native';
import NeonCard from '../../components/NeonCard';

const TOPICS = [
  {
    title: '⚗ Chemical Reactions & Equations',
    description: 'Learn how elements interact, balance equations, and understand different types of reactions.',
    color: '#00ffff',
    href: '/class10/reactions'
  },
  {
    title: '💧 Acids, Bases & Salts',
    description: 'Discover the pH scale, indicators, and the chemistry behind everyday substances.',
    color: '#ff00ff',
    href: '/class10/acids-bases'
  },
  {
    title: '⚒ Metals & Non-Metals',
    description: 'Explore the properties, reactivity series, and metallurgy of elements.',
    color: '#00ff44',
    href: '/class10/metals'
  },
  {
    title: '💎 Carbon & Its Compounds',
    description: 'Explore the versatile nature of carbon, covalent bonds, allotropes, and organic nomenclature.',
    color: '#ffff00',
    href: '/class10/carbon'
  },
  {
    title: '📊 Periodic Table & Trends',
    description: 'Understand Mendeleev, modern classification, and the trends of atomic size and valency.',
    color: '#ffaa00',
    href: '/class10/periodic-table'
  }
];

export default function Class10Screen() {
  const { height: windowHeight } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* ─── HERO HEADER ─── */}
        <View style={[styles.heroSection, { minHeight: windowHeight * 0.55 }]}>
          <View style={styles.glassHeader}>
            <Text style={styles.classLabel}>CLASS 10</Text>
            <Text style={styles.title}>Chemistry Topics</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>
              Advance your understanding with reactions, compounds, and the properties of matter
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
    borderColor: 'rgba(0, 255, 100, 0.25)',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#00ff44',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
  },
  classLabel: {
    color: '#00ff44',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginBottom: 10,
    textShadowColor: '#00ff44',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    textShadowColor: '#00ff44',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(0, 255, 100, 0.25)',
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
    paddingHorizontal: 20,
  },
  cardWrapper: {
    marginBottom: 12,
  }
});
