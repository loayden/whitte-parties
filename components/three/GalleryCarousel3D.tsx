"use client"
import React from 'react'
import { useFrame } from '@react-three/fiber'

export default function GalleryCarousel3D({ items = [] }: { items?: string[] }) {
  const groupRef = React.useRef<any>()
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={groupRef}>
      {items.slice(0, 6).map((_, i) => (
        <mesh key={i} position={[Math.sin((i / 6) * Math.PI * 2) * 2.2, 0, Math.cos((i / 6) * Math.PI * 2) * 2.2]} rotation={[0, (i / 6) * Math.PI * 2, 0]}>
          <boxGeometry args={[1.6, 1, 0.1]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#D9A05B' : '#FFC15E'} metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}
