import { create } from "zustand"
import { persist } from "zustand/middleware"

type Language = "en" | "am" | "om"

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en" as Language,
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "language-storage",
    },
  ),
)
