export enum AppActionTypes {
  EXIT_APP = 'APP/EXIT_APP',
  SWITCH_LANGUAGE = 'SWITCH_LANGUAGE',
}

type AppExit = {
  type: AppActionTypes.EXIT_APP;
};

type SwitchLanguage = {
  type: AppActionTypes.SWITCH_LANGUAGE;
};

export type LocalAppActions = AppExit | SwitchLanguage;
