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
type EducationInfo = {
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate: string | null
  gpa: string
  courses: string[]
}

const About = () => {
  const { language, t } = useLanguage()
  const { basics, skills, education } = portfolioData
  const currentLanguage = language as LanguageKey

  // Dile göre içeriği seç
  const localizedBasics = (basics[currentLanguage] || basics.tr) as BasicInfo

  // Becerileri dile göre düzenle
  const localizedSkills = skills.map((skill) => ({
    ...skill,
    name: skill.name[currentLanguage] || skill.name.tr,
  }))

  // Eğitim bilgilerini dile göre düzenle
  const localizedEducation = education.map((edu) => (edu[currentLanguage] || edu.tr) as EducationInfo)

  const title = `${localizedBasics.name} | ${language === "tr" ? "Hakkımda" : "About Me"}`
  const description = localizedBasics.bio || localizedBasics.summary

  return (
    <PageTransition>
      <SEO title={title} description={description} />
      <div className="space-y-8 py-6">
        <section>
          <AnimatedText text={t("nav.about")} className="text-3xl font-bold mb-6" />
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <AnimatedText
                    text={language === "tr" ? "Kişisel Bilgiler" : "Personal Information"}
                    className="text-xl font-semibold"
                    delay={0.2}
                  />
                  <div className="space-y-4">
                    <FadeIn delay={0.3}>
                      <p className="text-muted-foreground whitespace-pre-line">{localizedBasics.summary}</p>
                    </FadeIn>
                    {localizedBasics.bio && (
                      <FadeIn delay={0.4}>
                        <p className="text-muted-foreground whitespace-pre-line">{localizedBasics.bio}</p>
                      </FadeIn>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <AnimatedText
                    text={language === "tr" ? "İletişim Bilgileri" : "Contact Information"}
                    className="text-xl font-semibold"
                    delay={0.3}
                  />
                  <div className="space-y-2">
                    <FadeIn delay={0.4}>
                      <div>
                        <span className="text-sm font-medium">{language === "tr" ? "E-posta:" : "Email:"}</span>
                        <p className="text-muted-foreground">{localizedBasics.email}</p>
                      </div>
                    </FadeIn>
                    <FadeIn delay={0.5}>
                      <div>
                        <span className="text-sm font-medium">{language === "tr" ? "Telefon:" : "Phone:"}</span>
                        <p className="text-muted-foreground">{localizedBasics.phone}</p>
                      </div>
                    </FadeIn>
                    <FadeIn delay={0.6}>
                      <div>
                        <span className="text-sm font-medium">{language === "tr" ? "Konum:" : "Location:"}</span>
                        <p className="text-muted-foreground">
                          {basics.location.city}, {basics.location.region}
                        </p>
                      </div>
                    </FadeIn>
                    <FadeIn delay={0.7}>
                      <div>
                        <span className="text-sm font-medium">{language === "tr" ? "Web:" : "Website:"}</span>
                        <p className="text-muted-foreground">{localizedBasics.website}</p>
                      </div>
                    </FadeIn>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        <section>
          <AnimatedText
            text={language === "tr" ? "Yetenekler" : "Skills"}
            className="text-2xl font-bold mb-6"
            delay={0.2}
          />
          <FadeIn direction="up" delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {localizedSkills.map((category, index) => (
                    <FadeIn key={category.name} delay={0.4 + index * 0.1}>
                      <div className="space-y-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.keywords.map((keyword, keywordIndex) => (
                            <AnimatedBadge
                              key={keyword}
                              variant="secondary"
                              delay={0.5 + index * 0.05}
                              index={keywordIndex}
                            >
                              {keyword}
                            </AnimatedBadge>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        <section>
          <AnimatedText
            text={language === "tr" ? "Eğitim" : "Education"}
            className="text-2xl font-bold mb-6"
            delay={0.2}
          />
          <div className="grid gap-4">
            {localizedEducation.map((edu, index) => (
              <FadeIn key={edu.institution} direction="up" delay={0.3 + index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{edu.institution}</h3>
                        <p className="text-muted-foreground">
                          {edu.area}, {edu.studyType}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate || (language === "tr" ? "Devam Ediyor" : "Present")}
                      </div>
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

export default About
