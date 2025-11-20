"use client"

import { useLocation } from "react-router-dom"
import portfolioData from "../data/portfolio-data.json"
import { useLanguage } from "../contexts/language-context"
import { useEffect } from "react"

type LanguageKey = "tr" | "en"
type BasicInfo = {
  name: string
  label: string
  image: string
  email: string
  phone: string
  website: string
  summary: string
  bio: string
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  article?: boolean
}

const SEO = ({ title, description, image, article = false }: SEOProps) => {
  const { language } = useLanguage()
  const { pathname } = useLocation()
  const { basics } = portfolioData

  const currentLanguage = language as LanguageKey
  const localizedBasics = (basics[currentLanguage] || basics.tr) as BasicInfo

  // Varsayılan değerler
  const seo = {
    title: title || `${localizedBasics.name} | ${localizedBasics.label}`,
    description: description || localizedBasics.summary,
    image: image || localizedBasics.image,
    url: `${localizedBasics.website}${pathname}`,
  }

  // Canonical URL
  const canonicalUrl = `${localizedBasics.website}${pathname}`

  // Dil özelliğini doğrudan document.documentElement üzerinde ayarla
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <>
      {/* Temel Meta Etiketleri */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Etiketleri (Facebook, LinkedIn) */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:locale" content={language === "tr" ? "tr_TR" : "en_US"} />
      <meta property="og:site_name" content={localizedBasics.name} />

      {/* Twitter Meta Etiketleri */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Anahtar Kelimeler */}
      <meta
        name="keywords"
        content={`${localizedBasics.name}, ${localizedBasics.label}, portfolio, resume, cv, developer, software, ${language === "tr" ? "yazılım, geliştirici" : "developer, programmer"}`}
      />

      {/* Dil meta etiketi */}
      <meta httpEquiv="Content-Language" content={language} />
    </>
  )
}

export default SEO
