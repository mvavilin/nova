export enum LobbyActions {
  GO_TO_PROFILE_PAGE = 'LOBBY/GO_TO_PROFILE_PAGE',
}

export type GoToProfilePage = {
  type: LobbyActions.GO_TO_PROFILE_PAGE;
};

export type LobbyPageActions = GoToProfilePage;
