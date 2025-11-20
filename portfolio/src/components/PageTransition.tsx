"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect } from "react"

interface PageTransitionProps {
  children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  // Sayfa geçişlerinde tema sınıfının korunduğundan emin ol
  useEffect(() => {
    const savedTheme = localStorage.getItem("vite-ui-theme") || "system"
    const root = document.documentElement

    if (!root.classList.contains("dark") && !root.classList.contains("light")) {
      if (savedTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(systemTheme)
      } else {
        root.classList.add(savedTheme)
      }
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

export default PageTransition
