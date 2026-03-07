import { localStorageProps } from '@constants/localStorage.constants';
import { getStorageData } from '@utils/localStorage';
import type { Action } from '@api/StateAPI';
import { RegistrationActions } from '@store/actions/registration.actions';

export default function registrationPageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case RegistrationActions.REGISTER_USER: {
      return { ...state, ...getStorageData(localStorageProps.user) };
    }

    default: {
      return state;
    }
  }
}
