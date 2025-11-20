import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Sayfa yüklendiğinde tema sınıfını önceden ekle
if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("vite-ui-theme") || "system"
    const root = window.document.documentElement
  
    if (savedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(savedTheme)
    }
  }

createRoot(document.getElementById('root')!).render(<App />)
