"use client"

import i18n from "@/i18n"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
