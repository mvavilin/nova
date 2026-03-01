import type { Afterware } from '@/api/StateAPI';

export default function localStorageAfterware<State>(key: string): Afterware<State> {
  return async ({ nextState }) => {
    try {
      const serializedState = JSON.stringify(nextState);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  };
}
