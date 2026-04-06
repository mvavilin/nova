import { describe, it, expect } from 'vitest';
import StateApi from '../index';

type State = {
  count: number;
};

describe('StateApi - initialization', () => {
  it('should return initial state via getState', () => {
    const initialState: State = { count: 0 };

    const stateApi = new StateApi<State>(initialState);

    const state = stateApi.getState();

    expect(state).toEqual(initialState);
  });

  it('should not mutate initial state reference', () => {
    const initialState = { count: 0 };

    const stateApi = new StateApi(initialState);

    const state = stateApi.getState();

    expect(state).toBe(initialState);
  });
});
