import type { Middleware } from '@/api/StateAPI/types/types';
import { RegistrationActions } from '../actions/registration.actions';
import type { Actions } from '../types/action.types';
import store from '../store';

export default function fetcher<State>(): Middleware<State, Actions> {
  return async function middleware(context) {
    if (context.action.type === RegistrationActions.FETCH_DATA) {
      function randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const data = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${randomInt(1, 100)}`
      ).then(function (r) {
        return r.json();
      });
      const title = data.title || '';

      store.dispatch({ type: RegistrationActions.FETCH_SUCCESS, payload: { title } });
    }
    await context.next(context.action);
  };
}
