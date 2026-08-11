import React, { useRef, useMemo } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';
import { ELECTRON_SHELL_CONFIG } from '../utils/electronConfigurations';

// ════════════════════════════════════════════════════
// SHELL COLORS — each orbit gets a distinct color
// ════════════════════════════════════════════════════
const SHELL_COLORS = [
  '#00ffff', // K shell - cyan
  '#ff00ff', // L shell - magenta
  '#00ff88', // M shell - green
  '#ffaa00', // N shell - orange
  '#4488ff', // O shell - blue
  '#ff4488', // P shell - pink
  '#aaffee', // Q shell - mint
];

// Shell labels for the info panel
const SHELL_LABELS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

// ════════════════════════════════════════════════════
// ELECTRON SHELL — ring + orbiting electrons
// ════════════════════════════════════════════════════
function ElectronShell({
  radius,
  count,
  speed,
  color,
  shellIndex,
}: {
  radius: number;
  count: number;
  speed: number;
  color: string;
  shellIndex: number;
}) {
  const shellRef = useRef<THREE.Group>(null);
  const time = useRef(Math.random() * 100);

  // Evenly space electrons around the shell
  const electronAngles = useMemo(
    () => Array.from({ length: count }, (_, i) => (Math.PI * 2 * i) / count),
    [count]
  );

  // Distinct tilt per shell so orbits aren't all flat
  const tiltX = useMemo(() => {
    const tilts = [0.3, -0.5, 0.7, -0.3, 0.5, -0.7, 0.4];
    return tilts[shellIndex % tilts.length];
  }, [shellIndex]);

  const tiltZ = useMemo(() => {
    const tilts = [0.1, 0.4, -0.3, 0.6, -0.2, 0.5, -0.4];
    return tilts[shellIndex % tilts.length];
  }, [shellIndex]);

  useFrame((_, delta) => {
    time.current += delta;
    if (shellRef.current) {
      shellRef.current.rotation.y += speed * delta;
      shellRef.current.rotation.x = tiltX + Math.sin(time.current * speed * 0.4) * 0.1;
      shellRef.current.rotation.z = tiltZ + Math.cos(time.current * speed * 0.4) * 0.1;
    }
  });

  // Scale electron size based on shell count (smaller for crowded shells)
  const electronSize = Math.max(0.08, 0.2 - count * 0.004);

  return (
    <group ref={shellRef}>
      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.015, radius + 0.015, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Electrons */}
      {electronAngles.map((angle, idx) => (
        <mesh key={idx} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
          <sphereGeometry args={[electronSize, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

// ════════════════════════════════════════════════════
// NUCLEUS — proton/neutron cluster
// ════════════════════════════════════════════════════
function Nucleus({ protons, color }: { protons: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.3;
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  // Use Fibonacci sphere distribution for nucleons
  const particles = useMemo(() => {
    const result: [number, number, number][] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    // Total nucleons ≈ protons * 2 for visual representation, capped
    const nucleonCount = Math.min(protons, 40); // Cap visual nucleons for performance
    const clumpRadius = Math.min(0.55, 0.15 + 0.04 * Math.pow(nucleonCount, 0.45));
    
    for (let i = 0; i < nucleonCount; i++) {
      if (nucleonCount === 1) {
        result.push([0, 0, 0]);
        break;
      }
      const y = 1 - (i / (nucleonCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const jitter = 0.6 + ((i * 47) % 50) / 125;
      
      result.push([
        Math.cos(theta) * r * clumpRadius * jitter,
        y * clumpRadius * jitter,
        Math.sin(theta) * r * clumpRadius * jitter,
      ]);
    }
    return result;
  }, [protons]);

  const particleRadius = Math.max(0.06, 0.18 - protons * 0.001);

  return (
    <group ref={groupRef}>
      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[Math.min(0.65, 0.2 + protons * 0.004), 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.3} />
      </mesh>
      {/* Individual nucleons */}
      {particles.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[particleRadius, 10, 10]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? color : '#ff6666'}
            emissive={idx % 2 === 0 ? color : '#ff6666'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ════════════════════════════════════════════════════
// ATOM SCENE — assembles nucleus + shells
// ════════════════════════════════════════════════════
interface AtomSceneProps {
  atomicNumber: number;
  nucleusColor?: string;
}

function AtomScene({ atomicNumber, nucleusColor = '#ff00ff' }: AtomSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  // Get the correct electron shell configuration for this element
  const shellConfig = ELECTRON_SHELL_CONFIG[atomicNumber] || [atomicNumber];

  // Calculate camera-appropriate base radius based on number of shells
  const numShells = shellConfig.length;
  const baseRadius = numShells <= 2 ? 1.4 : numShells <= 4 ? 1.2 : 1.0;
  const shellSpacing = numShells <= 3 ? 0.85 : numShells <= 5 ? 0.7 : 0.6;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={1.2} />
      <pointLight position={[-8, -8, -8]} intensity={0.6} color="#0088ff" />

      {/* Nucleus — proton count = atomic number */}
      <Nucleus protons={atomicNumber} color={nucleusColor} />

      {/* Electron shells */}
      {shellConfig.map((electronCount, idx) => {
        if (electronCount === 0) return null;
        return (
          <ElectronShell
            key={idx}
            shellIndex={idx}
            radius={baseRadius + idx * shellSpacing}
            count={electronCount}
            speed={1.2 - idx * 0.12}
            color={SHELL_COLORS[idx % SHELL_COLORS.length]}
          />
        );
      })}
    </group>
  );
}

// ════════════════════════════════════════════════════
// MAIN EXPORT — renders 3D canvas + info panel
// ════════════════════════════════════════════════════
interface AtomModel3DProps {
  atomicNumber: number;
  electronCount?: number; // kept for backward compat, prefer atomicNumber
  nucleusColor?: string;
  electronColor?: string;
  showInfo?: boolean;
}

export default function AtomModel3D({
  atomicNumber,
  electronCount,
  nucleusColor = '#ff00ff',
  showInfo = true,
}: AtomModel3DProps) {
  const z = atomicNumber || electronCount || 1;
  const shellConfig = ELECTRON_SHELL_CONFIG[z] || [z];
  
  // Dynamic camera position based on number of shells
  const numShells = shellConfig.length;
  const camZ = numShells <= 2 ? 6 : numShells <= 4 ? 7 : numShells <= 5 ? 8 : 9;

  const renderCanvas = (CanvasComponent: any) => (
    <CanvasComponent camera={{ position: [0, 0, camZ], fov: 50 }}>
      <AtomScene atomicNumber={z} nucleusColor={nucleusColor} />
    </CanvasComponent>
  );

  return (
    <View style={styles.container}>
      {/* 3D Canvas */}
      <View style={styles.canvasWrapper}>
        {Platform.OS === 'web'
          ? (() => {
              const { Canvas: WebCanvas } = require('@react-three/fiber');
              return renderCanvas(WebCanvas);
            })()
          : renderCanvas(Canvas)}
      </View>

      {/* Shell info panel */}
      {showInfo && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>Electron Configuration</Text>
          <View style={styles.shellsRow}>
            {shellConfig.map((count, idx) => (
              <View key={idx} style={styles.shellBadge}>
                <View style={[styles.shellDot, { backgroundColor: SHELL_COLORS[idx % SHELL_COLORS.length] }]} />
                <Text style={[styles.shellLabel, { color: SHELL_COLORS[idx % SHELL_COLORS.length] }]}>
                  {SHELL_LABELS[idx]}
                </Text>
                <Text style={styles.shellCount}>{count}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.protonInfo}>
            Protons: {z} {'  '}|{'  '} Electrons: {shellConfig.reduce((a, b) => a + b, 0)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  canvasWrapper: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  // ─── Info Panel ───
  infoPanel: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  infoTitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  shellsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  shellBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  shellDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  shellLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  shellCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '700',
  },
  protonInfo: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    marginTop: 8,
    letterSpacing: 1,
  },
});
