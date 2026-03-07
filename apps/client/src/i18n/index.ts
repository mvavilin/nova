import clientUserStore from '../store/clientUserStore';
import type { TranslationKey } from './translationKeys';
import { translations } from './translations';

export function t(key: TranslationKey): string {
  const state = clientUserStore.getState();
  return translations[state.language][key] || key;
}

export { translations } from './translations';
