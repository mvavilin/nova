import { SoundKeys } from './soundKeys';
import { WelcomeActions } from '@/store/actions/welcome.actions';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes, FormActionTypes, SocketActionTypes } from '@/store/actions';

export const soundActionMap: Record<string, SoundKeys> = {
  [WelcomeActions.GO_TO_LOGIN_PAGE]: SoundKeys.DefaultClick,
  [WelcomeActions.GO_TO_REGISTRATION_PAGE]: SoundKeys.DefaultClick,
  [WelcomeActions.SHOW_ABOUT_US]: SoundKeys.OpenModal,
  [WelcomeActions.SHOW_GAME_RULES]: SoundKeys.OpenModal,
  [AppActionTypes.SWITCH_LANGUAGE]: SoundKeys.DefaultClick,
  [AppActionTypes.EXIT_APP]: SoundKeys.DefaultClick,
  [AppActionTypes.GO_TO_WELCOME_PAGE]: SoundKeys.DefaultClick,
  [FormActionTypes.GO_TO_LOGIN_PAGE]: SoundKeys.DefaultClick,
  [FormActionTypes.GO_TO_REGISTRATION_PAGE]: SoundKeys.DefaultClick,
  [SocketActionTypes.LEAVE_ROOM]: SoundKeys.DefaultClick,
  [SocketActionTypes.TEAM_CHANGE]: SoundKeys.ChooseTeam,
};

export function getSoundKeyByAction(action: Action): SoundKeys | undefined {
  return soundActionMap[action.type];
}
