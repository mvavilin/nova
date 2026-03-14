export enum WelcomeActions {
  GO_TO_LOGIN_PAGE = 'WELCOME/GO_TO_LOGIN_PAGE',
  GO_TO_REGISTRATION_PAGE = 'WELCOME/GO_TO_REGISTRATION_PAGE',
  GO_TO_TEST_PAGE = 'WELCOME/GO_TO_TEST_PAGE',
  SWITCH_LANGUAGE = 'WELCOME/SWITCH_LANGUAGE',
  SHOW_GAME_RULES = 'WELCOME/SHOW_GAME_RULES',
}

export type GoToLoginPage = {
  type: WelcomeActions.GO_TO_LOGIN_PAGE;
};

export type GoToRegistrationPage = {
  type: WelcomeActions.GO_TO_REGISTRATION_PAGE;
};

export type SwitchLanguage = {
  type: WelcomeActions.SWITCH_LANGUAGE;
};

export type ShowGameRules = {
  type: WelcomeActions.SHOW_GAME_RULES;
};

export type WelcomePageActions =
  | GoToLoginPage
  | GoToRegistrationPage
  | SwitchLanguage
  | ShowGameRules;
