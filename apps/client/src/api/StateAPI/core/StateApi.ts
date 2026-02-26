// ./apps/client/src/api/StateAPI/core/StateAPI.ts
import Store from './Store';
import Dispatcher from './Dispatcher';
import type { Reducer, Action } from '../types';

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

  public dispatch(action: Action): void {
    this.dispatcher.dispatch(action);
  }

  public subscribe(listener: () => void): () => void {
    return this.store.subscribe(listener);
  }

  public getState(): State {
    return this.store.getState();
  }
}
