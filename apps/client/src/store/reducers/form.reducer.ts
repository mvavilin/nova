import type { State } from '../types/state';
import { FormActionTypes } from '../actions/form.actions';
import type { FieldName } from '@/components/InputForm/InputForm.types';
import type { FieldState } from '@/components/BaseForm/BaseForm.types';
import store from '../store';
import { saveSessionStorageData, getSessionStorageData } from '@/utils';
import { sessionStorageProps } from '@/constants/sessionStorage.constants';
import { SocketActionTypes } from '../actions/socket.actions';
import { AppActionTypes } from '../actions';
import type { AppActions } from '../types';
import { isObject } from '@/utils/isObject';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';

export default function formReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case FormActionTypes.FORM_UPDATE_FIELD: {
      const { formId, fieldName, value, isValid } = action.payload;
      const currentForm = state[formId];
      if (!currentForm) return state;
      const updatedFields: Partial<Record<FieldName, FieldState>> = {
        ...currentForm.fields,
        [fieldName]: {
          value,
          isValid,
          isChanged: true,
        },
      };
      const isFormValid = Object.values(updatedFields).every((field) => field.isValid);

      return {
        ...state,
        [formId]: {
          ...currentForm,
          fields: updatedFields,
          isFormValid,
        },
      };
    }

    case FormActionTypes.FETCH_SUCCESS: {
      if (action.payload.token) {
        saveSessionStorageData(sessionStorageProps.authToken, action.payload.token);

        const storeLS = getSessionStorageData(LOCAL_STORAGE_KEYS.STORE);
        if (isObject(action.payload.user)) {
          if (isObject(storeLS))
            saveSessionStorageData(LOCAL_STORAGE_KEYS.STORE, {
              ...storeLS,
              ...action.payload.user,
            });
          else saveSessionStorageData(LOCAL_STORAGE_KEYS.STORE, { ...action.payload.user });
        }

        store.dispatch({
          type: SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN,
          payload: { authToken: action.payload.token },
        });
      }

      return {
        ...state,
        authStatus: true,
        id: action.payload.user.id,
        email: action.payload.user.email,
        username: action.payload.user.username,
        registration: {
          fields: {},
          isFormValid: false,
        },
        login: { fields: {}, isFormValid: false },
      };
    }

    case FormActionTypes.GO_TO_LOBBY_PAGE: {
      return { ...state };
    }

    case AppActionTypes.SWITCH_LANGUAGE: {
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
