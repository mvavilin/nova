import type { GlobalFormState } from '@/components/BaseForm/BaseFormTypes';
import { FormActions } from '../actions/form.actions';
import type { AppActions } from '../types/action.types';
import type { FieldName } from '@/components/InputForm/InputForm.type';
import type { FieldState } from '@/components/BaseForm/BaseFormTypes';
import store from '../store';

export default function baseFormReducer<State extends GlobalFormState>(
  state: State,
  action: AppActions
): State {
  switch (action.type) {
    case FormActions.FORM_UPDATE_FIELD: {
      const { formId, fieldName, value, isValid, errorMessage } = action.payload;
      const currentForm = state[formId];
      if (!currentForm) return state;
      const updatedFields: Partial<Record<FieldName, FieldState>> = {
        ...currentForm.fields,
        [fieldName]: {
          value,
          isValid,
          error: errorMessage,
          isChanged: true,
        },
      };
      const isFormValid = Object.values(updatedFields).every((field) => field.isValid);

      // Возвращаем НОВЫЙ стейт с обновленной формой
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
      store.dispatch({ type: FormActions.GO_TO_LOBBY_PAGE });

      if (action.payload.token) {
        sessionStorage.setItem('token', action.payload.token);
      }

      return {
        ...state,
        authStatus: true,
        id: action.payload.user.id,
        email: action.payload.user.email,
        username: action.payload.user.username,
      };
    }

    case FormActions.GO_TO_LOBBY_PAGE: {
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
