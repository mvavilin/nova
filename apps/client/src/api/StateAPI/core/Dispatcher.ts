import type { Action, Reducer, Middleware } from '../types/types';
import Store from './Store';

export default class Dispatcher<State> {
  private store: Store<State>;
  private reducers: Reducer<State>[] = [];
  private middlewares: Middleware<State>[] = [];

  constructor(store: Store<State>) {
    this.store = store;
  }

  /** --- Reducers --- */
  public addReducer(reducer: Reducer<State> | Reducer<State>[]): void {
    if (Array.isArray(reducer)) {
      this.reducers.push(...reducer);
    } else {
      this.reducers.push(reducer);
    }
  }

  public removeReducer(reducer: Reducer<State>): void {
    this.reducers = this.reducers.filter((r) => r !== reducer);
  }

  /** --- Middleware --- */
  public addMiddleware(mw: Middleware<State>): void {
    this.middlewares.push(mw);
  }

  public removeMiddleware(mw: Middleware<State>): void {
    this.middlewares = this.middlewares.filter((m) => m !== mw);
  }

  /** --- Dispatch --- */
  public async dispatch(action: Action): Promise<void> {
    const { middlewares, reducers, store } = this;

    let index = -1;

    const next = async (act: Action): Promise<void> => {
      index += 1;

      const mw = middlewares[index];
      if (mw) {
        await mw({
          getState: () => store.getState(),
          dispatch: this.dispatch.bind(this),
        })(next)(act);
      } else {
        let newState = store.getState();
        for (const reducer of reducers) {
          const result = reducer(newState, act);
          newState = result instanceof Promise ? await result : result;
        }
        store.setState(newState, act);
      }
    };

    await next(action);
  }
}
