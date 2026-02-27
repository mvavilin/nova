import type { Action } from '../types';

export interface CounterState {
  count: number;
}

export function counterReducer(state: CounterState, action: Action): CounterState {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...state, count: state.count + 1 };
    }
    case 'DECREMENT': {
      return { ...state, count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
}
