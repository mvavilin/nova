import type { Action } from 'api/StateAPI';
import { WelcomeActions } from '../actions/welcome.actions';

export default function welcomePageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case WelcomeActions.GO_TO_LOGIN_PAGE: {
      return { ...state };
    }

    case WelcomeActions.GO_TO_REGISTRATION_PAGE: {
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
