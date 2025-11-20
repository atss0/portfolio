"use client"

import { motion } from "framer-motion"
import { Badge } from "../ui/badge"
import type { ReactNode } from "react"

interface AnimatedBadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
  delay?: number
  index?: number
}

export const AnimatedBadge = ({
  children,
  variant = "default",
  className,
  delay = 0,
  index = 0,
}: AnimatedBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay + index * 0.1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <Badge variant={variant} className={className}>
        {children}
      </Badge>
    </motion.div>
  )
}
