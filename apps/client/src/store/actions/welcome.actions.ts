export enum WelcomeActions {
  GO_TO_LOGIN_PAGE = 'WELCOME/GO_TO_LOGIN_PAGE',
  GO_TO_TEST_PAGE = 'WELCOME/GO_TO_TEST_PAGE',
}

export type GoToLoginPage = {
  type: WelcomeActions.GO_TO_LOGIN_PAGE;
};

export type GoToTestPage = {
  type: WelcomeActions.GO_TO_TEST_PAGE;
};

export type WelcomePageActions = GoToLoginPage | GoToTestPage;
