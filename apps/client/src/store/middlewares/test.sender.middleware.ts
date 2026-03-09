import type { Middleware } from '@/api/StateAPI/types/types';
import type { AppActions } from '@store/types/action.types';
import { TestActions } from '../actions/test.actions';

export default function sender<State>(): Middleware<State, AppActions> {
  return async function middleware(context) {
    if (context.action.type === TestActions.SEND_DATA) {
      if (!context.action.payload) {
        return context.next(context.action);
      }

      // если нужно изменить action, то только через next
      // но лучше вообще не менять таким образом
      // не создавайте новый dispatch()

      const newAction = {
        ...context.action,
        payload: {
          ...context.action.payload,
          count: context.action.payload.count * 2,
        },
      };

      return context.next(newAction);
    }

    await context.next(context.action);
  };
}
