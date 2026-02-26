export interface Action {
  type: string;
  payload?: unknown;
}

export type Reducer<State> = (state: State, action: Action) => State;
