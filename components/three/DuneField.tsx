"use client"
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function DuneField() {
  const mesh = useRef<any>()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh.current) mesh.current.position.x = Math.sin(t * 0.05) * 0.2
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial color="#3A2F2A" roughness={1} />
    </mesh>
  )
}
