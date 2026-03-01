import Store from './core/Store';
import Dispatcher from './core/Dispatcher';
import type { Reducer, Action, Afterware } from './types/types';

export default class StateApi<State, A extends Action = Action> {
  private store: Store<State, A>;
  private dispatcher: Dispatcher<State, A>;

  constructor(initialState: State) {
    this.store = new Store<State, A>(initialState);
    this.dispatcher = new Dispatcher<State, A>(this.store);
  }

  public addReducer(...reducers: Reducer<State, A>[]): void {
    this.dispatcher.addReducer(...reducers);
  }

  public removeReducer(reducer: Reducer<State, A>): void {
    this.dispatcher.removeReducer(reducer);
  }

  public addAfterware(...afterwares: Afterware<State, A>[]): void {
    this.dispatcher.addAfterware(...afterwares);
  }

  public removeAfterware(mw: Afterware<State, A>): void {
    this.dispatcher.removeAfterware(mw);
  }

  public dispatch(action: A): Promise<void> {
    return this.dispatcher.dispatch(action).catch((error) => {
      console.error('[StateApi dispatch error]:', error);
    });
  }

  public subscribe(listener: (state: State, action: A) => void): () => void {
    return this.store.subscribe(listener);
  }

  public getState(): Readonly<State> {
    return this.store.getState();
  }
}

export type { Reducer, Action, Afterware } from './types/types';
