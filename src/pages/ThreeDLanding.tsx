import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

// 3D Interactive Button
const ThreeDButton: React.FC<{ label: string; position: [number, number, number]; onClick: () => void }> = ({ label, position, onClick }) => {
  const [hover, setHover] = useState(false);
  const [tap, setTap] = useState(false);

  return (
    <group
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => setTap(true)}
      onPointerUp={() => { setTap(false); onClick(); }}
    >
      <mesh>
        <boxGeometry args={[1.5, 0.5, 0.3]} />
        <meshStandardMaterial color={hover ? "#3B82F6" : "#2563EB"} roughness={0.3} metalness={0.7} />
      </mesh>
      <Text position={[0, 0, 0.16]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
};

// Camera Controller for Parallax
const CameraParallax = () => {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// Scene Component
const Scene: React.FC = () => (
  <>
    <PerspectiveCamera makeDefault position={[0, 0, 6]} />
    <CameraParallax />
    <Environment preset="city" />
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.1} />
      </mesh>
    </Float>

    <ThreeDButton label="Shop Now" position={[0, -2, 0]} onClick={() => console.log('Clicked!')} />
    
    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
  </>
);

export const ThreeDLanding: React.FC = () => (
  <div className="w-full h-screen bg-slate-950">
    <Canvas shadows>
      <Scene />
    </Canvas>
  </div>
);
