import type { Action } from 'api/StateAPI';
import { RegPageActionType } from '../actions/regPage';

export default function regPageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case RegPageActionType.GO_TO_WELCOME_PAGE: {
      return { ...state, page: 'welcome' };
    }

    default: {
      return state;
    }
  }
}
