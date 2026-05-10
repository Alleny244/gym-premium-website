"use client";

import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function CharacterModel(props) {
  const group = useRef()
  // Load the Soldier.glb model
  const { scene, animations } = useGLTF('/models/Soldier.glb')
  const { actions } = useAnimations(animations, group)

  // Find bones for cursor tracking
  const spine = useRef()
  const neck = useRef()

  useEffect(() => {
    // Play the first available animation (usually 'Idle' or a walk cycle)
    const actionName = Object.keys(actions).find(name => name.toLowerCase().includes('idle')) || Object.keys(actions)[0]
    const action = actions[actionName]
    
    if (action) {
      action.play()
    }

    // Traverse the scene to find bones for look-at tracking
    scene.traverse((child) => {
      if (child.isBone) {
        if (child.name === 'mixamorigSpine') spine.current = child
        if (child.name === 'mixamorigNeck') neck.current = child
      }
    })
  }, [scene, actions])

  useFrame((state) => {
    // Map cursor position (-1 to 1) to rotation angles
    if (spine.current) {
      // Limit spine rotation so it looks natural
      const targetRotationY = (state.pointer.x * Math.PI) / 6 
      const targetRotationX = -(state.pointer.y * Math.PI) / 10 
      
      spine.current.rotation.y = THREE.MathUtils.lerp(spine.current.rotation.y, targetRotationY, 0.05)
      spine.current.rotation.x = THREE.MathUtils.lerp(spine.current.rotation.x, targetRotationX, 0.05)
    }

    if (neck.current) {
       // Neck moves slightly more than the spine to look at the cursor
       const targetRotationY = (state.pointer.x * Math.PI) / 4 
       const targetRotationX = -(state.pointer.y * Math.PI) / 6 
       neck.current.rotation.y = THREE.MathUtils.lerp(neck.current.rotation.y, targetRotationY, 0.08)
       neck.current.rotation.x = THREE.MathUtils.lerp(neck.current.rotation.x, targetRotationX, 0.08)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/Soldier.glb')
