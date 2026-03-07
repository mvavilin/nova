import type { Action } from 'api/StateAPI';
import { Language, type ClientUser } from '@/types';
import { WelcomeActions } from '../actions/welcome.actions';
import { PAGES } from '@constants';
import { updateUrl } from '@utils';

export default function welcomePageReducer(state: ClientUser, action: Action): ClientUser {
  switch (action.type) {
    case WelcomeActions.GO_TO_LOGIN_PAGE: {
      updateUrl(PAGES.LOGIN.url());

      return { ...state };
    }

    case WelcomeActions.GO_TO_REGISTRATION_PAGE: {
      updateUrl(PAGES.REGISTRATION.url());

      return { ...state };
    }

    case WelcomeActions.SWITCH_LANGUAGE: {
      let nextLanguage: Language;

      switch (state.language) {
        case Language.RU: {
          nextLanguage = Language.EN;
          break;
        }
        case Language.EN: {
          nextLanguage = Language.RU;
          break;
        }
        default: {
          nextLanguage = Language.EN;
        }
      }

      return {
        ...state,
        language: nextLanguage,
      };
    }

    default: {
      return state;
    }
  }
}
