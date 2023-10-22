import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './translation/fr.json';
import en from './translation/en.json';

const translations = {
    en: { translation: en },
    fr: { translation: fr },
};

i18n.use(initReactI18next) // passes translation down to react-i18next
    .init({
        resources: translations,
        lng: 'fr',
        fallbackLng: 'fr',
        keySeparator: '.',
        saveMissing: true,
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    })
    .then();

export default i18n;
