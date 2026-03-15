import type { Middleware } from '@/api/StateAPI/types/types';
import { FormActions } from '../actions/form.actions';
import type { AppActions } from '../types/action';
import type { AuthResponse } from '@/types/user.types';
import type { Overlay } from '@/components/ui';
// import {ServerUrl, Endpoints} from "@repo/shared",

const Endpoints = {
  BASE: '/',
  LOGIN: '/api/auth/login',
  REGISTRATION: '/api/auth/register',
  USERS: '/api/users',
};
const ServerUrl = {
  LOCAL_BASE: 'http://localhost:3000',
  DEPLOY_BASE: 'https://nova-codenames-server.onrender.com',
};

const FORM_ENDPOINTS: Record<string, string> = {
  registration: Endpoints.REGISTRATION,
  login: Endpoints.LOGIN,
  // profile: Endpoints.????
};

const AuthToken = 'auth_token';

export default function fetcher<State>(): Middleware<State, AppActions> {
  return async function middleware(context) {
    if (context.action.type === FormActions.FETCH_DATA) {
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

        const response = await fetch(`${ServerUrl.DEPLOY_BASE}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Failed to post user data: ${response.status}`);
        }

        console.log(response);
        const token = response.headers.get(AuthToken);
        const user: unknown = await response.json();

        if (isValidAuthResponse(user)) {
          return context.next({
            type: FormActions.FETCH_SUCCESS,
            payload: { user, token },
          });
        } else {
          console.error('The received data is incorrect');
        }
      } catch (error) {
        console.error('Fetch failed:', error);
        return context.next(context.action);
      } finally {
        currentLoader?.hide();
        if (typeof onFinishedFunction === 'function') {
          onFinishedFunction();
        }
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
