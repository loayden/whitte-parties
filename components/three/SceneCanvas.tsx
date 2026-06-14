"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'

export default function SceneCanvas({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full h-[60vh]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        {children}
      </Canvas>
    </div>
  )
}
