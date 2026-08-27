import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import { FlowchartNode } from '../constants/learningActivities';

interface FlowchartProps {
  data: FlowchartNode;
  color: string;
}

// Count total nodes recursively
const countNodes = (node: FlowchartNode): number => {
  let count = 1;
  if (node.children) {
    node.children.forEach((child) => {
      count += countNodes(child);
    });
  }
  return count;
};

// Collect all nodes flat for detailed view
const flattenNodes = (node: FlowchartNode, depth = 0): { node: FlowchartNode; depth: number }[] => {
  let result: { node: FlowchartNode; depth: number }[] = [{ node, depth }];
  if (node.children) {
    node.children.forEach((child) => {
      result = result.concat(flattenNodes(child, depth + 1));
    });
  }
  return result;
};

// Depth colors for visual hierarchy
const DEPTH_COLORS = [
  '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#9b59b6',
  '#e67e22', '#1abc9c', '#e74c3c',
];

export default function InteractiveFlowchart({ data, color }: FlowchartProps) {
  const [selectedNode, setSelectedNode] = useState<FlowchartNode>(data);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([data.id]));
  const totalNodes = countNodes(data);

  // ─── DRAG / PAN STATE ───
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const lastPan = useRef({ x: 0, y: 0 });
  const scale = useRef(new Animated.Value(1)).current;
  const currentScale = useRef(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Store the current animated value
        lastPan.current = {
          x: (pan.x as any)._value || 0,
          y: (pan.y as any)._value || 0,
        };
      },
      onPanResponderMove: (_, gestureState) => {
        pan.x.setValue(lastPan.current.x + gestureState.dx);
        pan.y.setValue(lastPan.current.y + gestureState.dy);
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  // Toggle expand/collapse
  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  // Expand all nodes
  const expandAll = useCallback(() => {
    const allIds = flattenNodes(data).map((item) => item.node.id);
    setExpandedNodes(new Set(allIds));
  }, [data]);

  // Collapse all nodes
  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set([data.id]));
  }, [data]);

  // Reset position
  const resetPosition = useCallback(() => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    lastPan.current = { x: 0, y: 0 };
  }, [pan]);

  // Zoom in/out
  const zoomIn = useCallback(() => {
    currentScale.current = Math.min(currentScale.current + 0.2, 2.5);
    Animated.spring(scale, {
      toValue: currentScale.current,
      useNativeDriver: false,
    }).start();
  }, [scale]);

  const zoomOut = useCallback(() => {
    currentScale.current = Math.max(currentScale.current - 0.2, 0.4);
    Animated.spring(scale, {
      toValue: currentScale.current,
      useNativeDriver: false,
    }).start();
  }, [scale]);

  // ─── PDF GENERATION ───
  const generatePDF = useCallback(() => {
    if (Platform.OS === 'web') {
      const allNodes = flattenNodes(data);
      
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Flowchart: ${data.label}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0a1a;
      color: #ffffff;
      padding: 40px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid ${color};
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 900;
      color: ${color};
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    
    .header p {
      color: rgba(255,255,255,0.6);
      font-size: 16px;
    }
    
    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin: 20px 0 40px;
    }
    
    .stat-box {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 16px 24px;
      text-align: center;
    }
    
    .stat-box .value {
      font-size: 28px;
      font-weight: 900;
      color: ${color};
    }
    
    .stat-box .label {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    
    .node {
      margin: 12px 0;
      border-left: 3px solid;
      padding: 16px 20px;
      background: rgba(255,255,255,0.03);
      border-radius: 0 12px 12px 0;
      page-break-inside: avoid;
    }
    
    .node-label {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 6px;
    }
    
    .node-desc {
      color: rgba(255,255,255,0.7);
      font-size: 14px;
      line-height: 1.6;
    }
    
    .depth-0 { margin-left: 0px; }
    .depth-1 { margin-left: 30px; }
    .depth-2 { margin-left: 60px; }
    .depth-3 { margin-left: 90px; }
    .depth-4 { margin-left: 120px; }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.3);
      font-size: 12px;
    }
    
    @media print {
      body { background: white; color: #1a1a2e; padding: 20px; }
      .node { background: #f8f9fa; border-radius: 0 8px 8px 0; }
      .node-desc { color: #555; }
      .header { border-bottom-color: #333; }
      .header h1 { color: #1a1a2e; }
      .header p { color: #777; }
      .stat-box { background: #f0f0f0; border-color: #ddd; }
      .stat-box .value { color: #1a1a2e; }
      .stat-box .label { color: #888; }
      .footer { color: #aaa; border-top-color: #ddd; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 ${data.label}</h1>
    <p>${data.description}</p>
  </div>
  
  <div class="stats">
    <div class="stat-box">
      <div class="value">${totalNodes}</div>
      <div class="label">Total Concepts</div>
    </div>
    <div class="stat-box">
      <div class="value">${data.children?.length || 0}</div>
      <div class="label">Main Branches</div>
    </div>
  </div>
  
  ${allNodes.map((item, index) => {
    const depthColor = DEPTH_COLORS[item.depth % DEPTH_COLORS.length];
    return `
    <div class="node depth-${Math.min(item.depth, 4)}" style="border-left-color: ${depthColor}">
      <div class="node-label" style="color: ${depthColor}">
        ${'  '.repeat(item.depth)}${item.depth > 0 ? '↳ ' : '📌 '}${item.node.label}
      </div>
      <div class="node-desc">${item.node.description}</div>
    </div>`;
  }).join('\n')}
  
  <div class="footer">
    <p>Generated by ChemiGuide • Detailed Concept Flowchart • ${new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    }
  }, [data, color, totalNodes]);

  // ─── RENDER NODE (Recursive, Detailed) ───
  const renderNode = (node: FlowchartNode, depth = 0) => {
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const depthColor = DEPTH_COLORS[depth % DEPTH_COLORS.length];
    const childCount = hasChildren ? countNodes(node) - 1 : 0;

    return (
      <View key={node.id} style={styles.nodeWrapper}>
        <View style={styles.nodeRow}>
          {/* Connecting Branch Lines */}
          {depth > 0 && (
            <View style={styles.branchContainer}>
              <View style={[styles.horizontalLine, { borderColor: depthColor, opacity: 0.4 }]} />
            </View>
          )}

          {/* Actual Node Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setSelectedNode(node);
              if (hasChildren) toggleNode(node.id);
            }}
            style={[
              styles.nodeButton,
              {
                borderColor: isSelected ? color : `${depthColor}44`,
                backgroundColor: isSelected
                  ? `${color}15`
                  : depth === 0
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(10, 10, 25, 0.7)',
                shadowColor: isSelected ? color : 'transparent',
                borderLeftWidth: 3,
                borderLeftColor: depthColor,
              },
            ]}
          >
            {/* Depth indicator dot */}
            <View style={[styles.depthDot, { backgroundColor: depthColor }]} />

            <View style={styles.nodeLabelContainer}>
              <Text
                style={[
                  styles.nodeLabel,
                  {
                    color: isSelected ? color : '#ffffff',
                    fontSize: depth === 0 ? 15 : 13.5,
                    fontWeight: depth === 0 ? '900' : '700',
                  },
                ]}
              >
                {node.label}
              </Text>
              {/* Show description preview inline */}
              <Text
                style={[styles.nodeDescPreview, { color: `${depthColor}aa` }]}
                numberOfLines={1}
              >
                {node.description}
              </Text>
            </View>

            {/* Child count badge & expand arrow */}
            <View style={styles.nodeTrailing}>
              {hasChildren && (
                <View style={[styles.childBadge, { backgroundColor: `${depthColor}30` }]}>
                  <Text style={[styles.childBadgeText, { color: depthColor }]}>
                    {childCount}
                  </Text>
                </View>
              )}
              {hasChildren && (
                <Text
                  style={[
                    styles.expandIndicator,
                    {
                      color: isSelected ? color : 'rgba(255,255,255,0.3)',
                      transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                    },
                  ]}
                >
                  ▼
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Children Rendered Vertically Indented */}
        {hasChildren && isExpanded && (
          <View style={[styles.childrenContainer, { borderLeftColor: `${depthColor}33` }]}>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ─── TOOLBAR ─── */}
      <View style={styles.toolbar}>
        <View style={styles.toolbarLeft}>
          <TouchableOpacity onPress={expandAll} style={[styles.toolBtn, { borderColor: `${color}40` }]}>
            <Text style={[styles.toolBtnText, { color }]}>⊞ Expand All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={collapseAll} style={[styles.toolBtn, { borderColor: `${color}40` }]}>
            <Text style={[styles.toolBtnText, { color }]}>⊟ Collapse</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.toolbarRight}>
          <TouchableOpacity onPress={zoomOut} style={[styles.zoomBtn, { borderColor: `${color}40` }]}>
            <Text style={[styles.zoomBtnText, { color }]}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetPosition} style={[styles.zoomBtn, { borderColor: `${color}40` }]}>
            <Text style={[styles.zoomBtnText, { color }]}>⊙</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={zoomIn} style={[styles.zoomBtn, { borderColor: `${color}40` }]}>
            <Text style={[styles.zoomBtnText, { color }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── STATS BAR ─── */}
      <View style={styles.statsBar}>
        <View style={[styles.statChip, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
          <Text style={[styles.statValue, { color }]}>{totalNodes}</Text>
          <Text style={styles.statLabel}>concepts</Text>
        </View>
        <View style={[styles.statChip, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
          <Text style={[styles.statValue, { color }]}>{data.children?.length || 0}</Text>
          <Text style={styles.statLabel}>branches</Text>
        </View>
        <View style={[styles.statChip, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
          <Text style={[styles.statValue, { color }]}>{expandedNodes.size}</Text>
          <Text style={styles.statLabel}>expanded</Text>
        </View>
      </View>

      <Text style={styles.instructionText}>
        👆 Tap nodes to explore • Drag to move • Use +/− to zoom
      </Text>

      {/* ─── MOVABLE FLOWCHART AREA ─── */}
      <View style={styles.flowchartViewport}>
        <Animated.View
          style={[
            styles.movableContainer,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale: scale },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            nestedScrollEnabled={true}
          >
            <View style={styles.treeContainer}>{renderNode(data)}</View>
          </ScrollView>
        </Animated.View>
      </View>

      {/* ─── DETAIL DISPLAY PANEL ─── */}
      <View style={[styles.detailPanel, { borderColor: color, shadowColor: color }]}>
        <View style={[styles.glowBar, { backgroundColor: color }]} />
        <View style={styles.detailHeader}>
          <View style={[styles.detailDot, { backgroundColor: color }]} />
          <Text style={[styles.detailTitle, { color }]}>
            {selectedNode.label.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.detailDesc}>{selectedNode.description}</Text>
        {selectedNode.children && selectedNode.children.length > 0 && (
          <View style={styles.detailChildren}>
            <Text style={styles.detailChildrenLabel}>
              📂 Sub-concepts ({selectedNode.children.length}):
            </Text>
            {selectedNode.children.map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => {
                  setSelectedNode(child);
                  setExpandedNodes((prev) => new Set([...prev, child.id]));
                }}
                style={styles.detailChildItem}
              >
                <Text style={[styles.detailChildDot, { color }]}>●</Text>
                <View style={styles.detailChildContent}>
                  <Text style={[styles.detailChildName, { color }]}>{child.label}</Text>
                  <Text style={styles.detailChildDesc} numberOfLines={1}>
                    {child.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* ─── DOWNLOAD PDF BUTTON ─── */}
      {Platform.OS === 'web' && (
        <TouchableOpacity
          onPress={generatePDF}
          activeOpacity={0.8}
          style={[styles.pdfButton, { backgroundColor: `${color}20`, borderColor: `${color}50` }]}
        >
          <Text style={styles.pdfButtonEmoji}>📄</Text>
          <View>
            <Text style={[styles.pdfButtonText, { color }]}>Download PDF</Text>
            <Text style={styles.pdfButtonSubtext}>
              Detailed flowchart with all {totalNodes} concepts
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },

  // ── Toolbar ──
  toolbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  toolbarLeft: {
    flexDirection: 'row',
    gap: 6,
  },
  toolbarRight: {
    flexDirection: 'row',
    gap: 4,
  },
  toolBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  toolBtnText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  zoomBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnText: {
    fontSize: 18,
    fontWeight: '700',
  },

  // ── Stats Bar ──
  statsBar: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
  },

  instructionText: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 11.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
  },

  // ── Movable Viewport ──
  flowchartViewport: {
    width: '100%',
    backgroundColor: 'rgba(5, 5, 15, 0.5)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    overflow: 'hidden',
    minHeight: 350,
    maxHeight: 450,
  },
  movableContainer: {
    minWidth: '100%',
    padding: 16,
  },
  scrollContainer: {
    alignItems: 'flex-start',
    paddingRight: 40,
    paddingBottom: 20,
  },
  treeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  // ── Nodes ──
  nodeWrapper: {
    alignItems: 'flex-start',
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  branchContainer: {
    width: 18,
    height: 2,
    justifyContent: 'center',
  },
  horizontalLine: {
    width: '100%',
    borderBottomWidth: 2,
  },
  nodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
    maxWidth: 340,
  },
  depthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  nodeLabelContainer: {
    flex: 1,
    flexShrink: 1,
  },
  nodeLabel: {
    letterSpacing: 0.3,
  },
  nodeDescPreview: {
    fontSize: 10.5,
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  nodeTrailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  childBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  childBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  expandIndicator: {
    fontSize: 9,
  },
  childrenContainer: {
    borderLeftWidth: 2,
    marginLeft: 22,
    paddingLeft: 4,
  },

  // ── Detail Panel ──
  detailPanel: {
    width: '100%',
    backgroundColor: 'rgba(10, 10, 25, 0.85)',
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
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
    height: 3,
    opacity: 0.8,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  detailTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
    flex: 1,
  },
  detailDesc: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 14.5,
    lineHeight: 22,
    marginBottom: 4,
  },
  detailChildren: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 12,
  },
  detailChildrenLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  detailChildItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  detailChildDot: {
    fontSize: 8,
    marginTop: 4,
  },
  detailChildContent: {
    flex: 1,
  },
  detailChildName: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  detailChildDesc: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  // ── PDF Button ──
  pdfButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginTop: 16,
  },
  pdfButtonEmoji: {
    fontSize: 28,
  },
  pdfButtonText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pdfButtonSubtext: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
    marginTop: 2,
  },
});
