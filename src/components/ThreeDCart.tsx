import React, { useState } from 'react';
import { motion } from 'framer-motion-3d';

export const ThreeDCart: React.FC = () => {
  const [hover, setHover] = useState(false);
  return (
    <group 
      position={[4, 2, 0]} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
    >
      {/* Cart Body */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hover ? '#10B981' : '#059669'} />
      </mesh>
      {/* Cart Handle */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};
