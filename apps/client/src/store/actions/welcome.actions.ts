export enum WelcomeActions {
  GO_TO_LOGIN_PAGE = 'WELCOME/GO_TO_LOGIN_PAGE',
  GO_TO_REGISTRATION_PAGE = 'WELCOME/GO_TO_REGISTRATION_PAGE',
  GO_TO_TEST_PAGE = 'WELCOME/GO_TO_TEST_PAGE',
  GO_TO_LOBBY_PAGE = 'WELCOME/GO_TO_LOBBY_PAGE',
  SHOW_GAME_RULES = 'WELCOME/SHOW_GAME_RULES',
  SHOW_ABOUT_US = 'WELCOME/SHOW_ABOUT_US',
}

export type GoToLoginPage = {
  type: WelcomeActions.GO_TO_LOGIN_PAGE;
};

export type GoToRegistrationPage = {
  type: WelcomeActions.GO_TO_REGISTRATION_PAGE;
};

export type GoToLobbyPage = {
  type: WelcomeActions.GO_TO_LOBBY_PAGE;
};

export type ShowGameRules = {
  type: WelcomeActions.SHOW_GAME_RULES;
};

export type ShowAboutUs = {
  type: WelcomeActions.SHOW_ABOUT_US;
};

export type WelcomePageActions =
  | GoToLoginPage
  | GoToLobbyPage
  | GoToRegistrationPage
  | ShowGameRules
  | ShowAboutUs;
