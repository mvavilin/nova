export interface Action<Type extends string = string, Payload = unknown> {
  type: Type;
  payload?: Payload;
}

export type Reducer<State> = (state: State, action: Action) => State;
