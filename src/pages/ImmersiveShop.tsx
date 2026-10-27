import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, Text, ContactShadows, PresentationControls, MeshReflectorMaterial } from '@react-three/drei';
import { FloatingText } from '../components/FloatingText';
import { motion } from 'framer-motion-3d';

// 3D Product Card Component
const ThreeDProductCard = ({ name, price, color }: { name: string; price: string; color: string }) => {
  const [hover, setHover] = useState(false);
  return (
        <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {}}
    >
      <mesh castShadow>
        <boxGeometry args={[1.5, 2, 0.2]} />
        <meshStandardMaterial color={hover ? '#2563EB' : '#1E293B'} roughness={0.2} metalness={0.5} />
      </mesh>
      <FloatingText text={name} position={[0, 0.5, 0]} size={0.2} color="white" />
      <FloatingText text={price} position={[0, -0.5, 0]} size={0.15} color="#60A5FA" />
    </group>
  );
};

export const ImmersiveShop: React.FC = () => (
  <div className="w-full h-screen bg-slate-950">
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <Environment preset="night" />

      <PresentationControls snap global zoom={0.8} rotation={[0, 0, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={[-2, 0, 0]}>
            <ThreeDProductCard name="Premium Headset" price="$299" color="#2563EB" />
          </group>
          <group position={[2, 0, 0]}>
            <ThreeDProductCard name="Smart Watch" price="$199" color="#1E293B" />
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial blur={[400, 100]} resolution={1024} mixBlur={1} mixStrength={40} depthScale={1.2} minDepthThreshold={0.4} color="#050505" metalness={0.5} />
      </mesh>
    </Canvas>
  </div>
);
