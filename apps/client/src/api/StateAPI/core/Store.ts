import type { Action } from '../types';

export default class Store<State> {
  private state: State;
  private listeners: ((state: State, action: Action) => void)[] = [];

  constructor(initialState: State) {
    this.state = initialState;
  }

  public getState(): Readonly<State> {
    return this.state;
  }

  public setState(newState: State, action: Action): void {
    if (newState === this.state) return;
    this.state = newState;
    for (const listener of this.listeners) listener(this.state, action);
  }

  public subscribe(listener: (state: State, action: Action) => void): () => void {
    this.listeners.push(listener);

    const unsubscribe = (): void => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };

    return unsubscribe;
  }
}
