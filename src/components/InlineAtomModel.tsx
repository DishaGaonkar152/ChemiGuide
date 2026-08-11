import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AtomModel3D from './AtomModel3D';

interface InlineAtomModelProps {
  atomicNumber: number;
  elementName: string;
  elementSymbol: string;
  caption?: string;
  color?: string;
  height?: number;
}

/**
 * A self-contained inline 3D atom viewer for embedding in topic pages.
 * Shows the element name, a contained 3D model, and an optional caption.
 */
export default function InlineAtomModel({
  atomicNumber,
  elementName,
  elementSymbol,
  caption,
  color = '#00ffff',
  height = 340,
}: InlineAtomModelProps) {
  return (
    <View style={[styles.wrapper, { borderColor: color, shadowColor: color }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{elementSymbol}</Text>
        </View>
        <View>
          <Text style={[styles.elementName, { color }]}>{elementName}</Text>
          <Text style={styles.atomicNum}>Z = {atomicNumber}</Text>
        </View>
      </View>

      {/* 3D Model */}
      <View style={[styles.modelContainer, { height }]}>
        <AtomModel3D
          atomicNumber={atomicNumber}
          nucleusColor={color}
          showInfo={true}
        />
      </View>

      {/* Caption */}
      {caption && (
        <Text style={styles.caption}>{caption}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: 'rgba(5, 5, 18, 0.9)',
    borderRadius: 20,
    borderWidth: 1.5,
    marginVertical: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 8,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  elementName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  atomicNum: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 2,
  },
  modelContainer: {
    width: '100%',
    marginVertical: 4,
  },
  caption: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    lineHeight: 18,
  },
});
