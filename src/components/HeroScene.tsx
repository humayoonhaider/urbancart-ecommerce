import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Subject representing the brand
const ZenvexSubject = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Primary Body - Cube */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#2563EB" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Secondary - Sphere */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#3B82F6" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Accents - Cylinders */}
      <mesh castShadow position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
        <meshStandardMaterial color="#60A5FA" roughness={0.4} />
      </mesh>
      <mesh castShadow position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
        <meshStandardMaterial color="#60A5FA" roughness={0.4} />
      </mesh>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ZenvexSubject />
        </Float>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      </Canvas>
    </div>
  );
};
