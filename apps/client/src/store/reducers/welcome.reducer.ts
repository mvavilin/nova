import type { Action } from 'api/StateAPI';
import { WelcomeActions } from '../actions/welcome.actions';

export default function welcomePageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case WelcomeActions.GO_TO_LOGIN_PAGE: {
      return { ...state, page: 'login' };
    }

    case WelcomeActions.GO_TO_REGISTRATION_PAGE: {
      return { ...state, page: 'registration' };
    }

    default: {
      return state;
    }
  }
}
