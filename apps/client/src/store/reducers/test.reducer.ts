import { TestActions } from '../actions/test.actions';
import type { Actions } from '../types/action.types';

export default function regPageReducer<State>(state: State, action: Actions): State {
  switch (action.type) {
    case TestActions.GO_TO_WELCOME_PAGE: {
      return { ...state, page: 'welcome' };
    }

    case TestActions.SEND_DATA: {
      return { ...state, count: action.payload.count };
    }

    case TestActions.FETCH_SUCCESS: {
      return { ...state, title: action.payload.title };
    }

    default: {
      return state;
    }
  }
}
