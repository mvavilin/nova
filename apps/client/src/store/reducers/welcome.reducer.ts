import type { Action } from 'api/StateAPI';
import { type State } from '@/store/types/state';
import { Language } from '@types';
import { WelcomeActions } from '../actions/welcome.actions';

export default function welcomePageReducer(state: State, action: Action): State {
  switch (action.type) {
    case WelcomeActions.GO_TO_LOGIN_PAGE: {
      return { ...state };
    }

    case WelcomeActions.GO_TO_REGISTRATION_PAGE: {
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
