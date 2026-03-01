import type { Action, Reducer, Afterware } from '../types/types';
import Store from './Store';

export default class Dispatcher<State, A extends Action = Action> {
  private store: Store<State, A>;
  private reducers: Reducer<State, A>[] = [];
  private afterwares: Afterware<State, A>[] = [];

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

  public dispatch(action: A): Promise<void> {
    this.queue = this.queue.then(() => this.process(action));
    return this.queue;
  }

  private async process(action: A): Promise<void> {
    const previousState = this.store.getState();

    let nextState = previousState;

    for (const reducer of this.reducers) {
      nextState = reducer(nextState, action);
    }

    this.store.setState(nextState, action);

    for (const afterware of this.afterwares) {
      await afterware({
        prevState: previousState,
        nextState,
        action,
      });
    }
  }
}
