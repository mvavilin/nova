import type { Action } from 'api/StateAPI';
import { WelcomePageActionType } from '../actions/welcomePage';

export default function welcomePageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case WelcomePageActionType.GO_TO_LOGIN_PAGE: {
      return { ...state, page: 'login' };
    }

    case WelcomePageActionType.GO_TO_REG_PAGE: {
      return { ...state, page: 'registration' };
    }

    default: {
      return state;
    }
  }
}
