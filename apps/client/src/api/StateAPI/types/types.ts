export type Payload = Record<string, unknown>;

export interface Action<Type extends string = string, P = Payload> {
  type: Type;
  payload?: P;
}

export type Reducer<State, A extends Action = Action> = (state: State, action: A) => State;

export type Afterware<State, A extends Action = Action> = (context: {
  prevState: Readonly<State>;
  nextState: Readonly<State>;
  action: A;
}) => void | Promise<void>;
