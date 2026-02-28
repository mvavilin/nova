import type { Middleware, Action } from 'api/StateAPI';

export default function loggerMiddleware<State>(): Middleware<State> {
  function middleware({
    getState,
    // dispatch,
  }: {
    getState: () => State;
    dispatch: (action: Action) => void;
  }): (next: (action: Action) => void) => (action: Action) => void {
    function nextMiddleware(next: (action: Action) => void): (action: Action) => void {
      function handleAction(action: Action): void {
        console.log('Dispatching action:', action);
        next(action);
        console.log('New state:', getState());
      }
      return handleAction;
    }
    return nextMiddleware;
  }
  return middleware;
}
