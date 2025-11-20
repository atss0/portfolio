"use client"

import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export const AnimatedCard = ({ children, className, delay = 0, once = true }: AnimatedCardProps) => {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  )
}
