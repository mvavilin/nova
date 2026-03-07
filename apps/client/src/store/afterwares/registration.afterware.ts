import { PAGES } from '@constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { RegistrationActions } from '@store/actions/registration.actions';

export default function goToLobbyAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === RegistrationActions.REGISTER_USER) {
      router.redirect(PAGES.LOBBY.url());
    }
  };
}
