import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { FormActionTypes } from '../actions';

export default function formAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === FormActionTypes.GO_TO_LOGIN_PAGE) {
      router.navigate(URLS.LOGIN());
    }

    if (context.action.type === FormActionTypes.GO_TO_REGISTRATION_PAGE) {
      router.navigate(URLS.REGISTRATION());
    }
  };
}
