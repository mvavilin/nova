import type { AppState } from '@/components/Tests/appState/appState.types';
import type { Action } from '../../../api/StateAPI';

export function userReducer(state: AppState, action: Action): AppState {
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
