import { PAGES } from '@constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { WelcomeActions } from '@store//actions/welcome.actions';

export default function goToRegistrationAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === WelcomeActions.GO_TO_REGISTRATION_PAGE)
      router.redirect(PAGES.REGISTRATION.url());
  };
}
