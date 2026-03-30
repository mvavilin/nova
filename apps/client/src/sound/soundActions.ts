import { SoundKeys } from './soundKeys';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

export const soundActionMap: Record<string, SoundKeys> = {
  [WelcomeActions.GO_TO_LOGIN_PAGE]: SoundKeys.DefaultClick,
  [WelcomeActions.GO_TO_REGISTRATION_PAGE]: SoundKeys.DefaultClick,
  [WelcomeActions.SHOW_ABOUT_US]: SoundKeys.OpenModal,
  [WelcomeActions.SHOW_GAME_RULES]: SoundKeys.OpenModal,
  [AppActionTypes.SWITCH_LANGUAGE]: SoundKeys.DefaultClick,
};

export function getSoundKeyByAction(action: Action): SoundKeys | undefined {
  return soundActionMap[action.type];
}
