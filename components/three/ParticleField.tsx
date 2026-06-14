"use client"
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function ParticleField() {
  const group = useRef<any>()
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.02
  })

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#FFD27D" emissive="#FFD27D" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
