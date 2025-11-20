"use client"

import { Globe } from "lucide-react"
import { Button } from "./ui/button"
import { useLanguage } from "../contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="px-2 font-medium flex items-center gap-1">
      <Globe className="h-4 w-4" />
      {language === "tr" ? "TR" : "EN"}
    </Button>
  )
}
