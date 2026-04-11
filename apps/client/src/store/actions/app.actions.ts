export enum AppActionTypes {
  EXIT_APP = 'APP/EXIT_APP',
  SWITCH_LANGUAGE = 'APP/SWITCH_LANGUAGE',
  UPDATE_STORE = 'APP/UPDATE_STORE',
  RESET_DATA = 'APP/RESET_DATA',
  GO_TO_WELCOME_PAGE = 'APP/GO_TO_WELCOME_PAGE',
}

type AppExit = {
  type: AppActionTypes.EXIT_APP;
};

type SwitchLanguage = {
  type: AppActionTypes.SWITCH_LANGUAGE;
};

type UpdateStore = {
  type: AppActionTypes.UPDATE_STORE;
  payload: { userId: string; username: string };
};

type ResetData = {
  type: AppActionTypes.RESET_DATA;
};

type GoToWelcomePage = {
  type: AppActionTypes.GO_TO_WELCOME_PAGE;
};

export type LocalAppActions = AppExit | SwitchLanguage | UpdateStore | ResetData | GoToWelcomePage;
