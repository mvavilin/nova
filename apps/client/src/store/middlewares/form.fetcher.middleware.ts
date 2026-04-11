import type { Middleware } from '@/api/StateAPI/types/types';
import { FormActionTypes } from '../actions/form.actions';
import type { AppActions } from '../types/action';
import type { AuthResponse } from '@/types/user.types';
import type { Overlay } from '@/components/ui';
import { showErrorToast } from '@utils';
import { ServerUrl, Endpoints } from '@shared/api.constants';
import { AUTH_TOKEN } from '@/constants/tokens';
import { t } from 'i18n';
import { TranslationKeys } from '@/i18n/translationKeys';

const FORM_ENDPOINTS: Record<string, string> = {
  registration: Endpoints.REGISTRATION,
  login: Endpoints.LOGIN,
};

export default function fetcher<State>(): Middleware<State, AppActions> {
  return async function middleware(context) {
    if (context.action.type === FormActionTypes.FETCH_DATA) {
      let currentLoader: Overlay | null = null;
      let onFinishedFunction: () => void = () => {};
      try {
        const { formId, formData, loader, onFinished } = context.action.payload;
        currentLoader = loader;
        onFinishedFunction = onFinished;

        const endpoint = FORM_ENDPOINTS[formId];
        if (!endpoint) {
          console.error(`No endpoint found for form: ${formId}`);
          return context.next(context.action);
        }

        const response = await fetch(`${ServerUrl.LOCAL_BASE}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          getError(response.status);
        }

        const token = response.headers.get(AUTH_TOKEN);
        const user: unknown = await response.json();

        if (isValidAuthResponse(user)) {
          return context.next({
            type: FormActionTypes.FETCH_SUCCESS,
            payload: { user, token },
          });
        } else {
          console.error('The received data is incorrect.');
        }
      } catch (error) {
        let finalMessage = '';

        if (error instanceof TypeError) {
          finalMessage = t(TranslationKeys.FORM_ERROR_CONNECTION);
        } else if (error instanceof Error) {
          finalMessage = error.message;
        } else {
          finalMessage = t(TranslationKeys.FORM_ERROR_UNKNOWN);
        }
        showErrorToast(finalMessage, t(TranslationKeys.FORM_ERROR));

        return context.next(context.action);
      } finally {
        currentLoader?.hide();
        onFinishedFunction?.();
      }
    }

    return context.next(context.action);
  };
}

function isValidAuthResponse(data: unknown): data is AuthResponse {
  if (typeof data !== 'object' || data === null) return false;

  return (
    'id' in data &&
    typeof data.id === 'string' &&
    'username' in data &&
    typeof data.username === 'string' &&
    'email' in data &&
    typeof data.email === 'string'
  );
}

function getError(responseStatus: number): void {
  switch (responseStatus) {
    case 400: {
      throw new Error(t(TranslationKeys.FORM_ERROR_400));
    }
    case 403: {
      throw new Error(t(TranslationKeys.FORM_ERROR_403));
    }
    case 409: {
      throw new Error(t(TranslationKeys.FORM_ERROR_409));
    }
    case 500: {
      throw new Error(t(TranslationKeys.FORM_ERROR_500));
    }
    default: {
      throw new Error(t(TranslationKeys.FORM_ERROR_UNKNOWN));
    }
  }
}
