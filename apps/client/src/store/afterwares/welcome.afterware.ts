import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { WelcomeActions } from '@store/actions/welcome.actions';
import { localStorageProps } from '@/constants/localStorage.constants';
import { getSessionStorageData, saveSessionStorageData } from '@/utils/sessionStorage';
import { AppActionTypes } from '../actions';

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

    if (context.action.type === AppActionTypes.SWITCH_LANGUAGE) {
      const store = getSessionStorageData(localStorageProps.store) ?? {};

      saveSessionStorageData(localStorageProps.store, {
        ...store,
        language: context.nextState.language,
      });
    }
  };
}
