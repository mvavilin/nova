import type { State } from '@State';
import { AppActionTypes } from '@actions';
import { initialState } from '@initialState';
import { Language } from '@/types';
import type { AppActions } from '../types';

export default function appReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.EXIT_APP: {
      return {
        ...initialState,
        authStatus: false,
      };
    }

    case AppActionTypes.SWITCH_LANGUAGE: {
      const nextLanguage = state.language === Language.RU ? Language.EN : Language.RU;
      return {
        ...state,
        language: nextLanguage,
      };
    }

    case AppActionTypes.UPDATE_STORE: {
      return {
        ...state,
        authStatus: true,
        id: action.payload.userId,
        username: action.payload.username,
        registration: {
          fields: {},
          isFormValid: false,
        },
        login: { fields: {}, isFormValid: false },
      };
    }

    case AppActionTypes.RESET_DATA: {
      return {
        ...initialState,
        authStatus: false,
      };
    }

    default: {
      return state;
    }
  }
}
