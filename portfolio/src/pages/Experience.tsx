"use client"

import { Card, CardContent } from "../components/ui/card"
import portfolioData from "../data/portfolio-data.json"
import { useLanguage } from "../contexts/language-context"
import { AnimatedText } from "../components/animations/AnimatedText"
import { FadeIn } from "../components/animations/FadeIn"
import { AnimatedBadge } from "../components/animations/AnimatedBadge"
import PageTransition from "../components/PageTransition"
import SEO from "../components/SEO"

// Tip tanımlamaları
type LanguageKey = "tr" | "en"
type WorkInfo = {
  company: string
  position: string
  website: string
  startDate: string
  endDate: string | null
  summary: string
  highlights: string[]
}

const Experience = () => {
  const { language, t } = useLanguage()
  const { work } = portfolioData
  const currentLanguage = language as LanguageKey

  // İş deneyimlerini dile göre düzenle
  const localizedWork = work.map((job) => ({
    ...job,
    ...(job[currentLanguage] || job.tr),
    technologies: job.technologies,
  })) as (WorkInfo & { technologies: string[] })[]

  const title = language === "tr" ? "İş Deneyimi | CV" : "Work Experience | Resume"
  const description =
    language === "tr"
      ? "Profesyonel iş deneyimim, yeteneklerim ve projelerim hakkında bilgi edinin."
      : "Learn about my professional work experience, skills, and projects."

  return (
    <PageTransition>
      <SEO title={title} description={description} />
      <div className="space-y-8 py-6">
        <section>
          <AnimatedText text={t("nav.experience")} className="text-3xl font-bold mb-6" />
          <div className="space-y-6">
            {localizedWork.map((job, index) => (
              <FadeIn key={`${job.company}-${job.position}`} direction="up" delay={0.1 * index}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-semibold">{job.position}</h2>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {job.startDate} - {job.endDate || (language === "tr" ? "Günümüz" : "Present")}
                        </div>
                      </div>
                      <FadeIn delay={0.2 + index * 0.05}>
                        <p className="text-muted-foreground whitespace-pre-line">{job.summary}</p>
                      </FadeIn>
                      {job.highlights && job.highlights.length > 0 && (
                        <FadeIn delay={0.3 + index * 0.05}>
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                              {language === "tr" ? "Öne Çıkanlar:" : "Highlights:"}
                            </h3>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {job.highlights.map((highlight, highlightIndex) => (
                                <li
                                  key={highlightIndex}
                                  className="opacity-0 animate-fadeIn"
                                  style={{
                                    animationDelay: `${0.4 + index * 0.05 + highlightIndex * 0.1}s`,
                                    animationFillMode: "forwards",
                                  }}
                                >
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </FadeIn>
                      )}
                      {job.technologies && job.technologies.length > 0 && (
                        <FadeIn delay={0.4 + index * 0.05}>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {job.technologies.map((tech, techIndex) => (
                              <AnimatedBadge
                                key={tech}
                                variant="secondary"
                                delay={0.5 + index * 0.05}
                                index={techIndex}
                              >
                                {tech}
                              </AnimatedBadge>
                            ))}
                          </div>
                        </FadeIn>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default Experience
