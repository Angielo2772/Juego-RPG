import i18next from 'i18next';
import i18nextHttpBackend from 'i18next-http-backend';

i18next.use(i18nextHttpBackend).init({
  lng: "en",
  fallbackLng: "es",
  backend: {
    loadPath: "./translations/{{lng}}.json",
  },
  debug: true,
});

export function changeLanguage(lng) {
  return i18next.changeLanguage(lng);
}

export function translate(key) {
  return i18next.t(key);
}

export default i18next;
