import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enTranslation from './locales/en.json'
import ruTranslation from './locales/ru.json'
import uzTranslation from './locales/uz.json'

// the translations
const resources = {
    en: {
        translation: enTranslation
    },
    ru: {
        translation: ruTranslation
    },
    uz: {
        translation: uzTranslation
    }
}

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // init i18next
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    })

export default i18n 