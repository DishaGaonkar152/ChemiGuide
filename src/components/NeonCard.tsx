import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface NeonCardProps {
  title: string;
  description?: string;
  color?: string;
  href?: any;
  onPress?: () => void;
}

export default function NeonCard({ title, description, color = '#00ffff', href, onPress }: NeonCardProps) {
  const content = (
    <View style={[styles.card, { borderColor: color, shadowColor: color }]}>
      <View style={styles.glassHighlight} />
      <Text style={[styles.title, { color, textShadowColor: color }]}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
          {content}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'rgba(15, 15, 15, 0.75)', // Glassmorphism dark background
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  glassHighlight: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    letterSpacing: 1,
  },
  description: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
  },
});
