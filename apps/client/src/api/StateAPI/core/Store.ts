import type { Action } from '../types/types';

export default class Store<State, A extends Action = Action> {
  private state: State;
  private listeners: ((state: State, action: A) => void)[] = [];

  constructor(initialState: State) {
    this.state = initialState;
  }

  public getState(): Readonly<State> {
    return this.state;
  }

  public setState(newState: State, action: A): void {
    this.state = newState;

    for (const listener of this.listeners) {
      listener(this.state, action);
    }
  }

  public subscribe(listener: (state: State, action: A) => void): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
