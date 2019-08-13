
import en from './en';
import ja from './ja';



export const translationMessages = {
  en,
  ja
};

export const chooseLocale = locale => {
  switch (locale) {
    case 'en-GB':
      return translationMessages.en;
    case 'ja':
      return translationMessages.ja;
    default:
      return translationMessages.en;
  }
};