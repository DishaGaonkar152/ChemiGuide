import React, { useRef, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

function Particles() {
  const count = 100;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate random positions and velocities for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 5;
      const vx = (Math.random() - 0.5) * 0.02;
      const vy = (Math.random() - 0.5) * 0.02;
      const vz = (Math.random() - 0.5) * 0.02;
      temp.push({ x, y, z, vx, vy, vz });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Wrap around bounds softly
        if (particle.x > 10) particle.x = -10;
        if (particle.x < -10) particle.x = 10;
        if (particle.y > 15) particle.y = -15;
        if (particle.y < -15) particle.y = 15;

        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.rotation.x += 0.01;
        dummy.rotation.y += 0.01;
        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* A simple geometric shape represents scattered chemical particles/molecules */}
      <icosahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#00ffff" emissive="#0088ff" emissiveIntensity={0.5} wireframe />
    </instancedMesh>
  );
}

export default function ParticleBackground3D() {
  if (Platform.OS === 'web') {
    const { Canvas: WebCanvas } = require('@react-three/fiber');
    return (
      <View style={styles.container}>
        <WebCanvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff00ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00ffff" />
          <Particles />
        </WebCanvas>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00ffff" />
        <Particles />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: '#030303', // Deep dark
  },
});
