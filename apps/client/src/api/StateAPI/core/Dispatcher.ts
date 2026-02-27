import type { Reducer, Action } from '../types';
import Store from './Store';

export default class Dispatcher<State> {
  private store: Store<State>;
  private reducers: Reducer<State>[] = [];

  constructor(store: Store<State>) {
    this.store = store;
  }

  public addReducer(reducer: Reducer<State>): void {
    this.reducers.push(reducer);
  }

  public dispatch(action: Action): void {
    let newState = this.store.getState();
    for (const reducer of this.reducers) {
      newState = reducer(newState, action);
    }
    this.store.setState(newState, action);
  }
}
