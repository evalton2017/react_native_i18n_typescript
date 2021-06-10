import {NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import pt_br from './translations/pt_BR.json';
import en_us from './translations/en_US.json';

/*interface resources {
    pt_br: typeof pt_br,
    en_us: typeof en_us,
};

export const resources = {
    en: {
        pt_br,
        en_us,
    },
} as const;*/

const resources = {
  ['pt-BR']: pt_br,
  ['en-US']: en_us,
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async callback => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        return callback(storedLanguage);
      }
  
      let phoneLanguage = null;
      if (Platform.OS === 'android') {
        console.log("-----------------------------------")
        console.log(NativeModules.I18Manager.localeIdentifier)
        phoneLanguage = NativeModules.I18Manager.localeIdentifier;
      } else {
        phoneLanguage = NativeModules.SettingsManager.settings.AppleLocale;
      }
  
      phoneLanguage = phoneLanguage.replace('_', '-');
  
      return callback(phoneLanguage);
    },
    init: () => {},
    cacheUserLanguage: language => {
      AsyncStorage.setItem('language', language);
    },
  };

  console.log("language----------------------------------")
  console.log(languageDetector)

  i18n
  .use(languageDetector)
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