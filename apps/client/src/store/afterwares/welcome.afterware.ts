import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { WelcomeActions } from '@store/actions/welcome.actions';
import { localStorageProps } from '@/constants/localStorage.constants';
import { getLocalStorageData, saveLocalStorageData } from '@/utils/localStorage';

type StateWithLanguage = {
  language: string;
};

export default function welcomePageAfterware<State extends StateWithLanguage>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === WelcomeActions.GO_TO_REGISTRATION_PAGE) {
      router.navigate(URLS.REGISTRATION());
    }

    if (context.action.type === WelcomeActions.GO_TO_LOGIN_PAGE) {
      router.navigate(URLS.LOGIN());
    }

    if (context.action.type === WelcomeActions.GO_TO_LOBBY_PAGE) {
      router.navigate(URLS.LOBBY());
    }

    if (context.action.type === WelcomeActions.SWITCH_LANGUAGE) {
      const store = getLocalStorageData(localStorageProps.store) ?? {};

      saveLocalStorageData(localStorageProps.store, {
        ...store,
        language: context.nextState.language,
      });
    }
  };
}
