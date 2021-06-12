import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_BR from './translations/pt_BR.json';
import en_US from './translations/en_US.json';

/*declare module 'react-i18next' {
  interface Resources {
    pt: typeof pt_BR;
    en: typeof en_US;
  }
}

export const resources = {
      pt:{
        pt_BR
      },
      en:{
        en_US
      }
    
} as const;*/

const resources = {
  ['pt-BR']: pt_BR,
  ['en-US']: en_US
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;