/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ja', 'ko'],
  },
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Namespace configuration
  ns: ['common', 'payment', 'footer', 'header'],
  defaultNS: 'common',
  
  // Interpolation options
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  
  // Detection options for automatic language detection
  detection: {
    order: ['cookie', 'header', 'querystring', 'path', 'subdomain'],
    caches: ['cookie'],
  },
};