export enum TestActions {
  GO_TO_WELCOME_PAGE = 'TEST/GO_TO_WELCOME_PAGE',
  SEND_DATA = 'TEST/SEND_DATA',
  FETCH_DATA = 'TEST/FETCH_DATA',
  FETCH_SUCCESS = 'TEST/FETCH_SUCCESS',
}

export type GoToWelcomePage = {
  type: TestActions.GO_TO_WELCOME_PAGE;
};

export type SendData = {
  type: TestActions.SEND_DATA;
  payload: { username: string; email: string; password: string; count: number };
};

export type FetchData = {
  type: TestActions.FETCH_DATA;
};

export type FetchSuccess = {
  type: TestActions.FETCH_SUCCESS;
  payload: { title: string };
};

export type TestPageActions = GoToWelcomePage | SendData | FetchData | FetchSuccess;
