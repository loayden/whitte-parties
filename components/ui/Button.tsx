"use client"
import React from 'react'
import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'

type Props = React.ComponentPropsWithoutRef<'button'> & MotionProps & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({ variant = 'primary', className, children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium'
  const variantClass = {
    primary: 'bg-gradient-to-r from-[#D9A05B] to-[#FFC15E] text-midnight shadow-[0_12px_40px_rgba(217,160,91,0.12)] focus:outline-none focus:ring-2 focus:ring-amber-300',
    secondary: 'glass border border-[rgba(217,160,91,0.12)] text-linen',
    ghost: 'text-linen underline'
  }[variant]

  return (
    <motion.button
      {...(rest as any)}
      whileTap={{ scale: 0.97 }}
      whileHover={variant === 'primary' ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={clsx(base, variantClass, className)}
    >
      {children}
    </motion.button>
  )
}
