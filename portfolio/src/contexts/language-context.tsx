"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "tr" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Önce localStorage'dan kontrol et
    const savedLanguage = localStorage.getItem("language") as Language

    // Eğer localStorage'da dil yoksa, tarayıcı dilini kontrol et
    if (!savedLanguage) {
      // navigator.language değerini kontrol et (örn: "tr-TR", "en-US")
      const browserLanguage = navigator.language.toLowerCase()
      // Eğer dil "tr" ile başlıyorsa Türkçe, değilse İngilizce
      return browserLanguage.startsWith("tr") ? "tr" : "en"
    }

    return savedLanguage
  })

  useEffect(() => {
    localStorage.setItem("language", language)

    // HTML lang özelliğini doğrudan ayarla
    document.documentElement.lang = language
  }, [language])

  // Basit bir çeviri fonksiyonu
  const t = (key: string): string => {
    const parts = key.split(".")
    let value: any = translations

    for (const part of parts) {
      if (value && value[part]) {
        value = value[part]
      } else {
        return key // Çeviri bulunamazsa anahtarı döndür
      }
    }

    return value[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Çeviriler
const translations = {
  nav: {
    home: {
      tr: "Ana Sayfa",
      en: "Home",
    },
    about: {
      tr: "Hakkımda",
      en: "About",
    },
    experience: {
      tr: "Deneyim",
      en: "Experience",
    },
    projects: {
      tr: "Projeler",
      en: "Projects",
    },
    contact: {
      tr: "İletişim",
      en: "Contact",
    },
  },
  home: {
    viewProjects: {
      tr: "Projelerim",
      en: "My Projects",
    },
    contact: {
      tr: "İletişime Geç",
      en: "Contact Me",
    },
    featuredProjects: {
      tr: "Öne Çıkan Projeler",
      en: "Featured Projects",
    },
    viewAll: {
      tr: "Tüm Projeleri Gör",
      en: "View All Projects",
    },
  },
  footer: {
    rights: {
      tr: "Tüm hakları saklıdır.",
      en: "All rights reserved.",
    },
  },
}
