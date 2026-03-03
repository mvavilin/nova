export enum RegistrationActions {
  GO_TO_WELCOME_PAGE = 'REGISTRATION/GO_TO_WELCOME_PAGE',
  SEND_DATA = 'REGISTRATION/SEND_DATA',
  FETCH_DATA = 'REGISTRATION/FETCH_DATA',
  FETCH_SUCCESS = 'REGISTRATION/FETCH_SUCCESS',
}

export type GoToWelcomePage = {
  type: RegistrationActions.GO_TO_WELCOME_PAGE;
};

export type SendData = {
  type: RegistrationActions.SEND_DATA;
  payload: { username: string; email: string; password: string; count: number };
};

export type FetchData = {
  type: RegistrationActions.FETCH_DATA;
};

export type FetchSuccess = {
  type: RegistrationActions.FETCH_SUCCESS;
  payload: { title: string };
};

export type RegistrationPageActions = GoToWelcomePage | SendData | FetchData | FetchSuccess;
