"use client"

import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  once?: boolean
}

export const FadeIn = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
}: FadeInProps) => {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  const initial = { opacity: 0, ...directionMap[direction] }

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  )
}
