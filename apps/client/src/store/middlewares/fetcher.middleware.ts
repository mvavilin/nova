import type { Middleware } from '@/api/StateAPI/types/types';
import { RegistrationActions } from '../actions/registration.actions';
import type { Actions } from '../types/action.types';

export default function fetcher<State>(): Middleware<State, Actions> {
  return async function middleware(context) {
    if (context.action.type === RegistrationActions.FETCH_DATA) {
      const randomInt = (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      try {
        console.log('Before fetch');
        const response = await fetch(`https://dummyjson.com/products/${randomInt(1, 100)}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const title = data.title ?? '';

        console.log('Fetch completed, title:', title);

        // если нужно добавить action, то через next
        // лучше не создавайте новый store.dispatch() можно отхватить рекурсию
        return context.next({
          type: RegistrationActions.FETCH_SUCCESS,
          payload: { title },
        });
      } catch (error) {
        console.error('Fetch failed:', error);
        return context.next(context.action);
      }
    }

    return context.next(context.action);
  };
}
