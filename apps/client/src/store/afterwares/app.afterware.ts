import type { Afterware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { AppActionTypes } from '@actions';

import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';

export default function appAfterware<State>(): Afterware<State, AppActions> {
  return async function afterware(context) {
    if (context.action.type === AppActionTypes.EXIT_APP) {
      sessionStorage.clear();
      router.navigate(URLS.LOGIN());
    }
  };
}
