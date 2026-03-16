import type { State } from '@State';
import type { AppActions } from '@AppActions';
import { AppActionTypes } from '@actions';
import { initialState } from '@initialState';

export default function appReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.EXIT_APP: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
