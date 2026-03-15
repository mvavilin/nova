import type { State } from '../types/state';
import { FormActions } from '../actions/form.actions';
import type { AppActions } from '../types/action';
import type { FieldName } from '@/components/InputForm/InputForm.type';
import type { FieldState } from '@/components/BaseForm/BaseFormTypes';
import store from '../store';
import { saveSessionStorageData } from '@/utils/sessionStorage';
import { sessionStorageProps } from '@/constants/sessionStorage.constants';
import { Language } from '@/types';
import { SocketActionTypes } from '../actions/socket.actions';

export default function formReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case FormActions.FORM_UPDATE_FIELD: {
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

    case FormActions.FETCH_SUCCESS: {
      if (action.payload.token) {
        saveSessionStorageData(sessionStorageProps.authToken, action.payload.token);

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

    case FormActions.GO_TO_LOBBY_PAGE: {
      return { ...state };
    }

    case FormActions.SWITCH_LANGUAGE: {
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
