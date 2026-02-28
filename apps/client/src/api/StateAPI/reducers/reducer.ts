import type { AppState } from '../../../components/Tests/appState/AppState.types';
import type { Action } from '..';

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USERNAME': {
      return { ...state, username: action.payload || '' };
    }

    case 'SET_STATUS': {
      return { ...state, status: action.payload || '' };
    }

    default: {
      return state;
    }
  }
}
