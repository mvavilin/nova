export default class Store<State> {
  private state: State;
  private listeners: (() => void)[] = [];

  constructor(initialState: State) {
    this.state = initialState;
  }

  public getState(): State {
    return this.state;
  }

  public setState(newState: State): void {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);

    const unsubscribe = (): void => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };

    return unsubscribe;
  }
}
