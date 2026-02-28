import Store from './core/Store';
import Dispatcher from './core/Dispatcher';
import type { Reducer, Action, Middleware } from './types/types';

export default class StateApi<State> {
  private store: Store<State>;
  private dispatcher: Dispatcher<State>;

  constructor(initialState: State) {
    this.store = new Store(initialState);
    this.dispatcher = new Dispatcher(this.store);
  }

  public addReducer(reducer: Reducer<State>): void {
    this.dispatcher.addReducer(reducer);
  }

  public removeReducer(reducer: Reducer<State>): void {
    this.dispatcher.removeReducer(reducer);
  }

  public addMiddleware(mw: Middleware<State>): void {
    this.dispatcher.addMiddleware(mw);
  }

  public removeMiddleware(mw: Middleware<State>): void {
    this.dispatcher.removeMiddleware(mw);
  }

  public dispatch(action: Action): void {
    void this.dispatcher.dispatch(action).catch((error) => {
      console.error('[StateApi dispatch error]:', error);
    });
  }

  public subscribe(listener: (state: State, action: Action) => void): () => void {
    return this.store.subscribe(listener);
  }

  public getState(): State {
    return this.store.getState();
  }
}

export type { Reducer, Action, Middleware } from './types/types';
