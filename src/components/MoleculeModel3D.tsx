import React, { useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

// Procedurally generate a simple methane (CH4) model for illustration
function MethaneMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.2;
    }
  });

  // Central Carbon Atom
  // 4 Hydrogen Atoms around it
  const cColor = '#ff0000'; // Red for carbon
  const hColor = '#ffffff'; // White for hydrogen
  const bondColor = '#aaaaaa';

  const hPositions = [
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, -1],
    [1, -1, -1],
  ];

  return (
    <group ref={groupRef}>
      {/* Carbon */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={cColor} emissive={cColor} emissiveIntensity={0.2} />
      </mesh>

      {/* Hydrogens and Bonds */}
      {hPositions.map((pos, index) => {
        // Calculate bond cylinder
        const endPoint = new THREE.Vector3(...pos).multiplyScalar(1.5);
        
        return (
          <group key={index}>
            {/* Hydrogen */}
            <mesh position={endPoint.toArray()}>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshStandardMaterial color={hColor} emissive={hColor} emissiveIntensity={0.2} />
            </mesh>
            {/* Bond (using a simple cylinder from origin towards the point) */}
            <mesh position={endPoint.clone().multiplyScalar(0.5).toArray()} lookAt={() => endPoint}>
              {/* Very basic bond representation */}
              <boxGeometry args={[0.1, 0.1, endPoint.length()]} />
              <meshStandardMaterial color={bondColor} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function MoleculeModel3D() {
  if (Platform.OS === 'web') {
    const { Canvas: WebCanvas } = require('@react-three/fiber');
    return (
      <View style={styles.container}>
        <WebCanvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <MethaneMolecule />
        </WebCanvas>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <MethaneMolecule />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
