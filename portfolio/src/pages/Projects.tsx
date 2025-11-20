"use client"

import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import portfolioData from "../data/portfolio-data.json"
import { useLanguage } from "../contexts/language-context"
import { AnimatedText } from "../components/animations/AnimatedText"
import { AnimatedCard } from "../components/animations/AnimatedCard"
import { AnimatedBadge } from "../components/animations/AnimatedBadge"
import PageTransition from "../components/PageTransition"
import SEO from "../components/SEO"
import { motion } from "framer-motion"

// Tip tanımlamaları
type LanguageKey = "tr" | "en"
type ProjectInfo = {
  name: string
  description: string
  highlights: string[]
  technologies: string[]
  url: string
  githubUrl: string
  image: string
}

const Projects = () => {
  const { language, t } = useLanguage()
  const { projects } = portfolioData
  const currentLanguage = language as LanguageKey

  // Projeleri dile göre düzenle
  const localizedProjects = projects.map((project) => {
    return {
      ...project,
      name: project.name[currentLanguage] || project.name.tr,
      description: project.description[currentLanguage] || project.description.tr,
      highlights: project.highlights?.[currentLanguage] || project.highlights?.tr || [],
    } as ProjectInfo
  })

  const title = language === "tr" ? "Projelerim | Portfolyo" : "My Projects | Portfolio"
  const description =
    language === "tr"
      ? "Geliştirdiğim projeler ve çalışmalarım hakkında bilgi edinin."
      : "Explore my projects and works that showcase my skills and expertise."

  return (
    <PageTransition>
      <SEO title={title} description={description} />
      <div className="space-y-8 py-6">
        <section>
          <AnimatedText text={t("nav.projects")} className="text-3xl font-bold mb-6" />
          <div className="grid gap-6 md:grid-cols-2">
            {localizedProjects.map((project, index) => (
              <AnimatedCard key={project.name} delay={0.1 * index}>
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {project?.image ? (
                      <motion.img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="text-4xl">{project.name.charAt(0)}</div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    <p className="text-muted-foreground mt-2 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.technologies.map((tech, techIndex) => (
                        <AnimatedBadge key={tech} variant="secondary" delay={0.5} index={techIndex}>
                          {tech}
                        </AnimatedBadge>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto pt-4">
                      {project.url && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Demo
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      {project.githubUrl && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild size="sm" variant="outline">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Github className="h-4 w-4" />
                              {language === "tr" ? "Kaynak Kod" : "Source Code"}
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default Projects
