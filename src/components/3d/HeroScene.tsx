'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, PresentationControls } from '@react-three/drei'
import { useRef } from 'react'

function AbstractShape() {
  const mesh = useRef(null)
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshPhysicalMaterial 
          color="#FF5722" 
          metalness={0.1} 
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <Canvas className="absolute inset-0 z-0 pointer-events-auto" camera={{ position: [0, 0, 5], fov: 45 }}>
      <Environment preset="studio" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
      <PresentationControls 
        global 
        snap 
        damping={0.1}
        polar={[-Math.PI / 4, Math.PI / 4]} 
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <AbstractShape />
      </PresentationControls>
    </Canvas>
  )
}
