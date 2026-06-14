"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function BedouinIDCard({ identity }: { identity: any }) {
  const [flipped, setFlipped] = React.useState(false)

  return (
    <motion.div
      onClick={() => setFlipped((s) => !s)}
      className="w-80 h-48 mx-auto perspective-800 cursor-pointer"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0 glass p-4">
          <div className="font-display text-lg">{identity.name}</div>
          <div className="text-sm mt-2">{identity.tier}</div>
          <div className="font-mono text-xs mt-4">Member since {identity.memberSince}</div>
        </div>

        <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 glass p-4">
          <div className="text-sm">QR / Back details</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
