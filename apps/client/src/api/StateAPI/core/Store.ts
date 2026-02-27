import type { Action } from '../types';

export default class Store<State> {
  private state: State;
  private listeners: ((action: Action) => void)[] = [];

  constructor(initialState: State) {
    this.state = initialState;
  }

  public getState(): State {
    return this.state;
  }

  public setState(newState: State, action: Action): void {
    this.state = newState;
    for (const listener of this.listeners) listener(action);
  }

  public subscribe(listener: (action: Action) => void): () => void {
    this.listeners.push(listener);

    const unsubscribe = (): void => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };

    return unsubscribe;
  }
}
