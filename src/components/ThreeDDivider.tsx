import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

export const ThreeDDivider: React.FC = () => (
  <div className="h-12 w-full my-8">
    <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Environment preset="city" />
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <boxGeometry args={[8, 0.15, 0.15]} />
          <meshStandardMaterial color="#2563EB" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
    </Canvas>
  </div>
);
