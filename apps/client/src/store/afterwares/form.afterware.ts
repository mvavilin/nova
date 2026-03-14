import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { FormActions } from '../actions/form.actions';

export default function formAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === FormActions.GO_TO_LOBBY_PAGE) {
      router.navigate(URLS.LOBBY());
    }
  };
}
