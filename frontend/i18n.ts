import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import commonEn from "./public/locales/en/common.json"
import commonAm from "./public/locales/am/common.json"
import commonOm from "./public/locales/om/common.json"

const resources = {
  en: { translation: commonEn },
  am: { translation: commonAm },
  om: { translation: commonOm },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
