import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Text3D, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const FONT_URL = 'https://unpkg.com/three@0.158.0/examples/fonts/helvetiker_bold.typeface.json';

const ZenvexLogo: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group} position={[-2.5, 0, 0]}>
      <Text3D font={FONT_URL} size={1} height={0.2} bevelEnabled bevelSize={0.05}>
        ZENVEX
        <meshStandardMaterial color="#3B82F6" roughness={0.2} metalness={0.8} />
      </Text3D>
    </group>
  );
};

export const ImmersiveHero: React.FC = () => (
  <div className="w-full h-screen bg-slate-950">
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <Environment preset="city" />

      <PresentationControls snap global zoom={0.8} polar={[-Math.PI / 4, Math.PI / 4]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <ZenvexLogo />
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={20} blur={2} />
    </Canvas>
  </div>
);
