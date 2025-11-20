"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import portfolioData from "../data/portfolio-data.json"
import { useLanguage } from "../contexts/language-context"

const Footer = () => {
  const { basics } = portfolioData
  const { language, t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialIcons = {
    github: <Github className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    email: <Mail className="h-5 w-5" />,
  }

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} HNG Software. {t("footer.rights")}
        </p>
        <div className="flex items-center gap-4">
          {basics.profiles.map((profile) => {
            const icon = socialIcons[profile.network.toLowerCase() as keyof typeof socialIcons]
            return (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={profile.network}
              >
                {icon}
              </a>
            )
          })}
          <a
            href={`mailto:${basics[language]?.email || basics.tr.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
