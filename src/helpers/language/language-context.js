import React, { createContext, useContext, useState } from "react"
import enTranslations from "./translation/en.json"
import bnTranslations from "./translation/bn.json"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")
  const translations = language === "en" ? enTranslations : bnTranslations

  const translate = (key) => translations[key] || key

  function translationByLangeage({ en = "", bn = "" }) {
    if (language === "en") return en
    else return bn
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate, translationByLangeage }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  return useContext(LanguageContext)
}
