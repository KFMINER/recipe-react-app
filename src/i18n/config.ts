import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import data_de from './locales/de/translations.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'de',
  lng: 'de',
  resources: {
    de: {
      translations: data_de
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['de'];

export default i18n;
