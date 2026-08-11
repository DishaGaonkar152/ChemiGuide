import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { Audio } from 'expo-av';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Cylinder, Sphere, MeshDistortMaterial, Sparkles } from '@react-three/drei/native';
import * as THREE from 'three';

const { width } = Dimensions.get('window');

// --- 3D COMPONENTS ---

function Beaker3D({ isReacting }: { isReacting: boolean }) {
  // Beaker glass
  return (
    <group position={[0, -1, 0]}>
      {/* Glass outline */}
      <Cylinder args={[1.6, 1.6, 3, 32]} position={[0, 1.5, 0]}>
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          roughness={0.1} 
          transmission={0.9} 
          thickness={0.5} 
          color="#aaddff" 
        />
      </Cylinder>
      {/* Liquid inside */}
      <Cylinder args={[1.5, 1.5, 2, 32]} position={[0, 1, 0]}>
        <MeshDistortMaterial
          color={isReacting ? "#ff00ff" : "#00ffff"} // Turns magenta when reacting (Base)
          speed={isReacting ? 5 : 1}
          distort={isReacting ? 0.4 : 0.1}
          transparent
          opacity={0.8}
        />
      </Cylinder>
      {/* Particles/Sparks when reacting */}
      {isReacting && (
        <Sparkles count={100} scale={3} size={15} speed={2} color="#ffaa00" position={[0, 2.5, 0]} />
      )}
    </group>
  );
}

function DroppedSodium({ isReacting }: { isReacting: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isReacting) {
        // Frantic bouncing
        meshRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 20) * 0.3;
        meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 15) * 0.5;
        meshRef.current.rotation.x += delta * 10;
        meshRef.current.rotation.y += delta * 15;
      }
    }
  });

  if (!isReacting) return null;

  return (
    <Sphere ref={meshRef} args={[0.3, 16, 16]} position={[0, 2.5, 0]}>
      <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} emissive="#ff4400" emissiveIntensity={2} />
    </Sphere>
  );
}


// --- 2D DRAGGABLE COMPONENT ---

interface DraggableChemicalProps {
  name: string;
  symbol: string;
  onDrop: (x: number, y: number) => void;
  color: string;
}

function DraggableChemical({ name, symbol, onDrop, color }: DraggableChemicalProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const pan = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.2);
    })
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onFinalize((event) => {
      runOnJS(onDrop)(event.absoluteX, event.absoluteY);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: translateX.value !== 0 ? 100 : 1,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.dragItem, { borderColor: color, shadowColor: color }, rStyle]}>
        <Text style={[styles.dragSymbol, { color }]}>{symbol}</Text>
        <Text style={styles.dragName}>{name}</Text>
      </Animated.View>
    </GestureDetector>
  );
}


// --- MAIN SANDBOX COMPONENT ---

export default function VirtualLabSandbox() {
  const [reactionState, setReactionState] = useState<'idle' | 'reacting'>('idle');
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Load sound effect
  async function playReactionSound() {
    try {
      // Using a remote URL for a sizzling/explosion sound
      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_b2f90a21eb.mp3?filename=explosion-91872.mp3' },
        { shouldPlay: true }
      );
      setSound(audioSound);
    } catch (error) {
      console.log('Error playing sound', error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleDrop = (x: number, y: number) => {
    // Basic hit detection: If dropped roughly in the lower half of the screen
    const screenHeight = Dimensions.get('window').height;
    
    if (y > screenHeight * 0.4) {
      triggerReaction();
    }
  };

  const triggerReaction = () => {
    if (reactionState === 'reacting') return;
    
    setReactionState('reacting');
    playReactionSound();

    // Reset after 4 seconds
    setTimeout(() => {
      setReactionState('idle');
    }, 4000);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.sectionEmoji}>🧪</Text>
        <Text style={styles.sectionTitle}>Sandbox Lab</Text>
        <Text style={styles.sectionSubtitle}>Drag the Sodium (Na) into the beaker!</Text>
      </View>

      {/* DRAG ROW */}
      <View style={styles.dragRow}>
        <DraggableChemical name="Sodium" symbol="Na" color="#ffaa00" onDrop={handleDrop} />
        {/* Can add more chemicals here later */}
      </View>

      {/* 3D CANVAS AREA (DROP ZONE) */}
      <View style={styles.canvasContainer}>
        {reactionState === 'idle' && (
          <Text style={styles.dropZoneText}>Drop chemicals here 👇</Text>
        )}
        {reactionState === 'reacting' && (
          <View style={styles.reactionInfo}>
            <Text style={styles.reactionEq}>2Na + 2H₂O → 2NaOH + H₂</Text>
            <Text style={styles.reactionFact}>Highly EXOTHERMIC! Hydrogen gas catches fire!</Text>
          </View>
        )}

        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          {reactionState === 'reacting' && (
             <pointLight position={[0, 2, 0]} intensity={5} color="#ff4400" />
          )}
          
          <Beaker3D isReacting={reactionState === 'reacting'} />
          <DroppedSodium isReacting={reactionState === 'reacting'} />
        </Canvas>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(20, 20, 30, 0.7)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    height: 550, // Fixed height for the sandbox
    marginBottom: 30,
  },
  headerBox: {
    alignItems: 'center',
    paddingTop: 20,
  },
  sectionEmoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#00ffff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dragRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    zIndex: 10,
  },
  dragItem: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  dragSymbol: {
    fontSize: 24,
    fontWeight: '900',
  },
  dragName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    margin: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  dropZoneText: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.2)',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 1,
    pointerEvents: 'none',
  },
  reactionInfo: {
    position: 'absolute',
    top: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
    pointerEvents: 'none',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
  },
  reactionEq: {
    color: '#00ffff',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 5,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  reactionFact: {
    color: '#ffaa00',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
