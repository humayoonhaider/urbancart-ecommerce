import React, { useRef } from 'react';
import { Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Use a public CDN URL for the font to comply with no-local-file directives
const FONT_URL = 'https://unpkg.com/three@0.158.0/examples/fonts/helvetiker_bold.typeface.json';

interface FloatingTextProps {
  text: string;
  position?: [number, number, number];
  color?: string;
  size?: number;
}

export const FloatingText: React.FC<FloatingTextProps> = ({ 
  text, 
  position = [0, 0, 0], 
  color = '#ffffff',
  size = 0.5 
}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <Text3D
      ref={ref}
      font={FONT_URL}
      position={position}
      size={size}
      height={0.1}
      bevelEnabled
      bevelSize={0.02}
      castShadow
      receiveShadow
    >
      {text}
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
    </Text3D>
  );
};
