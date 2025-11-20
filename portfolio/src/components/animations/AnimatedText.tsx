"use client"

import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  speed?: number
}

export const AnimatedText = ({ text, className, once = true, delay = 0, speed = 0.05 }: AnimatedTextProps) => {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
