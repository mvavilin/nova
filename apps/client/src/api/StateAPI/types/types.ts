export type Payload = Record<string, unknown>;

export interface Action<Type extends string = string, P = Payload> {
  type: Type;
  payload?: P;
}

export type Reducer<State, A extends Action = Action> = (state: State, action: A) => State;

export type Middleware<State> = (store: {
  getState: () => State;
  dispatch: (action: Action) => void;
}) => (next: (action: Action) => void) => (action: Action) => void;
