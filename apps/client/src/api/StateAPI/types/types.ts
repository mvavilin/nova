export interface Action<Type extends string = string> {
  type: Type;
}

export type Middleware<State, A extends Action = Action> = (context: {
  getState: () => Readonly<State>;
  action: A;
  next: (action: A) => void | Promise<void>;
}) => void | Promise<void>;

export type Reducer<State, A extends Action = Action> = (state: State, action: A) => State;

export type Afterware<State, A extends Action = Action> = (context: {
  prevState: Readonly<State>;
  nextState: Readonly<State>;
  action: A;
}) => void | Promise<void>;
