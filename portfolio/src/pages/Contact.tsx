"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Check, Loader2 } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import portfolioData from "../data/portfolio-data.json"
import { useLanguage } from "../contexts/language-context"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import { AnimatedText } from "../components/animations/AnimatedText"
import { FadeIn } from "../components/animations/FadeIn"
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

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const Contact = () => {
  const { language, t } = useLanguage()
  const { basics } = portfolioData
  const currentLanguage = language as LanguageKey
  const localizedBasics = (basics[currentLanguage] || basics.tr) as BasicInfo

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Firebase Firestore'a veriyi kaydet
      await addDoc(collection(db, "messages"), {
        ...formData,
        language: language,
        createdAt: serverTimestamp(),
      })

      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      console.error("Error submitting form:", err)
      setIsSubmitting(false)
      setError(
        language === "tr"
          ? "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
          : "An error occurred while sending the message. Please try again.",
      )
    }
  }

  const title = language === "tr" ? "İletişim | Bana Ulaşın" : "Contact | Get in Touch"
  const description =
    language === "tr"
      ? "Benimle iletişime geçin. İş teklifleri, işbirlikleri veya sorularınız için formu doldurun."
      : "Get in touch with me. Fill out the form for job offers, collaborations, or any questions."

  return (
    <PageTransition>
      <SEO title={title} description={description} />
      <div className="space-y-8 py-6">
        <section>
          <AnimatedText text={t("nav.contact")} className="text-3xl font-bold mb-6" />
          <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
            <div className="space-y-6">
              <FadeIn direction="up" delay={0.1}>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <AnimatedText
                      text={language === "tr" ? "İletişim Bilgileri" : "Contact Information"}
                      className="text-xl font-semibold"
                      delay={0.2}
                    />
                    <div className="space-y-4">
                      <FadeIn delay={0.3}>
                        <div className="flex items-start gap-3">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                          </motion.div>
                          <div>
                            <h3 className="font-medium">{language === "tr" ? "E-posta" : "Email"}</h3>
                            <p className="text-muted-foreground">{localizedBasics.email}</p>
                          </div>
                        </div>
                      </FadeIn>
                      <FadeIn delay={0.4}>
                        <div className="flex items-start gap-3">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                          </motion.div>
                          <div>
                            <h3 className="font-medium">{language === "tr" ? "Telefon" : "Phone"}</h3>
                            <p className="text-muted-foreground">{localizedBasics.phone}</p>
                          </div>
                        </div>
                      </FadeIn>
                      <FadeIn delay={0.5}>
                        <div className="flex items-start gap-3">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          </motion.div>
                          <div>
                            <h3 className="font-medium">{language === "tr" ? "Konum" : "Location"}</h3>
                            <p className="text-muted-foreground">
                              {basics.location.address}, {basics.location.city}, {basics.location.region}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <Card>
                  <CardContent className="p-6">
                    <AnimatedText
                      text={language === "tr" ? "Sosyal Medya" : "Social Media"}
                      className="text-xl font-semibold mb-4"
                      delay={0.3}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      {basics.profiles.map((profile, index) => (
                        <motion.div
                          key={profile.network}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        >
                          <Button asChild variant="outline" className="w-full justify-start">
                            <a href={profile.url} target="_blank" rel="noopener noreferrer">
                              {profile.network}
                            </a>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.3}>
              <Card>
                <CardContent className="p-6">
                  <AnimatedText
                    text={language === "tr" ? "Mesaj Gönder" : "Send Message"}
                    className="text-xl font-semibold mb-4"
                    delay={0.4}
                  />
                  {isSubmitted ? (
                    <motion.div
                      className="bg-primary/10 p-4 rounded-md text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="flex justify-center mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Check className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="font-medium text-lg mb-2">{language === "tr" ? "Teşekkürler!" : "Thank you!"}</h3>
                      <p className="text-muted-foreground">
                        {language === "tr"
                          ? "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım."
                          : "Your message has been successfully sent. I will get back to you as soon as possible."}
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                        <Button onClick={() => setIsSubmitted(false)}>
                          {language === "tr" ? "Yeni Mesaj Gönder" : "Send New Message"}
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            {language === "tr" ? "İsim" : "Name"}
                          </label>
                          <motion.input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            whileFocus={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            {language === "tr" ? "E-posta" : "Email"}
                          </label>
                          <motion.input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            whileFocus={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          {language === "tr" ? "Konu" : "Subject"}
                        </label>
                        <motion.input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          whileFocus={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          {language === "tr" ? "Mesaj" : "Message"}
                        </label>
                        <motion.textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                          whileFocus={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {language === "tr" ? "Gönderiliyor..." : "Sending..."}
                            </>
                          ) : language === "tr" ? (
                            "Gönder"
                          ) : (
                            "Send"
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default Contact
