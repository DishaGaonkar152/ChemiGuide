import React, { useState } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function Accordion({ title, children, color = '#ff00ff' }: { title: string, children: React.ReactNode, color?: string }) {
  const [expanded, setExpanded] = useState(false);
  const rotation = useSharedValue(0);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const toggle = () => {
    setExpanded(!expanded);
    rotation.value = withSpring(expanded ? 0 : 45); // rotate + to x
  };

  return (
    <Animated.View style={[styles.container, { borderColor: color }]} layout={LinearTransition}>
      <Pressable onPress={toggle} style={styles.header}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <Animated.Text style={[styles.icon, { color }, iconStyle]}>+</Animated.Text>
      </Pressable>
      
      {expanded && (
        <Animated.View 
          entering={FadeIn.duration(200)} 
          exiting={FadeOut.duration(200)} 
          style={styles.contentContainer}
        >
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  icon: {
    fontSize: 28,
    fontWeight: '300',
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  }
});
