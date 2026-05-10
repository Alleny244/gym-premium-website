"use client";

import { Canvas, useThree } from '@react-three/fiber'
import { CharacterModel } from './CharacterModel'
import { Environment, ContactShadows } from '@react-three/drei'
import { forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

const CameraManager = forwardRef(({ onComplete }, ref) => {
  const { camera } = useThree()
  
  useImperativeHandle(ref, () => ({
    flyIn: () => {
      // Animate camera zooming past the character into the "gym"
      gsap.to(camera.position, {
        z: -1,
        y: 1.5,
        duration: 1.5,
        ease: "power3.inOut"
      })
      gsap.to(camera.rotation, {
        x: Math.PI / 16,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: onComplete
      })
    }
  }))
  return null
})
CameraManager.displayName = 'CameraManager'

export const LandingScene = forwardRef(({ onComplete, isTransitioning }, ref) => {
  return (
    <div 
      className="w-full h-screen absolute inset-0 z-50 bg-[#F8F9FA]" 
      style={{ 
        pointerEvents: isTransitioning ? 'none' : 'auto',
      }}
    >
      <Canvas shadows camera={{ position: [0, 1.2, 4], fov: 45 }}>
        <CameraManager ref={ref} onComplete={onComplete} />
        
        {/* Clean, bright luxury gym lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[-5, 8, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={2048}
        />
        <pointLight position={[0, 2, -2]} intensity={2} color="#ffffff" />
        
        {/* 3D Character tracking the cursor */}
        <CharacterModel position={[0, -1, 0]} scale={1.2} />
        
        {/* Ground shadow for realism */}
        <ContactShadows 
          position={[0, -1, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
})
LandingScene.displayName = 'LandingScene'
