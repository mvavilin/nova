import type { Afterware } from '@/api/StateAPI';

export default function localStorageAfterware<State>(key: string): Afterware<State> {
  return async function afterware(context) {
    localStorage.setItem(key, JSON.stringify(context.nextState));
  };
}
