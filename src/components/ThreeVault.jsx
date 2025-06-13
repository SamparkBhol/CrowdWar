import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Stars } from '@react-three/drei';

function Vault() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.05;
    materialRef.current.emissiveIntensity = Math.abs(Math.sin(state.clock.elapsedTime * 0.3)) * 1.5 + 0.3;
  });

  return (
    <Icosahedron args={[2.5, 1]} ref={meshRef}>
      <meshStandardMaterial 
        ref={materialRef}
        color="#0a0a0a"
        emissive="#22c55e"
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </Icosahedron>
  );
}

const ThreeVault = () => {
  return (
    <div id="three-canvas" className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />
        <Vault />
        <Stars radius={150} depth={50} count={5000} factor={5} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default ThreeVault;