import type { Action, Reducer, Afterware, Middleware } from '../types/types';
import Store from './Store';

export default class Dispatcher<State, A extends Action = Action> {
  private store: Store<State, A>;
  private reducers: Reducer<State, A>[] = [];
  private afterwares: Afterware<State, A>[] = [];
  private middlewares: Middleware<State, A>[] = [];

  private queue: Promise<void> = Promise.resolve();

  constructor(store: Store<State, A>) {
    this.store = store;
  }

  public addReducer(...reducers: Reducer<State, A>[]): void {
    this.reducers.push(...reducers);
  }

  public removeReducer(reducer: Reducer<State, A>): void {
    this.reducers = this.reducers.filter((r) => r !== reducer);
  }

  public addAfterware(...afterwares: Afterware<State, A>[]): void {
    this.afterwares.push(...afterwares);
  }

  public removeAfterware(mw: Afterware<State, A>): void {
    this.afterwares = this.afterwares.filter((m) => m !== mw);
  }

  public addMiddleware(...mws: Middleware<State, A>[]): void {
    this.middlewares.push(...mws);
  }

  public removeMiddleware(mw: Middleware<State, A>): void {
    this.middlewares = this.middlewares.filter((m) => m !== mw);
  }

  public dispatch(action: A): Promise<void> {
    this.queue = this.queue.then(() => this.runMiddlewares(action));
    return this.queue;
  }

  private async runMiddlewares(action: A): Promise<void> {
    let index = -1;

    const next = async (act: A): Promise<void> => {
      index += 1;

      const mw = this.middlewares[index];
      await (mw
        ? mw({
            getState: () => this.store.getState(),
            action: act,
            next,
          })
        : this.process(act));
    };

    await next(action);
  }

  private async process(action: A): Promise<void> {
    const previousState = this.store.getState();
    let nextState = previousState;

    for (const reducer of this.reducers) {
      nextState = reducer(nextState, action);
    }

    this.store.setState(nextState, action);

    for (const afterware of this.afterwares) {
      await afterware({ prevState: previousState, nextState, action });
    }
  }
}
