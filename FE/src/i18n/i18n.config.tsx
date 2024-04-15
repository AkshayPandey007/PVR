
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import HttpApi from "i18next-http-backend" // <---- add this

import commonEn from './Translations/en.json'
import commonSw from './Translations/sw.json'

const resources = {
  en: { common: commonEn },
  sw: { common: commonSw }
}

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}

i18n
  .use(HttpApi) // <---- add this
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['sw', 'en',],
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  })

export default i18n