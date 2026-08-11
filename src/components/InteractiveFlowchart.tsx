import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FlowchartNode } from '../constants/learningActivities';

interface FlowchartProps {
  data: FlowchartNode;
  color: string;
}

export default function InteractiveFlowchart({ data, color }: FlowchartProps) {
  const [selectedNode, setSelectedNode] = useState<FlowchartNode>(data);

  // Helper to render tree nodes recursively
  const renderNode = (node: FlowchartNode, depth = 0, isLast = false) => {
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <View key={node.id} style={styles.nodeWrapper}>
        <View style={styles.nodeRow}>
          {/* Connecting Branch Lines */}
          {depth > 0 && (
            <View style={styles.branchContainer}>
              <View style={[styles.horizontalLine, { borderColor: 'rgba(255,255,255,0.15)' }]} />
            </View>
          )}

          {/* Actual Node Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedNode(node)}
            style={[
              styles.nodeButton,
              {
                borderColor: isSelected ? color : 'rgba(255,255,255,0.12)',
                backgroundColor: isSelected ? 'rgba(255,255,255,0.05)' : 'rgba(10, 10, 25, 0.7)',
                shadowColor: isSelected ? color : 'transparent',
              },
            ]}
          >
            <Text style={[styles.nodeLabel, { color: isSelected ? color : '#ffffff' }]}>
              {node.label}
            </Text>
            {hasChildren && (
              <Text style={[styles.expandIndicator, { color: isSelected ? color : 'rgba(255,255,255,0.3)' }]}>
                ▼
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Children Rendered Vertically Indented */}
        {hasChildren && (
          <View style={[styles.childrenContainer, { borderLeftColor: 'rgba(255,255,255,0.12)' }]}>
            {node.children!.map((child, index) =>
              renderNode(child, depth + 1, index === node.children!.length - 1)
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Tap any node to view detailed concepts and relationships
      </Text>

      {/* ─── CONCEPT DIAGRAM SCROLL VIEW ─── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <View style={styles.treeContainer}>
          {renderNode(data)}
        </View>
      </ScrollView>

      {/* ─── DETAIL DISPLAY PANEL ─── */}
      <View style={[styles.detailPanel, { borderColor: color, shadowColor: color }]}>
        <View style={[styles.glowBar, { backgroundColor: color }]} />
        <Text style={[styles.detailTitle, { color }]}>
          {selectedNode.label.toUpperCase()}
        </Text>
        <Text style={styles.detailDesc}>
          {selectedNode.description}
        </Text>
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
  instructionText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  scrollView: {
    width: '100%',
    backgroundColor: 'rgba(5, 5, 15, 0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 16,
    maxHeight: 320,
  },
  scrollContainer: {
    alignItems: 'flex-start',
    paddingRight: 30,
    paddingBottom: 10,
  },
  treeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nodeWrapper: {
    alignItems: 'flex-start',
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  branchContainer: {
    width: 20,
    height: 2,
    justifyContent: 'center',
  },
  horizontalLine: {
    width: '100%',
    borderBottomWidth: 1.5,
  },
  nodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    gap: 8,
  },
  nodeLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  expandIndicator: {
    fontSize: 9,
  },
  childrenContainer: {
    borderLeftWidth: 1.5,
    marginLeft: 26,
    paddingLeft: 4,
  },
  detailPanel: {
    width: '100%',
    backgroundColor: 'rgba(10, 10, 25, 0.85)',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 22,
    marginTop: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  glowBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    opacity: 0.8,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
    textShadowRadius: 6,
  },
  detailDesc: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 15.5,
    lineHeight: 24,
  },
});
