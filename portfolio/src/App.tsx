"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { LanguageProvider } from "./contexts/language-context"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Experience from "./pages/Experience"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
