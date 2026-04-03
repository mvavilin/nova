import type { State } from '@State';
import type { AppActions } from '@AppActions';
// import { SocketActionTypes } from '@actions';

export default function gameReducer(state: State, action: AppActions): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
