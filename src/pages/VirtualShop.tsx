import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ThreeDNavbar } from '../components/ThreeDNavbar';
import { ThreeDCart } from '../components/ThreeDCart';
import { ThreeDDivider } from '../components/ThreeDDivider';

export const VirtualShop: React.FC = () => {
  return (
    <div className="w-full h-screen bg-slate-950">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="city" />

        <PresentationControls snap global zoom={0.8} polar={[-Math.PI / 4, Math.PI / 4]}>
          <ThreeDNavbar />
          <ThreeDCart />
          <group position={[0, 0, 0]}>
            <ThreeDDivider />
          </group>
        </PresentationControls>

        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={20} blur={2} />
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
