import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { LobbyActions } from '../actions/lobby.actions';

type StateWithLanguage = {
  language: string;
};

export default function lobbyPageAfterware<State extends StateWithLanguage>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === LobbyActions.GO_TO_PROFILE_PAGE) {
      router.navigate(URLS.PROFILE());
    }
  };
}
