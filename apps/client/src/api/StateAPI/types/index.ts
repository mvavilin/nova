export interface Action {
  type: string;
  payload?: string;
}

export type Reducer<State> = (state: State, action: Action) => State;
