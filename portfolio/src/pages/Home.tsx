"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import portfolioData from "../data/portfolio-data.json"
import { useLanguage } from "../contexts/language-context"
import { AnimatedText } from "../components/animations/AnimatedText"
import { FadeIn } from "../components/animations/FadeIn"
import { AnimatedCard } from "../components/animations/AnimatedCard"
import { AnimatedBadge } from "../components/animations/AnimatedBadge"
import PageTransition from "../components/PageTransition"
import SEO from "../components/SEO"
import { motion } from "framer-motion"

// Tip tanımlamaları
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

const Home = () => {
  const { language, t } = useLanguage()
  const { basics, skills, projects } = portfolioData

  // Dile göre içeriği seç - tip güvenliği için düzeltildi
  const currentLanguage = language as LanguageKey
  const localizedBasics = (basics[currentLanguage] || basics.tr) as BasicInfo

  // Projeleri ve becerileri dile göre düzenle
  const localizedProjects = projects.map((project) => {
    return {
      ...project,
      name: project.name[currentLanguage] || project.name.tr,
      description: project.description[currentLanguage] || project.description.tr,
    }
  })

  const localizedSkills = skills.map((skill) => {
    return {
      ...skill,
      name: skill.name[currentLanguage] || skill.name.tr,
    }
  })

  return (
    <PageTransition>
      <SEO />
      <div className="flex flex-col gap-16 py-12">
        {/* Minimal Hero Section */}
        <section className="container px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Image - Simple & Clean */}
            <FadeIn direction="right" delay={0.2}>
              <div className="w-full md:w-auto flex justify-center md:justify-start mb-6 md:mb-0">
                <motion.div
                  className="relative w-64 h-64 rounded-full overflow-hidden border"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <img
                    src={localizedBasics.image || "/placeholder.svg"}
                    alt={localizedBasics.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </FadeIn>

            {/* Content - Clean & Minimal */}
            <div className="flex-1 space-y-5">
              <div>
                <AnimatedText
                  text={localizedBasics.name}
                  className="text-3xl font-bold mb-1"
                  delay={0.3}
                  speed={0.08}
                />
                <FadeIn delay={0.5}>
                  <h2 className="text-xl text-muted-foreground">{localizedBasics.label}</h2>
                </FadeIn>
              </div>

              <FadeIn delay={0.6}>
                <div className="h-px w-full bg-border"></div>
              </FadeIn>

              <FadeIn delay={0.7}>
                <p className="text-muted-foreground">{localizedBasics.summary}</p>
              </FadeIn>

              <FadeIn delay={0.8}>
                <div className="flex flex-wrap gap-2">
                  {localizedSkills.slice(0, 6).map((skill, index) => (
                    <AnimatedBadge key={skill.name} variant="outline" delay={0.8} index={index}>
                      {skill.name}
                    </AnimatedBadge>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={1}>
                <div className="flex gap-4 pt-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild>
                      <Link to="/projects" className="gap-2">
                        {t("home.viewProjects")}
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="outline">
                      <Link to="/contact">{t("home.contact")}</Link>
                    </Button>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Simple Divider */}
        <div className="container px-4">
          <div className="h-px w-full bg-border"></div>
        </div>

        {/* Featured Projects - Clean Design */}
        <section className="container px-4">
          <AnimatedText text={t("home.featuredProjects")} className="text-2xl font-bold mb-8" delay={0.2} />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {localizedProjects.slice(0, 3).map((project, index) => (
              <AnimatedCard key={project.name} delay={0.3 + index * 0.1}>
                <Card className="border overflow-hidden h-full">
                  <div className="h-48 overflow-hidden bg-muted">
                    {project.image ? (
                      <motion.img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {project.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <AnimatedBadge key={tech} variant="secondary" className="text-xs" delay={0.5} index={techIndex}>
                          {tech}
                        </AnimatedBadge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <FadeIn direction="up" delay={0.5}>
            <div className="flex justify-center mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline">
                  <Link to="/projects" className="gap-2">
                    {t("home.viewAll")}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </section>
      </div>
    </PageTransition>
  )
}

export default Home
