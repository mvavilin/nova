import type { State } from '@State';
import { AppActionTypes } from '@actions';
import { initialState } from '@initialState';
import { Language } from '@/types';
import type { Action } from '@/api/StateAPI';

export default function appReducer(state: State, action: Action): State {
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

    default: {
      return state;
    }
  }
}
