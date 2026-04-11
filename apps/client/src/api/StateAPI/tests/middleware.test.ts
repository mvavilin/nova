import { describe, it, expect, vi } from 'vitest';
import StateApi, { type Middleware } from '../';
import type { Action } from '../types/types';

type State = { count: number };

function incrementReducer(state: State, action: Action): State {
  if (action.type === 'INCREMENT') return { ...state, count: state.count + 1 };
  return state;
}

// Middleware вынесены в отдельные функции
const middlewareModify: Middleware<State, Action> = async ({ action, next }) => {
  let nextAction = action;
  if (action.type === 'INCREMENT') nextAction = { type: 'UNKNOWN' };
  await next(nextAction);
};

const middlewareEmpty: Middleware<State, Action> = async () => {};

describe('StateApi - middleware', () => {
  it('should call middleware on dispatch', async () => {
    const stateApi = new StateApi<State, Action>({ count: 0 });
    const middlewareFunction = vi.fn(async ({ next, action }) => await next(action));
    stateApi.addMiddleware(middlewareFunction);
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(middlewareFunction).toHaveBeenCalled();
  });

  it('should allow middleware to modify action', async () => {
    const stateApi = new StateApi<State, Action>({ count: 0 });
    stateApi.addMiddleware(middlewareModify);
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(stateApi.getState().count).toBe(0);
  });

  it('should stop pipeline if middleware does not call next', async () => {
    const stateApi = new StateApi<State, Action>({ count: 0 });
    stateApi.addMiddleware(middlewareEmpty);
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(stateApi.getState().count).toBe(0);
  });
});

describe('StateApi - middleware', () => {
  it('should execute middleware in correct order', async () => {
    const calls: string[] = [];
    const mw1: Middleware<State, Action> = async ({ next }) => {
      calls.push('mw1-before');
      await next({ type: 'INCREMENT' });
      calls.push('mw1-after');
    };
    const mw2: Middleware<State, Action> = async ({ next }) => {
      calls.push('mw2-before');
      await next({ type: 'INCREMENT' });
      calls.push('mw2-after');
    };
    const stateApi = new StateApi<State, Action>({ count: 0 });
    stateApi.addMiddleware(mw1, mw2);
    stateApi.addReducer(incrementReducer);
    await stateApi.dispatch({ type: 'INCREMENT' });
    expect(calls).toEqual(['mw1-before', 'mw2-before', 'mw2-after', 'mw1-after']);
  });
});
