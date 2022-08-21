import { resources } from './../i18n/index';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['pt-BR'];
  }
}
