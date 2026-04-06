import { describe, it, expect } from 'vitest';
import StateApi from '../';
import type { Action } from '../types/types';

type State = { count: number };

function incrementReducer(state: State, action: Action): State {
  if (action.type === 'INCREMENT') return { ...state, count: state.count + 1 };
  return state;
}

function doubleReducer(state: State, action: Action): State {
  if (action.type === 'INCREMENT') return { ...state, count: state.count * 2 };
  return state;
}

describe('StateApi - reducers', () => {
  it('should update state via reducer on dispatch', async () => {
    const stateApi = new StateApi<State, Action>({ count: 0 });
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(stateApi.getState().count).toBe(1);
  });

  it('should ignore unknown actions', async () => {
    const stateApi = new StateApi<State, Action>({ count: 0 });
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'UNKNOWN' });
    expect(stateApi.getState().count).toBe(0);
  });

  it('should apply multiple reducers sequentially', async () => {
    const stateApi = new StateApi<State, Action>({ count: 1 });
    stateApi.addReducer(incrementReducer);
    stateApi.addReducer(doubleReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(stateApi.getState().count).toBe(4);
  });

  it('should respect reducer order', async () => {
    const stateApi = new StateApi<State, Action>({ count: 1 });
    stateApi.addReducer(doubleReducer);
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(stateApi.getState().count).toBe(3);
  });
});
