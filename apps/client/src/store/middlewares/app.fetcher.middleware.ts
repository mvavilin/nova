import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';

export default function appFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    return context.next(context.action);
  };
}
