import React from 'react';
import { Text3D, Float } from '@react-three/drei';

const FONT_URL = 'https://unpkg.com/three@0.158.0/examples/fonts/helvetiker_bold.typeface.json';

export const ThreeDNavbar: React.FC = () => {
  return (
    <group position={[0, 4, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Text3D font={FONT_URL} size={0.5} height={0.1} position={[-3, 0, 0]}>
          URBANCART
          <meshStandardMaterial color="#2563EB" />
        </Text3D>
      </Float>
      {/* 3D Button representations */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[1, 0.4, 0.2]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
    </group>
  );
};
