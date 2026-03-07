export enum RegistrationActions {
  REGISTER_USER = 'REGISTRATION/REGISTER_USER',
}

export type GoToLobbyPage = {
  type: RegistrationActions.REGISTER_USER;
};

export type RegistrationPageActions = GoToLobbyPage;
