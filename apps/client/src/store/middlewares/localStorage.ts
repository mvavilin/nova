import type { Middleware, Action } from 'api/StateAPI';

export default function localStorageMiddleware<State>(key: string): Middleware<State> {
  function middleware({
    getState,
    // dispatch,
  }: {
    getState: () => State;
    dispatch: (action: Action) => void;
  }): (next: (action: Action) => void) => (action: Action) => void {
    function nextMiddleware(next: (action: Action) => void): (action: Action) => void {
      function handleAction(action: Action): void {
        next(action);
        try {
          const state = getState();
          localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
          console.error('Failed to save state to localStorage:', error);
        }
      }
      return handleAction;
    }
    return nextMiddleware;
  }
  return middleware;
}
