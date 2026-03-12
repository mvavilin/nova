import type { Middleware } from '@/api/StateAPI/types/types';
import { FormActions } from '../actions/form.actions';
import type { AppActions } from '../types/action';
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
      try {
        const { formId, formData } = context.action.payload;
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
        const user = await response.json();

        // если нужно добавить action, то через next
        // лучше не создавайте новый store.dispatch() можно отхватить рекурсию
        return context.next({
          type: FormActions.FETCH_SUCCESS,
          payload: { user, token },
        });
      } catch (error) {
        console.error('Fetch failed:', error);
        return context.next(context.action);
      }
    }

    return context.next(context.action);
  };
}
