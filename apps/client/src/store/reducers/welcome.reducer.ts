import type { Action } from 'api/StateAPI';
import { WelcomeActions } from '../actions/welcome.actions';
import { PAGES } from '@constants';
import { updateUrl } from '@utils';

export default function welcomePageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case WelcomeActions.GO_TO_LOGIN_PAGE: {
      updateUrl(PAGES.LOGIN.url());

      return { ...state };
    }

    case WelcomeActions.GO_TO_REGISTRATION_PAGE: {
      updateUrl(PAGES.REGISTERATION.url());

      return { ...state };
    }

    default: {
      return state;
    }
  }
}
