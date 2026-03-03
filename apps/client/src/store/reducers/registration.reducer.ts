import { RegistrationActions } from '../actions/registration.actions';
import type { Actions } from '../types/action.types';

export default function regPageReducer<State>(state: State, action: Actions): State {
  switch (action.type) {
    case RegistrationActions.GO_TO_WELCOME_PAGE: {
      return { ...state, page: 'welcome' };
    }

    case RegistrationActions.SEND_DATA: {
      return { ...state, count: action.payload.count };
    }

    case RegistrationActions.FETCH_SUCCESS: {
      return { ...state, title: action.payload.title };
    }

    default: {
      return state;
    }
  }
}
